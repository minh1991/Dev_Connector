import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEdu } from "../../action/profileAction";

class Education extends Component {
  deleteClick(id) {
    this.props.deleteEdu(id);
  }
  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          {/* {exp.from} ~ {exp.to} */}
          {/* VÌ BỊ RA FULL THỜI GIAN, NÊN PHẢI CHUYỂN SANG Moment */}
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> ~{" "}
          {edu.to === null ? (
            "Hiện tại"
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-warning text-danger"
            onClick={this.deleteClick.bind(this, edu._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div id="education">
        <h4 className="mb-2 text-white">Education</h4>
        <table className="table">
          <thead>
            <tr>
              <th className="text-white">Trường</th>
              <th className="text-white">Trình độ</th>
              <th className="text-white">Thời gian</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   profile: state.profile,
//   auth: state.auth
// });

Education.propTypes = {
  deleteEdu: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEdu }
)(Education);
