import React, { Fragment, Component } from 'react';

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
      this.props.onComplete(this.props.socket, roomName);
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

  generateInput = formField => (
    <Fragment>
      <input
        className={this.generateClassName(formField)}
        name={formField}
        placeholder={`${formField}...`}
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
        {this.generateInput('roomName')}
        <button type="submit">{type}</button>
      </form>
    );
  }
}

export default SocketForm;
