import React, { Component, Fragment } from 'react';
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
  state = {
  };

  handleAddPoll = () => {
    const question = prompt('type your question');
    const poll = new Poll(question);
    // Anthony - emit poll to voters
    owner.createPoll(this.props.socket, poll);
    // Anthony - add poll to state
    this.props.addPoll(poll);
  };
 
  render() {
    const buttonJSX = this.props.room.owner ?
      (
        <Fragment>
          <button onClick={this.handleAddPoll} >NEW POLL</button>
          <button>SAVE</button>
          <button>CLOSE</button>
        </Fragment>
      )
      : null;

    return (
      <Fragment>
        <h1>{this.props.room.name}</h1>
        <h2>{/* TODO: Placeholder for room description */}</h2>
        {buttonJSX}
        <PollList room={this.props.room} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Room);
