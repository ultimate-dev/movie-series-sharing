import React from "react";

export default function WidgetStamp({
  label = "",
  value = "",
  color = "info",
  icon = null,
}) {
  return (
    <div className="col-sm-6 col-lg-3">
      <div className="card p-3">
        <div className="d-flex align-items-center">
          <span className={"stamp stamp-md mr-3" + " bg-" + color}>{icon}</span>
          <div>
            <h5 className="mb-0">
              <b>
                <a>
                  <small className="mr-2">{label}</small>
                  {value}
                </a>
              </b>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
