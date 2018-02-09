import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { RaisedButton, FlatButton, Dialog } from 'material-ui';

import './_room.scss';
import PollList from '../poll-list';
import Poll from '../../socket/poll';
import SocketForm from '../socket-form';
import * as owner from '../../socket/owner';
import * as voter from '../../socket/voter';
import { createPollAction, removeRoomAction } from '../../action/room';

class Room extends Component {
  state = {
    open: false,
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.room) {
      this.props.history.push('/');
    }
  }

  handleToggle = () => {
    this.setState(previousState => ({
      open: !previousState.open,
    }));
  }

  handleAddPoll = question => {
    const { socket } = this.props;
    const poll = new Poll(question);
    // Anthony - emit poll to voters
    socket.createPollEmit(question);
    // Anthony - add poll to state
    this.props.createPoll(poll);
  };
  
  handleLeaveRoom = () => {
    const { socket, room } = this.props;
    socket.leaveRoomEmit(room.roomName);
  }

  handleCloseRoom = () => {
    const { socket } = this.props;
    socket.closeRoomEmit();
  }

  render() {
    const { room, socket } = this.props;
    const ownerJSX = (
      <Fragment>
        <SocketForm 
          className="create-poll-form"
          type="create"
          fieldVar="poll"
          placeholderPartial="Poll"
          onComplete={this.handleAddPoll} 
        />
        <RaisedButton 
          className="close-save-button"
          onClick={this.handleToggle}
          label="Close or Save" 
        />
      </Fragment>);

    const voterButtonJSX = (
      <RaisedButton 
        onClick={this.handleLeaveRoom} 
        label="Leave Room"
      />
    );

    // Rob - Don't try to access properties on room if it is null
    const roomJSX = room ? (
      <Fragment>
        <h1>{room.roomName}</h1>
        <div className="active-voters">
          Active voters: {room && room.voters > 0 ? room.voters : 0}
        </div>
        {room.owner ? ownerJSX : voterButtonJSX}
        {room.polls.length ? <PollList /> : null}
      </Fragment>) : null;
      
    const modal = (
      <Dialog
        className="close-save"
        title="Would you like to save your session?"
        modal={true}
        open={this.state.open}
      >
        <div className="cancel">
          <FlatButton
            onClick={this.handleToggle}
            label="x"
          />
        </div>
        <RaisedButton 
          onClick={this.props.removeRoom}
          label="Discard"
          style={{ margin: '10px' }}
        />
        <RaisedButton 
          onClick={this.handleSave}
          label="save"
          style={{ margin: '10px' }}
        />
      </Dialog>
    );

    return (
      <Fragment>
        { roomJSX }
        { modal }
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createPoll: poll => dispatch(createPollAction(poll)),
  removeRoom: () => dispatch(removeRoomAction()),
});

const mapStateToProps = state => ({
  socket: state.socket,
  room: state.room,
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
