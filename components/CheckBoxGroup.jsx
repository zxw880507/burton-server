import { Grid, FormControlLabel, Checkbox, Typography } from "@mui/material";

export default function CheckBoxGroup(props) {
  const { label, values, form, handleCheckbox } = props;

  return (
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
                    handleCheckbox({ label, value });
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
  );
}
