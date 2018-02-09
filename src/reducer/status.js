const initialState = {
  create: false,
  join: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ROOM_STATUS_SET': {
      // Rob - Update the property createRoom or joinRoom on state.status
      const { roomName } = payload;
      const updatedState = { ...state };
      updatedState[payload.type] = roomName;

      return updatedState;
    }
    case 'ROOM_SET':
      return initialState;
    case 'TOKEN_REMOVE':
      return initialState;
    default:
      return state;
  }
};
