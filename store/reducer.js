import { combineReducers } from "redux";
import phoneReducer from "./features/phoneSlice";
import emailReducer from "./features/emailSlice";
import restockReducer from "./features/restockSlice";
import productFetchingReducer from "./features/productFetchingSlice";
import authReducer from "./features/authSlice";

const appReducer = combineReducers({
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
