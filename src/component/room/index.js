import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { RaisedButton, Dialog, Paper } from 'material-ui';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './_room.scss';
import PollList from '../poll-list';
import Poll from '../../socket/poll';
import SocketForm from '../socket-form';
import { saveRoomAction } from '../../action/savedRooms';
import { createPollAction, removeRoomAction } from '../../action/room';

class Room extends Component {
  state = {
    modalOpen: false,
    alertOpen: false,
  }

  componentWillMount() {
    // Rob - This hook tries to fetch the someRoom when navigating directly to /room/someRoom
    const getARoom = this.props.location && !this.props.room;

    if (getARoom) {
      const { roomName } = this.props.match.params;
      this.props.socket.joinRoomEmit(roomName);
    }
  }


  componentWillReceiveProps({ status, room }) {
    // Rob - status.join indicates user navigated to /room/someRoomThatDoesn'tExists
    // Rob - !room indicates that the owner closed the room
    if (status.join || !room) this.props.history.push('/');
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

    // Seth - Instructions for if the room exists but no polls exist yet
    const ownerInstructionJSX = (
      <Fragment>      
        <p>Create your first poll above...</p>
        <p>
          <strong>Note:</strong> Refreshing the page will close the Room and remove all Voters.
        </p>
      </Fragment>);

    const voterInstructionJSX = (
      <Fragment>
        <p>Please wait for the Room Owner to create a poll...</p>
        <p>
          <strong>Note:</strong> Refreshing the page will remove you from the room.
        </p>
      </Fragment>);

    const instructionText = room && room.owner ? ownerInstructionJSX : voterInstructionJSX;

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
        <h1>{room.roomNameRaw}</h1>
        <section className="info-button-container">
          <Paper 
            className="active-voters" 
            zDepth={1}
          >
          Active Voters: {room && room.voters > 0 ? <strong>{room.voters}</strong> : 0}
          </Paper>
          {room.owner ? ownerJSX : voterButtonJSX}
          {room && !room.polls.length ? (
            <Paper
              zDepth={2}
              className="instruction"
            >
              {instructionText}
            </Paper>) : null}
        </section>

        {room.polls.length ?
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionAppearTimeout={500}
          >
            <PollList room={room} />
          </ReactCSSTransitionGroup>                  
          : null}
      </Fragment>) : null;

    const savedRoomJSX = savedRoom ? (
      <Fragment>
        <h1>{savedRoom.roomNameRaw}</h1>
        {savedRoom.polls.length ?
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionAppearTimeout={500}
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
  removeRoom: () => dispatch(removeRoomAction()),
  createPoll: poll => dispatch(createPollAction(poll)),
  saveRoom: postObject => dispatch(saveRoomAction(postObject)),
});

const mapStateToProps = state => ({
  room: state.room,
  token: state.token,
  socket: state.socket,
  status: state.status,
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
