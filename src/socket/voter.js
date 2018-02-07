import { log } from '../lib/util';
import { createRoomAction, removeRoomAction } from '../action/room';

export default (socket, dispatch) => { // TODO: Rob - takes in dispatch to allow state changing
  // Anthony - Room successfully joined.
  socket.on('room joined', room => {
    log('JOINED', room);
    dispatch(createRoomAction(room));
  });

  // Anthony - Room has been closed by owner.
  socket.on('room closed', roomName => {
    log('__ROOM_CLOSED__', roomName);
    socket.emit('leave room', roomName);
    dispatch(removeRoomAction());
    // TODO: Rob - this should also redirect to landing/dashboard 
    //             and pop up a modal indicating the room was closed
  });

  // Anthony - Receive incoming poll from owner.
  socket.on('poll received', poll => {
    // Kerry - Need to present to the user a div/modal that takes in their vote from 1-4 (stars)
    // and then the response from this vote will increase the total votes.

    const vote = prompt(poll.question);

    const responseToPoll = { ...poll, vote };

    socket.emit('poll response', responseToPoll);
  });
};
