import React, { Component } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCertificate from "./ProfileCertificate";
import ProfileGithub from "./ProfileGithub";
import LoadingLac from "../../../microModules/LoadingLac";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProfileByHandle } from "../../../action/profileAction";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;

    let profileContent;

    if (profile === null || loading) {
      profileContent = <LoadingLac className="row col-md-12" />;
    } else {
      profileContent = (
        <div className="col-md-12">
          <div className="row">
            <div className="col-6">
              <Link
                to="/profiles"
                className="btn btn-success mt-3 mb-3 float-left"
              >
                Back Profile List
              </Link>
            </div>
          </div>
          <div className="col-6" />
          <div className="row">
            <ProfileHeader profile={profile} />
          </div>
          <ProfileAbout profile={profile} />
          <ProfileCertificate
            experience={profile.experience}
            education={profile.education}
          />
          {profile.gitHupUserName ? (
            <ProfileGithub username={profile.gitHupUserName} />
          ) : null}
        </div>
      );
    }

    return (
      <div className="profile" id="profile">
        <div className="container">
          <div className="row">{profileContent}</div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
