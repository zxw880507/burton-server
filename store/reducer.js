import { combineReducers } from "redux";
import productReducer from "./features/productSlice";
import demandReducer from "./features/demandSlice";
import phoneReducer from "./features/phoneSlice";
import emailReducer from "./features/emailSlice";
import restockReducer from "./features/restockSlice";
import productFetchingReducer from "./features/productFetchingSlice";
import authReducer from "./features/authSlice";

const appReducer = combineReducers({
  productState: productReducer,
  demandState: demandReducer,
  phoneState: phoneReducer,
  emailState: emailReducer,
  restockState: restockReducer,
  productFetchingState: productFetchingReducer,
  authState: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
