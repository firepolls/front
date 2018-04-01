import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MenuItem, RaisedButton, Popover, Menu, Paper, Dialog } from 'material-ui';

import AuthForm from '../../auth-form';
import mastHead from '../nav-wrapper/navstyling';
import { signupAction, loginAction, logoutAction } from '../../../action/auth';

class NavWrapper extends Component {
    state = {
      signingUp: false,
      loggingIn: false,
      anchorEl: null,
      dialogOpen: true,
      popoverOpen: false,
    }

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  }

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  }

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  }

  handleSignup = (userData) => {
    this.props.signup(userData);
    this.setState({ dialogOpen: false });
  }

  handleLogin = (userData) => {
    this.props.login(userData);
    this.setState({ dialogOpen: false });
  }

  handlePopoverToggle = () => {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }

  // Rob - This is curred for use below in handleLoggingInOpen and handleSigningUpOpen
  _handlePopoverOpen = (loggingIn) => () =>
    this.setState({
      loggingIn,
      signingUp: !loggingIn,
      open: false,
      dialogOpen: true,
      popoverOpen: false,
    });

  handleLoggingInOpen = this._handlePopoverOpen(true);

  handleSigningUpOpen = this._handlePopoverOpen(false);

  renderSavedSwitch = (location) => {
    switch (location) {
      case '/saved':
        return (
          <Link
            to="/" 
            href="/"
            className="saved-link"
          >
            <RaisedButton className="saved-button">
              Home
            </RaisedButton>
          </Link>);
        
      case '/':
        return (
          <Link
            to="/saved"
            href="/saved"
            className="saved-link"
          >
            <RaisedButton className="saved-button">
                Saved Rooms
            </RaisedButton>
          </Link>);
        
      default:
        return null;
    }
  }

  render() {
    const { 
      socket,
      logout,
    } = this.props;

    const signupLoginJSX =
        (
          <Menu 
            style={{
              width: '10em',
            }}
          >
      
            <MenuItem 
              primaryText="Signup"
              onClick={this.handleSigningUpOpen}
            />
            <MenuItem 
              primaryText="Login"
              onClick={this.handleLoggingInOpen}
            />
          </Menu>
        );

    const logoutJSX = (
      <RaisedButton
        className="login-logout-button"
        onClick={() => logout()}
      >
        { /* TODO: MOVE this text to the "label" or "primaryText" props for
        this and other raised buttons/papers */ }
        Logout
      </RaisedButton>
    );

    const loginSignupJSX = (
      <RaisedButton
        className="login-logout-button"      
        onClick={(event) => this.setState({
          anchorEl: event.target,
          popoverOpen: true,
        })}
      >
        Signup / Login
      </RaisedButton>
    );

    const authButton = this.props.loggedIn ? logoutJSX : loginSignupJSX;
    
    // Seth - Using location.pathname to conditional render savedButton with switch function
    const savedButton = this.props.loggedIn ?
      this.renderSavedSwitch(this.props.location.pathname) : null;
    
    return (
      <div className="nav-wrapper" >
        { savedButton }
        { authButton }
        <Popover
          style={{
            marginTop: '1em',
          }}
          targetOrigin={ 
            {
              horizontal: 'right',
              vertical: 'top',
            }
          }
          anchorOrigin={
            {
              horizontal: 'right',
              vertical: 'bottom',
            }
          }
          anchorEl={this.state.anchorEl}
          open={this.state.popoverOpen}
          onRequestClose={this.handlePopoverToggle}
        >
          {this.props.loggedIn ? logoutJSX : signupLoginJSX}
         
        </Popover>
 
        <div className="form-container">
         
          {this.state.signingUp && !this.props.loggedIn ? 
            <Dialog 
              open={this.state.dialogOpen}
              onRequestClose={this.handleDialogClose}
            >
              <h2>Sign up for a Firepolls account.</h2>
              <AuthForm 
                type="signup" 
                onComplete={this.handleSignup} 
              /> 
            </Dialog> : null}

          {this.state.loggingIn ? 
            <Dialog
              open={this.state.dialogOpen}
              onRequestClose={this.handleDialogClose}
            >
              <h2>Welcome back to Firepolls!</h2>
              <AuthForm 
                type="login" 
                onComplete={this.handleLogin}
              /> 
            </Dialog> : null}
              
        </div>
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

