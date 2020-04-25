import React from 'react';
import { sendToken } from '../../redux/actions/auth-actions';
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from 'react-google-login';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLoginButton = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const googleSuccessfulResponse = (response) => {
    const tokenBlob = {
      tokenId: response.tokenId,
    };

    dispatch(sendToken(tokenBlob));
  };

  const googleFailureResponse = (response) => {
    // Do not need to do anything in case of failure
    // The button auto-resets and allows the user to login in again
  }

  // For testing isAuthenticated status
  const checkAuthentication = (isAuthenticated) => {
    if (isAuthenticated) {
      console.log('Is auth');
    } else {
      console.log('No auth');
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Google Login"
        onSuccess={googleSuccessfulResponse}
        onFailure={googleFailureResponse}
      ></GoogleLogin>
      {checkAuthentication(auth.isAuthenticated)}
    </div>
  );
}

export default GoogleLoginButton;
