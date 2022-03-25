import store from "../store";

/**/
var SHOW_LOADING = "SHOW_LOADING";
var HIDE_LOADING = "HIDE_LOADING";
/**/
export function showLoading() {
  store.dispatch({
    type: SHOW_LOADING,
  });
}

export function hideLoading() {
  store.dispatch({
    type: HIDE_LOADING,
  });
}
