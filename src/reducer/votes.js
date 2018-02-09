const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'VOTE_SET': {
      const { pollId, vote } = payload;
      const updatedState = { ...state, [pollId]: vote };
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
