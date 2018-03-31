// TODO: ADD button that appears when logged in to to go SAVED ROOMS/SESSIONS
// TODO: FIX invisibile DIV that appears when beginning input for CREATE or JOIN room fields


import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { RaisedButton, TextField } from 'material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';

import AuthForm from '../auth-form';
import SocketForm from '../socket-form';
import { addPollAction } from '../../action/room';
import { signupAction, loginAction, logoutAction } from '../../action/auth';

import './_landing.scss';

class Landing extends Component { 
  state = {
    signingUp: false,
    loggingIn: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.room) this.props.history.push('/room');
    if (nextProps.loggedIn) {
      this.setState(this.emptyState);
    }
  }

  // Rob - This is used for resetting form
  emptyState = { ...this.state };

  render() {
    const {
      socket,
      signup,
      login,
      logout,
    } = this.props;
    
    const signupLoginJSX = (
      <ul className="nav-items">
        <li>
          <RaisedButton
            onClick={() => 
              this.setState(previousState => ({
                signingUp: !previousState.signingUp,
                loggingIn: false,
              }))
            }
          >
            Signup
          </RaisedButton>          
        </li> 
        <li>
          <RaisedButton 
            onClick={() =>
              this.setState(previousState => ({
                signingUp: false,
                loggingIn: !previousState.loggingIn,
              }))
            }
          >
            Login
          </RaisedButton>
        </li>
      </ul>
    );
    
    return (
      <Fragment>
        <div className="landing-frag">
          <div className="header">
            <div className="container-fluid">
              <a href="/">
                <h1 className="logo">
                  <span>F</span>
                  firepolls
                </h1>
              </a>
            </div>
          </div>
          <section className="jumbotron">
            <h1><span>Welcome to Firepolls</span></h1>
            <p>Create a room below and invite your friends.</p>
            <br />
          </section>
          
          <section className="create-join">
    
            <SocketForm 
              className="socket-room"
              style={
                {
                  top: 20,
                }
              }
              type="create"
              status={this.props.status.create}
              fieldVar="roomName"
              placeholderPartial="Room"
              onComplete={socket.createRoomEmit}
            />

            <SocketForm 
              className="socket-room"
              type="join"
              status={this.props.status.join}
              fieldVar="roomName"
              placeholderPartial="Room"
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
          <footer className="footer">
            © 2018<a href="https://github.com/firepolls"> firepolls on Github </a>
          </footer>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signup: userData => dispatch(signupAction(userData)),
  login: userData => dispatch(loginAction(userData)),
  addPoll: poll => dispatch(addPollAction(poll)),
});

const mapStateToProps = state => ({
  loggedIn: !!state.token,
  socket: state.socket,
  room: state.room,
  status: state.status,
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
