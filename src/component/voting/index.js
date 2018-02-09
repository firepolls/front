import ReactStars from 'react-stars';
import React, { Component } from 'react';

import './_voting.scss';

class Voting extends Component {
  handleVote = (vote) => {
    this.props.handleVote(vote, this.props.pollId);
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
        />
      </div>
    );
  }
}

export default Voting;
