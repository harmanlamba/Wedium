import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { sendToken } from '../../redux/actions/auth-actions';
import { useDispatch, useSelector } from 'react-redux';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLoginButton = (props) => {
  const dispatch = useDispatch();

  const googleSuccessfulResponse = (response) => {
    const tokenBlob = {
      tokenId: response.tokenId,
    };

    dispatch(sendToken(tokenBlob));
  };

  const googleFailureResponse = (response) => {
    // Do not need to do anything in case of failure
    // The button auto-resets and allows the user to login in again
  };

  return (
    <div>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Sign in with Google"
        onSuccess={googleSuccessfulResponse}
        onFailure={googleFailureResponse}
      ></GoogleLogin>
    </div>
  );
};

export default GoogleLoginButton;
