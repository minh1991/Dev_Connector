import { GET_PROFILE, PROFILE_LOADING, GET_PROFILES } from "../action/types";

// trạng thái của State của Redux
const initialState = {
  profile: null,
  profiles: null,
  loading: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    default:
      return state;
    //   break;
  }
};
