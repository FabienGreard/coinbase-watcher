import React from 'react';
import PropTypes from 'prop-types';

/* CSS */
import './Gdax.css';

const Gdax = ({ apiKey, apiSecret }) => (
  <p>
    apiKey :{apiKey} apiSecret:{apiSecret}
  </p>
);

Gdax.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiSecret: PropTypes.string.isRequired
};

export { Gdax };
