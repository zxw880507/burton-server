import { Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import useRestock from "../../lib/hooks/useRestock";

export default function Restock() {
  const router = useRouter();
  const { restockState } = useRestock(router.query);
  const { restock, status, error } = restockState;

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {status === "failed" && (
        <Typography
          variant="h1"
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          {error}
        </Typography>
      )}
      {status === "succeeded" &&
        restock.map((product, index) => {
          return (
            <ul
              key={index}
              style={{ border: "1px solid #000", margin: "1rem 0" }}
            >
              {Object.keys(product).map((key, index) => {
                return (
                  <li
                    key={index}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "3fr 9fr",
                      margin: "1rem 0",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ textAlign: "center" }}>{key}</span>
                    <span>{product[key]}</span>
                  </li>
                );
              })}
            </ul>
          );
        })}
    </Container>
  );
}
