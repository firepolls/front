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
    case 'POLL_CREATE': {
      const formattedPoll = Object.assign({}, payload, { pollId: state.polls.length });
      const updatedPolls = [...state.polls, formattedPoll];
      return Object.assign({}, state, { polls: updatedPolls });
    }
    case 'POLL_SET': {
      const updatedPolls = [...state.polls, payload];
      return Object.assign({}, state, { polls: updatedPolls });
    }
    case 'POLL_VOTE_INCREMENT': { 
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
    case 'POLL_VOTE_DECREMENT': { 
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
    case 'TOKEN_REMOVE':
      return emptyState;
    default:
      return state;
  }
};
