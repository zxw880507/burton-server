import SimpleAccordion from "../../components/SimpleAccordion";
import AddFetch from "../../components/AddFetch";
import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductFetchingList,
  productFetchingState,
  updateFetchingList,
} from "../../store/features/productFetchingSlice";
import {
  authState,
  getSession,
  setLogout,
} from "../../store/features/authSlice";
import { useRouter } from "next/router";
// import Pusher from "pusher-js";
import pusher from "../../lib/pusherClient";
// import channel from "../../lib/pusherClient";

export default function UserMain() {
  const dispatch = useDispatch();
  const { productFetchingList } = useSelector(productFetchingState);
  const { status } = useSelector(authState);

  const router = useRouter();
  const { userId } = router.query;

  const handleClick = (event) => {
    dispatch(setLogout())
      .unwrap()
      .then(() => router.push("/"));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(getSession())
        .unwrap()
        .then((res) => {
          if (userId !== res.id) {
            router.push(`${res.id}`);
          }
        })
        .catch(() => router.push("/"));
    }
  }, [dispatch, router, status, userId]);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(getProductFetchingList());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (userId) {
      pusher.bind(userId, (data) => {
        console.log(data);
        dispatch(updateFetchingList(data));
      });
    }
    return () => {
      pusher.disconnect();
    };
  }, [dispatch, userId]);
  return status === "succeeded" ? (
    <Container
      maxWidth="md"
      sx={{
        minWidth: 320,
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
          <Button color="inherit" onClick={handleClick}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ width: "100%" }}>
        {productFetchingList.map((el, index) => (
          <SimpleAccordion key={index} fetchingData={el} mode="EDIT" />
        ))}
        <AddFetch mode="ADD" />
      </div>
    </Container>
  ) : null;
}
