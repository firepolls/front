// Rob - This reducer is used for handling create/join errors

const initialState = {
  create: false,
  join: false,
  roomClosed: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ROOM_STATUS_SET':
      return { ...state, [payload.type]: payload.roomName };
    case 'ROOM_CLOSED_SET':
      return { ...state, roomClosed: payload };
    case 'ROOM_SET':
      return initialState;
    default:
      return state;
  }
};
