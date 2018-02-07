import { log } from '../lib/util';
import * as room from '../action/room';

export default (socket, dispatch) => { // TODO: Rob - takes in dispatch to allow state changing
  // Anthony - Room successfully joined.
  socket.on('room joined', roomName => {
    log('JOINED', roomName);
    dispatch(room.createRoomAction(roomName));
  });

  // Anthony - Room has been closed by owner.
  socket.on('room closed', roomName => {
    log('__ROOM_CLOSED__', roomName);
    socket.emit('leave room', roomName);
    dispatch(room.removeRoomAction());
    // TODO: Rob - this should also redirect to landing/dashboard 
    //             and pop up a modal indicating the room was closed
  });

  // Anthony - Receive incoming poll from owner.
  socket.on('poll received', poll => {
    dispatch(room.addPollAction(poll));
  });
};
