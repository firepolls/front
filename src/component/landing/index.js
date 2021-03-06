import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Dialog, RaisedButton } from 'material-ui';

import './_landing.scss';
import SocketForm from '../socket-form';
import starsImg from '../../image/stars.png';
import socketImg from '../../image/socket-io.png';
import analyticsImg from '../../image/analytics.png';

class Landing extends Component {
  componentWillReceiveProps({ room, status }) {
    if (room) this.props.history.push(`/room/${room.roomName}`);
  }

  render() {
    const { socket } = this.props;
    
    return (
      <div className="landing-frag">
        <section className="jumbotron">
          <h1>Welcome to firepolls</h1>
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
            <img src={socketImg} alt="Real Time" />
            <h2>Real-Time</h2>
            <p className="feature-desc">
              Enables bi-directional, event-based communication and 
              allows users to create polling rooms.
            </p>
          </div>
          <div className="feature-center">
            <img src={analyticsImg} alt="Analytics" />
            <h2>Analytics</h2>
            <p className="feature-desc">
              Push data to clients and visualize results in real time.
            </p>
          </div>
          <div className="feature-right">
            <img src={starsImg} alt="Anonymity" />
            <h2>Anonymity</h2>
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
