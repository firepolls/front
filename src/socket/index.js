import openSocket from 'socket.io-client';

import owner from './owner';
import voter from './voter';

export default dispatch => { // TODO: Rob - takes in dispatch to allow state changing
  const socket = openSocket(API_URL);

  owner(socket, dispatch);
  voter(socket, dispatch);

  return socket;
};
