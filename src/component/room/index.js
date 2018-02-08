import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Poll from '../../socket/poll';
import PollList from '../poll-list';
import * as owner from '../../socket/owner';
import * as voter from '../../socket/voter';
import { addPollAction, createPollAction } from '../../action/room';
import AuthRedirect from '../auth-redirect';

import './_room.scss';

class Room extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('NEXT PROPS', nextProps);
    if (!nextProps.room) {
      this.props.history.push('/');
    }
  }

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
    const { room } = this.props;

    const ownerButtonJSX = (
      <Fragment>
        <RaisedButton onClick={this.handleAddPoll} >Add Poll</RaisedButton>
        <RaisedButton>Close</RaisedButton>
      </Fragment>);

    const voterButtonJSX = (
      <RaisedButton onClick={this.handleLeaveRoom}>
        Leave Room
      </RaisedButton>);

    const roomJSX = room ? (
      <Fragment>
        <h1>{room.roomName}</h1>
        {room.owner ? ownerButtonJSX : voterButtonJSX}
        {room.polls.length ? <PollList /> : null}
      </Fragment>)
      : <Route path="*" component={AuthRedirect} />;

      
    return roomJSX;
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
