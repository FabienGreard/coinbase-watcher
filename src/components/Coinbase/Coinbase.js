import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Client } from 'coinbase';
/* CSS */
import './Coinbase.css';

class Coinbase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: new Client({ apiKey: props.apiKey, apiSecret: props.apiSecret })
    };
  }

  getAccounts = client => {
    client.getAccounts({}, (err, accounts) => {
      if (!err) {
        for (const acct of accounts) {
          console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
        }
      }
    });
  };

  render() {
    return <div />;
  }
}

Coinbase.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiSecret: PropTypes.string.isRequired
};

export { Coinbase };
