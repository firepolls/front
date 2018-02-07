import React, { Component, Fragment } from 'react';
import PollItem from '../poll-item';

import './_poll-list.scss';

class PollList extends Component {
  state={
    polls: [],
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.room && this.props.room !== nextProps.room) {
      const newPolls = [];
      console.log('rooms', this.props);
      // Kerry - Here we receive updates when a user creates a new poll
      // and push these results to an array that can then set state. 
      if (this.props.room.polls && nextProps.room) {
        nextProps.room.polls.forEach((polls, index) => {
          newPolls.push(nextProps.room.polls[index]);
          this.setState({
            polls: newPolls,
          });
        });
      }
    }
  }

  render() {
    const {
      polls,
    } = this.state;
 
    return ( 
      // Kerry - Here we are mapping each poll item as it is received from this UI state
      // or if the array is empty, it renders null
      this.props.room && this.state.polls[0] !== undefined ?
        polls.map((poll) => 
          (
            <PollItem key={poll.id} poll={poll} />
          )
        )
        : null
    );
  }
}

export default PollList;

