import { Container, Button } from "@mui/material";
import Link from "next/link";
export default function Result(props) {
  const { demandItem } = props;
  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {demandItem.map((product, index) => {
        return (
          <ul
            key={index}
            style={{ border: "1px solid #000", margin: "1rem 0" }}
          >
            {Object.keys(product).map((key, index) => {
              if (
                ["itemId", "name", "color", "size", "addToCartLink"].includes(
                  key
                )
              ) {
                return (
                  <li
                    key={index}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "4fr 8fr",
                      margin: "1rem 0",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ textAlign: "center" }}>{key}</span>
                    {key === "addToCartLink" ? (
                      <Button variant="contained" style={{ width: "60%" }}>
                        <Link
                          href={`https://www.burton.com${product[key]}.html`}
                        >
                          <a target="_blank">Add Cart</a>
                        </Link>
                      </Button>
                    ) : (
                      <span>{product[key]}</span>
                    )}
                  </li>
                );
              }
            })}
          </ul>
        );
      })}
    </Container>
  );
}
