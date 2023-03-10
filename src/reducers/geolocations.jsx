import {
  FETCH_COUNTRIES,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  FETCH_DETAILS_FAILURE,
  FETCH_DETAILS_SUCCESS,
  FETCH_DETAILS,
  SET_SEARCH_QUERY,
} from "../constants/types";

const initialState = {
  loading: false,
  data: [],
  countryDetails: {},
  params: {
    query: "",
    region: "All",
    sort: "asc",
  },
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_COUNTRIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_DETAILS:
      return {
        ...state,
        loading: true,
        error: "",
        countryDetails: {},
      };
    case FETCH_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        countryDetails: action.payload,
      };
    case FETCH_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        params: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
