import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function User() {
  const admin = useSelector((state) => state.userReducer.user);
  return (
    <div className="user">
      <div className="avatar-sm float-left mr-2">
        <span className="avatar-title rounded bg-primary">
          <b> {admin.letters}</b>
        </span>
      </div>

      <div className="info">
        <a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
          <span>
            {admin.name + " " + admin.surname}
            <span className="user-level">
              {admin.status == 2 ? "Süper Yönetici Hesabı" : "Yönetici Hesabı"}
            </span>
            <span className="caret"></span>
          </span>
        </a>
        <div className="clearfix"></div>

        <div className="collapse in" id="collapseExample">
          <ul className="nav">
            <li>
              <Link to="/panel/account">
                <span className="link-collapse">Profilim</span>
              </Link>
            </li>
            <li>
              <Link to="/panel/settings">
                <span className="link-collapse">Ayarlar</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default User;
