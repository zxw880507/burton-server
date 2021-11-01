import { Container, Button, Fab } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { demandState } from "../store/features/demandSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function Result() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { demand } = useSelector(demandState);
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {demand.map((product, index) => {
        return (
          <ul
            key={index}
            style={{ border: "1px solid #000", margin: "1rem 0" }}
          >
            {Object.keys(product).map((key, index) => {
              if (
                ["id", "name", "color", "size", "addToCartLink"].includes(key)
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
      <div
        style={{
          position: "fixed",
          bottom: "5%",
          right: "5%",
        }}
      >
        <Fab
          variant="extended"
          onClick={() => {
            router.push("/").then(() => dispatch({ type: "RESET" }));
          }}
        >
          <HomeIcon />
        </Fab>
      </div>
    </Container>
  );
}
