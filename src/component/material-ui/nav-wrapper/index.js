import React, { Component, Fragment } from 'react';
import { AppBar, Drawer, MenuItem, RaisedButton } from 'material-ui';

class NavWrapper extends Component {
    state = {
      open: false,
    } 

    handleToggle = () => {
      this.setState({ open: !this.state.open });
    }

    render() {
      return (
        <div>
          <AppBar 
            title="Fire Polls" 
            onLeftIconButtonClick={this.handleToggle}
            zDepth={3}
          />
          <Drawer 
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
            zDepth={2}
          >
            <h1> Fire Polls </h1>
            <MenuItem>Sessions</MenuItem>
            <MenuItem>Polls</MenuItem>
          </Drawer>
        </div>
      );
    }
}

export default NavWrapper;

