import React, { Component } from "react";
import { Link } from "react-router-dom";

import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div id="landing" className="landing">
        {/* Landing */}
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="mb-4 text-warning big-title">
                  Kết nối anh em TechMaster
                </h1>
                <p className="lead text-warning small-title">
                  Tạo hồ sơ / kết nối và hỗ trợ
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-warning mr-2">
                  Register
                </Link>
                <Link to="/login" className="btn btn-lg btn-danger">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps)(Landing);
