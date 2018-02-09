import { connect } from 'react-redux';
import { Paper } from 'material-ui';
import React, { Component, Fragment } from 'react';

import Meter from '../meter';
import Voting from '../voting';
import { log } from '../../lib/util';

import './_poll-item.scss';

class PollItem extends Component {
  handleVoteSubmit = (vote) => {
    const { socket, roomName, pollId } = this.props;
    const voteData = {
      vote,
      pollId,
      roomName,
    };

    socket.castVoteEmit(voteData);
  }

  render() {
    const {
      pollId,
      owner,
      poll,
    } = this.props;

    const {
      question,
      results,
      // pollId, TODO: Rob - pollId should come from poll when fixed on back end
    } = poll;

    const votingJSX = !owner ? 
      (
        // <Paper
        //   zDepth={2}
        // >
          <Voting handleVote={this.handleVoteSubmit} pollId={pollId} />
        // </Paper>
      ) :
      null;

    return (
      <Fragment>
        <Paper
          className="meter-and-stars-container"
          zDepth={2}
        >
          <h2 className="question-render">{question}:</h2>
          <div className="voting-container">
            {votingJSX}         
          </div>
          <div className="meter-and-stars">
            <Meter results={results} />
          </div>
        </Paper>
      </Fragment>
    );
  }
}

export default PollItem;
