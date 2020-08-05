import { combineReducers } from "redux";
import { buycoinsReducer } from "./buycoinsReducer";

const reducer = combineReducers({
  coins: buycoinsReducer,
});

export default reducer;
