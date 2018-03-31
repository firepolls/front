import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class AuthRedirect extends Component {
  render() {
    const { 
      room,
      history,
      location,
      loggedIn,
    } = this.props;

    const { pathname } = location;
    let destinationRoute = null;

    if (pathname === '/room') {
      if (!room) destinationRoute = '/';
    } else if (pathname === '/') {
      if (room) destinationRoute = '/room';
    } else if (room) {
      destinationRoute = '/room';
    } else if (pathname === '/saved') {
      if (!loggedIn) destinationRoute = '/';
    } else {
      destinationRoute = '/';
    }

    return (
      <div className="auth-redirect">
        {destinationRoute ? <Redirect to={destinationRoute} /> : null }
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  room: state.room,
  loggedIn: !!state.token, 
});

export default connect(mapStateToProps)(AuthRedirect);
