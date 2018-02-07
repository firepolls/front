import openSocket from 'socket.io-client';

import owner from './owner';
import voter from './voter';

class Socket {
  constructor(dispatch) {
    this.socket = openSocket(API_URL);

    owner(this.socket, dispatch);
    voter(this.socket, dispatch);
  }

  // Anthony - Send room request to server.
  createRoomEmit = roomName => {
    this.socket.emit('create room', roomName);
  }

  // Anthony - Send poll creation request to server and emit to voters.
  createPoll = question => {
    this.socket.emit('create poll', question);
  }

  // Anthony - Request to join room to server.
  joinRoomEmit = room => {
    this.socket.emit('join room', room);
  }
}

export default Socket;
