import openSocket from 'socket.io-client';
import { setRoomAction } from '../action/room';

export default dispatch => { // TODO: Rob - takes in dispatch to allow state changing
  const socket = openSocket(API_URL);

  socket.on('room conflict', room => {
    console.log(room); 
    // TODO: HANDLE ROOM CONFLICT, modal popup warning
  });

  socket.on('room created', room => {
    dispatch(setRoomAction({
      name: room,
      owner: true,
    }));
  });

  socket.on('room joined', room => {
    dispatch(setRoomAction({
      name: room,
      owner: false,
    }));
  });

  socket.on('room not found', room => {
    console.log(room); 
    // TODO: HANDLE ROOM NOT FOUND, modal popup warning
  });

  socket.on('room closed', room => {
    console.log(room); 
    // TODO: HANDLE ROOM NOT FOUND, modal popup warning
  });

  socket.on('poll inbound', data => {
    const responseToPoll = prompt(data.message);
    console.log('front end data.room', data.room);
    
    socket.emit('poll response', {
      responseToPoll,
      room: data.room,
    });
  });

  socket.on('poll result', message => {
    console.log(message);
  });

  return socket;
};

export const createRoomEmit = (socket, room) => {
  socket.emit('create room', room);
};

export const joinRoomEmit = (socket, room) => {
  socket.emit('join room', room);
};

export const sendPoll = (socket) => {
  const message = prompt('Asking something...');
  socket.emit('send message', message);
};
