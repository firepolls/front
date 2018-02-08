import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './style/main.scss';
import reducer from './reducer';
import App from './component/app';
import muiTheme from './style/mui-theme';
import thunk from './middleware/redux-thunk';
import reporter from './middleware/redux-reporter';

const store = process.env.NODE_ENV === 'production' ?
  createStore(reducer, applyMiddleware(thunk)) :
  createStore(reducer, composeWithDevTools(applyMiddleware(reporter, thunk)));

const container = document.createElement('main');
document.body.appendChild(container);

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store} >
      <App /> 
    </Provider>
  </MuiThemeProvider>, container
);
