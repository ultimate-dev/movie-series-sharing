import React, { useState } from "react";

import { NavLink, withRouter } from "react-router-dom";
import randomInterval from "../../../utilities/randomInterval";

function Item(props) {
  const { name = "", menu = [], to, location } = props;

  if (to) {
    const _active = location.pathname == to ? true : false;
    return (
      <li className={"nav-item" + (_active ? " active" : "")}>
        <NavLink
          to={to}
          data-toggle="collapse"
          className="collapsed"
          aria-expanded="false"
        >
          <i className="fas">{<props.icon size={22} />}</i>
          <p>{name}</p>
        </NavLink>
      </li>
    );
  } else {
    const id = "I_" + randomInterval(10000, 999999);

    const _active =
      menu.filter((p) => p.to == location.pathname).length > 0 ? true : false;

    return (
      <li className={"nav-item" + (_active ? " active" : "")}>
        <a
          data-toggle="collapse"
          href={"#" + id}
          className={_active ? "" : "collapsed"}
          aria-expanded={_active + ""}
        >
          <i className="fas">{<props.icon size={24} />}</i>
          <p>{name}</p>
          <span className="caret"></span>
        </a>

        <div className={"collapse" + (_active ? " show" : "")} id={id}>
          <ul className="nav nav-collapse">
            {menu.map((p, i) => (
              <li key={i} className={p.to == location.pathname ? "active" : ""}>
                <NavLink to={p.to}>
                  <span className="sub-item">{p.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  }
}
export default withRouter(Item);
