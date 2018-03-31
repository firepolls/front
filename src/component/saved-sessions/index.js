import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import Room from '../room';

class SavedSessions extends Component {
  render() {
    return (
      <section className="saved-sessions">
        <ul>
          {
            this.props.savedRooms
              .map(savedRoom => (
                <li key={savedRoom._id} >
                  <Room savedRoom={savedRoom} />
                </li>
              ))
          }
        </ul>
      </section>
    );
  }
}

const mapStateToProps = ({ savedRooms }) => ({ savedRooms });

export default connect(mapStateToProps)(SavedSessions);
