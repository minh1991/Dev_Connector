import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "./../../validations/isEmpty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-3">
            <img className="rounded-circle" src={profile.user.avatar} alt="" />
          </div>
          <div className="col-lg-5 col-md-8 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{" "}
              {isEmpty(profile.company) ? null : <span>{profile.company}</span>}
            </p>
            <p>
              {" "}
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-success">
              Chi Tiết
            </Link>
          </div>
          <div className="col-md-4 d-none d-lg-block">
            <h4>Skill</h4>
            <ul className="list-group">
              {profile.skills.slice(0, 5).map((skill, index) => (
                <li className="list-group-item" key={index}>
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
