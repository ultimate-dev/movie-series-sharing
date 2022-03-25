var initial_state = {
  loading: false,
};

export default function loadingReducer(state = initial_state, action) {
  switch (action.type) {
    case "SHOW_LOADING":
      return { loading: true };
    case "HIDE_LOADING":
      return { loading: false };
    default:
      return state;
  }
}
