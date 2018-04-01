import { AppBar } from 'material-ui';
import { connect } from 'react-redux';
import MetaTags from 'react-meta-tags';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './_app.scss';
import Room from '../room';
import Landing from '../landing';
import AuthRedirect from '../auth-redirect';
import SavedSessions from '../saved-sessions';
import { setTokenAction } from '../../action/auth';
import NavWrapper from '../material-ui/nav-wrapper';
import { setSocketAction } from '../../action/socket';
import { getSavedRoomsAction } from '../../action/savedRooms';

class App extends Component {
  componentWillMount() {
    this.props.socketConnect();
    const { firePollsToken } = localStorage;

    if (firePollsToken) {
      this.props.setToken(firePollsToken);
    }
  }

  componentDidMount() {
    const { firePollsToken } = localStorage;

    if (firePollsToken) {
      this.props.setToken(firePollsToken);
      this.props.getSavedRooms(firePollsToken);
    }
  }
  
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <div className="app">
            <NavWrapper />
            <MetaTags>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
            </MetaTags>
            <Fragment>
              <Route path="*" component={AuthRedirect} />
              <Route exact path="/" component={Landing} />
              <Route exact path="/room" component={Room} />
              <Route exact path="/saved" component={SavedSessions} />
            </Fragment>
          </div>
        </BrowserRouter>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  setToken: (token) => dispatch(setTokenAction(token)),
  socketConnect: () => dispatch(setSocketAction(dispatch)),
  getSavedRooms: (token) => dispatch(getSavedRoomsAction(token)),
}); 

export default connect(mapStateToProps, mapDispatchToProps)(App);
