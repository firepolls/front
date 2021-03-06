import { Paper } from 'material-ui';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import Room from '../room';
import './_saved-sessions.scss';
import Loading from '../loading';

class SavedSessions extends Component {
  render() {
    const instructionsText = (
      <Fragment>
        <h3>No Saved Rooms...</h3>
        <p>
          <strong>Note: </strong>
          Create a room with at least one Poll and Save it for it to show here.
        </p>
      </Fragment>);

    // Rob - Remove polls with no rooms and reverse order of polls
    const rooms = this.props.savedRooms
      .filter(room => room.polls.length);

    // Rob - Reverse order of rooms
    rooms.reverse();


    return (
      <section className="saved-sessions">
        <h1 className="saved-heading">Saved Sessions</h1>
        { !this.props.savedRooms ? <Loading size="200px" /> : null }
        { !this.props.savedRooms.length ? (
          <Paper
            zDepth={2}
            className="instruction"
          >
            {instructionsText}
          </Paper>) : null}
        <ul>
          { rooms.map(savedRoom => (
            <li className="room-li" key={savedRoom._id} >
              <Paper
                zDepth={2}
                className="instruction"
              >
                <div>
                  <Room savedRoom={savedRoom} />
                </div>
              </Paper>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = ({ savedRooms }) => ({ savedRooms });

export default connect(mapStateToProps)(SavedSessions);
