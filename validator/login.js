const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (!isEmpty(data.email)) {
    data.email = data.email;
  } else {
    data.email = "";
  }
  if (!isEmpty(data.password)) {
    data.password = data.password;
  } else {
    data.password = "";
  }

  // // VALIDATE EMAIL
  if (!validator.isEmail(data.email)) {
    // console.log(data.email);
    errors.email = "Email không hợp lệ";
  }
  if (validator.isEmpty(data.email)) {
    // console.log(data.email);
    errors.email = "Email đăng nhập không được bỏ trống";
  }
  // // END VALIDATE EMAIL

  // // VALIDATE PASSWORD
  if (validator.isEmpty(data.password)) {
    errors.password = "Password đăng nhập không được bỏ trống";
  }
  // // END VALIDATE PASSWORD

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
