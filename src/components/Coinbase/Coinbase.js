import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* CSS */
import './Coinbase.css';

class Coinbase extends Component {
  render() {
    const { publicKey } = this.props;
    return <h1>{publicKey}</h1>;
  }
}

Coinbase.propTypes = {
  publicKey: PropTypes.string.isRequired
};

export { Coinbase };
