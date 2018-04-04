export const setStatusAction = data => ({
  type: 'ROOM_STATUS_SET',
  payload: data,
});

export const roomClosedAction = roomNameRaw => ({
  type: 'ROOM_CLOSED_SET',
  payload: roomNameRaw,
});

export const removeStatusAction = () => ({
  type: 'STATUS_REMOVE',
});
