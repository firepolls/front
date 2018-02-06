import superagent from 'superagent';

export const setRoomAction = room => ({
  type: 'ROOM_SET',
  payload: room,
});

export const removeRoomAction = () => ({
  type: 'ROOM_REMOVE',
});

export const addPollAction = poll => ({
  type: 'POLL_SET',
  payload: poll,
});
