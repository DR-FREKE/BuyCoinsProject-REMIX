import { REQUEST_SUCCESS, REQUEST_FAILED } from "../action/action.types";

const initialState = {
  item: [],
};

export const buycoinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SENDING_REQUEST":
      return {
        ...state,
        msg: "sending...",
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        item: action.payload,
      };
    case REQUEST_FAILED:
      return {
        ...state,
        failed: action.payload,
      };
    default:
      return state;
  }
};
