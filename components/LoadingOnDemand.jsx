import { useEffect } from "react";
import { Container, CircularProgress, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnDemand, demandState } from "../store/features/demandSlice";
import { toggleMode } from "../store/features/modeSlice";
import { sendSMSMessage, phoneState } from "../store/features/phoneSlice";
import { sendEmail, emailState } from "../store/features/emailSlice";
import { useRouter } from "next/router";

export default function LoadingOnDemand(props) {
  const { pid, interval } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const { status } = useSelector(demandState);
  const { phoneNumber } = useSelector(phoneState);
  const { email } = useSelector(emailState);

  useEffect(() => {
    const timeInterval = interval ? interval : 5;
    const intervalFetching = setInterval(
      () => dispatch(fetchOnDemand(pid)),
      timeInterval * 1000
    );
    if (status === "succeeded") {
      clearInterval(interval);
      router.push("/result").then(() => {
        if (phoneNumber) {
          dispatch(sendSMSMessage());
        }
        if (email) {
          dispatch(sendEmail());
        }
      });
    }
    return () => clearInterval(intervalFetching);
  }, [status, pid, interval, phoneNumber, email, router, dispatch]);
  return (
    <Container
      maxWidth="sm"
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={"20em"} />
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        onClick={() => dispatch(toggleMode())}
      >
        back
      </Button>
    </Container>
  );
}
