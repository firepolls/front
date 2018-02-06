import { log } from '../lib/util';
import { setRoomAction } from '../action/room';

export default (socket, dispatch) => { // TODO: Rob - takes in dispatch to allow state changing
  // Anthony - Room successfully joined.
  socket.on('room joined', room => {
    dispatch(setRoomAction({
      name: room,
      owner: false,
    }));
  });

  // Anthony - Room not found on server.
  socket.on('room not found', room => {
    log(room);
    // TODO: HANDLE ROOM NOT FOUND, modal popup warning
  });

  // Anthony - Room has been closed by owner.
  socket.on('room closed', room => {
    log(room);
    // TODO: HANDLE ROOM NOT FOUND, modal popup warning
  });

  // Anthony - Receive incoming poll from owner.
  socket.on('poll received', poll => {
    const vote = prompt(poll.question);

    const responseToPoll = { ...poll, vote };

    socket.emit('poll response', responseToPoll);
  });
};

// Anthony - Request to join room to server.
export const joinRoomEmit = (socket, room) => {
  socket.emit('join room', room);
};
