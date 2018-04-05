import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import './_header.scss';
import NavWrapper from '../nav-wrapper';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container-fluid">
          <h1 className="logo">
            <span>F</span>
            firepolls
          </h1>
        </div>
        <NavWrapper />
      </header>
    );
  }
}

export default Header;
