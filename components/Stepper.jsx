import { useState } from "react";
import {
  TextField,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
} from "@mui/material";
import EditPage from "./EditPage";
import { addProductFetch } from "../store/features/productFetchingSlice";
import { useDispatch } from "react-redux";

export default function VerticalLinearStepper(props) {
  const { setExpanded } = props;
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [pidInput, setPidInput] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [fetchForm, setFetchForm] = useState({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    dispatch(addProductFetch(fetchForm))
      .unwrap()
      .then(() => {
        setExpanded(false);
        setActiveStep(0);
        setPidInput("");
      });
  };

  return (
    <Box sx={{ width: "100%", padding: ".5rem 1rem" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step
          sx={{
            ".MuiStepIcon-text": {
              fontSize: ".5rem",
            },
          }}
        >
          <StepLabel>Enter a Product ID</StepLabel>
          <StepContent>
            <TextField
              label="product id"
              variant="standard"
              value={pidInput}
              onChange={(e) => setPidInput(e.target.value)}
            />
            <Box sx={{ mb: 2 }}>
              <div>
                <Button
                  disabled={pidInput === ""}
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: "1rem" }}
                >
                  Continue
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>
        <Step
          sx={{
            ".MuiStepIcon-text": {
              fontSize: ".5rem",
            },
          }}
        >
          <StepLabel>Make a Selection</StepLabel>
          <StepContent>
            <EditPage
              mode={props.mode}
              setDisabled={setDisabled}
              setFetchForm={setFetchForm}
              pid={pidInput}
            />
            <Box sx={{ margin: "1rem 0" }}>
              <div>
                <Button
                  disabled={disabled}
                  variant="contained"
                  onClick={handleReset}
                  sx={{ mr: ".5rem" }}
                >
                  Finish
                </Button>
                <Button onClick={handleBack}>Back</Button>
              </div>
            </Box>
          </StepContent>
        </Step>
      </Stepper>
    </Box>
  );
}
