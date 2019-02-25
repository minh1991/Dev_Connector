import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deletePost, addLike, removeLike } from "./../../action/postAction";

class PostItem extends Component {
  deleteClick(id) {
    // console.log(id);
    this.props.deletePost(id);
  }

  likeClick(id) {
    this.props.addLike(id);
  }

  unLikeClick(id) {
    this.props.removeLike(id);
  }

  findLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const { post, auth, showAction } = this.props;
    // console.log(post);
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt={post.name}
                style={{ width: "50%", margin: "auto" }}
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead" style={{ fontSize: "1rem", height: "60%" }}>
              {post.text}
            </p>
            <div className="float-right">
              <small className="mr-4">
                <Moment format="DD-MM-YYYY HH:mm:ss">{post.date}</Moment>
              </small>
              {/* ACTION */}
              {showAction ? (
                <span>
                  <button
                    type="button"
                    className="btn bg-warning mr-1"
                    onClick={this.likeClick.bind(this, post._id)}
                  >
                    <i
                      className={classnames("fas fa-thumbs-up", {
                        "text-primary": this.findLike(post.likes)
                      })}
                    />
                    <span className="badge badge-warning">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn bg-warning mr-1"
                    onClick={this.unLikeClick.bind(this, post._id)}
                  >
                    <i className="text-danger fas fa-thumbs-down" />
                  </button>
                  <Link
                    to={`/comment/${post._id}`}
                    className="btn btn-success mr-1"
                    style={{ width: "15vw" }}
                  >
                    Comment
                  </Link>
                  {post.user === auth.user.id ? (
                    <button
                      onClick={this.deleteClick.bind(this, post._id)}
                      type="button"
                      className="btn btn-danger mr-1"
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  ) : null}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showAction: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
