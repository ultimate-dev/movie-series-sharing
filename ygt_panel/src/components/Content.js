import React from "react";
import { connect } from "react-redux";

function Content({ children, loading }) {
  if (!loading) return children;
  else return null;
}
const mapStateToProps = (state) => ({
  loading: state.loadingReducer.loading,
});
export default connect(mapStateToProps)(Content);
