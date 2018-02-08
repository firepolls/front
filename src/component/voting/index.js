import { render } from 'react-dom';
import React, { Component } from 'react';
import ReactStars from 'react-stars';
import './_voting.scss';

class Voting extends Component {
  render() { 
    return ( 
      <div>
        <ReactStars
          count={4}
          onChange={() => console.log('Value changed')}
          size={24}
          half={false} 
          color2="orange"
        />
      </div>
    );
  }
}

export default Voting;
