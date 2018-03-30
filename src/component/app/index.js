import { AppBar } from 'material-ui';
import { connect } from 'react-redux';
import MetaTags from 'react-meta-tags';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Room from '../room';
import Landing from '../landing';
import AuthRedirect from '../auth-redirect';
import SavedSessions from '../saved-sessions';
import NavWrapper from '../material-ui/nav-wrapper';
import { setSocketAction } from '../../action/socket';
import { getSavedRoomsAction } from '../../action/savedRooms';

import './_app.scss';

class App extends Component {
  componentWillMount() {
    this.props.socketConnect();
  }

  componentDidMount() {
    const { token } = this.props;
    if (token) this.props.getSavedRooms(token);
  }
  
  render() {
    return (
      <Fragment>
        <NavWrapper />
        <BrowserRouter>
          <div className="app">
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
  socketConnect: () => dispatch(setSocketAction(dispatch)),
  getSavedRooms: (token) => dispatch(getSavedRoomsAction(token)),
}); 

export default connect(mapStateToProps, mapDispatchToProps)(App);
