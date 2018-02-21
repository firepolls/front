import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
        { polls.map((poll, index) => 
          (
            <ReactCSSTransitionGroup
              key={poll.pollId}
              transitionName="fade"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >

              <PollItem 
                key={poll.pollId}
                poll={poll}
                owner={owner}
                roomName={roomName}
                socket={socket}
              />
            </ReactCSSTransitionGroup>
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
