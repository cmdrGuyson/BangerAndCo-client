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
export const getUser = (id) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/user/${id}`)
    .then((result) => {
      console.log(result.data);
      dispatch({ type: SET_SELECTED_USER, payload: result.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((error) => {
      console.log(error);
    });
};
