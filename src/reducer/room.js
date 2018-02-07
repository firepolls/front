const emptyState = null;

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'ROOM_SET':
      return payload;
    case 'ROOM_REMOVE':
      return emptyState;
    case 'POLL_SET': {
      // Rob - make a new copy of existing polls, then add new poll
      const updatedPolls = [...state.polls, payload];
      const updatedState = Object.assign({}, state, { polls: updatedPolls });
      return updatedState;
    }
    case 'POLL_UPDATE': {
      // Rob - make a new copy of existing polls, then replace the changed poll with the updated one
      const updatedPolls = state.polls.map(poll =>
        (poll.id === payload.id ? payload : poll)
      );
      const updatedState = Object.assign({}, state, { polls: updatedPolls });
      return updatedState;
    }
    case 'TOKEN_REMOVE':
      return emptyState;
    default:
      return state;
  }
};
