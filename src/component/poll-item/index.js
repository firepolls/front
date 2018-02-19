import { connect } from 'react-redux';
import { Paper } from 'material-ui';
import React, { Component } from 'react';

import './_poll-item.scss';
import Meter from '../meter';
import Voting from '../voting';
import { log } from '../../lib/util';


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

    const resultsArray = Object.keys(results).map(key => results[key]);
    const totalVotes = resultsArray.reduce((a, b) => a + b);

    const votingJSX = !owner ? 
      <Voting handleVote={this.handleVoteSubmit} pollId={pollId} /> :
      null;

    return (
      <li className="poll-item">
        <Paper 
          className="question-container"
          zDepth={2}
        >
          <div className="meter-and-stars-container">
            <h2 className="question-render">{question}:</h2>
            <div>Votes: {totalVotes}</div>
            <div className="voting-container">
              {votingJSX}         
            </div>
            <div className="meter-and-stars">
              <Meter resultsArray={resultsArray} totalVotes={totalVotes} />
            </div>
          </div>
        </Paper>
      </li>
    );
  }
}

export default PollItem;
