import React from "react";
import randomInterval from "../../../utilities/randomInterval";

export default function Item(props) {
  const { children, title, className = "", onClick } = props;

  const id = "I_" + randomInterval(100000, 999999);

  return (
    <li className={"nav-item dropdown hidden-caret " + className}>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id={id}
        role="button"
        data-toggle={typeof onClick == "function" ? "" : "dropdown"}
        aria-haspopup="true"
        aria-expanded="false"
        onClick={onClick}
      >
        {title ? title() : <props.icon size={22} />}
      </a>
      {children ? children : null}
    </li>
  );
}
