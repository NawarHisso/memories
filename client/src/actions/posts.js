import * as api from "../api";
import { TYPES } from "../constants/actionTypes";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.START_LOADING });
    const { data } = await api.fetchPosts(page);
    const action = { type: TYPES.FETCH_ALL, payload: data };
    dispatch(action);
    dispatch({ type: TYPES.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.START_LOADING });
    const {
      data: { data },
    } = await api.fetchPost(id);
    const action = { type: TYPES.FETCH_POST, payload: data };
    dispatch(action);
    dispatch({ type: TYPES.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    const action = { type: TYPES.FETCH_BY_SEARCH, payload: data };
    dispatch(action);
    dispatch({ type: TYPES.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.START_LOADING });
    const { data } = await api.createPost(post);
    const action = { type: TYPES.CREATE, payload: data };
    dispatch(action);
    history.push(`/posts/${data._id}`);
    dispatch({ type: TYPES.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    const action = { type: TYPES.UPDATE, payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    const action = { type: TYPES.DELETE, payload: id };

    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    const action = { type: TYPES.LIKE, payload: data };

    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
