const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  if (!isEmpty(data.title)) {
    data.title = data.title;
  } else {
    data.title = "";
  }
  if (!isEmpty(data.company)) {
    data.company = data.company;
  } else {
    data.company = "";
  }
  if (!isEmpty(data.from)) {
    data.from = data.from;
  } else {
    data.from = "";
  }

  // // VALIDATE
  if (validator.isEmpty(data.title)) {
    errors.title = "Công việc không được bỏ trống";
  }
  if (validator.isEmpty(data.company)) {
    errors.company = "Công ty đã làm không được bỏ trống";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "Thời gian không được bỏ trống";
  }
  // // END VALIDATE

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
