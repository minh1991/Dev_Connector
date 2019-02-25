import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientID: "847120c46f59d6798e3d",
      clientSecret: "36b5281465e33077d9ab86aa49e6904f5150473f",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { clientID, clientSecret, count, sort } = this.props;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientID}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { repos } = this.state;
    // console.log(repos);
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2 github">
        <div className="row">
          <div className="col-md-8">
            <h6 className="text-white">
              <a
                href={repo.html_url}
                className="text-warning"
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
            </h6>
            <small className="mr-4">
              <Moment format="DD/MM/YYYY">{repo.created_at}</Moment>
            </small>
            <small className="mr-2 badge badge-success">{repo.language}</small>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-4">
            <span className="badge badge-secondary mr-1">
              Watch: {repo.watchers_count}
            </span>
            <span className="badge badge-info mr-1">
              Star: {repo.stargazers_count}
            </span>
            <span className="badge badge-success">
              Fork: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));

    return (
      <div ref="myRef">
        <hr />
        <h4 className="mb-4 text-white">Github Repositories</h4>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
