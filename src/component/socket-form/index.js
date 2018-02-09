import React, { Fragment, Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';
import { capitalizer } from '../../lib/util';

import './_socket-form.scss';

class SocketForm extends Component {
  state = {
    [this.props.fieldVar]: '',
    [`${this.props.fieldVar}Dirty`]: false,
    [`${this.props.fieldVar}Error`]: 
      `${this.props.fieldVar === 'roomName' ? 'A room name' : 'A question'} is required.`,
  
    submitted: false,
  };

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
        // Rob - I don't think we use submitted anywhere
        submitted: true,
      });
    }
  }

  handleValidation = (name, value) =>
    (value.length === 0 ? `${name === 'roomName' ? 'A room name' : 'A question'} is required.` : null);

  generateError = formField => (
    this.state[`${formField}Dirty`] ? <p>{this.state[`${formField}Error`]}</p> : null
  )

  generateInput = (formField, placeholder) => (
    <Fragment>
      <TextField
        style={
          {
            marginTop: '10px',
            color: 'black',
          }
        }
        className={this.generateClassName(formField)}
        name={formField}
        hintText={placeholder}
        floatingLabelText={placeholder}
        type="text"
        value={this.state[formField]}
        onChange={this.handleChange}
      />
    </Fragment>
  );

  render() {
    // Rob - type should be either join or create
    const {
      type,
      fieldVar,
      placeholderPartial,
    } = this.props;

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          {this.generateInput(fieldVar, `${capitalizer(type)} ${placeholderPartial}...`)}
          <RaisedButton type="submit">{capitalizer(type)}</RaisedButton>
        </form>
        {this.generateError(fieldVar)}
      </Fragment>
    );
  }
}

export default SocketForm;
