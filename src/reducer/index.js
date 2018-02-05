import { combineReducers } from 'redux';

import token from './auth';
import socket from './socket';
import room from './room';

export default combineReducers({
  token,
  socket,
  room,
});
