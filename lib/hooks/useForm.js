import { useState, useEffect } from "react";
import { productMapping, getFormByCheckbox } from "../../utils/helpers";
import axios from "axios";

export default function useForm(props) {
  const { pid } = props;
  const [productName, setProductName] = useState("");
  const [checkbox, setCheckbox] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (pid) {
      axios.get(`/api/${pid}`).then((res) => {
        const product = res.data;
        const newCheckbox = productMapping(product);
        if (product[0]) {
          setProductName(product[0].name);
        }
        setCheckbox(newCheckbox);
        const newForm = getFormByCheckbox(newCheckbox);
        setForm(newForm);
      });
    }
  }, [pid]);

  return { checkbox, form, productName };
}
