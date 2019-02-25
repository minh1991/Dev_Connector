import axios from "axios";

const setAuthToken = token => {
  //https://github.com/axios/axios
  if (token) {
    // SỬ DỤNG CHO CÁC LẦN REQUEST
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // XÓA XÁC THỰC
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
