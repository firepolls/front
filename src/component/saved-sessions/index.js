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
              .map(room => <li key={room._id} ><Room savedRoom={room} /></li>)
          }
        </ul>
      </section>
    );
  }
}

const mapStateToProps = ({ savedRooms }) => ({ savedRooms });

export default connect(mapStateToProps)(SavedSessions);
