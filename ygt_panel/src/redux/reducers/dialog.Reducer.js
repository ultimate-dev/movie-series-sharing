var initial_state = {
  name: null,
  data: {},
};

export default function dialogReducer(state = initial_state, action) {
  switch (action.type) {
    case "SHOW_DIALOG":
      return { name: action.name, data: action.data };
    case "HIDE_DIALOG":
      return initial_state;
    default:
      return state;
  }
}
