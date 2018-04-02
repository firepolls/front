import { Paper } from 'material-ui';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import Room from '../room';
import './_saved-sessions.scss';

class SavedSessions extends Component {
  render() {
    const instructionsText = (
      <Fragment>
        <p>No Saved Rooms...</p>
        <p><strong>Note:</strong> Create a room with at least one Poll and Save it for it to show here.
        </p>
      </Fragment>);

    return (
      <section className="saved-sessions">
        <ul>
          { this.props.savedRooms.length ?
            (
              this.props.savedRooms
                .map(savedRoom => (
                  <li key={savedRoom._id} >
                    <Room savedRoom={savedRoom} />
                  </li>
                ))
            ) : (
              <Paper
                zDepth={4}
                className="instruction"
              >
                {instructionsText}
              </Paper>)
          }
        </ul>
      </section>
    );
  }
}

const mapStateToProps = ({ savedRooms }) => ({ savedRooms });

export default connect(mapStateToProps)(SavedSessions);
