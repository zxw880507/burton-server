import { useState, useEffect } from "react";
import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material";
import AuthForm from "../components/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { authState, getSession } from "../store/features/authSlice";
import router from "next/router";

function HomePage() {
  const [formType, setFormType] = useState("LOGIN");
  const dispatch = useDispatch();
  const { status } = useSelector(authState);

  const handleClick = (type) => (event) => {
    setFormType(type);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(getSession())
        .unwrap()
        .then((res) => router.push(`${res.id}`))
        .catch((e) => console.log(e));
    }
  }, [dispatch, status]);
  return status === "failed" ? (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: ".5rem",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BurtonStock
          </Typography>
          <Button
            color="inherit"
            onClick={handleClick("SIGNUP")}
            sx={{ opacity: formType === "SIGNUP" ? "1" : ".2" }}
          >
            Signup
          </Button>
          <Button
            color="inherit"
            onClick={handleClick("LOGIN")}
            sx={{ opacity: formType === "LOGIN" ? "1" : ".2" }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <AuthForm formType={formType} />
    </Container>
  ) : null;
}

export default HomePage;
