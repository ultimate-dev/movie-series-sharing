import store from "../store";

/**/
var SET_USER = "SET_USER";
var REMOVE_USER = "REMOVE_USER";
/**/
export function setUser(user) {
  

  store.dispatch({
    type: SET_USER,
    user: user,
  });
}
export function removeUser() {
  store.dispatch({
    type: REMOVE_USER,
  });
}
