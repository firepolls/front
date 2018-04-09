import { Paper } from 'material-ui';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import './_poll-item.scss';
import Meter from '../meter';
import Voting from '../voting';

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
      poll,
      owner,
    } = this.props;

    const {
      _id,
      pollId,
      results,
      question,
    } = poll;

    const resultsArray = Object.keys(results).map(key => results[key]);
    const totalVotes = resultsArray.reduce((a, b) => a + b);

    // Rob - _id indicates this is a saved result, so don't show the stars
    const votingJSX = (!owner && !_id) ? (
      <div className="voting-container">
        <Voting handleVote={this.handleVoteSubmit} pollId={pollId} />
      </div>
    ) :
      null;

    return (
      <li className="poll-item">
        <Paper 
          className="question-container"
          zDepth={2}
        >
          <div className="meter-and-stars-container">
            <h3 className="votes">Votes: {totalVote}</h3>
            <h2 className="question-render">{question}</h2>
            {votingJSX}
            <div className="meter-and-stars">
              <Meter resultsArray={resultsArray} totalVotes={totalVotes} />
            </div>
          </div>
        </Paper>
      </li>
    );
  }
}

const mapStateToProps = ({ socket }) => ({ socket });

export default connect(mapStateToProps)(PollItem);
