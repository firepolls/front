// TODO: Rob - Currently this holds all of the available logic
//             eventually this will need to be split up.

import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import AuthForm from '../auth-form';
import SocketForm from '../socket-form';
import { createRoomEmit, joinRoomEmit, sendPoll } from '../../lib/socket';
import { signupAction, loginAction, logoutAction } from '../../action/auth';

class Landing extends Component {
  state = {}; // only here to appease the linter

  render() {
    return (
      <Fragment>
        <h2>Signup</h2>
        <AuthForm type="signup" onComplete={this.props.signup} />
        <h2>Login</h2>
        <AuthForm type="login" onComplete={this.props.login} />
        <div>
          <h2>Logout</h2>
          <button onClick={() => this.props.logout(this.props.socket)}>Logout</button>
        </div>
        <h3>Create</h3>
        <SocketForm type="create" socket={this.props.socket} onComplete={createRoomEmit} />
        <h3>Join</h3>
        <SocketForm type="join" socket={this.props.socket} onComplete={joinRoomEmit} />
        <button onClick={() => sendPoll(this.props.socket)} >send poll</button>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signup: userData => dispatch(signupAction(userData)),
  login: userData => dispatch(loginAction(userData)),
  logout: socket => dispatch(logoutAction(socket)),
});

const mapStateToProps = state => ({
  socket: state.socket,
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
