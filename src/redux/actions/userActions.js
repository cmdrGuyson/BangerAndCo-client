import axios from "axios";

import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  STOP_LOADING_UI,
} from "../types";

/*Log user into the system*/
export const loginUser = (user_data, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/login", user_data);
    setAuthorizationHeader(results.data.token);
    await dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push("/");
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response?.data,
    });
  }
};

/*Handle user resgistration*/
export const registerUser = (user_data, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/signup", user_data);
    setAuthorizationHeader(results.data.token);
    await dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push("/");
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response?.data,
    });
  }
};

/*Log user out of the system*/
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("BangerToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

/*Get logged in user's details*/
export const getUserData = () => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    let result = await axios.get("/user");
    dispatch({
      type: SET_USER,
      payload: result.data,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

/*Handle license image upload*/
export const uploadLicenseImage = (formData) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    await axios.post("/license-image", formData);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: { error: { licenseImage: error.response.data.error.message } },
    });
  }
};

/*Handle alternate image upload*/
export const uploadAlternateImage = (formData) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    await axios.post("/alternate-id-image", formData);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: { error: { alternateImage: error.response.data.error.message } },
    });
  }
};

/*Handle user image upload*/
export const uploadUserImage = (formData) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    await axios.post("/user-image", formData);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: { error: { userImage: error.response.data.error.message } },
    });
  }
};

/*Set authorization header*/
const setAuthorizationHeader = (token) => {
  const banger_token = `Bearer ${token}`;
  localStorage.setItem("BangerToken", banger_token);
  axios.defaults.headers.common["Authorization"] = banger_token;
};
