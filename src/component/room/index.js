import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import React, { Component, Fragment } from 'react';

import Poll from '../../socket/poll';
import PollList from '../poll-list';
import * as owner from '../../socket/owner';
import * as voter from '../../socket/voter';
import { addPollAction, createPollAction } from '../../action/room';

import './_room.scss';

class Room extends Component {
  state = {
  };

  handleAddPoll = () => {
    const { socket } = this.props;
    const question = prompt('type your question');
    const poll = new Poll(question);
    // Anthony - emit poll to voters
    // Rob - MUST SEND JUST A QUESTION
    socket.createPollEmit(question);
    // Anthony - add poll to state
    this.props.addPoll(poll);
  };
  
  handleLeaveRoom = () => {
    const { socket, room } = this.props;
    socket.leaveRoomEmit(room.roomName);
  }
 
  render() {
    const buttonJSX = this.props.room.owner ?
      (
        <Fragment>
          <RaisedButton onClick={this.handleAddPoll} >NEW POLL</RaisedButton>
          <RaisedButton>SAVE</RaisedButton>
          <RaisedButton>CLOSE</RaisedButton>
        </Fragment>
      )
      : null;

    return (
      <Fragment>
        <h1>{this.props.room.roomName}</h1>
        <h2>{/* TODO: Placeholder for room description */}</h2>
        {buttonJSX}
        <PollList room={this.props.room} socket={this.props.socket} />
        <button onClick={this.handleLeaveRoom}>LEAVE ROOM IF A VOTER</button>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addPoll: poll => dispatch(createPollAction(poll)),
});

const mapStateToProps = state => ({
  socket: state.socket,
  room: state.room,
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
