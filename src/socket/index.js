import openSocket from 'socket.io-client';

import owner from './owner';
import voter from './voter';
import { log } from '../lib/util';

class Socket {
  constructor(dispatch) {
    this.socket = openSocket(API_URL);

    owner(this.socket, dispatch);
    voter(this.socket, dispatch);
  }

  // Anthony - Send room request to server.
  createRoomEmit = roomName => {
    this.socket.emit('create room', roomName);
    log('__ROOM_CREATE_EMIT__');
  }

  closeRoomEmit = () => {
    this.socket.emit('close room');
    log('__ROOM_CLOSE_EMIT__');
  }

  // Anthony - Send poll creation request to server and emit to voters.
  createPoll = question => {
    this.socket.emit('create poll', question);
    log('__POLL_CREATE_EMIT__');
  }

  // Anthony - Request to join room to server.
  joinRoomEmit = room => {
    this.socket.emit('join room', room);
    log('__ROOM_JOIN_EMIT__');
  }
}

export default Socket;
