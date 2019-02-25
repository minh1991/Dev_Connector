import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCertificate extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <li className="list-group-item" key={exp._id}>
        <h5 className="text-white">{exp.company}</h5>
        <p className="text-white">
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> ~{" "}
          {exp.to === null ? (
            "Hiện tại"
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong className="text-white">Chức vụ:</strong> {exp.title}
        </p>
        <p>
          {exp.location === "" ? null : (
            <span>
              <strong className="text-white">Nơi làm việc: </strong>
              {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.description === "" ? null : (
            <span>
              <strong className="text-white">Miêu tả: </strong>
              {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = education.map(edu => (
      <li className="list-group-item" key={edu._id}>
        <h5 className="text-white">{edu.school}</h5>
        <p className="text-white">
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> ~{" "}
          {edu.to === null ? (
            "Hiện tại"
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong className="text-white">Học vị:</strong> {edu.degree}
        </p>
        <p>
          <strong className="text-white">Chuyên ngành:</strong>{" "}
          {edu.fieldOfStudy}
        </p>
        <p>
          {edu.description === "" ? null : (
            <span>
              <strong className="text-white">Miêu tả: </strong>
              {edu.description}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row history">
        <div className="col-md-6">
          <h4 className="text-center text-white">Experience</h4>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-white">Chưa có dữ liệu về Experience</p>
          )}
        </div>
        <div className="col-md-6">
          <h4 className="text-center text-white">Education</h4>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-white">Chưa có dữ liệu về Education</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCertificate;
