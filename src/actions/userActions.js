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
    let refreshTokenTime = 1000 * 60 * 10; // ms * hr * mins
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

// export const googleLogin = (accessToken) => async (dispatch) => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const { data } = await axios.post(
//       `${API_URL}/api/google-login/`,
//       { access_token: accessToken },
//       config
//     );

//     dispatch({
//       type: USER_LOGIN_SUCCESS,
//       payload: data,
//     });

//     // Save user data to localStorage
//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({
//       type: USER_LOGIN_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };
 
export const register =
  (firstName, lastName, email, password, phoneNumber) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Check if 'username' is not provided or empty, set it to the 'email' value
      const username = email;

      const { data } = await axios.post(
        `${API_URL}/api/users/register/`,
        {
          first_name: firstName,
          last_name: lastName,
          username,
          email,
          password,
          phone_number: phoneNumber,
        },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      // localStorage.setItem("userInfo", JSON.stringify(data));
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
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;

    // Save the new access token in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
    // Set timer to refresh the access token again after refreshTokenTime minutes (ms)
    let refreshTokenTime = 1000 * 60 * 10; // ms * hr * mins
    setTimeout(() => {
      dispatch(refreshToken(data.refresh));
    }, refreshTokenTime);
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

// export const logout = () => async (dispatch, getState) => {
//   // const history = useHistory()
//   try {
//     const { userLogin: { userInfo }, } = getState();

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${userInfo.access}`,
//       },
//     };

//     await axios.post(`${API_URL}/api/users/logout/`, { refresh: userInfo.refresh }, config);
//   } catch (error) {
//     console.log("Error logging out:", error);
//   }
//   // Remove access token from Axios headers
//   delete axios.defaults.headers.common["Authorization"];
//   localStorage.removeItem("userInfo");
//   // history.push('/login')
//   dispatch({ type: USER_LOGOUT });
// };

// Action to update access token in the state
// export const updateAccessToken = (accessToken) => (dispatch) => {
//   dispatch({
//     type: USER_LOGIN_ACCESS_TOKEN,
//     payload: accessToken,
//   });
// };

// // userActions.js

// import {
//   USER_LOGIN_FAIL,
//   USER_LOGIN_SUCCESS,
//   USER_LOGOUT,
//   USER_LOGIN_REQUEST,
//   USER_REGISTER_FAIL,
//   USER_REGISTER_SUCCESS,
//   USER_REGISTER_REQUEST,
// } from "../constants/userConstants";
// import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;

// export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch({
//       type: USER_LOGIN_REQUEST,
//     });

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//       },
//     };

//     const { data } = await axios.post(
//       `${API_URL}/api/users/login/`,
//       { username: email, password: password },
//       config
//     );

//     dispatch({
//       type: USER_LOGIN_SUCCESS,
//       payload: data,
//     });

//     // Set access token in Axios headers
//     axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;

//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({
//       type: USER_LOGIN_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

// export const register = (name, email, password) => async (dispatch) => {
//   try {
//     dispatch({
//       type: USER_REGISTER_REQUEST,
//     });

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//       },
//     };

//     const { data } = await axios.post(
//       `${API_URL}/api/users/register/`,
//       { name: name, email: email, password: password },
//       // { firstName: first_name, lastName: last_name, email: email, phoneNumber: phone_number, password: password },
//       // register(firstName, lastName, email, password, phoneNumber)
//       config
//     );

//     dispatch({
//       type: USER_REGISTER_SUCCESS,
//       payload: data,
//     });
//     dispatch({
//       type: USER_LOGIN_SUCCESS,
//       payload: data,
//     });

//     // Set access token in Axios headers
//     axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;

//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({
//       type: USER_REGISTER_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

// export const logout = () => (dispatch) => {
//   // Remove access token from Axios headers
//   delete axios.defaults.headers.common['Authorization'];

//   localStorage.removeItem("userInfo");
//   dispatch({ type: USER_LOGOUT });
// };

// import {
//   USER_LOGIN_FAIL,
//   USER_LOGIN_SUCCESS,
//   USER_LOGOUT,
//   USER_LOGIN_REQUEST,
//   USER_REGISTER_FAIL,
//   USER_REGISTER_SUCCESS,
//   USER_REGISTER_REQUEST,
// } from "../constants/userConstants";
// import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;
// // const API_URL = 'http://ec2-34-229-79-247.compute-1.amazonaws.com';
// // const API_URL = process.env.REACT_APP_API_URL || 'http://ec2-34-229-79-247.compute-1.amazonaws.com';

// export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch({
//       type: USER_LOGIN_REQUEST,
//     });

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//       },
//     };

//     const { data } = await axios.post(
//       `${API_URL}/api/users/login/`,

//       { username: email, password: password },
//       config
//     );

//     dispatch({
//       type: USER_LOGIN_SUCCESS,
//       payload: data,
//     });

//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({
//       type: USER_LOGIN_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

// export const register = (name, email, password) => async (dispatch) => {
//   try {
//     dispatch({
//       type: USER_REGISTER_REQUEST,
//     });

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//       },
//     };

//     const { data } = await axios.post(
//       `${API_URL}/api/users/register/`,

//       { name: name, email: email, password: password },
//       config
//     );

//     dispatch({
//       type: USER_REGISTER_SUCCESS,
//       payload: data,
//     });
//     dispatch({
//       type: USER_LOGIN_SUCCESS,
//       payload: data,
//     });

//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({
//       type: USER_REGISTER_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

// export const logout = () => (dispatch) => {
//   localStorage.removeItem("userInfo");
//   // Remove access token from Axios headers
//   delete axios.defaults.headers.common['Authorization'];

//   localStorage.removeItem("userInfo");
//   dispatch({ type: USER_LOGOUT });
// };
