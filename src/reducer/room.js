const emptyState = null;

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'ROOM_SET':
      return payload;
    case 'ROOM_REMOVE':
      return emptyState;
    case 'ROOM_COUNT_INCREMENT':
      return Object.assign({}, state, { voters: state.voters + 1 });
    case 'ROOM_COUNT_DECREMENT':
      return Object.assign({}, state, { voters: state.voters - 1 });
    case 'POLL_SET': {
      // Rob - make a new copy of existing polls, then add new poll
      const updatedPolls = [...state.polls, payload];
      return Object.assign({}, state, { polls: updatedPolls });
    }
    case 'POLL_UPDATE': {
      // Rob - make a new copy of existing polls, then replace the changed poll with the updated one
      const updatedPolls = state.polls.map(poll =>
        (poll.id === payload.id ? payload : poll)
      );
      return Object.assign({}, state, { polls: updatedPolls });
    }
    case 'TOKEN_REMOVE':
      return emptyState;
    default:
      return state;
  }
};
