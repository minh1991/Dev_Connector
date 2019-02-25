import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../action/authAction";
import TextFieldGroup from "./../../microModules/TextFieldGroup";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    even.preventDefault();
    // console.log(newUser);

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register pb-5 pt-3" id="register">
        {/* Register */}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center text-warning big-title">
                Register
              </h1>
              <p className="lead text-center text-warning small-title">
                Tạo tài khoản
              </p>
              <form onSubmit={this.onSubmit}>
                {/* NAME */}
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                {/* THAY THẾ NAME BẰNG TextFieldGroup */}
                {/* <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    // required
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="valid-feedback">{errors.name}</div>
                  )}
                </div> */}
                <a
                  style={{ fontWeight: "500", width: "25%" }}
                  className="btn btn-warning mb-1 text-danger font-italic"
                  href="https://vi.gravatar.com/"
                  role="button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gravatar
                </a>
                {/* EMAIL */}
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="Avatar của bạn sẽ dựa trên Email mà bạn đã đăng ký ở
                  https://vi.gravatar.com/"
                />

                {/* PASSWORD */}
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.pasword}
                  onChange={this.onChange}
                  error={errors.password}
                />
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
                {/* CONFIRM */}
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                {/* THAY THẾ CONFIRM BẰNG TextFieldGroup */}
                {/* <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="valid-feedback">{errors.password2}</div>
                  )}
                </div> */}
                {/* SUBMIT */}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
