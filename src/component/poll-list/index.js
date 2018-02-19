import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import PollItem from '../poll-item';

import './_poll-list.scss';

class PollList extends Component {
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
      // TODO: Remember to remove pollId once back end attaches it to poll
      <ul className="poll-list">
        {polls.map((poll, index) => 
          (
            <PollItem 
              key={poll.pollId}
              poll={poll}
              owner={owner}
              roomName={roomName}
              socket={socket}
            />
          )
        )}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  room: state.room,
  socket: state.socket,
});

export default connect(mapStateToProps)(PollList);
