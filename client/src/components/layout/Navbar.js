import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../action/authAction";

class Navbar extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        {/* <li className="nav-item">
          <Link className="nav-link text-warning" to="/dashboard">
            Dashboard
          </Link>
        </li> */}
        <li className="nav-item" style={{ display: "contents" }}>
          <Link
            className="nav-link text-warning"
            to="/feed"
            style={{ margin: "auto" }}
          >
            Chat-Room
          </Link>
          <Link
            className="nav-link text-warning"
            to="/dashboard"
            style={{ margin: "auto" }}
          >
            Dashboard
          </Link>
          <Link
            to=""
            className="nav-link text-warning"
            onClick={this.onLogoutClick.bind(this)}
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "30px", marginRight: "10px" }}
            />
            LogOut
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link text-warning" to="/register">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-warning" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <div id="menu">
        {/* MENU */}
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand text-warning" to="/">
              HeloDev
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav " style={{ display: "contents" }}>
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/profiles">
                    {" "}
                    Profiles Developer
                  </Link>
                </li>
              </ul>
              {/* NẾU CHƯA ĐĂNG NHẬP THÌ SẼ HIỆN REGIS / LOGIN. NẾU ĐÃ ĐĂNG NHẬP RỒI SẼ HIỆN ẢNH + LOGOUT */}
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.PropTypess = {
  logoutUser: PropTypes.func.isRequired,
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
  { logoutUser }
)(Navbar);
