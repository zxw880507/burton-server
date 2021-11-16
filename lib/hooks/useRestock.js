import { useState, useEffect } from "react";
import axios from "axios";
import { sortDemand } from "../../utils/helpers";

export default function useRestock(props) {
  const { pid, color, size } = props;

  const [restockState, setRestockState] = useState({
    restock: [],
    status: "idle",
    error: null,
  });

  useEffect(() => {
    if (pid && color && size) {
      const initForm = { color, size };
      let form = {};
      for (const key in initForm) {
        if (!Array.isArray(initForm[key])) {
          form[key] = Array(initForm[key]);
        } else {
          form[key] = initForm[key];
        }
      }
      axios
        .get(`/api/${pid}`)
        .then((res) => {
          const data = res.data;
          console.log(data, form);
          const sortedProduct = sortDemand(data, form);
          return Promise.all(
            sortedProduct.map((item) =>
              axios
                .get(`/api/restock/${pid}`, { params: { item } })
                .then((res) => res.data)
            )
          );
        })
        .then((res) =>
          setRestockState((prev) => ({
            ...prev,
            restock: res,
            status: "succeeded",
          }))
        )
        .catch((err) => {
          console.log(err);
          const data = err.response.data;
          setRestockState((prev) => ({
            ...prev,
            error: data.errorMessage,
            status: "failed",
          }));
        });
    }
  }, [pid, color, size]);

  return { restockState };
}
