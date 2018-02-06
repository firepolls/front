import { combineReducers } from 'redux';

import room from './room';
import token from './auth';
import socket from './socket';
import profile from './profile';

export default combineReducers({
  room,
  token,
  socket,
  profile,
});
