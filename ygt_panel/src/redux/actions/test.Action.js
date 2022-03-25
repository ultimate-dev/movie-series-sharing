import store from "../store";

/**/
var ON_TEST = "ON_TEST";
/**/
export function onTest(test) {
  store.dispatch({
    type: ON_TEST,
    test: test,
  });
}
