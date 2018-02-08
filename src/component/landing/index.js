// TODO: Rob - Currently this holds all of the available logic
//             eventually this will need to be split up.

import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import AuthForm from '../auth-form';
import Poll from '../../socket/poll';
import PollList from '../poll-list';

import SocketForm from '../socket-form';
import { addPollAction } from '../../action/room';
import { signupAction, loginAction, logoutAction } from '../../action/auth';

import './_landing.scss';

class Landing extends Component { 
  state = {};// only here to appease the linter

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

    return (
      <Fragment>
        <h2>Signup</h2>
        <AuthForm type="signup" onComplete={signup} />
        <h2>Login</h2>
        <AuthForm type="login" onComplete={login} />
        <div>
          <h2>Logout</h2>
          <button onClick={() => logout(socket.socket)}>Logout</button>
        </div>
        <h3>Create</h3>
        <SocketForm type="create" onComplete={socket.createRoomEmit} />
        { /* Rob - On close room click need to show modal to optionally save results,
        then dispatch room remove action */ }
        <button onClick={socket.closeRoomEmit}>Close Room</button>
        <h3>Join</h3>
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
  socket: state.socket,
  room: state.room,
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
