import { useState, useEffect } from "react";
import {
  productMapping,
  getFormByCheckbox,
  getFormByExistingData,
} from "../../utils/helpers";
import axios from "axios";

export default function useForm(props) {
  const { pid, fetchingData } = props;
  const [productName, setProductName] = useState("");
  const [checkbox, setCheckbox] = useState(null);
  const [form, setForm] = useState(null);
  const [fetchConfig, setFetchConfig] = useState(
    fetchingData
      ? {
          interval: fetchingData.interval,
          phoneNumber: fetchingData.phoneNumber,
          email: fetchingData.email,
        }
      : {
          interval: "",
          phoneNumber: "",
          email: "",
        }
  );

  const handleCheckbox = ({ label, value }) => {
    const index = form[label].findIndex((el) => el === value);
    const copyArr = [...form[label]];
    if (index === -1) {
      copyArr.push(value);
      setForm((prev) => ({
        ...prev,
        [label]: copyArr,
      }));
    } else {
      copyArr.splice(index, 1);
      setForm((prev) => ({
        ...prev,
        [label]: copyArr,
      }));
    }
  };

  const handleConfig = (label, value) => {
    setFetchConfig((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const resetFetchData = (checkbox, fetchingData) => {
    const prevForm = getFormByExistingData(checkbox, fetchingData);
    setForm(prevForm);
    setFetchConfig({
      interval: fetchingData.interval,
      phoneNumber: fetchingData.phoneNumber,
      email: fetchingData.email,
    });
  };
  useEffect(() => {
    if (pid) {
      axios.get(`/api/${pid}`).then((res) => {
        const product = res.data;
        const newCheckbox = productMapping(product);
        if (product[0]) {
          setProductName(product[0].name);
        }
        setCheckbox(newCheckbox);
        const newForm = fetchingData
          ? getFormByExistingData(newCheckbox, fetchingData)
          : getFormByCheckbox(newCheckbox);
        setForm(newForm);
      });
    }
  }, [pid, fetchingData]);

  return {
    checkbox,
    form,
    productName,
    handleCheckbox,
    fetchConfig,
    handleConfig,
    resetFetchData,
  };
}
