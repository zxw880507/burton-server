import { useState } from "react";
import { Container, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";

function HomePage() {
  const router = useRouter();
  const [input, setInput] = useState("");

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          label="product id"
          variant="standard"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          variant="outlined"
          style={{ marginLeft: "1rem" }}
          onClick={() => {
            router.push(`/${input}`);
          }}
        >
          Confirm
        </Button>
      </div>
    </Container>
  );
}

export default HomePage;
