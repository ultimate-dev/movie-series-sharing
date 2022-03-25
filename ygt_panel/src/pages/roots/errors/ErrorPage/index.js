import React, { useEffect } from "react";

export default function Error({ code = "", label = "", desc = "" }) {
  useEffect(() => {
    document.title = code;
  }, []);
  return (
    <div className="app-err-layout">
      <div className="app-err-layout-base">
        <div className="app-err-layout-base-code animated fadeIn">{code}</div>
        <div className="app-err-layout-base-label animated fadeIn">{label}</div>
        <div className="app-err-layout-base-desc animated fadeIn">{desc}</div>
      </div>
    </div>
  );
}
