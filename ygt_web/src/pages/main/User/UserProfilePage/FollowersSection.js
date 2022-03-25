import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";

export default function Page({ items = [] }) {
  return (
    <div className="card" data-aos="fade-up">
      <div className="card-header">Takipcileri</div>

      <div className="row">
        {items.length > 0 ? (
          items.map((item, key) => (
            <Tilt className="col-md-4 col-6 my-2" key={key}>
              <Link
                className="card-body d-block p-0"
                to={"/main/u/" + item?.follower?.user_id}
              >
                <img
                  src={item?.follower?.back}
                  className="rounded"
                  width="100%"
                  height="80px"
                  style={{ objectFit: "cover" }}
                />
                <div
                  className="d-flex justify-content-center"
                  style={{
                    marginTop: "-25px",
                  }}
                >
                  <Avatar
                    className="avatar shadow"
                    size={45}
                    style={{
                      minWidth: 45,
                      minHeight: 45,
                      border: "2px solid #fff",
                    }}
                    src={item?.follower?.image}
                    draggable={false}
                  >
                    {String(
                      String(item?.follower?.name).substring(0, 1) +
                        String(item?.follower?.surname).substring(0, 1)
                    ).toUpperCase()}
                  </Avatar>
                </div>
                <div className="pb-3 mt-2 px-3">
                  <div className="text-dark">
                    {item?.follower?.name + " " + item?.follower?.surname}
                  </div>
                  <div className="text-muted fw-300">
                    @{item?.follower?.user_name}
                  </div>
                </div>
              </Link>
            </Tilt>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-muted text-center">
              Hic takipcisi yok.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
