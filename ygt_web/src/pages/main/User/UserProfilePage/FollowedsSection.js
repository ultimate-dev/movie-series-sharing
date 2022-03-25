import React from "react";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import Avatar from "antd/lib/avatar/avatar";

export default function Page({ items = [] }) {
  return (
    <div className="card" data-aos="fade-up">
      <div className="card-header">Takip Ettikleri</div>

      <div className="row">
        {items.length > 0 ? (
          items.map((item, key) => (
            <Tilt className="col-md-4 col-6 my-2" key={key}>
              <Link
                className="card-body d-block p-0"
                to={"/main/u/" + item?.user?.user_id}
              >
                <img
                  src={item?.user?.back}
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
                    src={item?.user?.image}
                    draggable={false}
                  >
                    {String(
                      String(item?.user?.name).substring(0, 1) +
                        String(item?.user?.surname).substring(0, 1)
                    ).toUpperCase()}
                  </Avatar>
                </div>
                <div className="pb-3 mt-2 px-3">
                  <div className="text-dark">
                    {item?.user?.name + " " + item?.user?.surname}
                  </div>
                  <div className="text-muted fw-300">
                    @{item?.user?.user_name}
                  </div>
                </div>
              </Link>
            </Tilt>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-muted text-center">
              Takip ettigi kimse yok.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
