import { prisma } from "../../../lib/prisma";
import pusher from "../../../lib/pusher";
import sendMsg from "../../../lib/twilio";
import sendEmail from "../../../lib/mailer";
import { getDemandFetch, getMsgArray } from "../../../utils/helpers";

const handler = async (req, res) => {
  const { fetchId } = req.query;
  const { userId, action } = req.body;
  switch (action) {
    case "START":
      try {
        const currentFetch = await prisma.productFetch.update({
          where: {
            id: fetchId,
          },
          data: {
            status: "FETCHING",
          },
        });
        const form = { color: currentFetch.color, size: currentFetch.size };
        const pid = currentFetch.productId;
        const interval = currentFetch.interval;
        const fetchLoop = setInterval(async () => {
          const curr = await prisma.productFetch.findUnique({
            where: {
              id: fetchId,
            },
            select: {
              status: true,
            },
          });
          if (curr.status !== "FETCHING") {
            clearInterval(fetchLoop);
          } else {
            const demandData = await getDemandFetch(pid, form);
            if (demandData.length) {
              try {
                await prisma.demandItem.createMany({
                  data: demandData.map((item) => ({
                    ...item,
                    productFetchId: fetchId,
                  })),
                });
                const doneFetch = await prisma.productFetch.update({
                  where: {
                    id: fetchId,
                  },
                  data: {
                    status: "SUCCEEDED",
                  },
                  include: {
                    demandItem: true,
                  },
                });
                await pusher.trigger("burton-stock", userId, doneFetch);

                const { phoneNumber, email } = doneFetch;
                if (phoneNumber) {
                  const messages = getMsgArray(demandData, 1500);
                  const promiseArr = messages.map((msg) =>
                    sendMsg(msg, phoneNumber)
                  );
                  await Promise.all(promiseArr);
                }
                if (email) {
                  await sendEmail(demandData, email);
                }
              } catch (err) {
                await pusher.trigger(
                  "burton-stock",
                  "handle-error",
                  err.message
                );
              }
            }
          }
        }, interval * 1000);
        res.status(200).json(currentFetch);
      } catch (err) {
        res
          .status(500)
          .json({ errorMessage: "Failed to start due to server issue" });
      }
      break;
    case "STOP":
      try {
        const currentFetch = await prisma.productFetch.update({
          where: {
            id: fetchId,
          },
          data: {
            status: "IDLE",
          },
        });

        res.status(200).json(currentFetch);
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ errorMessage: "Failed to stop due to server issue" });
      }
      break;
    default:
      break;
  }
};

export default handler;
