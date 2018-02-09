import { combineReducers } from 'redux';

import room from './room';
import token from './auth';
import votes from './votes';
import socket from './socket';
import status from './status';
import profile from './profile';

export default combineReducers({
  token,
  profile,
  room,
  socket,
  status,
  votes,
});
