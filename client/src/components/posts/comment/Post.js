import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostItem from "../PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Lac from "../../../microModules/LoadingLac";
import { getPost } from "../../../action/postAction";
import { Link } from "react-router-dom";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Lac />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showAction={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }
    return (
      <div className="post" id="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12" />
            <Link to="/feed" className="btn mb-3 btn-success ">
              Back to Chat-room
            </Link>
          </div>
          {postContent}
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    post: state.post
  };
};

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
