import React, { Component, Fragment } from 'react';
// import PollItem from '../poll-item';


class PollList extends Component {
  state={};

  render() {
    const polls = [0, 1, 2, 3];

    return (
      <Fragment>
        {
          polls.map((poll, index) =>
            <h2 key={index}>Here we are.</h2>
          )
        }
      </Fragment>
    );
    // console.log('Hit the map.')
  }
}

export default PollList;


// <PollItem
//   key={pollId}
//   poll={poll}
