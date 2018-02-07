export const setSocketAction = dispatch => ({
  // Rob - takes in dispatch as payload to pass to listeners
  type: 'SOCKET_SET',
  payload: dispatch,
});

export const removeSocketAction = socket => ({
  type: 'SOCKET_REMOVE',
  payload: socket,
});
