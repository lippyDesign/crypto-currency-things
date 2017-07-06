// Header section, main info about the site
import React, { Component } from 'react';

export default class extends Component {
  render() {
    return <header>
      <h1>Crypto-Currency Real Time Data and Stats</h1>
      <h2>{this.props.total} Crypto Articles</h2>
    </header>;
  }
}