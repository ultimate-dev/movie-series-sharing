var initial_state = {
  user: null,
};

export default function userReducer(state = initial_state, action) {
  switch (action.type) {
    case "SET_USER":
      return { user: { ...state.user, ...action.user } };
    case "REMOVE_USER":
      return initial_state;
    default:
      return state;
  }
}
