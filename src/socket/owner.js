import { setRoomAction } from '../action/room';

export default (socket, dispatch) => { // TODO: Rob - takes in dispatch to allow state changing
  // Anthony - Room name already taken.
  socket.on('room conflict', room => {
    console.log(room);
    // TODO: HANDLE ROOM CONFLICT, modal popup warning
  });

  // Anthony - Room has been successfully created on server.
  socket.on('room created', room => {
    dispatch(setRoomAction({
      name: room,
      owner: true,
    }));
  });

  // Anthony - Single result from a voter.
  socket.on('poll result', message => {
    console.log(message);
  });
};

// Anthony - Send room request to server.
export const createRoomEmit = (socket, room) => {
  socket.emit('create room', room);
};

// Anthony - Send poll creation request to server and emit to voters.
export const sendPoll = (socket) => {
  const message = prompt('Asking something...');
  socket.emit('send message', message);
};
