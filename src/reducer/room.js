const emptyState = null;

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'ROOM_SET': {
      return payload;
    }
    case 'ROOM_REMOVE':
      return emptyState;
    case 'TOKEN_REMOVE':
      return emptyState;
    default:
      return state;
  }
};
