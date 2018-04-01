import { combineReducers } from 'redux';

import room from './room';
import token from './auth';
import votes from './votes';
import socket from './socket';
import status from './status';
import profile from './profile';
import savedRooms from './savedRooms';

export default combineReducers({
  room,
  token,
  votes,
  status,
  socket,
  profile,
  savedRooms,
});
