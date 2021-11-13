import { useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  LinearProgress,
} from "@mui/material";
import Link from "next/link";
import { useDispatch } from "react-redux";
import CheckBoxGroup from "./CheckBoxGroup";
import { fetchRestock } from "../store/features/restockSlice";
import useForm from "../lib/hooks/useForm";
import { serializeForm } from "../utils/helpers";
import { updateProductFetch } from "../store/features/productFetchingSlice";

export default function EditPage(props) {
  const { pid, mode, setDisabled, setFetchForm, fetchingData, setExpanded } =
    props;
  const dispatch = useDispatch();
  const {
    checkbox,
    form,
    productName,
    handleCheckbox,
    fetchConfig,
    handleConfig,
    resetFetchData,
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
        >
          <Link href={`restock/${pid}?${serializeForm(form)}`}>
            <a target="_blank">check arriving</a>
          </Link>
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
              dispatch(
                updateProductFetch({
                  fetchForm: {
                    productId: pid,
                    productName,
                    ...form,
                    ...fetchConfig,
                  },
                  id: fetchingData.id,
                })
              )
                .unwrap()
                .then(() => setExpanded(false));
            }}
          >
            submit
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              setExpanded(false);
              resetFetchData(checkbox, fetchingData);
            }}
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
