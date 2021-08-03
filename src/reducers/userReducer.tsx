export function userReducer(state = null, action: any) {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload;
    case "LOGGED_OUT":
      return action.payload;
    default:
      return state;
  }
}
