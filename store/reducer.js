import { combineReducers } from "redux";
import productReducer from "./features/productSlice";
import demandReducer from "./features/demandSlice";
import phoneReducer from "./features/phoneSlice";
import emailReducer from "./features/emailSlice";
import restockReducer from "./features/restockSlice";
import productFetchingReducer from "./features/productFetchingSlice";

const appReducer = combineReducers({
  productState: productReducer,
  demandState: demandReducer,
  phoneState: phoneReducer,
  emailState: emailReducer,
  restockState: restockReducer,
  productFetchingState: productFetchingReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
