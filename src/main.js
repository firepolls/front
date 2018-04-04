import React from 'react';
import { Provider } from 'react-redux';
import { render as renderDOM } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { composeWithDevTools } from 'redux-devtools-extension';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './style/main.scss';
import reducer from './reducer';
import App from './component/app';
import muiTheme from './style/mui-theme';
import thunk from './middleware/redux-thunk';
import reporter from './middleware/redux-reporter';

injectTapEventPlugin();

const store = process.env.NODE_ENV === 'production' ?
  createStore(reducer, applyMiddleware(thunk)) :
  createStore(reducer, composeWithDevTools(applyMiddleware(thunk, reporter)));

const container = document.createElement('main');
document.body.appendChild(container);

renderDOM(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store} >
      <App /> 
    </Provider>
  </MuiThemeProvider>, container
);
