import SimpleAccordion from "../../components/SimpleAccordion";
import AddFetch from "../../components/AddFetch";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductFetchingList,
  productFetchingState,
} from "../../store/features/productFetchingSlice";
export default function UserMain() {
  const dispatch = useDispatch();
  const { productFetchingList, status } = useSelector(productFetchingState);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getProductFetchingList());
    }
  }, [dispatch, status]);
  return (
    <Container
      maxWidth="md"
      sx={{
        minWidth: "320",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "2rem auto",
      }}
    >
      <div style={{ width: "100%" }}>
        {productFetchingList.map((el, index) => (
          <SimpleAccordion key={index} fetchingData={el} mode="EDIT" />
        ))}
        <AddFetch mode="ADD" />
      </div>
    </Container>
  );
}
