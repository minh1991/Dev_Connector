import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExp } from "../../action/profileAction";

class Experience extends Component {
  deleteClick(id) {
    this.props.deleteExp(id);
  }
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          {/* {exp.from} ~ {exp.to} */}
          {/* VÌ BỊ RA FULL THỜI GIAN, NÊN PHẢI CHUYỂN SANG Moment */}
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> ~{" "}
          {exp.to === null ? (
            "Hiện tại"
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-warning text-danger"
            onClick={this.deleteClick.bind(this, exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div id="experience">
        <h4 className="mb-2 text-white">Experiences</h4>
        <table className="table">
          <thead>
            <tr>
              <th className="text-white">Công ty</th>
              <th className="text-white">Chức vụ</th>
              <th className="text-white">Thời gian</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   profile: state.profile,
//   auth: state.auth
// });

Experience.propTypes = {
  deleteExp: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExp }
)(Experience);
