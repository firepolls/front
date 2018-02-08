import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { log } from '../../lib/util';

class AuthRedirect extends Component {
  render() {
    const { location, history, room } = this.props;
    const { pathname } = location;
    let destinationRoute = null;

    if (pathname === '/room' && !room) {
      destinationRoute = '/';
      log('__REDIRECT__');
    } else if (pathname === '/' && room) {
      destinationRoute = '/room';
      log('__REDIRECT__');
    }

    return (
      <div className="auth-redirect">
        {destinationRoute ? <Redirect to={destinationRoute} /> : null }
      </div>
    );
  }
}

const mapStateToProps = state => ({ room: state.room });

export default connect(mapStateToProps)(AuthRedirect);
