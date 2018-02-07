import { connect } from 'react-redux';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from '../landing';
import { setSocketAction } from '../../action/socket';

import './_app.scss';

class App extends Component {
  state = {};

  componentDidMount() {
    this.props.socketConnect();
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  socketConnect: () => dispatch(setSocketAction(dispatch)),
}); 

export default connect(null, mapDispatchToProps)(App);
