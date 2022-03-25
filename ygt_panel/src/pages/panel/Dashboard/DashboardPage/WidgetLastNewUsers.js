import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

export default function WidgetLastNewUsers({ items = [] }) {
  return (
    <div className="col-md-6">
      <div className="card card-round">
        <div className="card-body">
          <div className="card-title fw-mediumbold">Yeni Kullanıcılar</div>
          <div className="separator-dashed"></div>
          <div className="card-list">
            {items.slice(0, 6).map((p, i) => (
              <div
                key={i}
                className="item-list"
                to={"/panel/users/list?user=" + p.user_id}
              >
                <div className="avatar">
                  <img
                    src={p.image}
                    className="avatar-img rounded-circle bg-gray"
                  />
                </div>
                <div className="info-user ml-3">
                  <div className="username">{p.name + " " + p.surname}</div>
                  <div className="status">{p.email}</div>
                </div>
                <div className="text-right">
                  <Link
                    className="btn btn-sm btn-primary"
                    to={"/panel/users/list?user=" + p.user_id}
                  >
                    İncele
                  </Link>
                  <div className="text-muted mt-2" style={{ fontSize: 12 }}>
                    {moment(p.createdAt).fromNow()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="separator-dashed"></div>
          <Link className="btn btn-gray btn-block" to="/panel/users/list">
            Tümünü Gör
          </Link>
        </div>
      </div>
    </div>
  );
}
