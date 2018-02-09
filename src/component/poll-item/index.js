import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import Meter from '../meter';
import Voting from '../voting';
import { log } from '../../lib/util';

import './_poll-item.scss';

class PollItem extends Component {
  handleVoteSubmit = (vote) => {
    const { socket, roomName } = this.props;
    const { pollId } = this.props.poll;
    const voteData = {
      vote,
      pollId,
      roomName,
    };

    socket.castVoteEmit(voteData);
  }

  render() {
    const {
      owner,
      poll,
    } = this.props;

    const {
      question,
      results,
      pollId,
    } = poll;

    const votingJSX = !owner ? 
      <Voting handleVote={this.handleVoteSubmit} pollId={pollId} /> :
      null;

    return (
      <Fragment>
        <h2>{question}:</h2>
        {votingJSX}         
        <Meter results={results} />
      </Fragment>
    );
  }
}

export default PollItem;
