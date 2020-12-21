/* eslint-disable import/no-anonymous-default-export */
import {
  SET_USERS,
  LOADING_DATA,
  SET_SELECTED_USER,
  SET_VEHICLES,
  SET_VEHICLE,
  SET_EQUIPMENT,
} from "../types";

const initialState = {
  users: [],
  vehicles: [],
  equipment: [],
  loading: false,
};

export default function (state = initialState, action) {
  //let index;

  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case SET_SELECTED_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
        loading: false,
      };
    case SET_VEHICLE:
      return {
        ...state,
        vehicle: action.payload,
      };
    case SET_EQUIPMENT:
      return {
        ...state,
        equipment: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
