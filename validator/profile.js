const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  // console.log(data);

  if (!isEmpty(data.handle)) {
    data.handle = data.handle;
  } else {
    data.handle = "";
  }
  if (!isEmpty(data.status)) {
    data.status = data.status;
  } else {
    data.status = "";
  }
  if (!isEmpty(data.skills)) {
    data.skills = data.skills;
  } else {
    data.skills = "";
  }

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Tên profile từ 2 đến 40 ký tự";
  }
  if (validator.isEmpty(data.handle)) {
    errors.handle = "Tên profile không bỏ trống";
  }
  if (validator.isEmpty(data.status)) {
    errors.status = "Status không bỏ trống";
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = "Skills không bỏ trống";
  }

  if (!isEmpty(data.webside)) {
    if (!validator.isURL(data.webside)) {
      errors.webside = "Webside sai cú pháp";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Link Youtube sai cú pháp";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Link Twitter sai cú pháp";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Link Facebook sai cú pháp";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Link Linkedin sai cú pháp";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Link instagram sai cú pháp";
    }
  }

  if (
    validator.isEmpty(data.youtube) &&
    validator.isEmpty(data.twitter) &&
    validator.isEmpty(data.facebook) &&
    validator.isEmpty(data.linkedin) &&
    validator.isEmpty(data.instagram)
  ) {
    errors.facebook = "Bạn phải nhập tối thiểu một mạng xã hội";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
