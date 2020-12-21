import axios from "axios";

import {
  SET_USERS,
  LOADING_DATA,
  SET_SELECTED_USER,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_VEHICLE,
  SET_VEHICLES,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_EQUIPMENT,
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

/* Get all vehicles */
export const getAllVehicles = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/vehicles");
    dispatch({
      type: SET_VEHICLES,
      payload: results.data.vehicles,
    });
  } catch (error) {
    dispatch({ type: SET_VEHICLES, payload: [] });
    console.log(error);
  }
};

/* Get all available vehicles */
export const getAllAvailableVehicles = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let _results = await axios.get("/vehicles");
    //console.log(_results);
    let results = _results.data.vehicles.filter((e) => e.isAvailable === true);
    dispatch({
      type: SET_VEHICLES,
      payload: results,
    });
  } catch (error) {
    dispatch({ type: SET_VEHICLES, payload: [] });
    console.log(error);
  }
};

/* Get single vehicle info */
export const getVehicle = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    let result = await axios.get(`/vehicle/${id}`);
    dispatch({ type: SET_VEHICLE, payload: result.data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({ type: SET_VEHICLE, payload: {} });
    console.log(error);
  }
};

/* Add a vehicle */
export const addVehicle = (vehicle, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/vehicle", vehicle);
    await dispatch(getAllVehicles());
    dispatch({ type: CLEAR_ERRORS });

    //Prevent modal from closing after errors are displayed
    if (results.data._id) return true;
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

/* Remove vehicle */
export const removeVehicle = (id) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    let results = await axios.delete(`/vehicle/${id}`);
    dispatch(getAllVehicles());
    dispatch({ type: SET_VEHICLE, payload: null });
    dispatch({ type: CLEAR_ERRORS });

    //Prevent modal from closing after errors are displayed
    if (results.data.message === "Successfully deleted") return true;
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

/* Change vehicle rent */
export const changeRent = (id, rent) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    let results = await axios.post(`/rent/${id}`, { rent });
    dispatch(getVehicle(id));
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: STOP_LOADING_UI });

    //Prevent modal from closing after errors are displayed
    if (results.data.message === "Rent changed successfully") return true;
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

/* Upload Vehicle Image */
export const uploadVehicleImage = (formData, id) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    await axios.post(`/vehicle-image/${id}`, formData);
    dispatch(getAllVehicles());
    dispatch(getVehicle(id));
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: { error: { vehicleImage: error.response.data.error.message } },
    });
  }
};

/* Get all equipment */
export const getEquipment = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/equipment");
    console.log(results);
    dispatch({
      type: SET_EQUIPMENT,
      payload: results.data.equipment,
    });
  } catch (error) {
    dispatch({ type: SET_EQUIPMENT, payload: [] });
    console.log(error);
  }
};

/* Increment equipment */
export const incrementEquipment = (id) => async (dispatch) => {
  try {
    await axios.get(`/equipment/increment/${id}`);
  } catch (error) {
    console.log(error);
  }
};

/* Decrement equipment */
export const decrementEquipment = (id) => async (dispatch) => {
  try {
    await axios.get(`/equipment/decrement/${id}`);
  } catch (error) {
    console.log(error);
  }
};
