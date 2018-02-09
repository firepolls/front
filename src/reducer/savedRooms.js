const emptyState = [];

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'SAVED_ROOM_SET':
      return [payload, ...state];
    case 'TOKEN_REMOVE':
      return emptyState;
    default:
      return state;
  }
};
