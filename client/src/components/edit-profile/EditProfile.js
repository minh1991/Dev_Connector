import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "./../../microModules/TextFieldGroup";
import TextareaGroup from "./../../microModules/TextareaGroup";
import SelectListGroup from "./../../microModules/SelectListGroup";
import InputGroup from "./../../microModules/InputGroup";
import { createProfile, getCurrentProfile } from "../../action/profileAction";
import { Link, withRouter } from "react-router-dom";
import isEmpty from "./../../validations/isEmpty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenSocialInputs: false,
      handle: "",
      company: "",
      webside: "",
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

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // CHUYỂN ĐỊNH DẠNG SKILLS TỪ ARRAY SANG CSV
      const skillsCSV = profile.skills.join(",");

      // NẾU TRONG TRƯỜNG HỢP TRƯỜNG ĐÓ CHƯA CÓ GÌ, THÌ SẼ TẠO RA MỘT CHỖ RỖNG
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.webside = !isEmpty(profile.webside) ? profile.webside : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.gitHupUserName = !isEmpty(profile.gitHupUserName)
        ? profile.gitHupUserName
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      // SETSTATE
      this.setState({
        handle: profile.handle,
        company: profile.company,
        webside: profile.webside,
        location: profile.location,
        bio: profile.bio,
        status: profile.status,
        gitHupUserName: profile.gitHupUserName,
        skills: skillsCSV,
        youtube: profile.youtube,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        instagram: profile.instagram
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      webside: this.state.webside,
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
                Edit Profile
              </h1>
              <p className="lead text-center text-warning small-title">
                Nhập các thông tin của hồ sơ
              </p>
              <small className="d-block pb-3 text-warning">
                *** = Thông tin cần có
              </small>
              {/* END HEADER */}

              {/* FORM */}
              <form onSubmit={this.onSubmit}>
                {/* NICK NAME */}
                <TextFieldGroup
                  placeholder="Tên hồ sơ của bạn"
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
                  name="webside"
                  value={this.state.webside}
                  onChange={this.onChange}
                  error={errors.webside}
                  info="Website của cá nhân hoặc công ty bạn đã trải qua"
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
                  placeholder="Ngôn ngữ lập trình"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Nhập các ngôn ngữ lập trình mà bạn có thể. Cách nhau bằng dấu ',' (VD: HTML,CSS,JavaScript)"
                />
                {/* END SKILLS */}

                {/* GITHUB */}
                <TextFieldGroup
                  placeholder="GitHub của bạn"
                  name="gitHupUserName"
                  value={this.state.gitHupUserName}
                  onChange={this.onChange}
                  error={errors.gitHupUserName}
                  info="Username Github của bạn"
                />
                {/* END GITHUB */}

                {/* BIO */}
                <TextareaGroup
                  placeholder="Bạn hãy viết một lời giới thiệu ngắn về mình"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bioe}
                  info="Một chút giới thiệu về bạn, Bạn cũng có thể để lại Số điện thoại cá nhân ở đây"
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
                  type="submit"
                  value="Submit"
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
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
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
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
