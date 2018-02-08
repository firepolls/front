import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import Meter from '../meter';
import Voting from '../voting';
import { log } from '../../lib/util';

import './_poll-item.scss';

class PollItem extends Component {
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.poll !== nextProps.poll) {
  //     this.setState({
  //       poll: nextProps.poll,
  //     });
  //   }
  // }

  handleVoteSubmit = (vote) => {
    const { socket, roomName, pollId } = this.props;
    const voteData = {
      roomName,
      pollId,
      vote,
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
      // pollId, TODO: Poll id should come from owner when fixed on back end.
    } = poll;

    const votingJSX = !owner 
      ? <Voting handleVote={this.handleVoteSubmit} pollId={pollId} />
      : null;
    
    return (
      <Fragment>
        <h2>{ question }:</h2>
        { votingJSX }         
        <Meter results={results} />
      </Fragment>
    );
  }
}

export default PollItem;
