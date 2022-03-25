import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
//İcons
import { RiUserStarFill } from "react-icons/ri";
//components
import Logo from "./Logo";
import Item from "./Item";

function Navbar({ onMinimaze, onTopbar }) {
  const admin = useSelector((state) => state.userReducer.user);
  const history = useHistory();

  return (
    <div className="main-header">
      <Logo brand="Aktu" onMinimaze={onMinimaze} onTopbar={onTopbar} />

      <nav
        id="navbar"
        className="navbar navbar-header navbar-expand-lg"
        data-background-color="blue2"
      >
        <div className="container-fluid">
          <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
            {admin?.status == "2" ? (
              <Item
                title={() => <RiUserStarFill size={24} />}
                onClick={() => history.push("/panel/managers")}
              />
            ) : null}
            <Item
              title={() => (
                <div className="avatar-sm">
                  <span className="avatar-title rounded bg-white text-primary">
                    <b>{admin.letters}</b>
                  </span>
                </div>
              )}
            >
              <ul className="dropdown-menu dropdown-user animated fadeIn">
                <div className="dropdown-user-scroll scrollbar-outer">
                  <li>
                    <div className="user-box">
                      <div className="avatar-lg">
                        <span className="avatar-title rounded bg-primary">
                          <b>{admin.letters}</b>
                        </span>
                      </div>
                      <div className="u-text">
                        <h4>{admin.name + " " + admin.surname}</h4>
                        <p className="text-muted">{admin.email}</p>
                        <Link
                          to="/panel/account"
                          className="btn btn-primary btn-xs"
                        >
                          Profili Görüntüle
                        </Link>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/panel/account">
                      Profilim
                    </Link>

                    <Link className="dropdown-item" to="/panel/settings">
                      Ayarlar
                    </Link>

                    <div className="dropdown-divider"></div>
                    <Link
                      className="dropdown-item text-danger"
                      to="/auth/login"
                    >
                      Çıkış Yap
                    </Link>
                  </li>
                </div>
              </ul>
            </Item>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
