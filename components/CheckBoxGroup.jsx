import { Grid, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { handleCheck, formState } from "../store/features/formSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CheckBoxGroup(props) {
  const { label, values } = props;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { form, status } = useSelector(formState);

  useEffect(() => {
    if (status === "initialized") {
      setLoading(false);
    }
  }, [status]);

  return (
    !loading && (
      <>
        <Typography
          style={{
            textTransform: "uppercase",
            fontWeight: "600",
            color: "cornflowerblue",
          }}
          variant="subtitle2"
        >
          {label}
        </Typography>
        <Grid>
          {values.map((value, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    onChange={(e) => {
                      dispatch(handleCheck({ label, value }));
                    }}
                    checked={form[label].includes(value)}
                  />
                }
                label={value}
              />
            );
          })}
        </Grid>
      </>
    )
  );
}
