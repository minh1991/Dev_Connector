import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "./../../action/profileAction";
import LoadingLac from "../../microModules/LoadingLac";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  deleteAccountClick(event) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const userNameStyle = {
      textDecoration: "underline",
      fontWeight: "400"
    };

    let dashboardContent;
    if (profile === null || loading) {
      // dashboardContent = 'Loading'
      dashboardContent = <LoadingLac />;
    } else {
      // dashboardContent = <h4>HELLO</h4>;
      // KIỂM TRA USER ĐÃ ĐĂNG NHẬP, ĐÃ CÓ DỮ DIỆU
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-warning">
              Chào{" "}
              <Link
                to={`/profile/${profile.handle}`}
                className="lead text-warning font-italic"
                style={userNameStyle}
              >
                {user.name}
              </Link>
            </p>

            <DashboardActions />

            {/* NỘI DUNG HỌC VẤN VÀ KINH NGHIỆM */}
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            {/* NÚT DELETE */}
            <div style={{ marginBottom: "60px" }}>
              <button
                className="btn btn-warning text-danger"
                onClick={this.deleteAccountClick.bind(this)}
              >
                Delete Account
              </button>
            </div>
          </div>
        );
      } else {
        //KHÔNG CÓ PROFILE
        dashboardContent = (
          <div>
            <p className="lead text-warning">Chào {user.name}</p>
            <p className="lead text-warning font-weight-bold font-italic">
              Bạn chưa có Profile của riêng mình, hãy tạo nhé.....
            </p>
            <Link to="/create-profile" className="btn btn-lg btn-success mr-3">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard" id="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-warning big-title font-weight-bold">
                Dashboard
              </h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
