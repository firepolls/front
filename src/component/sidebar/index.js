import React, { Component, Fragment } from 'react';
import { Drawer, MenuItem, FlatButton } from 'material-ui';

import './_sidebar.scss';

class Sidebar extends Component {
  state = {
    open: false,
  };

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    const loggedInJSX = this.state.token ?
      (
        <Drawer
          className="sidebar"
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <MenuItem onClick={this.handleClose}> Close X </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <a href="/room">Room History</a>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>)
      : null;

    return (
      <Fragment>
        <FlatButton
          className="hamburger"
          label="&#9776;"
          onClick={this.handleToggle}
          labelStyle={{ fontSize: '28px' }}
        />
        <Drawer
          className="sidebar"
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <MenuItem onClick={this.handleClose}> X </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <a href="/room">Room History</a>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
      </Fragment>
    );
  }
}


// <a href="#menu">
//   &#9776; Menu
// </a>

export default Sidebar;
