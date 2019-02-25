import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextareaGroup = ({
  name,
  placeholder,
  value,
  //   label,
  error,
  info,
  //   type,
  onChange,
  style
  //   disabled
}) => {
  return (
    <div className="form-group mb-5">
      <textarea
        // type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        style={style}
        value={value}
        onChange={onChange}
        // disabled={disabled}
      />
      {info && <small className="form-text text-warning">{info}</small>}
      {error && <div className="valid-feedback">{error}</div>}
    </div>
  );
};

TextareaGroup.Prototype = {
  name: PropTypes.string.isRequired,
  //   type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  style: PropTypes.string,
  error: PropTypes.string,
  //   disabled: PropTypes.string,
  placeholder: PropTypes.string
};

export default TextareaGroup;
