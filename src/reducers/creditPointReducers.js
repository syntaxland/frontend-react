// creditPointReducers.js
import {
  CREDIT_POINT_REQUEST_CREATE_REQUEST,
  CREDIT_POINT_REQUEST_CREATE_SUCCESS,
  CREDIT_POINT_REQUEST_CREATE_FAIL,
  CREDIT_POINT_LIST_REQUEST,
  CREDIT_POINT_LIST_SUCCESS,
  CREDIT_POINT_LIST_FAIL,
  CREDIT_POINT_ALL_LIST_REQUEST,
  CREDIT_POINT_ALL_LIST_SUCCESS,
  CREDIT_POINT_ALL_LIST_FAIL,
  CREDIT_POINT_BALANCE_REQUEST,
  CREDIT_POINT_BALANCE_SUCCESS,
  CREDIT_POINT_BALANCE_FAIL,
} from "../constants/creditPointConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  creditPointRequest: [],
  creditPointRequests: [],
  creditPointAllRequests: [],
  creditPointBalance: [],
};

export const creditPointRequestCreateReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CREDIT_POINT_REQUEST_CREATE_REQUEST:
      return { loading: true };
    case CREDIT_POINT_REQUEST_CREATE_SUCCESS:
      //   return { loading: false, success: true, creditPointRequest: action.payload };
      return {
        loading: false,
        success: true,
        creditPointRequest: action.payload,
      };

    case CREDIT_POINT_REQUEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const creditPointListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREDIT_POINT_LIST_REQUEST:
      return { ...state, loading: true };
    case CREDIT_POINT_LIST_SUCCESS:
      return { ...state, loading: false, creditPointRequests: action.payload };
    case CREDIT_POINT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const creditPointAllListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREDIT_POINT_ALL_LIST_REQUEST:
      return { ...state, loading: true };
    case CREDIT_POINT_ALL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        creditPointAllRequests: action.payload,
      };
    case CREDIT_POINT_ALL_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const creditPointBalanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREDIT_POINT_BALANCE_REQUEST:
      return { ...state, loading: true };
    case CREDIT_POINT_BALANCE_SUCCESS:
      return { ...state, loading: false, creditPointBalance: action.payload };
    case CREDIT_POINT_BALANCE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
