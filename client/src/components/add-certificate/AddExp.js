import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "./../../microModules/TextFieldGroup";
import TextareaGroup from "./../../microModules/TextareaGroup";
import { connect } from "react-redux";
import { addExp } from "../../action/profileAction";
import PropTypes from "prop-types";

class AddExp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      disabled: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onCheck(event) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }
  onSubmit(event) {
    // event.preventdefault();
    // console.log("submit");
    const expData = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addExp(expData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="section add-experience" id="add-experience">
        <div className="container">
          <div className="row">
            <Link
              to="/dashboard"
              className="btn btn-success mt-3 mb-3 float-left"
            >
              Back Dashboard
            </Link>
          </div>
          <div className="row">
            <div className="col-md-8 m-auto pb-5">
              <h1 className="display-4 text-center text-warning big-title">
                Add Experience
              </h1>
              <p className="lead text-center text-warning small-title">
                Thêm các vị trí / công việc mà bạn đã và đang làm
              </p>
              <small className="d-block pb-3 text-warning">
                *** = Trường không thể bỏ trống
              </small>
              <form
              //   onSubmit={this.onSubmit}
              >
                {/* JOB */}
                <TextFieldGroup
                  placeholder="***   Công việc"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                {/* END JOB */}

                {/* CÔNG TY */}
                <TextFieldGroup
                  placeholder="***   Công ty"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                {/* END CÔNG TY */}

                {/* KHU VỰC */}
                <TextFieldGroup
                  placeholder="Khu vực"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                {/* END KHU VỰC */}

                <h6 className="text-white">Từ ngày</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6 className="text-white">Đến ngày</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />

                {/* CHECK BOX */}
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label
                    className="form-check-label text-warning"
                    htmlFor="current"
                  >
                    Công việc hiện tại
                  </label>
                </div>

                <TextareaGroup
                  placeholder="Mô tả một chút về công việc của bạn"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Mô tả một chút về công việc của bạn"
                />
                <input
                  onClick={this.onSubmit}
                  value="Submit"
                  type="button"
                  className="btn btn-success btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExp.propTypes = {
  addExp: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { addExp }
)(withRouter(AddExp));
