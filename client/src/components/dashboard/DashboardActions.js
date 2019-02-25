import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div
      className="btn-group mb-4 col-md-12"
      role="group"
      style={{ display: "block" }}
    >
      <Link to="/edit-profile" className="btn btn-success mr-3">
        <i className="fas fa-user-circle text-warning mr-2" /> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-success mr-3">
        <i className="fab fa-black-tie text-warning mr-2" />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-success mr-3">
        <i className="fas fa-graduation-cap text-warning mr-2" />
        Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
