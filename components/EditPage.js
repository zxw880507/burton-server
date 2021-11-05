import { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, productState } from "../store/features/productSlice";
import { checkboxState, getCheckbox } from "../store/features/checkboxSlice";
import CheckBoxGroup from "./CheckBoxGroup";
import { setFormState, formState } from "../store/features/formSlice";
import { toggleMode, modeState } from "../store/features/modeSlice";
import { getPhoneNumber } from "../store/features/phoneSlice";
import { getEmail } from "../store/features/emailSlice";
import { useRouter } from "next/router";
import { fetchRestock } from "../store/features/restockSlice";

export default function EditPage(props) {
  const { pid, handleChange, mode, setDisabled } = props;
  const router = useRouter();
  const [interval, setInterval] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { checkbox, status, error } = useSelector(checkboxState);
  const { product } = useSelector(productState);
  const { form } = useSelector(formState);
  const unselected = (form) => {
    const keyArr = Object.keys(form);
    return !(keyArr.length && keyArr.every((key) => form[key].length));
  };

  useEffect(() => {
    if (pid) {
      dispatch(getProductById(pid)).then(() =>
        dispatch(getCheckbox())
          .unwrap()
          .then(() => dispatch(setFormState()))
      );
    }
  }, [pid, dispatch]);

  useEffect(() => {
    if (setDisabled) {
      setDisabled(unselected(form));
    }
  }, [form, setDisabled]);

  return (
    <Grid>
      <Typography
        variant="h6"
        sx={{ marginBottom: "1.5rem", color: "tomato", fontWeight: "600" }}
      >
        {product[0] ? product[0].name : ""}
      </Typography>
      {Object.keys(checkbox).map((key, index) => (
        <CheckBoxGroup key={index} label={key} values={checkbox[key]} />
      ))}
      <div style={{ marginTop: "1rem" }}>
        <Button
          variant="contained"
          sx={{
            marginRight: "2rem",
            bgcolor: "green",
            opacity: 0.8,
            "&:hover": {
              bgcolor: "green",
              opacity: 1,
            },
          }}
          disabled={unselected(form)}
          onClick={() => {
            router
              .push(`${router.asPath}/query`)
              .then(dispatch(fetchRestock(pid)));
          }}
        >
          check arriving
        </Button>
      </div>
      <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
        <TextField
          id="fetch-interval"
          label="Fetch interval (秒)"
          type="number"
          variant="standard"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
        />
        <TextField
          id="phone-number"
          label="Phone number (optional)"
          type="tel"
          variant="standard"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <TextField
          id="email"
          label="Email (optional)"
          type="email"
          variant="standard"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      {mode === "EDIT" && (
        <Grid container sx={{ marginTop: "2rem" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginRight: "2rem" }}
            disabled={unselected(form)}
            onClick={() => {
              dispatch(toggleMode());
              dispatch(getPhoneNumber(phoneNumber));
              dispatch(getEmail(email));
            }}
          >
            submit
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleChange("CANCEL")}
          >
            back
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
