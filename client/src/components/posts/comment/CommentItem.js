import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../../action/postAction";
import Moment from "react-moment";

class CommentItem extends Component {
  deleteClick(postId, commentId) {
    // console.log(id);
    this.props.deleteComment(postId, commentId);
  }
  render() {
    const { comment, postId, auth } = this.props;
    // console.log(comment);
    // console.log(postId);
    // console.log(auth);
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt={comment.name}
                style={{ width: "50%", margin: "auto" }}
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead" style={{ fontSize: "1rem", height: "60%" }}>
              {comment.text}
            </p>
            <div className="float-right">
              <small className="mr-4">
                <Moment format="DD-MM-YYYY HH:mm:ss">{comment.date}</Moment>
              </small>
              <span>
                {comment.user === auth.user.id ? (
                  <button
                    onClick={this.deleteClick.bind(this, postId, comment._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-trash-alt" />
                  </button>
                ) : null}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
