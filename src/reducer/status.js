// Rob - This reducer is used for handling create/join errors

const initialState = {
  create: false,
  join: false,
  roomClosed: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ROOM_STATUS_SET':
      console.log({ ...initialState, [payload.type]: payload.roomName });
      return { ...initialState, [payload.type]: payload.roomName };
    case 'ROOM_CLOSED_SET':
      return { ...initialState, roomClosed: payload };
    case 'ROOM_SET':
      return initialState;
    case 'STATUS_REMOVE':
      return initialState;
    default:
      return state;
  }
};
