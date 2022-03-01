import { TYPES } from "../constants/actionTypes";

const reducer = (posts = [], action) => {
  switch (action.type) {
    case TYPES.FETCH_ALL:
      return action.payload;
    case TYPES.CREATE:
      return [...posts, action.payload];
    case TYPES.UPDATE:
    case TYPES.LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case TYPES.DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

export default reducer;
