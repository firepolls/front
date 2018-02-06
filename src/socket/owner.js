import { log } from '../lib/util';
import { setRoomAction } from '../action/room';

export default (socket, dispatch) => { // TODO: Rob - takes in dispatch to allow state changing
  // Anthony - Room name already taken.
  socket.on('room conflict', room => {
    log(room);
    // TODO: HANDLE ROOM CONFLICT, modal popup warning
  });

  // Anthony - Room has been successfully created on server.
  socket.on('room created', room => {
    dispatch(setRoomAction({
      name: room,
      owner: true,
      polls: [],
    }));
  });

  // Anthony - Single result from a voter.
  socket.on('poll result', message => {
    log(message);
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
