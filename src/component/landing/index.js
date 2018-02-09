import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { RaisedButton, TextField } from 'material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';

import AuthForm from '../auth-form';
import PollList from '../poll-list';
import Poll from '../../socket/poll';
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
    
    const logoutJSX =
      (
        <div>
          <ul className="nav-items">
            <li>
              <RaisedButton onClick={() => logout(socket.socket)}>Logout</RaisedButton>
            </li>
          </ul>
        </div>
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
            <h1><span>Welcome to Firepoll</span></h1>
            <p>Create a poll below and invite your friends.</p>
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
              fieldVar="roomName"
              placeholderPartial="Room"
              onComplete={socket.createRoomEmit} 
            />

            {/* TODO: Move this close room button to the Room component */}
            {/* <RaisedButton onClick={socket.closeRoomEmit}>Close Room</RaisedButton> */}

            <SocketForm 
              className="socket-room"
              type="join"
              fieldVar="roomName"
              placeholderPartial="Room"
              onComplete={socket.joinRoomEmit} 
            />
          </section>

          <div className="grid">
            <div className="feature-left">
              <img src="../../../static/images/socket-io.svg" alt="Socket io" />
              <h4>socket.io</h4>
              <p className="feature-desc">Lorem ipsum dolor amet, consect etur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
            </div>
            <div className="feature-center">
              <img src="../../../static/images/analytics.svg" alt="Instant Notifications" />
              <h4>Business under Control</h4>
              <p className="feature-desc">Lorem ipsum dolor amet, consect etur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
            </div>
            <div className="feature-right">
              <img src="../../../static/images/stars.svg" alt="Instant Notifications" />
              <h4>Business under Control</h4>
              <p className="feature-desc">Lorem ipsum dolor amet, consect etur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
            </div>
          </div>
          <footer className="footer">
            © 2018<a href="https://github.com/firepolls"> Firepoll on Github </a>
          </footer>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signup: userData => dispatch(signupAction(userData)),
  login: userData => dispatch(loginAction(userData)),
  logout: socket => dispatch(logoutAction(socket)),
  addPoll: poll => dispatch(addPollAction(poll)),
});

const mapStateToProps = state => ({
  loggedIn: !!state.token,
  socket: state.socket,
  room: state.room,
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
