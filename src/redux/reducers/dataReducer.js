/* eslint-disable import/no-anonymous-default-export */
import { SET_USERS, LOADING_DATA, SET_SELECTED_USER } from "../types";

const initialState = {
  users: [],
  user: {},
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
    default:
      return state;
  }
}
