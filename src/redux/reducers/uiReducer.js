/* eslint-disable import/no-anonymous-default-export */

import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_DASHBOARD,
  SET_ERRORS_RENT,
} from "../types";

const initialState = {
  loading: false,
  errors: null,
  rent_errors: null,
  dashboard: 0, //0 - users, 1 - vehicles
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case SET_ERRORS_RENT:
      return {
        ...state,
        loading: false,
        rent_errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
        rent_errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case SET_DASHBOARD:
      return {
        ...state,
        dashboard: action.payload,
      };
    default:
      return state;
  }
}
