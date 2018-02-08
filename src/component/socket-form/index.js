import React, { Fragment, Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';
import { capitalizer } from '../../lib/util';

import './_socket-form.scss';

class SocketForm extends Component {
  state = {
    roomName: '',
    roomNameDirty: false,
    roomNameError: 'roomName is required',
  
    submitted: false,
  };

  emptyState = { ...this.state };

  generateClassName = (formField) => 
    (this.state[`${formField}Dirty`] &&
      this.state[`${formField}Error`] ? 'error' : null);

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.handleValidation(name, value),
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const { roomNameError, roomName } = this.state;

    if (!roomNameError) {      
      this.props.onComplete(roomName);
      this.setState(this.emptyState);
    } else {
      this.setState({
        roomNameDirty: true,
        // Rob - I don't think we use submitted anywhere
        submitted: true,
      });
    }
  }

  handleValidation = (name, value) =>
    (value.length === 0 ? 'Room name is required.' : null);

  generateInput = (formField, placeholder) => (
    <Fragment>
      <TextField
        className={this.generateClassName(formField)}
        name={formField}
        hintText={`${capitalizer(placeholder)} Room...`}
        type="text"
        value={this.state[formField]}
        onChange={this.handleChange}
      />
      {this.state[`${formField}Dirty`] ? <p>{this.state[`${formField}Error`]}</p> : null}
    </Fragment>
  );

  render() {
    // Rob - type should be either join or create
    const { type } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        {this.generateInput('roomName', type)}
        <RaisedButton type="submit">{capitalizer(type)}</RaisedButton>
      </form>
    );
  }
}

export default SocketForm;
