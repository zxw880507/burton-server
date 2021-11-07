import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditPage from "./EditPage";
import { deleteProductFetch } from "../store/features/productFetchingSlice";
import { useDispatch } from "react-redux";

export default function SimpleAccordion(props) {
  const { fetchingData, mode } = props;
  const { id, productId, status, productName } = fetchingData;
  const [expanded, setExpanded] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: ".5rem" }}>
      <Accordion expanded={expanded} sx={{ bgcolor: "#cccccc36" }}>
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            "& .MuiAccordionSummary-content": matches
              ? {
                  display: "grid",
                  gridTemplateColumns: "4fr 3fr 3fr",
                  alignItems: "center",
                }
              : {
                  display: "grid",
                  gridTemplateRows: "1fr 1fr 1fr",
                  alignItems: "center",
                },
          }}
        >
          <Typography
            sx={{ flexShrink: 0, textAlign: "center", fontSize: ".9rem" }}
          >
            {productName}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              textAlign: "center",
              fontSize: ".8rem",
            }}
          >
            {status}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <IconButton color="info" aria-label="start" disabled={expanded}>
              <PlayCircleOutlineIcon />
            </IconButton>
            <IconButton
              color="warning"
              aria-label="stop"
              disabled={status === "IDLE"}
            >
              <StopCircleIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="edit"
              onClick={() => setExpanded(true)}
              disabled={expanded}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              aria-label="delete"
              onClick={() => {
                dispatch(deleteProductFetch(id));
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <EditPage
            pid={productId}
            mode={mode}
            fetchingData={fetchingData}
            setExpanded={setExpanded}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
