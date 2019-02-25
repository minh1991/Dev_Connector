import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Lac from "../../microModules/LoadingLac";
import PostFeed from "./PostFeed";
import PostForm from "./PostForm";
import { getPosts } from "../../action/postAction";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Lac />;
    } else {
      // console.log(posts);
      postContent = <PostFeed posts={posts} />;
    }
    return (
      <div className="feed" id="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* Post Form */}
              <PostForm />
              {/* Post Feed */}
              <div className="posts">
                {/* Post Item */}
                {postContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
