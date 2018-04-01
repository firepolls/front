// import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
// import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Paper } from 'material-ui';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './_instruction.scss';

class Instruction extends Component {
  render() {
    const {
      content,
    } = this.props;

    const redShadowStyle = { boxShadow: '0 2px 6px rgba(255, 0, 0, 0.12), 0 2px 4px rgba(255, 0, 0, 0.12)' };    

    return (
      <Paper
        className="instruction"
        style={redShadowStyle}
      >
        { content }
      </Paper>
    );
  }
}

export default Instruction;
