const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  if (!isEmpty(data.school)) {
    data.school = data.school;
  } else {
    data.school = "";
  }
  if (!isEmpty(data.degree)) {
    data.degree = data.degree;
  } else {
    data.degree = "";
  }
  if (!isEmpty(data.fieldOfStudy)) {
    data.fieldOfStudy = data.fieldOfStudy;
  } else {
    data.fieldOfStudy = "";
  }
  if (!isEmpty(data.from)) {
    data.from = data.from;
  } else {
    data.from = "";
  }
  // // VALIDATE
  if (validator.isEmpty(data.school)) {
    errors.school = "Trường không được bỏ trống";
  }
  if (validator.isEmpty(data.degree)) {
    errors.degree = "Chứng chỉ và bằng cấp không được bỏ trống";
  }
  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Chuyên ngành không được bỏ trống";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "Thời gian from không được bỏ trống";
  }
  // // END VALIDATE

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
