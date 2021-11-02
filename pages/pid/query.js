import { Container, Typography, Fab } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { restockState, restockReset } from "../../store/features/restockSlice";
import { useDispatch } from "react-redux";

export default function Result() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { restock, status, error } = useSelector(restockState);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {status === "failed" && <Typography variant="h1">{error}</Typography>}
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
                      gridTemplateColumns: "4fr 8fr",
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
            router.back();
            dispatch(restockReset());
          }}
        >
          <HomeIcon />
        </Fab>
      </div>
    </Container>
  );
}
