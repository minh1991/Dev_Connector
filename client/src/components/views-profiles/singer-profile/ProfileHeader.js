import React, { Component } from "react";
import isEmpty from "../../../validations/isEmpty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    console.log(profile);
    return (
      <div className="col-md-12 profile-header">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img
                className="rounded-circle"
                src={profile.user.avatar}
                alt=" "
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-6 text-center">{profile.user.name}</h1>
            <p className="lead text-center">
              {profile.status} Tại{" "}
              {isEmpty(profile.company) ? null : <span>{profile.company}</span>}
            </p>
            <p
              className="font-italic badge badge-success"
              style={{ fontSize: "0.95rem", fontWeight: "500" }}
            >
              {profile.user.email}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <p>
              {/* MẠNG XÃ HỘI */}
              {isEmpty(profile.webside) ? null : (
                <a
                  className="text-white p-2"
                  href={profile.webside}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-globe fa-2x" />
                </a>
              )}

              {isEmpty(profile.social.facebook) ? null : (
                <a
                  className="text-white p-2"
                  href={profile.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook fa-2x" />
                </a>
              )}

              {isEmpty(profile.social.youtube) ? null : (
                <a
                  className="text-white p-2"
                  href={profile.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube fa-2x" />
                </a>
              )}

              {isEmpty(profile.social.twitter) ? null : (
                <a
                  className="text-white p-2"
                  href={profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter fa-2x" />
                </a>
              )}

              {isEmpty(profile.social.instagram) ? null : (
                <a
                  className="text-white p-2"
                  href={profile.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram fa-2x" />
                </a>
              )}

              {isEmpty(profile.social.linkedin) ? null : (
                <a
                  className="text-white p-2"
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
