import React, { Component, Fragment } from 'react';
import { AppBar, Drawer, MenuItem, RaisedButton, Popover, Menu, Paper } from 'material-ui';
import AuthForm from '../../auth-form';
import mastHead from '../nav-wrapper/navstyling';


class NavWrapper extends Component {
    state = {
      open: false,
      signingUp: false,
      loggingIn: false,
      anchorEl: null,
    }

    handleToggle = () => {
      this.setState({ open: !this.state.open });
    }

    render() {
      const { 
        socket,
        signup,
        login,
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
                })}
            />
            <MenuItem 
              primaryText="Login"
              onClick={() =>
                this.setState({
                  loggingIn: true,
                  signingUp: false,
                  open: false,
                })}
            />
          </Menu>
        );

      const logoutJSX =
        (
          <div>
            <ul className="nav-items">
              <li>
                <RaisedButton onClick={() => logout(socket.socket)}>Logout</RaisedButton>
              </li>
            </ul>
          </div>
        );

      return (
        <Paper
          style={{
            marginLeft: 'auto',
            textAlign: 'right',
          }}
        >

          <RaisedButton
            label="Signup/Login"
            onClick={(event) => this.setState({
              anchorEl: event.target,
              open: true,
            })}
          />
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
            open={this.state.open}
          >
            {this.props.loggedIn ? logoutJSX : signupLoginJSX}
         
          </Popover>

          <div className="form-container">
            {this.state.signingUp && !this.props.loggedIn ? <AuthForm type="signup" onComplete={signup} /> : null}
            {this.state.loggingIn ? <AuthForm type="login" onComplete={login} /> : null}
          </div>
        </Paper>
      );
    }
}

export default NavWrapper;

