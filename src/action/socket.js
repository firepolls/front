import superagent from 'superagent';

export const setSocketAction = dispatch => ({
  // TODO: Rob - takes in dispatch as payload to eventually pass to listeners
  type: 'SOCKET_SET',
  payload: dispatch,
});

export const removeSocketAction = socket => ({
  type: 'SOCKET_REMOVE',
  payload: socket,
});
