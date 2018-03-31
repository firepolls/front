import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './_poll-list.scss';
import PollItem from '../poll-item';

class PollList extends Component {
  render() {
    const { room } = this.props;

    const {
      owner,
      polls,
      roomName,
    } = room;

    return ( 
      <ul className="poll-list">
        { polls.map(poll => 
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
                poll={poll}
                roomName={roomName}
                owner={owner}
              />
            </ReactCSSTransitionGroup>
          )
        )}
      </ul>
    );
  }
}

export default PollList;
