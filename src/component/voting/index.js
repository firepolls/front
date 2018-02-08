import ReactStars from 'react-stars';
import React, { Component } from 'react';

import './_voting.scss';

class Voting extends Component {
  handleVote = (vote) => {
    this.props.handleVote(vote, this.props.pollId);
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
        />
      </div>
    );
  }
}

export default Voting;
