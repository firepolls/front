// TODO: Rob - Currently this holds all of the available logic
//             eventually this will need to be split up.

import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import AuthForm from '../auth-form';
import Poll from '../../socket/poll';
import SocketForm from '../socket-form';
import { addPollAction } from '../../action/room';
import { signupAction, loginAction, logoutAction } from '../../action/auth';

class Landing extends Component {
  state = {}; // only here to appease the linter

  handleAddPoll = () => {
    const { socket } = this.props;
    const question = prompt('type your question');
    const poll = new Poll(question);
    // Anthony - emit poll to voters
    socket.createPoll(poll);
    // Anthony - add poll to state
    this.props.addPoll(poll);
  };

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
        <h3>Join</h3>
        <SocketForm type="join" onComplete={socket.joinRoomEmit} />
        <button onClick={this.handleAddPoll} >send poll</button>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
