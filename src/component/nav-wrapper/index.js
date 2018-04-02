import { connect } from 'react-redux';
import React, { Component } from 'react';
import { RaisedButton, Dialog } from 'material-ui';
import { Link, withRouter } from 'react-router-dom';

import AuthForm from '../auth-form';
import { signupAction, loginAction, logoutAction } from '../../action/auth';

class NavWrapper extends Component {
    state = {
      authType: 'login',
      modalOpen: false,
    }

  toggleModal = () => {
    this.setState(prevState => ({ modalOpen: !prevState.modalOpen }));
  }

  toggleAuth = () => {
    this.setState(prevState => ({ 
      authType: prevState.authType === 'login' ? 'signup' : 'login', 
    }));
  }

  handleSignup = (userData) => {
    this.props.signup(userData);
    this.toggleModal();
  }

  handleLogin = (userData) => {
    this.props.login(userData);
    this.toggleModal();
  }

  renderSavedSwitch = (location) => {
    switch (location) {
      case '/saved':
        return (
          <RaisedButton
            className="saved-button"
            label="Home"
            onClick={() => this.props.history.push('/')}
          />
        );
        
      case '/':
        return (
          <RaisedButton
            className="saved-button"
            label="Saved Rooms"
            onClick={() => this.props.history.push('/saved')}
          />
        );
        
      default:
        return null;
    }
  }

  render() {
    const { 
      logout,
      loggedIn,
      location,
    } = this.props;

    const logoutButton = (
      <RaisedButton
        className="login-logout-button"
        onClick={() => logout()}
        label="Logout"
      />
    );

    const loginSignupButton = (
      <RaisedButton
        className="login-logout-button"      
        onClick={this.toggleModal}
        label="Signup / Login"
      />
    );

    const authToggleButton = type => (
      <RaisedButton
        className="auth-switch"      
        onClick={this.toggleAuth}
        label={`${type} instead`}
      />
    );

    const authButton = loggedIn ? logoutButton : loginSignupButton;
    
    // Seth - Using location.pathname to conditional render savedRoomButton with switch function
    const savedRoomButton = loggedIn ? this.renderSavedSwitch(location.pathname) : null;

    // Rob - This shows when state.modalOpen === true and state.authType === 'signup'
    const signupModal = (
      <Dialog 
        open={this.state.modalOpen}
        onRequestClose={this.toggleModal}
      >
        <h2>Sign up for a Firepolls account.</h2>
        <p>Need to login instead?</p>
        { authToggleButton('Login') }
        <AuthForm 
          type="signup" 
          onComplete={this.handleSignup} 
        /> 
      </Dialog>
    );

    // Rob - This shows when state.modalOpen === true and state.authType === 'login'
    const loginModal = (
      <Dialog
        open={this.state.modalOpen}
        onRequestClose={this.toggleModal}
      >
        <h2>Welcome back to Firepolls!</h2>
        <p>Need to sign up instead?</p>
        { authToggleButton('Sign up') }
        <AuthForm 
          type="login" 
          onComplete={this.handleLogin}
        /> 
      </Dialog>
    );
    
    return (
      <div className="header-nav">
        { savedRoomButton }
        { authButton }
        { this.state.authType === 'login' ? loginModal : signupModal }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  signup: userData => dispatch(signupAction(userData)),
  login: userData => dispatch(loginAction(userData)),
  logout: () => dispatch(logoutAction()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavWrapper));
