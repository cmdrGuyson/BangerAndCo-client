import axios from "axios";

import {
  SET_USERS,
  LOADING_DATA,
  SET_SELECTED_USER,
  LOADING_UI,
  STOP_LOADING_UI,
} from "../types";

/* Get all users */
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/users");
    dispatch({
      type: SET_USERS,
      payload: results.data.users,
    });
  } catch (error) {
    dispatch({ type: SET_USERS, payload: [] });
    console.log(error);
  }
};

/* Get single user info */
export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    let result = await axios.get(`/user/${id}`);
    dispatch({ type: SET_SELECTED_USER, payload: result.data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({ type: SET_SELECTED_USER, payload: {} });
    console.log(error);
  }
};

/* Set verified */
export const setVerified = (id) => async (dispatch) => {
  try {
    let result = await axios.get(`/user/set-verified/${id}`);
    console.log(result);
    dispatch(getAllUsers());
  } catch (error) {
    console.log(error);
  }
};

/* Set blacklisted */
export const setBlacklisted = (id) => async (dispatch) => {
  try {
    let result = await axios.get(`/user/set-blacklisted/${id}`);
    console.log(result);
    dispatch(getAllUsers());
  } catch (error) {
    console.log(error);
  }
};

/* Set Premium */
export const setPremium = (id) => async (dispatch) => {
  try {
    let result = await axios.get(`/user/set-premium/${id}`);
    console.log(result);
    dispatch(getAllUsers());
  } catch (error) {
    console.log(error);
  }
};
