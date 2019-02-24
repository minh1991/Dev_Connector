const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!isEmpty(data.name)) {
    data.name = data.name;
  } else {
    data.name = "";
  }
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
  if (!isEmpty(data.password2)) {
    data.password2 = data.password2;
  } else {
    data.password2 = "";
  }

  // // VALIDATE NAME
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "tên đăng ký phải dài từ 2 ký tự đến 30 ký tự";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Tên đăng ký không được bỏ trống";
  }
  // // END VALIDATE NAME

  // // VALIDATE EMAIL
  if (!validator.isEmail(data.email)) {
    // console.log(data.email);
    errors.email = "Email không hợp lệ";
  }
  if (validator.isEmpty(data.email)) {
    // console.log(data.email);
    errors.email = "Email đăng ký không được bỏ trống";
  }
  // // END VALIDATE EMAIL

  // // VALIDATE PASSWORD
  if (!validator.isLength(data.password, { min: 5, max: 30 })) {
    errors.password = "Password dài từ 5 đến 30 ký tự";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password đăng ký không được bỏ trống";
  }
  // // END VALIDATE PASSWORD

  // // VALIDATE PASSWORD CONFIRM
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Password Confirm phải trùng với Password";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Password Confirm đăng ký không được bỏ trống";
  }
  // // END VALIDATE PASSWORD CONFIRM

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
