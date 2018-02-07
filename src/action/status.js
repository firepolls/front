export const setStatusAction = data => ({
  type: 'ROOM_STATUS_SET',
  payload: data,
});

export const removeStatusAction = () => ({
  type: 'STATUS_REMOVE',
});
