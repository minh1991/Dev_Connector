const isEmpty = value => {
  return (
    // nếu giá trị đầu vào không xác định
    value === undefined ||
    // nếu giá trị đầu vào rỗng hoặc không tồn tại
    value === null ||
    // nếu đầu vào là một object hoặc một array (vì typèO của array là obj) thì số ký tự bằng 0
    (typeof value === "object" && Object.keys(value).length === 0) ||
    //nếu đầu vào là một string thì số ký tự bằng 0
    (typeof value === "string" && value.trim().length === 0)
  );
};

module.exports = isEmpty;
