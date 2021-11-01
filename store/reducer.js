import { combineReducers } from "redux";
import productReducer from "./features/productSlice";
import checkboxReducer from "./features/checkboxSlice";
import formReducer from "./features/formSlice";
import modeReducer from "./features/modeSlice";
import demandReducer from "./features/demandSlice";
import phoneReducer from "./features/phoneSlice";
import emailReducer from "./features/emailSlice";
import restockReducer from "./features/restockSlice";

const appReducer = combineReducers({
  productState: productReducer,
  checkboxState: checkboxReducer,
  formState: formReducer,
  modeState: modeReducer,
  demandState: demandReducer,
  phoneState: phoneReducer,
  emailState: emailReducer,
  restockState: restockReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
