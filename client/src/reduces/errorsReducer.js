import { GET_ERRORS } from "../action/types";

// trạng thái của State của Redux
const initialState = {
  authenticated: false,
  user: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
    //   break;
  }
};
