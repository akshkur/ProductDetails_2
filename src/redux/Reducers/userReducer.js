import {
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_PENDING,
  FETCH_PRODUCT_FAILURE,
  SAVE_PRODUCT_SUCCESS,
  SAVE_PRODUCT_PENDING,
  SAVE_PRODUCT_FAILURE,
} from "../constants";
import initialState from "../initialState";
export const name = "loginDetails";

export function reducer(state = initialState, action) {
  switch (action.type) {
    //cases to handle product cases :fetch and save

    case FETCH_PRODUCT_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        showProducts: action.payload,
      };
    case FETCH_PRODUCT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.error,
      };
    case SAVE_PRODUCT_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        showProducts: action.payload.data,
      };
    case SAVE_PRODUCT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case SAVE_PRODUCT_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.error,
      };
    default:
      return state;
  }
}
export const selectors = {
  getToken: (state) => state[name].token,
  getLoading: (state) => state[name].loading,
  getUsers: (state) => state[name].users,
  getLoggedIn: (state) => state[name].loggedIn,
  getErrorMessage: (state) => state[name].errorMessage,
  getProducts: (state) => state[name].showProducts,
};
