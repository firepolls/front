import socket from '../lib/socket';

const emptyState = null;

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'SOCKET_SET':
      return socket(payload); 
      // TODO: Rob - passing payload is passing dispatch to the socket listeners
    case 'SOCKET_REMOVE':
      payload.disconnect();
      return emptyState;
    default:
      return state;
  }
};
