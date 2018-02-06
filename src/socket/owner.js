import { log } from '../lib/util';
import { setStatusAction, removeStatusAction } from '../action/status';
import { createRoomAction, updatePollAction } from '../action/room';

export default (socket, dispatch) => { // TODO: Rob - takes in dispatch to allow state changing
  // Anthony - Room name already taken.
  socket.on('room status', data => {
    if (data === 200) dispatch(removeStatusAction());
    else {
      log('Type: ', data.type, 'Room name: ', data.roomName, 'Status: ', data.status);
      dispatch(setStatusAction(data));
    }
  });

  // Anthony - Room has been successfully created on server.
  socket.on('room created', room => {
    dispatch(createRoomAction({
      name: room,
      owner: true,
      polls: [],
    }));
  });

  // Anthony - Single result from a voter.
  socket.on('poll result', poll => {
    dispatch(updatePollAction(poll));
  });
};

// Anthony - Send room request to server.
export const createRoomEmit = (socket, room) => {
  socket.emit('create room', room);
};

// Anthony - Send poll creation request to server and emit to voters.
export const createPoll = (socket, poll) => {
  socket.emit('create poll', poll);
};
