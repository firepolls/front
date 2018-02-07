import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthForm from '../auth-form';
import Poll from '../../socket/poll';
import PollList from '../poll-list';

import SocketForm from '../socket-form';
import * as owner from '../../socket/owner';
import * as voter from '../../socket/voter';
import { addPollAction } from '../../action/room';
import { signupAction, loginAction, logoutAction } from '../../action/auth';

import './_room.scss';

class Room extends Component {
  state = {};

  render() {
    return (
      <PollList room={this.props.room} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Room);
