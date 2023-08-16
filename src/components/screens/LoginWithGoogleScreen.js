import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { loginWithGoogle } from "../../actions/userActions"; 

function LoginWithGoogleScreen() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const responseGoogle = (response) => {
    if (response.profileObj) {
      setLoading(true);
      const { tokenId } = response;

      dispatch(loginWithGoogle(tokenId)); 
    }
  };

  return (
    <div>
      <h2>Login With Google</h2>
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="Continue with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default LoginWithGoogleScreen;
