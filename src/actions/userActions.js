//userActions.js
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
} from "../constants/userConstants";
import axios from "axios";
import axiosInstance from "../store";

const API_URL = process.env.REACT_APP_API_URL;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    
    const { data } = await axios.post(
      `${API_URL}/api/users/login/`,
      { email: email, password: password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS, 
      payload: data,
    }); 

    // Set access token in Axios headers
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
    localStorage.setItem("userInfo", JSON.stringify(data));

    // Set timer to refresh the access token after refreshTokenTime minutes (ms)
    let refreshTokenTime = 1000 * 60 * 900; // ms * hr * mins
    setTimeout(() => {
      dispatch(refreshToken(data.refresh));
    }, refreshTokenTime);
    
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const loginWithGoogle = (email, googleId, tokenId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/google-login/`,
      { email, google_id: googleId, token_id: tokenId },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const register =
  (firstName, lastName, email, password, phoneNumber) => async (dispatch) => {
    try {
      // Convert email to lowercase
      const lowerCaseEmail = email.toLowerCase();

      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Check if 'username' is not provided or empty, set it to the 'email' value
      // eslint-disable-next-line no-unused-vars
      // const username = email; 

      const { data } = await axios.post(
        `${API_URL}/api/users/register/`,
        {
          first_name: firstName,
          last_name: lastName,
          username: lowerCaseEmail,
          email: lowerCaseEmail,
          password,
          phone_number: phoneNumber,
        },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const refreshToken = (refreshToken) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/token/refresh/`,
      { refresh: refreshToken },
      config
    );

    // Update the access token in Axios headers
    // axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
    // Update the access token in Axios headers
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;

    // Save the new access token in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));

    // Set timer to refresh the access token again after refreshTokenTime minutes (ms)
    // let refreshTokenTime = 1000 * 60 * 0.1; // ms * hr * mins
    // setTimeout(() => {
    //   dispatch(refreshToken(data.refresh));
    // }, refreshTokenTime);

  } catch (error) {
    console.log("Error refreshing token:", error);
    // Handle error or logout the user if token refresh fails
    dispatch(logout());
  }
};

export const logout = () => async (dispatch) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // const { userLogin: { userInfo }, } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    // Blacklist the access token on logout
    await axios.post(
      `${API_URL}/api/users/logout/`,
      { refresh: userInfo.refresh },
      config
    );
  } catch (error) {
    console.log("Error logging out:", error);
  }
  // Remove access token from Axios headers
  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};
