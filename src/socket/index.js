import openSocket from 'socket.io-client';

import owner from './owner';
import voter from './voter';
import { log } from '../lib/util';
import * as room from '../action/room';

class Socket {
  constructor(dispatch) {
    const socket = openSocket(API_URL);
    this.socket = socket;
    this.dispatch = dispatch;

    owner(socket, dispatch);
    voter(socket, dispatch);

    // ------------------- OWNER & VOTER ------------------- \\
    socket.on('voter joined', () => {
      dispatch(room.incrementVoterCountAction());
      log('__VOTER_JOINED__');
    });
    
    socket.on('voter left', () => {
      dispatch(room.decrementVoterCountAction());
      log('__VOTER_LEFT__');      
    });
    
    socket.on('vote increment', pollData => {
      dispatch(room.incrementVoteAction(pollData));
      log('__VOTE_INCREMENT__');
    });
    
    socket.on('vote decrement', pollData => {
      dispatch(room.decrementVoteAction());
      log('__VOTE_DECREMENT__');      
    });
  }

  // ------------------- OWNER ------------------- \\
  // Anthony - Send room request to server.
  createRoomEmit = roomName => {
    this.socket.emit('create room', roomName);
    log('__ROOM_CREATE_EMIT__', roomName);
  }

  closeRoomEmit = () => {
    this.socket.emit('close room');
    log('__ROOM_CLOSE_EMIT__');
  }

  // Anthony - Send poll creation request to server and emit to voters.
  createPollEmit = question => {
    this.socket.emit('create poll', question);
    log('__POLL_CREATE_EMIT__', question);
  }

  // ------------------- VOTER ------------------- \\
  // Anthony - Request to join room to server.
  joinRoomEmit = roomName => {
    this.socket.emit('join room', roomName);
    log('__ROOM_JOIN_EMIT__', roomName);
  }
  
  leaveRoomEmit = roomName => {
    this.socket.emit('leave room', roomName);
    this.dispatch(room.removeRoomAction());
    log('__ROOM_LEAVE_EMIT__', roomName);
  }

  // Rob - voterData should be { roomName, pollId, vote }
  castVoteEmit = voteData => {
    this.socket.emit('vote cast', voteData);
    log('__CAST_VOTE_EMIT__', voteData);
  }
}

export default Socket;
