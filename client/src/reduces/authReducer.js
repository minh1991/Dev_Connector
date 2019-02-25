import { SET_CURRENT_USER } from "../action/types";
import isEmpty from "../validations/isEmpty";

// trạng thái của State của Redux
const initialState = {
  authenticated: false,
  user: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
    //   break;
  }
};
