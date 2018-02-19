import ReactStars from 'react-stars';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import './_voting.scss';
import { storeVoteAction } from '../../action/votes';

class Voting extends Component {
  state = {
    vote: this.props.votes[this.props.pollId] || 0,
  }

  handleVote = (vote) => {
    // Rob - only cast a vote if it is different
    if (vote !== this.state.vote) {
      this.setState({ vote });      
      const { pollId } = this.props;
      this.props.handleVote(vote, pollId);
      this.props.storeVote({ vote, pollId });
    }
  }

  render() { 
    return ( 
      <div className="react-stars-container">
        <ReactStars
          className="react-stars"
          count={4}
          onChange={this.handleVote}
          size={48}
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
