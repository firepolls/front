import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { RaisedButton, TextField } from 'material-ui';

import AuthForm from '../auth-form';
import PollList from '../poll-list';
import Poll from '../../socket/poll';
import SocketForm from '../socket-form';
import { addPollAction } from '../../action/room';
import { signupAction, loginAction, logoutAction } from '../../action/auth';

import './_landing.scss';

class Landing extends Component { 
  state = {
    signingUp: false,
    loggingIn: false,
  };

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
      <Fragment>
        <div className="header">
          <div className="container-fluid">
            <a href="http://www.google.com"><h1 className="logo"><span>F</span></h1></a>
            <ul>
              <li><a className="sign-up" href="http://www.google.com">Sign Up</a></li>
              <li><a className="sign-up" href="http://www.google.com">Login</a></li>
            </ul>
          </div>
        </div>
        <div 
          className="signup-login" 
          style={{
            backgroundColor: 'green',
          }}
        >
          {this.props.loggedIn ? logoutJSX : signupLoginJSX}
          {this.state.signingUp ? <AuthForm type="signup" onComplete={signup} /> : null}
          {this.state.loggingIn ? <AuthForm type="login" onComplete={login} /> : null}
        </div>

        <h3>Create Room</h3>

        <SocketForm type="create" onComplete={socket.createRoomEmit} />

        {/* TODO: Move this close room button to the Room component */}
        {/* <RaisedButton onClick={socket.closeRoomEmit}>Close Room</RaisedButton> */}

        <h3>Join Room</h3>
  
        <SocketForm type="join" onComplete={socket.joinRoomEmit} />
      </Fragment>
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
