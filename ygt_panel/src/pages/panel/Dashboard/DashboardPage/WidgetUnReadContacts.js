import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

export default function WidgetLastNewUsers({ items = [] }) {
  return (
    <div className="col-md-6">
      <div className="card card-round">
        <div className="card-body">
          <div className="card-title fw-mediumbold">Okunmayan Mesajlar</div>
          <div className="separator-dashed"></div>
          <div className="card-list">
            {items.slice(0, 4).map((p, i) => (
              <div className='my-3 border-bottom'>
                <div key={i} className="item-list">
                  <div className="avatar">
                    <img
                      src={p?.user.image}
                      className="avatar-img rounded-circle bg-gray"
                    />
                  </div>
                  <div className="info-user ml-3">
                    <div className="username">
                      {p?.user.name + " " + p?.user.surname}
                    </div>
                    <div className="status">{p?.user.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-muted mt-2" style={{ fontSize: 12 }}>
                      {moment(p.createdAt).fromNow()}
                    </div>
                  </div>
                </div>
                <small className='text-muted'>{String(p.message).substring(0,100)}...</small>
              </div>
            ))}
          </div>
          <div className="separator-dashed"></div>
          <Link className="btn btn-gray btn-block" to="/panel/contacts">
            Tümünü Gör
          </Link>
        </div>
      </div>
    </div>
  );
}
