import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AppBar } from 'material-ui';

import Room from '../room';
import Landing from '../landing';
import NavWrapper from '../material-ui/nav-wrapper';
import { setSocketAction } from '../../action/socket';

import './_app.scss';

class App extends Component {
  state = {};

  componentWillMount() {
    this.props.socketConnect();
  }
  
  
  render() {
    return (
      <Fragment>
        {/* <Fragment>
          <NavWrapper />
        </Fragment> */}
        <BrowserRouter>
          <div className="app">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/room" component={Room} />
            </Switch>
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
