export const createRoomAction = room => {
  // Rob - LS is used to handle room close errors
  if (room.owner) localStorage.fpOwned = room.roomName;
  else delete localStorage.fpOwned;

  return {
    type: 'ROOM_SET',
    payload: room,
  };
};

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
