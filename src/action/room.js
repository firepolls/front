export const createRoomAction = room => ({
  type: 'ROOM_SET',
  payload: room,
});

export const incrementVoterCountAction = () => ({
  type: 'ROOM_COUNT_INCREMENT',
});

export const decrementVoterCountAction = () => ({
  type: 'ROOM_COUNT_DECREMENT',
});

export const removeRoomAction = () => ({
  type: 'ROOM_REMOVE',
});

// Rob - pollData is { pollId, vote }
export const incrementVoteAction = pollData => ({
  type: 'POLL_VOTE_INCREMENT',
  payload: pollData,
});

// Rob - pollData is { pollId, lastVote }
export const decrementVoteAction = pollData => ({
  type: 'POLL_VOTE_DECREMENT',
  payload: pollData,
});

export const addPollAction = poll => ({
  type: 'POLL_SET',
  payload: poll,
});

export const createPollAction = poll => ({
  type: 'POLL_CREATE',
  payload: poll,
});
