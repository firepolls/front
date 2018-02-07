import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AppBar } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import Room from '../room';
import Landing from '../landing';
import muiTheme from '../../styles/mui-theme';
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
      <div className="app">
        <MuiThemeProvider muiTheme={muiTheme}>
          <Fragment>
            <NavWrapper />
          </Fragment>
        </MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/room" component={Room} />
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
