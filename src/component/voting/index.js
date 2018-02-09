import ReactStars from 'react-stars';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { storeVoteAction } from '../../action/votes';

import './_voting.scss';

class Voting extends Component {
  state = {
    vote: this.props.votes[this.props.pollId] || 0,
  }

  handleVote = (vote) => {
    const { pollId } = this.props;
    this.props.handleVote(vote, pollId);
    this.props.storeVote({ vote, pollId });
  }

  render() { 
    return ( 
      <div>
        <ReactStars
          count={4}
          onChange={this.handleVote}
          size={24}
          half={false} 
          color2="orange"
          value={this.state.vote}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  votes: state.votes,
});

const mapDispatchToProps = dispatch => ({
  storeVote: voteData => dispatch(storeVoteAction(voteData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Voting);
