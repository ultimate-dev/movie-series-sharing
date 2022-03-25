import store from "../store";

/**/
var SHOW_DIALOG = "SHOW_DIALOG";
var HIDE_DIALOG = "HIDE_DIALOG";
/**/
export function showDialog(name, data) {
  store.dispatch({
    type: SHOW_DIALOG,
    name,
    data,
  });
}

export function hideDialog() {
  store.dispatch({
    type: HIDE_DIALOG,
  });
}
