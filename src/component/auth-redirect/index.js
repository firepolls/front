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

    const parts = pathname.split('/').filter(x => x);

    const toHome = (pathname === '/saved' && !loggedIn) ||
      (parts.length === 1 && pathname !== '/saved') ||
      (parts.length === 2 && !pathname.startsWith('/room/')) ||
      (parts.length > 2);

    if (toHome) destinationRoute = '/';

    return (
      <div className="auth-redirect">
        {destinationRoute ? <Redirect to={destinationRoute} /> : null }
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  loggedIn: !!state.token, 
});

export default connect(mapStateToProps)(AuthRedirect);
