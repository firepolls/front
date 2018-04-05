import { connect } from 'react-redux';
import React, { Fragment, Component } from 'react';
import { RaisedButton, TextField, Dialog } from 'material-ui';

import './_socket-form.scss';
import { capitalizer } from '../../lib/util';
import { removeStatusAction } from '../../action/status';

const getInitialState = props => ({
  errorModal: false,
  closedRoomModal: false,
  [props.fieldVar]: '',
  [`${props.fieldVar}Dirty`]: false,
  [`${props.fieldVar}Error`]: 
    `${props.fieldVar === 'roomName' ? 'A room name' : 'A question'} is required.`,
});

class SocketForm extends Component {
  state = {
    errorModal: false,
    closedRoomModal: false,
    [this.props.fieldVar]: '',
    [`${this.props.fieldVar}Dirty`]: false,
    [`${this.props.fieldVar}Error`]: 
      `${this.props.fieldVar === 'roomName' ? 'A room name' : 'A question'} is required.`,
  };

  componentDidMount() {
    const { status, type } = this.props;
    const { roomNameDirty } = this.state;

    // Rob - Indicates an error such as refreshing the page and closing your room
    if ((type === 'join' && status && !roomNameDirty)) {
      this.toggleErrorModal();
    }
  }

  componentWillReceiveProps(props) {
    // Rob - Indicates the user was kicked
    if (props.roomClosed) this.toggleClosedRoomModal();

    // Rob - Indicates a normal form error
    if (props.status && !localStorage.fpOwned) {
      this.setState({
        roomNameDirty: true,
        roomNameError: `The room "${props.status}" is not available.`,
      });
    }
  }

  toggleClosedRoomModal = () => {
    this.setState(({ closedRoomModal }) => 
      ({ closedRoomModal: !closedRoomModal }));
  }

  killClosedRoomModal = () => {
    this.toggleClosedRoomModal();
    this.props.removeStatus();
    this.setState(getInitialState(this.props));
  }

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
      this.setState(getInitialState(this.props));
    } else {
      this.setState({
        [`${fieldVar}Dirty`]: true,
      });
    }
  }

  handleValidation = (name, value) =>
    (value.length === 0 
      ? `${name === 'roomName'
        ? 'A room name'
        : 'A question'} is required.` 
      : null
    );

  toggleErrorModal = () => {
    this.setState(({ errorModal }) => ({
      errorModal: !errorModal,
    }));
  }

  toggleModalAndHandleLS = () => {
    this.toggleErrorModal();
    delete localStorage.fpOwned;
    this.props.removeStatus();
    this.setState(getInitialState(this.props));
  }

  generateError = formField => (
    this.state[`${formField}Dirty`] 
      ? <p className="form-error">{this.state[`${formField}Error`]}</p> 
      : null
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
      status,
      fieldVar,
      placeholderPartial,
    } = this.props;

    const wasOwner = localStorage.fpOwned === status;
    const voterMessage = `The room "${status}" is not available.`;
    const ownerMessage = `Your room "${status}" has been closed.`;

    // Rob - This modal shows for the user
    const errorModal = (
      <Dialog
        className="join-room-error-modal"
        title={wasOwner ? ownerMessage : voterMessage}
        contentStyle={{ textAlign: 'center' }}
        open={this.state.errorModal}
        onRequestClose={this.toggleModalAndHandleLS}
      >
        <RaisedButton 
          label="OK"
          onClick={this.toggleModalAndHandleLS}
        />
      </Dialog>
    );

    // Rob - This modal shows for kicked out voters
    const closedRoomModal = (
      <Dialog
        className="room-closed-error-modal"
        title={`The room "${this.props.roomClosed}" was closed by the owner.`}
        contentStyle={{ textAlign: 'center' }}
        open={this.state.closedRoomModal}
        onRequestClose={this.killClosedRoomModal}
      >
        <RaisedButton 
          label="OK"
          onClick={this.killClosedRoomModal}
        />
      </Dialog>
    );

    return (
      <Fragment>
        <div className="room-form">
          <form onSubmit={this.handleSubmit}>
            {this.generateInput(fieldVar, `${capitalizer(type)} ${placeholderPartial}...`)}
            <RaisedButton type="submit">{capitalizer(type)}</RaisedButton>
          </form>
          {this.generateError(fieldVar)}
        </div>
        { type === 'join' || type === 'signup' ? errorModal : null }
        { type === 'join' ? closedRoomModal : null }
      </Fragment>
    );
  }
}

// Rob - Extract roomClosed from this.state.status and add as this.props.roomClosed
const mapStateToProps = ({ status: { roomClosed } }) => ({ roomClosed });

const mapDispatchToProps = (dispatch) => ({
  removeStatus: () => dispatch(removeStatusAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SocketForm);
