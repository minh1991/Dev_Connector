import React, { Component } from "react";
import { connect } from "react-redux";
import Lac from "../../microModules/LoadingLac";
import PropTypes from "prop-types";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../action/profileAction";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles === null || loading) {
      profileItems = <Lac />;
    } else {
      if (Object.keys(profiles).length > 0) {
        profileItems =
          // <h1>Hồ Sơ</h1>;
          profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ));
      } else {
        profileItems = <h2>Chưa có hồ sơ</h2>;
      }
    }

    return (
      <div className="profiles pb-3 pt-3" id="profiles">
        <div className="container ">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center text-warning big-title">
                Developer Profiles
              </h1>
              <p className="lead text-center text-warning small-title">
                Thông tin và kết nối các Developer
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
