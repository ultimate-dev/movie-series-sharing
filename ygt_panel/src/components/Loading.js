import React from "react";
import { connect } from "react-redux";
import HashLoader from "react-spinners/HashLoader";

export function LoadingSuspense() {
  return (
    <div className="app-loading bg-primary">
      <div className="app-loading-spinner">
        <HashLoader color="#fff" size={42} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.loadingReducer.loading,
});
export const LoadingOperation = connect(mapStateToProps)(function ({
  loading = false,
}) {
  if (loading)
    return (
      <div
        className="app-loading"
        style={{ backgroundColor: "rgba(255,255,255,.5)" }}
      >
        <div className="app-loading-spinner">
          <HashLoader color="#1269DB" size={42} />
        </div>
      </div>
    );
  else {
    return null;
  }
});
