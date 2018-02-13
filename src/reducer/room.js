const emptyState = null;

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'ROOM_SET':
      return payload;
    case 'ROOM_REMOVE':
      return emptyState;
    case 'ROOM_COUNT_INCREMENT':
      return state ? 
        Object.assign({}, state, { voters: state.voters + 1 }) :
        state;
    case 'ROOM_COUNT_DECREMENT':
      return state ?
        Object.assign({}, state, { voters: state.voters - 1 }) :
        state;
    case 'POLL_CREATE': {
      if (state) {
        const formattedPoll = Object.assign({}, payload, { pollId: state.polls.length });
        const updatedPolls = [...state.polls, formattedPoll];
        return Object.assign({}, state, { polls: updatedPolls });
      }
      return state;
    }
    case 'POLL_SET': {
      if (state) {
        const updatedPolls = [...state.polls, payload];
        return Object.assign({}, state, { polls: updatedPolls });
      }
      return state;
    }
    case 'POLL_VOTE_INCREMENT': {
      if (state) {
        const { pollId, vote } = payload;
        const updatedPolls = state.polls.map(poll => {
          let pollToReturn = null;
          if (poll.pollId === payload.pollId) {
            const updatedResults = Object.assign(
              {},
              poll.results,
              { [vote]: poll.results[vote] + 1 }
            );
            const updatedPoll = Object.assign({}, poll, { results: updatedResults });
            pollToReturn = updatedPoll;
          } else {
            pollToReturn = poll;
          }
          return pollToReturn;
        });
        return Object.assign({}, state, { polls: updatedPolls });
      }
      return state;
    }
    case 'POLL_VOTE_DECREMENT': {
      if (state) {
        const { pollId, lastVote } = payload;
        const updatedPolls = state.polls.map(poll => {
          let pollToReturn = null;
          if (poll.pollId === payload.pollId) {
            const updatedResults = Object.assign(
              {},
              poll.results,
              { [lastVote]: poll.results[lastVote] - 1 }
            );
            const updatedPoll = Object.assign({}, poll, { results: updatedResults });
            pollToReturn = updatedPoll;
          } else {
            pollToReturn = poll;
          }
          return pollToReturn;
        });
        return Object.assign({}, state, { polls: updatedPolls });
      }
      return state;
    }
    case 'TOKEN_REMOVE':
      return emptyState;
    default:
      return state;
  }
};
