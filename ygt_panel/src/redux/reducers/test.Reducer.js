var initial_state = {
  test: "",
};

export default function testReducer(state = initial_state, action) {
  switch (action.type) {
    case "ON_TEST":
      return { test: action.test };
    default:
      return state;
  }
}
