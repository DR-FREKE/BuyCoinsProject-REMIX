import { REQUEST_SUCCESS, REQUEST_FAILED } from "./action.types";
import { makeRequest } from "../../Api/ApiRequest";

export const getCoins = () => async (dispatch) => {
  dispatch({ type: "SENDING_REQUEST" });
  try {
    const data = await makeRequest();
    dispatch({ type: REQUEST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: REQUEST_FAILED, payload: err.message });
  }
};
