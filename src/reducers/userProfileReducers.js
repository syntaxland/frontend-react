// userProfileReducers.js
import {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  DELETE_USER_ACCOUNT_REQUEST,
  DELETE_USER_ACCOUNT_SUCCESS,
  DELETE_USER_ACCOUNT_FAIL,
} from '../constants/userProfileConstants';

export const userProfileReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_REQUEST:
    case UPDATE_USER_PROFILE_REQUEST:
      return { loading: true, profile: {} };
    case GET_USER_PROFILE_SUCCESS:
    case UPDATE_USER_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case GET_USER_PROFILE_FAIL:
    case UPDATE_USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
      case DELETE_USER_ACCOUNT_REQUEST:
      return { ...state, loading: true };
    case DELETE_USER_ACCOUNT_SUCCESS:
      return { ...state, loading: false, profile: {} };
    case DELETE_USER_ACCOUNT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
