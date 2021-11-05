import React from "react";
import {
  IconButton,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Stepper from "./Stepper";
export default function AddFetch(props) {
  const { mode } = props;
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Accordion expanded={expanded} sx={{ bgcolor: "#fff", marginTop: ".5rem" }}>
      <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => setExpanded(true)}>
            <AddCircleIcon />
          </IconButton>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Stepper mode={mode} />
      </AccordionDetails>
    </Accordion>
  );
}
