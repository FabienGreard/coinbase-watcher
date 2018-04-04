import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* CSS */
import './Alert.css';

class Alert extends Component {
  render() {
    const { alert } = this.props;
    return (
      <div className="msg-alert">
        {typeof alert !== 'undefined' && alert.message}
      </div>
    );
  }
}

Alert.propTypes = {
  alert: PropTypes.object
};

export { Alert };
