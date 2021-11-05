import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditPage from "./EditPage";

export default function SimpleAccordion(props) {
  const { fetchingData, mode } = props;
  const { productId, status } = fetchingData;
  const [expanded, setExpanded] = React.useState(false);
  const [editForm, setEditForm] = React.useState({})

  const handleChange = (action) => (event) => {
    switch (action) {
      case "EDIT":
        setExpanded(true);
        break;
      case "CANCEL":
        setExpanded(false);
        break;
      default:
        break;
    }
  };
  return (
    <div style={{ marginTop: ".5rem" }}>
      <Accordion expanded={expanded} sx={{ bgcolor: "#cccccc36" }}>
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            "& .MuiAccordionSummary-content": {
              display: "grid",
              gridTemplateColumns: "3fr 3fr 4fr",
              alignItems: "center",
            },
          }}
        >
          <Typography sx={{ flexShrink: 0, textAlign: "center" }}>
            {productId}
          </Typography>
          <Typography sx={{ color: "text.secondary", textAlign: "center" }}>
            {status}
          </Typography>
          <div>
            <IconButton color="info" aria-label="start">
              <PlayCircleOutlineIcon />
            </IconButton>
            <IconButton color="warning" aria-label="stop">
              <StopCircleIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="edit"
              onClick={handleChange("EDIT")}
              disabled={expanded}
            >
              <EditIcon />
            </IconButton>
            <IconButton color="error" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <EditPage pid={productId} handleChange={handleChange} mode={mode} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
