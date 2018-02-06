const emptyState = null;

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'ROOM_SET':
      return payload;
    case 'ROOM_REMOVE':
      return emptyState;
    case 'POLL_SET': {
      const updatedPolls = [...state.polls, payload];
      const updatedState = Object.assign({}, state, { polls: updatedPolls });
      return updatedState;
    }
    case 'TOKEN_REMOVE':
      return emptyState;
    default:
      return state;
  }
};
