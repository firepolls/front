// TODO: ADD INTRUSTIONS for owner/voter when poll list is empty

import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { RaisedButton, FlatButton, Dialog, Paper } from 'material-ui';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './_room.scss';
import PollList from '../poll-list';
import Poll from '../../socket/poll';
import SocketForm from '../socket-form';
import * as owner from '../../socket/owner';
import * as voter from '../../socket/voter';
import { saveRoomAction } from '../../action/savedRooms';
import { createPollAction, removeRoomAction } from '../../action/room';

class Room extends Component {
  state = {
    modalOpen: false,
    alertOpen: false,
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.room && !nextProps.savedRoom) {
      this.props.history.push('/');
    }
  }

  handleToggle = type => {
    this.setState(previousState => ({
      [`${type}Open`]: !previousState[`${type}Open`],
    }));
  };

  toggleModal = () => this.handleToggle('modal');

  toggleAlert = () => this.handleToggle('alert');

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
  };

  handleRemoveRoom = () => {
    const { socket } = this.props;
    socket.closeRoomEmit();
    this.props.removeRoom();
  };

  handleSave = () => {
    if (this.props.token) {
      const { socket, token, room } = this.props;
      this.props.saveRoom({ token, roomData: room });
      socket.closeRoomEmit();
      this.props.removeRoom();
    } else {
      this.toggleAlert();
    }
    this.toggleModal();
  };

  render() {
    const { 
      room,
      socket, 
      savedRoom, 
    } = this.props;

    const redShadowStyle = { boxShadow: '0 2px 6px rgba(255, 0, 0, 0.12), 0 2px 4px rgba(255, 0, 0, 0.12)' };

    // Seth - Instructions for if the room exists but no polls exist yet
    const ownerInstructionJSX = 'Create your first poll above...';

    const voterInstructionJSX = 'Please wait for the Room Owner to create a poll...';

    const instructionJSX = room && !room.polls.length ? (
      <Paper
        className="instructions"
        style={redShadowStyle}
      >
        {room.owner ? ownerInstructionJSX : voterInstructionJSX }
      </Paper>
    ) : null;

    const ownerJSX = (
      <Fragment>
        <RaisedButton 
          className="close-save-button"
          onClick={this.toggleModal}
          label="Close Room" 
        />
        <div className="create-poll-form">
          <SocketForm 
            type="create"
            fieldVar="poll"
            placeholderPartial="Poll"
            onComplete={this.handleAddPoll} 
          />
        </div>
      </Fragment>);

    const voterButtonJSX = (
      <RaisedButton
        className="close-save-button"       
        onClick={this.handleLeaveRoom} 
        label="Leave Room"
      />
    );

    // Rob - Don't try to access properties on room if it is null
    const roomJSX = room ? (
      <Fragment>
        <h1>{room.roomName}</h1>
        <section className="info-button-container">
          <Paper 
            className="active-voters" 
            zDepth={1}
          >
          Active Voters: {room && room.voters > 0 ? <strong>{room.voters}</strong> : 0}
          </Paper>
          {room.owner ? ownerJSX : voterButtonJSX}
          {instructionJSX}
        </section>

        {room.polls.length ?
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <PollList room={room} />
          </ReactCSSTransitionGroup>                  
          : null}
      </Fragment>) : null;

    const savedRoomJSX = savedRoom ? (
      <Fragment>
        <h1>{savedRoom.roomName}</h1>
        {savedRoom.polls.length ?
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <PollList room={savedRoom} />
          </ReactCSSTransitionGroup>                  
          : null}
      </Fragment>) : null;
      
    const modal = (
      <Dialog
        className="close-save"
        title="Would you like to save your session?"
        open={this.state.modalOpen}
        onRequestClose={this.toggleModal}
      >
        <RaisedButton 
          onClick={this.handleRemoveRoom}
          label="Discard"
          style={{ margin: '10px' }}
        />
        <RaisedButton 
          onClick={this.handleSave}
          label="Save and exit"
          style={{ margin: '10px' }}
        />
      </Dialog>
    );

    const alert = (
      <Dialog
        open={this.state.alertOpen}
        onRequestClose={this.toggleAlert}
        title="Error: You must be signed in to save your session."
      >
        <RaisedButton 
          onClick={this.toggleAlert}
          label="OK"
        />
      </Dialog>
    );

    const liveRoomJSX = (
      <Fragment>
        { roomJSX }
        { modal }
        { alert }
      </Fragment>
    );

    return (
      <Fragment>
        { savedRoom ? savedRoomJSX : liveRoomJSX }
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createPoll: poll => dispatch(createPollAction(poll)),
  removeRoom: () => dispatch(removeRoomAction()),
  saveRoom: (postObject) => dispatch(saveRoomAction(postObject)),
});

const mapStateToProps = state => ({
  socket: state.socket,
  token: state.token,
  room: state.room,
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
