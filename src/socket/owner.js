import { log } from '../lib/util';
import { createRoomAction } from '../action/room';
import { setStatusAction, removeStatusAction } from '../action/status';

// Rob - takes in dispatch to allow state changing
export default (socket, dispatch) => {
  // Anthony - Room name already taken.
  socket.on('room status', data => {
    log('Type: ', data.type, 'Room name: ', data.roomName);
    dispatch(setStatusAction(data));
  });

  // Anthony - Room has been successfully created on server.
  socket.on('room created', ({ roomName, roomNameRaw }) => {
    dispatch(createRoomAction({
      roomName,
      voters: 0,
      polls: [],
      owner: true,
      roomNameRaw,
    }));
  });
};
