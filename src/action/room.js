import superagent from 'superagent';

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

export const addPollAction = poll => ({
  type: 'POLL_SET',
  payload: poll,
});

export const updatePollAction = poll => ({
  type: 'POLL_UPDATE',
  payload: poll,
});
