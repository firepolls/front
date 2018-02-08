import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class AuthRedirect extends Component {
  render() {
    const { location, history, room } = this.props;
    const { pathname } = location;
    let destinationRoute = null;

    if (['/room'].includes(pathname)) {
      if (!room) destinationRoute = '/';
    } else {
      destinationRoute = '/room';
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
