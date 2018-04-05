import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { RaisedButton, Dialog } from 'material-ui';
import { withRouter } from 'react-router-dom';

import './_nav-wrapper.scss';
import AuthForm from '../auth-form';
import { signupAction, loginAction, logoutAction } from '../../action/auth';

class NavWrapper extends Component {
  state = {
    authType: 'login',
    modalOpen: false,
    hamburgerOpen: false,
    viewportWidth: null,
    viewportHeight: null,
  }

  componentDidMount() {
    this.getWidth();
    window.addEventListener('resize', this.getWidth);
  }

  // Rob - Close modal after successful singup or login
  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && this.state.modalOpen) this.toggleModal();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getWidth);
  }

  getWidth = () => {
    this.setState({ viewportWidth: window.innerWidth, viewportHeight: window.innerHeight });
  }

  toggleHamburger = () => {
    this.setState(({ hamburgerOpen }) => ({
      hamburgerOpen: !hamburgerOpen,
    }));
  }

  toggleModal = () => {
    this.setState(prevState => ({ modalOpen: !prevState.modalOpen }));
  }

  toggleAuth = () => {
    this.setState(prevState => ({ 
      authType: prevState.authType === 'login' ? 'signup' : 'login', 
    }));
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
        label="Signup / Login"
        onClick={this.toggleModal}
        className="login-logout-button"      
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

    const desktopButtons = (
      <div className="desktop-nav">
        { savedRoomButton }
        { authButton }
      </div>
    );

    // Rob - This shows when state.modalOpen === true and state.authType === 'signup'
    const signupModal = (
      <Dialog 
        className="auth-modal"
        open={this.state.modalOpen}
        onRequestClose={this.toggleModal}
      >
        <h2 className="signup-login-header">
          Sign up for a firepolls account.
        </h2>
        <div className="signup-login-toggle" >
          <p>Already have an account?</p>
          { authToggleButton('Login') }
        </div>
        <AuthForm 
          type="signup" 
          onComplete={this.props.signup} 
        /> 
      </Dialog>
    );

    // Rob - This shows when state.modalOpen === true and state.authType === 'login'
    const loginModal = (
      <Dialog
        className="auth-modal"
        open={this.state.modalOpen}
        onRequestClose={this.toggleModal}
      >
        <h2 className="signup-login-header" >Welcome back to firepolls!</h2>
        <div className="signup-login-toggle" >
          <p>Need an account?</p>
          { authToggleButton('Sign up') }
        </div>
        <AuthForm
          type="login" 
          onComplete={this.props.login}
        /> 
      </Dialog>
    );

    // Hamburger menu source: https://www.w3schools.com/howto/howto_css_menu_icon.asp
    const hamburgerMenu = (
      <div 
        className={this.state.hamburgerOpen 
          ? 'hamburgerContainer open' 
          : 'hamburgerContainer'
        } 
        onClick={this.toggleHamburger}
      >
        <div className={this.state.hamburgerOpen ? 'burger1 open' : 'burger1'} />
        <div className={this.state.hamburgerOpen ? 'burger2 open' : 'burger2'} />
        <div className={this.state.hamburgerOpen ? 'burger3 open' : 'burger3'} />
      </div>
    );

    const overlay = (
      <div 
        className="header-overlay"
        onClick={this.toggleHamburger}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 2,
          width: '100%',
          height: this.state.viewportHeight,
        }}
      />
    );

    const smallScreens = (
      <Fragment>
        { hamburgerMenu }
        <ul className={this.state.hamburgerOpen ? 'hidden-menu isOpen' : 'hidden-menu closed'}>
          <li>{ savedRoomButton }</li>
          <li>{ authButton }</li>
        </ul>
        { this.state.hamburgerOpen ? overlay : null}
      </Fragment>
    );
    
    return (
      <div className="header-nav">
        { this.state.viewportWidth < 600 ? smallScreens : desktopButtons }
        { this.state.authType === 'login' ? loginModal : signupModal }
      </div>        
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
  login: (userData, failureCB) => dispatch(loginAction(userData, failureCB)),
  signup: (userData, failureCB) => dispatch(signupAction(userData, failureCB)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavWrapper));
