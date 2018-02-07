// TODO: Rob - Currently this holds all of the available logic
//             eventually this will need to be split up.

import { RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AuthForm from '../auth-form';
import Poll from '../../socket/poll';
import PollList from '../poll-list';
import muiTheme from '../../styles/mui-theme';

import SocketForm from '../socket-form';
import { addPollAction } from '../../action/room';
import { signupAction, loginAction, logoutAction } from '../../action/auth';

import './_landing.scss';

class Landing extends Component { 
  state = {
    signingUp: false,
    loggingIn: false,
  };// only here to appease the linter

  componentWillReceiveProps(nextProps) {
    if (nextProps.room) {
      this.props.history.push('/room');
    }
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
        <div>
          <h2>Signup</h2>
          <RaisedButton onClick={() => 
            this.setState({
              signingUp: true,
              loggingIn: false,
            })}
          >Signup
          </RaisedButton>

          <h2>Login</h2>
          <RaisedButton onClick={() =>
            this.setState({
              loggingIn: true,
              signingUp: false,
            })}
          >Login
          </RaisedButton>
        </div>
      );
    
    const logoutJSX =
      (
        <div>
          <h2>Logout</h2>
          <RaisedButton onClick={() => logout(socket.socket)}>Logout</RaisedButton>
        </div>
      );
    
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Fragment>
          {this.props.loggedIn ? logoutJSX : signupLoginJSX}
          {this.state.signingUp ? <AuthForm type="signup" onComplete={signup} /> : null}
          {this.state.loggingIn ? <AuthForm type="login" onComplete={login} /> : null}

          <h3>Create</h3>
          <SocketForm type="create" onComplete={socket.createRoomEmit} />
          <button onClick={socket.closeRoomEmit}>Close Room</button>
          <h3>Join</h3>
          <SocketForm type="join" onComplete={socket.joinRoomEmit} />
        </Fragment>
      </MuiThemeProvider>

      // TODO: These should go into a Signup/Login Modal
    // {/* <AuthForm type="signup" onComplete={signup} />  */}
        
    // {/* <AuthForm type="login" onComplete={login} /> */}
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signup: userData => dispatch(signupAction(userData)),
  login: userData => dispatch(loginAction(userData)),
  logout: socket => dispatch(logoutAction(socket)),
  addPoll: poll => dispatch(addPollAction(poll)),
});

const mapStateToProps = state => ({
  loggedIn: !!state.token,
  socket: state.socket,
  room: state.room,
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
