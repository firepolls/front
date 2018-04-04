import { log } from '../lib/util';
import * as room from '../action/room';
import { roomClosedAction } from '../action/status';

export default (socket, dispatch) => {
  // Anthony - Room successfully joined.
  socket.on('room joined', roomObject => {
    log('__JOINED_ROOM__');
    dispatch(room.createRoomAction(roomObject));
  });

  // Anthony - Room has been closed by owner.
  socket.on('room closed', ({ roomName, roomNameRaw }) => {
    log('__ROOM_CLOSED__', roomName);
    socket.emit('leave room', roomName);
    dispatch(room.removeRoomAction());
    dispatch(roomClosedAction(roomNameRaw));
  });

  // Anthony - Receive incoming poll from owner.
  socket.on('poll received', poll => {
    dispatch(room.addPollAction(poll));
  });
};
