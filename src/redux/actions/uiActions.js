import {
  SET_DASHBOARD,
  LOADING_UI,
  STOP_LOADING_UI,
  CLEAR_ERRORS,
} from "../types";

export const setDashboard = (dashboard) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: SET_DASHBOARD, payload: dashboard });
  dispatch({ type: STOP_LOADING_UI });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
