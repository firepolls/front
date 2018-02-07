import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

class Dashboard extends Component {
  
  state = {};

  render() {
    return (
      <div className="dashboard">
        <h1> This is Your Dashboard </h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.socket,
  room: state.room,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
