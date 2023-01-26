import * as api from "../api";
import {
  FETCH_COUNTRIES,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  FETCH_DETAILS,
  FETCH_DETAILS_SUCCESS,
  FETCH_DETAILS_FAILURE,
  SET_SEARCH_QUERY,
} from "../constants/types";

export const fetchCountries = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_COUNTRIES });

    const { data } = await api.fetchCountries();

    dispatch({ type: FETCH_COUNTRIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_COUNTRIES_FAILURE, payload: error.message });
  }
};

export const fetchDetails = (country) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_DETAILS });

    const { data } = await api.searchCountry(country);

    dispatch({ type: FETCH_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_DETAILS_FAILURE, payload: error.message });
  }
};

export const setSearchQuery = (params) => ({
  type: SET_SEARCH_QUERY,
  payload: params,
});
