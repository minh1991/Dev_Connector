import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextareaGroup from "../../../microModules/TextareaGroup";
import { addComment } from "../../../action/postAction";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(event) {
    // event.preventDefaul();
    // console.log("submit");
    const { user } = this.props.auth;
    const { postId } = this.props;
    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addComment(newComment, postId);
    this.setState({ text: "" });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3 mt-5">
        <div className="card card-info">
          <div className="card-header bg-dark text-warning">
            Bạn đang nghĩ gì...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                {/* <textarea
                  className="form-control form-control-lg"
                  placeholder="Create a post"
                  style={{ height: "20vh", borderRadius: "20px" }}
                  defaultValue={""}
                /> */}
                <TextareaGroup
                  className="form-control form-control-lg"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                  placeholder="Bạn đang nghĩ gì ....."
                  name="text"
                  style={{ height: "20vh", borderRadius: "20px" }}
                />
              </div>
              <input
                onClick={this.onSubmit}
                type="button"
                value="Chia sẻ"
                className="btn btn-success float-right mr-4"
                style={{ width: "15vw", fontWeight: 400 }}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
