import Socket from '../socket';

const emptyState = null;

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'SOCKET_SET':
      return new Socket(payload);
    case 'SOCKET_REMOVE':
      payload.disconnect();
      return emptyState;
    default:
      return state;
  }
};
