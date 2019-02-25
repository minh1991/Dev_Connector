import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../action/authAction";
// import classnames from "classnames";

import TextFieldGroup from "./../../microModules/TextFieldGroup";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(even) {
    this.setState({
      [even.target.name]: even.target.value
    });
  }

  onSubmit(even) {
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    even.preventDefault();

    // console.log(userData);
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login pb-5 pt-3" id="login">
        {/* Login */}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center text-warning big-title">
                Log In
              </h1>
              <p className="lead text-center text-warning small-title">
                Đăng nhập bằng tài khoản đã đăng ký
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.pasword}
                  onChange={this.onChange}
                  error={errors.password}
                />

                {/* THAY THẾ EMAIL BẰNG TextFieldGroup */}
                {/* <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="valid-feedback">{errors.email}</div>
                  )}
                </div> */}

                {/* THAY THẾ PASSWORD BẰNG TextFieldGroup */}
                {/* <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.pasword}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="valid-feedback">{errors.password}</div>
                  )}
                </div> */}
                <input
                  type="submit"
                  className="btn btn-success btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
