import validator from 'validator';
import React, { Fragment, Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';

import './_auth-form.scss';

class AuthForm extends Component {
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
    const { type } = this.props;
    const { usernameError, passwordError, emailError } = this.state;
    let inputError = usernameError || passwordError;
    inputError = type === 'login' ? 
      inputError : 
      inputError || emailError;

    if (!inputError) {
      this.props.onComplete(this.state);
      this.setState(this.emptyState);
      console.log('heyee');
    } else {
      this.setState({
        usernameDirty: true,
        emailDirty: true,
        passwordDirty: true,
        submitted: true,
      });
    }
  }

  handleValidation = (name, value) => {
    const { type } = this.props;

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
          className={`auth-form-text ${this.generateClassName(formField)}`}
          name={formField}
          fullWidth
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
