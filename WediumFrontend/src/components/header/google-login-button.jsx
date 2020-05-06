import React from 'react';
import Button from '@material-ui/core/Button';
import { GoogleLogin } from 'react-google-login';
import { sendTokenAndLogin } from '../../redux/actions/thunk/auth-thunk';
import { useDispatch } from 'react-redux';
import GoogleIcon from '../../assets/google-icon';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLoginButton = (props) => {
  const dispatch = useDispatch();

  const googleSuccessfulResponse = (response) => {
    const tokenBlob = {
      tokenId: response.tokenId,
    };

    dispatch(sendTokenAndLogin(tokenBlob));
  };

  const googleFailureResponse = (response) => {
    // Do not need to do anything in case of failure
    // The button auto-resets and allows the user to login in again
  };

  return (
    <div>
      <GoogleLogin
      render={renderProps => (
        <Button
        onClick={renderProps.onClick}
        startIcon={<GoogleIcon />}
      >
        Sign in 
      </Button>
      )}
        clientId={GOOGLE_CLIENT_ID}
        //buttonText="Sign in with Google"
        onSuccess={googleSuccessfulResponse}
        onFailure={googleFailureResponse}
      ></GoogleLogin>
    </div>
  );
};

export default GoogleLoginButton;
