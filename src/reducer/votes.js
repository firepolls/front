// Rob - this reducer is used specifically for managing re-voting

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'VOTE_SET': {
      const { pollId, vote } = payload;
      const updatedState = { ...state, [pollId]: vote };
      return updatedState;
    }
    case 'ROOM_REMOVE':
      return initialState;
    default:
      return state;
  }
};
