import React from "react";
import { useSelector } from "react-redux";
import { GooSpinner } from "react-spinners-kit";
export const DarkLoading = () => {
  return (
    <div
      className="position-fixed w-100 h-100"
      style={{ backgroundColor: "rgba(0,0,0,.2)", zIndex: 9999 }}
    >
      <div className="w-100 h-100 d-flex align-items-center justify-content-center">
        <GooSpinner size={60} />
      </div>
    </div>
  );
};

export const LightLoading = () => {
  const loading = useSelector((state) => state.loadingReducer.loading);
  if (loading) {
    return (
      <div
        className="position-fixed w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,.2)", zIndex: 9999 }}
      >
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <GooSpinner size={60} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};
