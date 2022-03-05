import { TYPES } from "../constants/actionTypes";

const reducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case TYPES.START_LOADING:
      return { ...state, isLoading: true };
    case TYPES.END_LOADING:
      return { ...state, isLoading: false };
    case TYPES.FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case TYPES.FETCH_POST:
      return { ...state, post: action.payload };
    case TYPES.FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case TYPES.CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case TYPES.UPDATE:
    case TYPES.LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case TYPES.DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
