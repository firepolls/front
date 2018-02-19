import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';

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
      <ul className="poll-list">
        <TransitionGroup component={PollList}>
          { polls.map((poll, index) => 
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
        </TransitionGroup>
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  room: state.room,
  socket: state.socket,
});

export default connect(mapStateToProps)(PollList);
