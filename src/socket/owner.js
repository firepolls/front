import { log } from '../lib/util';
import { createRoomAction, updatePollAction, incrementVoterCountAction } from '../action/room';
import { setStatusAction, removeStatusAction } from '../action/status';

// Rob - takes in dispatch to allow state changing
export default (socket, dispatch) => {
  // Anthony - Room name already taken.
  socket.on('room status', data => {
    log('Type: ', data.type, 'Room name: ', data.roomName);
    dispatch(setStatusAction(data));
  });

  // Anthony - Room has been successfully created on server.
  socket.on('room created', roomName => {
    dispatch(createRoomAction({
      roomName,
      owner: true,
      voters: 0,
      polls: [],
    }));
  });
};

