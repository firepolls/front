import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

import { AppBar } from 'material-ui';

import Room from '../room';
import Landing from '../landing';
import AuthRedirect from '../auth-redirect';
import NavWrapper from '../material-ui/nav-wrapper';
import { setSocketAction } from '../../action/socket';

import './_app.scss';

class App extends Component {
  componentWillMount() {
    this.props.socketConnect();
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
            </Fragment>
          </div>
        </BrowserRouter>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  socketConnect: () => dispatch(setSocketAction(dispatch)),
}); 

export default connect(null, mapDispatchToProps)(App);
