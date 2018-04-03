// Rob - This is the meat. Full room object.

const emptyState = null;

// Rob - Curried function used for incrementing a vote
//     - There must be a better way...
const voteChange = (value) => (state, payload) => {
  if (state) {
    const { pollId, vote, lastVote } = payload;
    const updatedPolls = state.polls.map(poll => {
      let pollToReturn = null;
      if (poll.pollId === payload.pollId) {
        const voteToChange = value > 0 ? vote : lastVote;
        const updatedResults = Object.assign(
          {},
          poll.results,
          { [voteToChange]: poll.results[voteToChange] + value }
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
};

const voteIncrement = voteChange(1);
const voteDecrement = voteChange(-1);

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'ROOM_SET':
      return payload;
    case 'ROOM_REMOVE':
      return emptyState;
    case 'ROOM_COUNT_INCREMENT':
      // The ternary ensures that votes don't trickle in after the room has been closed
      return state ? 
        Object.assign({}, state, { voters: state.voters + 1 }) :
        state;
    case 'ROOM_COUNT_DECREMENT':
      return state ?
        Object.assign({}, state, { voters: state.voters - 1 }) :
        state;
    case 'POLL_CREATE': {
      // Rob - This happens when an owner creates a new poll
      if (state) {
        const formattedPoll = Object.assign({}, payload, { pollId: state.polls.length });
        const updatedPolls = [...state.polls, formattedPoll];

        return Object.assign({}, state, { polls: updatedPolls });
      }
      return state;
    }
    case 'POLL_SET': {
      // Rob - This happens when a voter receives a new poll
      if (state) {
        const updatedPolls = [...state.polls, payload];
        return Object.assign({}, state, { polls: updatedPolls });
      }
      return state;
    }
    case 'POLL_VOTE_INCREMENT':
      return voteIncrement(state, payload);
    case 'POLL_VOTE_DECREMENT':
      return voteDecrement(state, payload);
    default:
      return state;
  }
};
