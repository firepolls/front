import validator from 'validator';
import React, { Fragment } from 'react';
import { RaisedButton, TextField } from 'material-ui';

import './_auth-form.scss';

class AuthForm extends React.Component {
  // Rob - babel-preset-stage-2 includes class features that implicitly bind to the instance
  // Rob - This means no need for a constructor or props here
  state = {
    username: '',
    usernameDirty: false,
    usernameError: 'Username is required',
  
    password: '',
    passwordDirty: false,
    passwordError: 'Password is required',
  
    email: '',
    emailDirty: false,
    emailError: 'Email is required',
  
    submitted: false,
  };

  emptyState = { ...this.state };

  // Rob - arrow functions adopt the 'this' of their defining scope
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

    const { usernameError, passwordError, emailError } = this.state;
    const inputError = usernameError || emailError || passwordError;

    // TODO: Rob - should not login if fields are empty!
    if (this.props.type === 'login' || !inputError) {
      this.props.onComplete(this.state);
      this.setState(this.emptyState);
    } else {
      this.setState({
        usernameDirty: true,
        emailDirty: true,
        passwordDirty: true,
        submitted: true, // TODO: Rob - I don't think we actually use this.
      });
    }
  }

  handleValidation = (name, value) => {
    if (this.props.type === 'login') {
      return null;
    }

    // TODO: Rob - Validation needs to be more extreme
    switch (name) {
      case 'username':
        return value.length === 0 ? 'Username is required.' : null;
      case 'email':
        return value.length === 0 ? 'Email is required.' : null;
      case 'password':
        return value.length === 0 ? 'Password is required.' : null;
      default:
        return null;
    }
  }

  // Rob - creates a text input field with error message, add to form
  generateInput = formField => {
    const type = formField === 'password' ? 'password' : 'text';
    
    return (
      <Fragment>
        <TextField
          className={this.generateClassName(formField)}
          name={formField}
          hintText={`${formField}...`}
          type={type}
          value={this.state[formField]}
          onChange={this.handleChange}
        />
        {this.state[`${formField}Dirty`] ? <p>{this.state[`${formField}Error`]}</p> : null}
      </Fragment>
    );
  }

  render() {
    // Rob - type must be either login or signup
    const { type } = this.props;

    const emailInput = type === 'signup' ? this.generateInput('email') : null;

    return (
      <form className="auth-form" onSubmit={this.handleSubmit}>
        {this.generateInput('username')}
        {this.generateInput('password')}
        {emailInput}
        <RaisedButton type="submit">{type}</RaisedButton>
      </form>
    );
  }
}

export default AuthForm;
