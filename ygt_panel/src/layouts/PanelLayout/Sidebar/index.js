import React from "react";
//Components
import Item from "./Item";
import Section from "./Section";
import User from "./User";
import _navs from "./_navs";

export default function Sidebar({ onMinimazeHover }) {
  return (
    <>
      <div
        className="sidebar sidebar-style-2"
        onMouseOver={() => onMinimazeHover(true)}
        onMouseOut={() => onMinimazeHover(false)}
      >
        <div className="sidebar-wrapper">
          <div className="sidebar-content">
            <User />
            <ul className="nav nav-primary">
              {_navs.map((p, i) =>
                p.section ? (
                  <Section head={p.section} key={i} />
                ) : (
                  <Item
                    key={i}
                    icon={p.icon}
                    name={p.name}
                    to={p.to}
                    menu={p.menu}
                  />
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
