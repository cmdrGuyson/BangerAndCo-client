import axios from "axios";
import dayjs from "dayjs";

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
  SET_TIMES,
  SET_ERRORS_RENT,
  SET_RENTS,
  SET_RENT,
  SET_PRICES,
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

/* Set pickup and dropoff date and time when finding vehicles*/
export const setTimes = (times, history) => async (dispatch) => {
  //Validate pickup and dropoff times
  const pickup = dayjs(
    `${times.pickupDate} ${times.pickupTime}`,
    "YYY-MM-DD HH:mm"
  );
  const dropoff = dayjs(
    `${times.dropoffDate} ${times.dropoffTime}`,
    "YYY-MM-DD HH:mm"
  );

  const diff = dropoff.diff(pickup, "minutes");

  console.log(pickup, dropoff, diff);

  dispatch({
    type: SET_VEHICLES,
    payload: {},
  });

  if (diff < 300) {
    dispatch({
      type: SET_ERRORS,
      payload: { error: { message: "Minimum rent period is 5 hours" } },
    });
  } else if (diff > 20160) {
    dispatch({
      type: SET_ERRORS,
      payload: { error: { message: "Maximum rent period is 2 weeks" } },
    });
  } else {
    times.diff = diff;
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: SET_TIMES, payload: times });
    dispatch({ type: LOADING_DATA });
    history.push("/rent-vehicles");
    try {
      let results = await axios.get(
        `/available-vehicles/${times.pickupDate}/${times.dropoffDate}`
      );
      dispatch({
        type: SET_VEHICLES,
        payload: results.data.vehicles,
      });
    } catch (error) {
      dispatch({ type: SET_VEHICLES, payload: [] });
      console.log(error);
    }
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
export const addVehicle = (vehicle) => async (dispatch) => {
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
    let results = await axios.post(`/change-rent/${id}`, { rent });
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

/* Toggle availability of vehicle */
export const toggleVehicleAvailability = (id) => async (dispatch) => {
  //dispatch({ type: LOADING_UI });
  try {
    await axios.get(`/vehicle-availability/${id}`);
    dispatch(getAllVehicles());
    dispatch(getVehicle(id));
    dispatch({ type: CLEAR_ERRORS });
    //dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    console.log(error);
  }
};

/* Get all equipment */
export const getEquipment = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/equipment");
    //console.log(results);
    dispatch({
      type: SET_EQUIPMENT,
      payload: results.data.equipment,
    });
  } catch (error) {
    dispatch({ type: SET_EQUIPMENT, payload: [] });
    console.log(error);
  }
};

/* Get all available equipment */
export const getAvailableEquipment = (pickup, dropoff) => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get(`/available-equipment/${pickup}/${dropoff}`);
    dispatch({
      type: SET_EQUIPMENT,
      payload: results.data.availableEquipment,
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

/* Make rent */
export const makeRent = (data, id, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post(`/rent/${id}`, data);
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: STOP_LOADING_UI });
    history.push("/success");
    //Prevent modal from closing after errors are displayed
    if (results.data._id) return true;
  } catch (error) {
    console.log(error.response.data);

    if (
      error.response.status === 403 &&
      error.response.data.error === "Blacklisted by dmv"
    ) {
      history.push("/blacklisted");
    } else {
      dispatch({
        type: SET_ERRORS_RENT,
        payload: error.response.data,
      });
    }
  }
};

/* Get all rents */
export const getAllRents = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/rents");
    dispatch({
      type: SET_RENTS,
      payload: results.data.rents,
    });
  } catch (error) {
    dispatch({ type: SET_RENTS, payload: [] });
    console.log(error);
  }
};

/* Get rents of logged in user */
export const getMyRents = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/my-rents");
    console.log(results.data);
    dispatch({
      type: SET_RENTS,
      payload: results.data.rents,
    });
  } catch (error) {
    dispatch({ type: SET_RENTS, payload: [] });
    console.log(error);
  }
};

/* Set rent data in state */
export const setRent = (rent_data) => async (dispatch) => {
  dispatch({ type: SET_RENT, payload: rent_data });
};

/* Change rent status */
export const changeRentStatus = (id, status) => async (dispatch) => {
  try {
    await axios.post(`/rent-status/${id}`, { status });
    dispatch(getAllRents());
  } catch (error) {
    console.log(error);
  }
};

/* Update rent equipment */
export const changeRentEquipment = (id, _equipment, newTotal) => async (
  dispatch
) => {
  dispatch({ type: LOADING_UI });
  try {
    let equipment = [];
    equipment = _equipment.map((e) => e._id);

    let data = {
      equipment,
      newTotal,
    };

    await axios.post(`/update-equipment/${id}`, data);
    dispatch(getMyRents());
    dispatch({ type: STOP_LOADING_UI });

    return true;
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_ERRORS_RENT,
      payload: error.response.data,
    });
  }
};

/* Get all competitive prices */
export const getPrices = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/prices");
    dispatch({
      type: SET_PRICES,
      payload: results.data.prices,
    });
  } catch (error) {
    dispatch({ type: SET_PRICES, payload: [] });
    console.log(error);
  }
};
