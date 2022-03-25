import React from "react";
import { Link } from "react-router-dom";
//Icons
import { FiMenu } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Logo({ brand = "", onMinimaze, onTopbar }) {
  return (
    <div className="logo-header" data-background-color="blue">
      <Link
        to="/panel/dashboard"
        className="logo d-flex align-items-center justify-content-start"
      >
        <div className="d-flex align-items-center">
          <h2 style={{ textTransform: "uppercase" }} className="mt-2">
            <strong className="text-white">{brand}</strong>
          </h2>

          <small className="ml-2">
            <b>PANEL</b>
          </small>
        </div>
      </Link>
      <button
        className="navbar-toggler sidenav-toggler ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={onMinimaze}
      >
        <span className="navbar-toggler-icon">
          <FiMenu size={28} />
        </span>
      </button>
      <button className="topbar-toggler more" onClick={onTopbar}>
        <BsThreeDotsVertical size={24} />
      </button>
      <div className="nav-toggle">
        <button className="btn btn-toggle toggle-sidebar" onClick={onMinimaze}>
          <FiMenu size={28} />
        </button>
      </div>
    </div>
  );
}
