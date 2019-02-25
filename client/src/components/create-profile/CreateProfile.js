import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "./../../microModules/TextFieldGroup";
import TextareaGroup from "./../../microModules/TextareaGroup";
import SelectListGroup from "./../../microModules/SelectListGroup";
import InputGroup from "./../../microModules/InputGroup";
import { createProfile } from "../../action/profileAction";
import { Link, withRouter } from "react-router-dom";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenSocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      bio: "",
      status: "",
      gitHupUserName: "",
      skills: "",
      youtube: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(event) {
    // event.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      bio: this.state.bio,
      status: this.state.status,
      gitHupUserName: this.state.gitHupUserName,
      skills: this.state.skills,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { errors, hiddenSocialInputs } = this.state;

    // SHOW CÁC MẠNG XÃ HỘI
    let socialInputs;
    if (hiddenSocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />

          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
        </div>
      );
    } else {
    }

    // OPTION CHO SELLECT
    const statusOptions = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor", value: "Instructor" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    return (
      <div className="create-profile" id="create-profile">
        <div className="container">
          <div className="row">
            <Link
              to="/dashboard"
              className="btn btn-success mt-3 mb-3 float-left"
            >
              Back Dashboard
            </Link>
          </div>

          {/* HEADER */}
          <div className="row">
            <div className="col-md-8 m-auto pb-5">
              <h1 className="display-4 text-center text-warning big-title">
                Create Profile
              </h1>
              <p className="lead text-center text-warning small-title">
                Nhập các thông tin của hồ sơ
              </p>
              <small className="d-block pb-3 text-warning">
                *** = Là trường cần phải có
              </small>
              {/* END HEADER */}

              {/* FORM */}
              <form
              // onSubmit={this.onSubmit}
              >
                {/* NICK NAME */}
                <TextFieldGroup
                  placeholder=" ***  Tên hồ sơ của bạn"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Tên của bạn, tên công ty, biệt danh, v..v."
                />
                {/* END NICK NAME */}

                {/* CHỨC VỤ status*/}
                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={statusOptions}
                  error={errors.status}
                  info="Chức vụ cao nhất mà bạn đã làm"
                />
                {/* END CHỨC VỤ status*/}

                {/* COMPANY */}
                <TextFieldGroup
                  placeholder="Tên Công ty"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Công ty mà bạn đang làm hoặc đã trải qua"
                />
                {/* END COMPANY */}

                {/* WEBSIDE */}
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Website cá nhân của bạn"
                />
                {/* END WEBSIDE */}

                {/* DỊA BÀN */}
                <TextFieldGroup
                  placeholder="Nơi bạn sống và làm việc"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Nơi bạn sinh sống và làm việc"
                />
                {/* END ĐỊA BÀN */}

                {/* SKILLS */}
                <TextFieldGroup
                  placeholder="***   Ngôn ngữ lập trình mà bạn có thể"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Nhập các ngôn ngữ mà bạn có thể. Cách nhau bằng dấu ',' (VD: HTML,CSS,JavaScript)"
                />
                {/* END SKILLS */}

                {/* GITHUB */}
                <TextFieldGroup
                  placeholder="GitHub của bạn"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="Username Github của bạn"
                />
                {/* END GITHUB */}

                {/* BIO */}
                <TextareaGroup
                  placeholder="Giới thiệu về bạn"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Bạn có thể ghi Số Điện Thoại của mình vào đây. Đó là thông tin quan trọng, bạn nên cân nhắc"
                />
                {/* END BIO */}

                {/* NÚT ADD MẠNG XÃ HỘI */}
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-success mr-3"
                    onClick={() => {
                      this.setState(prevState => ({
                        hiddenSocialInputs: !prevState.hiddenSocialInputs
                      }));
                    }}
                  >
                    Add mạng xã hội
                  </button>
                  <span className="text-warning">
                    Bạn phải nhập tối thiểu 1 mạng xã hội
                  </span>
                </div>
                {/* END NUT ADD MẠNG XÃ HỘI */}

                {/* CÁC MẠNG XÃ HỘI */}
                {socialInputs}
                {/* END CÁC MẠNG XÃ HỘI */}

                {/* SUBMIT FORM */}
                <input
                  onClick={this.onSubmit}
                  value="Submit"
                  type="button"
                  className="btn btn-success btn-block mt-4"
                />
                {/* END SUBMIT FORM */}
              </form>
              {/* END FORM */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
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
  { createProfile }
)(withRouter(CreateProfile));
