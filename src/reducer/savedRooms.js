// Rob - Used for adding saved rooms for viewing later (fetched from server)

import uuid from 'uuid/v4';

const emptyState = [];

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'SAVED_ROOM_SET':
      return [...state, { ...payload, _id: uuid() }];
    case 'ALL_SAVED_ROOMS_SET':
      return payload;
    case 'TOKEN_REMOVE':
      return emptyState;
    default:
      return state;
  }
};
