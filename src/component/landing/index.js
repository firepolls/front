// TODO: FIX invisible DIV that appears when beginning input 
// for CREATE or JOIN room fields (same on auth form)

import { connect } from 'react-redux';
import React, { Component } from 'react';

import './_landing.scss';
import SocketForm from '../socket-form';

class Landing extends Component { 
  componentWillReceiveProps({ room }) {
    if (room) this.props.history.push(`/room/${room.roomName}`);
  }

  render() {
    const { socket } = this.props;
    
    return (
      <div className="landing-frag">
        <section className="jumbotron">
          <h1>Welcome to Firepolls</h1>
          <p>Create a room below and invite your friends.</p>
        </section>
        
        <section className="create-join">
          <SocketForm 
            type="create"
            fieldVar="roomName"
            style={{ top: 20 }}
            className="socket-room"
            placeholderPartial="Room"
            status={this.props.status.create}
            onComplete={socket.createRoomEmit}
          />

          <SocketForm 
            type="join"
            fieldVar="roomName"
            className="socket-room"
            placeholderPartial="Room"
            status={this.props.status.join}
            onComplete={socket.joinRoomEmit} 
          />
        </section>

        <div className="grid">
          <div className="feature-left">
            <img src="https://i.imgur.com/wfvLvuq.png" alt="Real Time" />
            <h2>Real-Time</h2>
            <p className="feature-desc">
              Enables bi-directional, event-based communication and 
              allows users to create polling rooms.
            </p>
          </div>
          <div className="feature-center">
            <img src="https://i.imgur.com/RLqWOTH.png" alt="Analytics" />
            <h2>Analytics</h2>
            <p className="feature-desc">
              Push data to clients and visualize results in real time.
            </p>
          </div>
          <div className="feature-right">
            <img src="https://i.imgur.com/DwpqLpv.png" alt="Anonymous Voting" />
            <h2>Anonymous Voting</h2>
            <p className="feature-desc">
              Keep track of how many people have responded
              to a poll while keeping votes anonymous.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  room: state.room,
  socket: state.socket,
  status: state.status,
});

export default connect(mapStateToProps)(Landing);
