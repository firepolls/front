import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { log } from '../../lib/util';

import Meter from '../meter';
import Voting from '../voting';

import './_poll-item.scss';

class PollItem extends Component {
  state = {
    poll: {
      question: 'Test Question',
      results: {
        1: 10,
        2: 20,
        3: 30,
        4: 40,
      },
      id: 'FAKE ID',
      length: 1,
    },
  };


  // -----------------___LIFE-CYCLE HOOKS___-----------------

  componentWillReceiveProps(nextProps) {
    if (this.props.poll !== nextProps.poll) {
      this.setState({
        poll: nextProps.poll,
      });
    }
  }

  handleStopSubmit() {
    // on submit this needs to stop new votes from being rendered by changing a property on the object
  }

  render() {
    const starsJSX = this.props.owner ? <button> STOP POLL </button> : <Voting />;
    
    return (
      <Fragment>
        <header>{this.props.poll.question}:</header>
        {starsJSX}         
        <Meter results={this.state.poll.results} />
      </Fragment>
    );
  }
}

export default PollItem;
