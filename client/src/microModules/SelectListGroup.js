import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({
  name,
  //   placeholder,
  value,
  //   label,
  error,
  info,
  //   type,
  onChange,
  //   disabled
  options
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group mb-5">
      <select
        // type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        // placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        // disabled={disabled}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-warning">{info}</small>}
      {error && <div className="valid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.Prototype = {
  name: PropTypes.string.isRequired,
  //   type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  //   disabled: PropTypes.string,
  //   placeholder: PropTypes.string,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
