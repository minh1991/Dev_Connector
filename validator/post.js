const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostInput(data) {
  let errors = {};

  if (!isEmpty(data.text)) {
    data.text = data.text;
  } else {
    data.text = "";
  }

  // // VALIDATE
  if (!validator.isLength(data.text, { min: 2, max: 400 })) {
    errors.text = "Comment từ 2 đến 400 ký tự";
  }
  if (validator.isEmpty(data.text)) {
    errors.text = "Comment không được bỏ trống";
  }

  // // END VALIDATE

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
