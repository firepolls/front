import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import PollItem from '../poll-item';

import './_poll-list.scss';

class PollList extends Component {
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.room && this.props.room !== nextProps.room) {
  //     const newPolls = [];
  //     // Kerry - Here we receive updates when a user creates a new poll
  //     // and push these results to an array that can then set state. 
  //     if (this.props.room.polls && nextProps.room) {
  //       nextProps.room.polls.forEach((polls, index) => {
  //         newPolls.push(nextProps.room.polls[index]);
  //         this.setState({
  //           polls: newPolls,
  //         });
  //       });
  //     }
  //   }
  // }

  render() {
    const { socket, room } = this.props;

    const {
      owner,
      polls,
      roomName,
    } = room;

    return ( 
    // Kerry - Here we are mapping each poll item as it is received from this UI state
    // or if the array is empty, it renders null
    // TODO: remember to remove pollid once back end attaches it to poll
      
      polls.map((poll, index) => 
        (
          <PollItem 
            key={Math.random()}
            pollId={index}
            poll={poll}
            owner={owner}
            roomName={roomName}
            socket={socket}
          />
        )
      )
    );
  }
}

const mapStateToProps = state => ({
  socket: state.socket,
  room: state.room,
});

export default connect(mapStateToProps)(PollList);
