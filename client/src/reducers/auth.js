import { TYPES } from "../constants/actionTypes";

const reducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case TYPES.GOOGLE_OAUTH:
    case TYPES.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };
    case TYPES.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default reducer;
