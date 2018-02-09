import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { AppBar, Drawer, MenuItem, RaisedButton, Popover, Menu, Paper, Dialog } from 'material-ui';
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
              onClick={() =>
                this.setState({
                  signingUp: true,
                  loggingIn: false,
                  open: false,
                  dialogOpen: true,
                })}
            />
            <MenuItem 
              primaryText="Login"
              onClick={() =>
                this.setState({
                  loggingIn: true,
                  signingUp: false,
                  open: false,
                  dialogOpen: true,
                })}
            />
          </Menu>
        );

    const logoutJSX = (
      <RaisedButton 
        onClick={() => logout()}
      >
        Logout
      </RaisedButton>
    );

    const loginSignupJSX = (
      <RaisedButton
        label="Signup/Login"
        onClick={(event) => this.setState({
          anchorEl: event.target,
          popoverOpen: true,
        })}
      />
    );

    const authButton = this.props.loggedIn ? logoutJSX : loginSignupJSX;

    return (
      <Paper
        style={{
          marginLeft: 'auto',
          textAlign: 'right',
          backgroundColor: 'transparent',
          boxShadow: 'transparent',
        }}
      >
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
              <h2>Please sign into Firepolls</h2>
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
              <h2>Welcome back to Firepolls</h2>
              <AuthForm 
                type="login" 
                onComplete={this.handleLogin}
              /> 
            </Dialog> : null}
              
        </div>
      </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavWrapper);

