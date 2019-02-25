import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../microModules/setAuthToken";
import jwt_decode from "jwt-decode";

//REGISTER
export const registerUser = (userData, history) => dispatch => {
  //KẾT NỐI VÓI BACKEND - DB
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      // console.log(err.response.data);
      // this.setState({ errors: err.response.data });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
  //END KẾT NỐI VÓI BACKEND - DB
};

//LOGIN
export const loginUser = userData => dispatch => {
  //KẾT NỐI VÓI BACKEND - DB
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //  LƯU VÀO LOCALSTORAGE
      const { token } = res.data;
      //SAVE
      localStorage.setItem("jwtToken", token);
      // ĐẶT TOKEN LÀ KEY XÁC THỰC
      setAuthToken(token);
      // SỬ DỤNG DECODE GIẢI MÃ
      const decoded = jwt_decode(token);
      // console.log(decoded);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
  //END KẾT NỐI VÓI BACKEND - DB
};

export const setCurrentUser = decode => {
  return {
    type: SET_CURRENT_USER,
    payload: decode
  };
};

// LOGOUT
export const logoutUser = () => dispatch => {
  // XÓA TOKEN KHỎI LOCALSTORES
  localStorage.removeItem("jwtToken");
  // XÓA XÁC THỰC KHỎI CÁC REQUES
  setAuthToken(false);
  // XÓA USER ĐÃ ĐƯỢC XÁC THỰC
  dispatch(setCurrentUser({}));
};
