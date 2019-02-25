import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "./../../../validations/isEmpty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    //LISH SKILLS
    const skillsLish = profile.skills.map((skill, index) => (
      <div className="p-3" key={index}>
        <i className="fa fa-check" /> {skill}
      </div>
    ));
    return (
      <div className="row about">
        <div className="col-md-12">
          <div className="card card-body mb-3">
            <h4 className="text-center text-white">Giới thiệu</h4>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{profile.user.name.trim()} Chưa có lời giới thiệu</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h4 className="text-center text-white">Skill</h4>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {/* <div className="p-3">
                  <i className="fa fa-check" /> HTML
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> CSS
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> JavaScript
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> Python
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> C#
                </div> */}
                {skillsLish}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
