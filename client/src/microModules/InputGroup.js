import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputGroup = ({
  name,
  placeholder,
  value,
  //   label,
  error,
  //  info,
  //   type,
  icon,
  type,
  onChange
  //   disabled
}) => {
  return (
    <div className="input-group mb-5">
      <div className="input-group-prepend">
        <span className="input-group-text bg-success text-white">
          <i className={icon} />
        </span>
      </div>
      <input
        // type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        // disabled={disabled}
      />
      {/* {info && <small className="form-text text-warning">{info}</small>} */}
      {error && <div className="valid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.Prototype = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string
  //   disabled: PropTypes.string,
  //   type: PropTypes.string.isRequired,
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
