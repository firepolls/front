import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import AuthForm from '../auth-form';

import SocketForm from '../socket-form';
import * as owner from '../../socket/owner';
import * as voter from '../../socket/voter';
import { addPollAction } from '../../action/room';
import { signupAction, loginAction, logoutAction } from '../../action/auth';

import './_dashboard.scss';

class Dashboard extends Component {
  state = {};

  // componentDidMount(){
    
  // }

  render() {
    return (
      <div className="dashboard">
        <h1> This is Your Dashboard </h1>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signup: userData => dispatch(signupAction(userData)),
  login: userData => dispatch(loginAction(userData)),
  logout: socket => dispatch(logoutAction(socket)),
  addPoll: poll => dispatch(addPollAction(poll)),
});

const mapStateToProps = state => ({
  socket: state.socket,
  room: state.room,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
