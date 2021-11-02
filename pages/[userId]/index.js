import SimpleAccordion from "../../components/SimpleAccordion";
import { Container } from "@mui/material";
import { useEffect } from "react";
export default function UserMain() {
  const arr = [1, 2, 3];
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2em",
      }}
    >
      <div>
        {arr.map((el, index) => (
          <SimpleAccordion key={index} />
        ))}
      </div>
    </Container>
  );
}
