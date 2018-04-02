// Rob - this is for setting the socket on payload
//     - It should only be hit the once

import Socket from '../socket';

const emptyState = null;

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'SOCKET_SET':
      return new Socket(payload);
    default:
      return state;
  }
};
