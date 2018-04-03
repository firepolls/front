import React, { Fragment, Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';

import './_socket-form.scss';
import { capitalizer } from '../../lib/util';

class SocketForm extends Component {
  state = {
    [this.props.fieldVar]: '',
    [`${this.props.fieldVar}Dirty`]: false,
    [`${this.props.fieldVar}Error`]: 
      `${this.props.fieldVar === 'roomName' ? 'A room name' : 'A question'} is required.`,
  };

  componentWillReceiveProps(props) {
    if (props.status) {
      this.setState({
        roomNameDirty: true,
        roomNameError: `The room "${props.status}" is not available.`,
      });
    }
  }
  
  emptyState = { ...this.state };

  generateClassName = formField => 
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
    const { fieldVar } = this.props;
    const value = this.state[fieldVar];
    const error = this.state[`${fieldVar}Error`];

    if (!error) {      
      this.props.onComplete(value);
      this.setState(this.emptyState);
    } else {
      this.setState({
        [`${fieldVar}Dirty`]: true,
      });
    }
  }

  handleValidation = (name, value) =>
    (value.length === 0 ?
      `${name === 'roomName' ? 'A room name' : 'A question'} is required.` 
      : null);

  generateError = formField => (
    this.state[`${formField}Dirty`] ? <p className="form-error">{this.state[`${formField}Error`]}</p> : null
  );

  generateInput = (formField, placeholder) => (
    <Fragment>
      <div className="room-form-input">
        <TextField
          style={
            {
              marginTop: '10px',
              color: 'black',
            }
          }
          type="text"
          name={formField}
          hintText={placeholder}
          onChange={this.handleChange}
          value={this.state[formField]}
          floatingLabelText={placeholder}
          className={this.generateClassName(formField)}
        />
      </div>
    </Fragment>
  );

  render() {
    const {
      type,
      fieldVar,
      placeholderPartial,
    } = this.props;

    return (
      <div className="room-form">
        <form onSubmit={this.handleSubmit}>
          {this.generateInput(fieldVar, `${capitalizer(type)} ${placeholderPartial}...`)}
          <RaisedButton type="submit">{capitalizer(type)}</RaisedButton>
        </form>
        {this.generateError(fieldVar)}
      </div>
    );
  }
}

export default SocketForm;
