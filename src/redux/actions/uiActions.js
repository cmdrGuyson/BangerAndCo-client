import { SET_DASHBOARD, LOADING_UI, STOP_LOADING_UI } from "../types";

export const setDashboard = (dashboard) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: SET_DASHBOARD, payload: dashboard });
  dispatch({ type: STOP_LOADING_UI });
};
