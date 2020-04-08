import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sendToken } from '../redux/actions/authActions';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

class GoogleLoginButton extends Component {
  onFailure = (error) => {
    alert(error);
  };

  googleResponse = (response) => {
    const tokenBlob = {
      tokenId: response.tokenId,
    };

    this.props.sendToken(tokenBlob);
  };

  checkAuthentication = (isAuthenticated) => {
    if (isAuthenticated) {
      console.log('Is auth');
    } else {
      console.log('No auth');
    }
  };

  render() {
    return (
      <div>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Google Login"
          onSuccess={this.googleResponse}
          onFailure={this.googleResponse}
        ></GoogleLogin>
        {this.checkAuthentication(this.props.auth.isAuthenticated)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendToken: (tokenBlob) => {
      dispatch(sendToken(tokenBlob));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GoogleLoginButton)
);
