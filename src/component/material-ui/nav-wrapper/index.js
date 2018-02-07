import React, { Component, Fragment } from 'react';
import { AppBar, Drawer, MenuItem, RaisedButton } from 'material-ui';
import mastHead from '../nav-wrapper/navstyling';


class NavWrapper extends Component {
    state = {
      open: false,
    }

    handleToggle = () => {
      this.setState({ open: !this.state.open });
    }

    render() {
      const { classes } = this.props;
      return (
        <div>
          <AppBar 
            title="Fire Polls" 
            onLeftIconButtonClick={this.handleToggle}
            zDepth={3}
            iconStyleLeft={mastHead}
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

