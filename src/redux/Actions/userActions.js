import axios from "axios";
import {
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_PENDING,
  FETCH_PRODUCT_FAILURE,
  SAVE_PRODUCT_SUCCESS,
  SAVE_PRODUCT_PENDING,
  SAVE_PRODUCT_FAILURE,
} from "../constants";
import { END_POINTS } from "../../config";
import { isEmpty, map, filter } from "lodash";
import { batch } from "react-redux";
import initialState from "../initialState";

const getPayloadToSubmitData = (login, password) => {
  return {
    accountId: login,
    pswd: password,
  };
};
export const actions = {
  fetchProducts: (date) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCT_PENDING });
    let datePostedData = initialState.showProducts;
    console.log(
      new Date(datePostedData[0].date).toDateString() ===
        new Date(date).toDateString()
    );
    console.log(new Date(date).toDateString());
    try {
      datePostedData = filter(datePostedData, (product) => {
        return (
          new Date(product.date).toDateString() ===
          new Date(date).toDateString()
        );
      });
      console.log(datePostedData);

      dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: datePostedData });
    } catch (error) {
      dispatch({ type: FETCH_PRODUCT_FAILURE, payload: error });
    }
  },
  fetchLikedProducts: (data) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCT_PENDING });
    let datePostedData = initialState.showProducts;
    datePostedData = filter(datePostedData, (product) => {
      return product.likedByMe === true;
    });
    try {
      dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: datePostedData });
    } catch (error) {
      dispatch({ type: FETCH_PRODUCT_FAILURE, payload: error });
    }
  },
  saveProducts: (data) => async (dispatch) => {
    //dispatch({ type: SAVE_PRODUCT_PENDING });
    //We can add this pending statement once we are fetching the data from API.
    try {
      dispatch({ type: SAVE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SAVE_PRODUCT_FAILURE, payload: error });
    }
  },
};
