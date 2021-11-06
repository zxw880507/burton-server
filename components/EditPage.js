import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  LinearProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import CheckBoxGroup from "./CheckBoxGroup";
import { getPhoneNumber } from "../store/features/phoneSlice";
import { getEmail } from "../store/features/emailSlice";
import { useRouter } from "next/router";
import { fetchRestock } from "../store/features/restockSlice";
import useForm from "../lib/hooks/useForm";

export default function EditPage(props) {
  const { pid, handleChange, mode, setDisabled, setFetchForm, fetchingData } =
    props;
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    checkbox,
    form,
    productName,
    handleCheckbox,
    fetchConfig,
    handleConfig,
  } = useForm({ pid, fetchingData });

  const unselected = (form) => {
    const keyArr = Object.keys(form);
    return !(keyArr.length && keyArr.every((key) => form[key].length));
  };

  useEffect(() => {
    if (setDisabled && form) {
      setDisabled(unselected(form));
    }
  }, [form, setDisabled]);

  useEffect(() => {
    if (setFetchForm && form) {
      setFetchForm({ productId: pid, productName, ...form, ...fetchConfig });
    }
  }, [setFetchForm, form, fetchConfig, pid, productName]);

  return checkbox && form ? (
    <Grid>
      <Typography
        variant="h6"
        sx={{ marginBottom: "1.5rem", color: "tomato", fontWeight: "600" }}
      >
        {productName}
      </Typography>
      {Object.keys(checkbox).map((key, index) => (
        <CheckBoxGroup
          key={index}
          label={key}
          values={checkbox[key]}
          form={form}
          handleCheckbox={handleCheckbox}
        />
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
          value={fetchConfig.interval}
          onChange={(e) => handleConfig("interval", Number(e.target.value))}
        />
        <TextField
          id="phone-number"
          label="Phone number (optional)"
          type="tel"
          variant="standard"
          value={fetchConfig.phoneNumber}
          onChange={(e) => handleConfig("phoneNumber", e.target.value)}
        />
        <TextField
          id="email"
          label="Email (optional)"
          type="email"
          variant="standard"
          value={fetchConfig.email}
          onChange={(e) => handleConfig("email", e.target.value)}
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
  ) : (
    <div style={{ height: "3rem", display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <LinearProgress />
      </Box>
    </div>
  );
}
