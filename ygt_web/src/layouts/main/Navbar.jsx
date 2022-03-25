import { Button, Dropdown, Menu } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "../../hooks/use-query";
import { FiPlusSquare, FiSearch } from "react-icons/fi";


export default function Navbar() {
  let user = useSelector((state) => state.userReducer.user);
  let history = useHistory()

  let query = useQuery();
  let _search = query.get("search") ? query.get("search") : "";

  let [search, setSearch] = useState(_search);

  function onKeyPress(e) {
    if (e.which === 13) {
      history.push("/main/search?search=" + search);
    }
  }

  return (
    <div className="app-navbar">
      <div className=""></div>
      <div className="d-flex">
        <div className="app-navbar-search me-4">
          <div className="app-navbar-search-title">
            <FiSearch size={18} className="icon ms-3" />
            <input
              placeholder="Ara"
              onKeyDown={onKeyPress}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Link className="btn btn-primary me-2" to="/main/home">
          <FiPlusSquare size={20} />
        </Link>
        <Dropdown overlay={menu} trigger="click">
          <Avatar
            className="avatar"
            size={42}
            style={{ minWidth: 42, minHeight: 42, cursor: "pointer" }}
            src={user?.image}
            draggable={false}
          >
            {String(
              String(user?.name).substring(0, 1) +
                String(user?.surname).substring(0, 1)
            ).toUpperCase()}
          </Avatar>
        </Dropdown>
      </div>
    </div>
  );
}

const menu = (
  <Menu style={{ width: 180 }} className="rounded py-2">
    <Menu.Item>
      <Link to="/main/account" className="text-muted">
        Profilim
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/main/settings" className="text-muted">
        Ayarlar
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/auth/login" className="text-danger">
        Cikis Yap
      </Link>
    </Menu.Item>
  </Menu>
);
