import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { log } from '../../lib/util';

import Meter from '../meter';
import Voting from '../voting';

import './_poll-item.scss';

class PollItem extends Component {
  state = {
    poll: {
      question: 'Test Question',
      results: {
        1: 10,
        2: 20,
        3: 30,
        4: 40,
      },
      id: 'FAKE ID',
      length: 1,
    },
  };


  // -----------------___LIFE-CYCLE HOOKS___-----------------

  componentWillReceiveProps(nextProps) {
    if (this.props.poll !== nextProps.poll) {
      this.setState({
        poll: nextProps.poll,
      });
    }
  }

  handleVoteSubmit = (vote) => {
    const { socket, room } = this.props;
    const voteData = {
      roomName: this.props.room.roomName,
      pollId: this.props.pollId,
      vote,
    };

    // console.log(voteData);
    socket.castVoteEmit(voteData);
  }

  render() {
    const starsJSX = this.props.owner ?
      <button> STOP POLL </button> :
      <Voting handleVote={this.handleVoteSubmit} pollId={this.props.pollId} />;
    
    return (
      <Fragment>
        <header>{this.props.poll.question}:</header>
        {starsJSX}         
        <Meter results={this.state.poll.results} />
      </Fragment>
    );
  }
}

export default PollItem;
