import React, { Fragment, Component } from 'react';
import { RaisedButton, TextField, Dialog } from 'material-ui';

import './_auth-form.scss';
import Loading from '../loading';

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

    loginError: false,
    signupError: false,
  
    submitted: false,
    fetching: false,
  };

  emptyState = { ...this.state };

  toggleError = errorType => {
    this.setState(prevState => ({
      [`${errorType}Error`]: !prevState[`${errorType}Error`],
    }));
  }

  clearAuthErrors = () => {
    this.setState({
      loginError: false,
      signupError: false,
      fetching: false,
    });
  }

  handleAuthError = (errorType) => () => {
    this.toggleError(errorType);
  }

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
    const failureCB = this.handleAuthError(type);

    if (type === 'signup') {
      // Rob - Additional check to catch emailError if logged in
      inputError = inputError || emailError;
    }

    if (!inputError) {
      // Rob - Pass failureCB to handle failed logins / signups
      this.props.onComplete(this.state, failureCB);
      this.setState({ ...this.emptyState, fetching: true });
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
      <div className="input-field" >
        <TextField
          fullWidth
          type={type}
          name={formField}
          hintText={`${formField}...`}
          floatingLabelText={`${formField}...`}
          onChange={this.handleChange}
          value={this.state[formField]}
          className={`auth-form-text ${this.generateClassName(formField)}`}
        />
        {this.state[`${formField}Dirty`] ? <p className="form-error">{this.state[`${formField}Error`]}</p> : null}
      </div>
    );
  }

  render() {
    const { type } = this.props;

    const emailInput = type === 'signup' ? this.generateInput('email') : null;

    const errorModal = (
      <Dialog 
        className="auth-error-modal"
        open={this.state.loginError || this.state.signupError}
        onRequestClose={this.clearAuthErrors}
        contentStyle={{ maxWidth: '250px' }}
      >
        <h2>
          Uh-oh!
        </h2>
        <p>
          {this.state.loginError ? 
            'Username or Password incorrect!' : 
            'Username or Email already in use!'
          }
        </p>
        <RaisedButton 
          label="OK"
          onClick={this.clearAuthErrors}
          style={{ marginTop: '20px' }}
        />
      </Dialog>
    );

    const loadingDiv = (
      <div className="loading-div">
        <Loading size="50px" />
      </div>
    );

    return (
      <Fragment>
        <form className="auth-form" onSubmit={this.handleSubmit}>
          { this.state.fetching ? loadingDiv : null } 
          {this.generateInput('username')}
          {this.generateInput('password')}
          {emailInput}
          <RaisedButton 
            type="submit"
            style={{ marginBottom: '10px', marginTop: '40px' }}
            label={type.toUpperCase()}
          />
        </form>
        { errorModal }
      </Fragment>
    );
  }
}

export default AuthForm;
