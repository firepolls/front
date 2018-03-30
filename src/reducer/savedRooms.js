const emptyState = [];

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'SAVED_ROOM_SET':
      return [...state, payload];
    case 'ALL_SAVED_ROOMS_SET':
      return payload;
    case 'TOKEN_REMOVE':
      return emptyState;
    default:
      return state;
  }
};
