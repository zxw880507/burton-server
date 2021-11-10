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
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditPage from "./EditPage";
import {
  deleteProductFetch,
  fetchProduct,
} from "../store/features/productFetchingSlice";
import { useDispatch } from "react-redux";

export default function SimpleAccordion(props) {
  const { fetchingData, mode } = props;
  const { id, productId, status, productName } = fetchingData;
  const [expanded, setExpanded] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: ".5rem" }}>
      <Accordion
        expanded={expanded}
        sx={{ bgcolor: status === "SUCCEEDED" ? "#4caf50" : "#cccccc36" }}
      >
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
            sx={{
              flexShrink: 0,
              textAlign: "center",
              fontSize: ".9rem",
              color: status === "SUCCEEDED" ? "white" : "inherit",
            }}
          >
            {productName}
          </Typography>
          <Typography
            sx={{
              color: status === "SUCCEEDED" ? "white" : "text.secondary",
              textAlign: "center",
              fontSize: ".8rem",
            }}
          >
            {status}
          </Typography>
          <div
            style={{
              // display: "flex",
              // justifyContent: "space-evenly",
              display: "grid",
              gridTemplateColumns: "3fr 1fr",
              alignItems: "center",
            }}
          >
            {status !== "SUCCEEDED" ? (
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <IconButton
                  color="info"
                  aria-label="start"
                  disabled={expanded || status === "FETCHING"}
                  onClick={() =>
                    dispatch(fetchProduct({ id, action: "START" }))
                  }
                >
                  <PlayCircleOutlineIcon />
                </IconButton>
                <IconButton
                  color="warning"
                  aria-label="stop"
                  disabled={status === "IDLE"}
                  onClick={() => dispatch(fetchProduct({ id, action: "STOP" }))}
                >
                  <StopCircleIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="edit"
                  onClick={() => setExpanded(true)}
                  disabled={expanded || status === "FETCHING"}
                >
                  <EditIcon />
                </IconButton>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <IconButton
                  color="primary"
                  aria-label="expand"
                  onClick={() => setExpanded(true)}
                  disabled={expanded || status === "FETCHING"}
                >
                  {expanded ? (
                    <ExpandLessIcon />
                  ) : (
                    <AspectRatioIcon sx={{ color: "white" }} />
                  )}
                </IconButton>
              </div>
            )}
            <div>
              <IconButton
                color="error"
                aria-label="delete"
                onClick={() => {
                  dispatch(deleteProductFetch(id));
                }}
                disabled={status === "FETCHING"}
              >
                <DeleteIcon />
              </IconButton>
            </div>
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
