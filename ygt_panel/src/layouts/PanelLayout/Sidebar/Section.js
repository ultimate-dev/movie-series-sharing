import React from "react";
//İcons
import { BsThreeDots } from "react-icons/bs";

export default function Section({ head }) {
  return (
    <li className="nav-section">
      <span className="sidebar-mini-icon">
        <BsThreeDots size={20} />
      </span>
      <h4 className="text-section">{head}</h4>
    </li>
  );
}
