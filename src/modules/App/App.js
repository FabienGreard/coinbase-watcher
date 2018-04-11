import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

/* PRIVATE KEYS */
import { keys } from '../../keys';

/* ACTIONS */
import { alertActions } from '../../_actions';

/* SERVICES */
import { coinbaseService } from '../../_services';

/* HELPERS */
import { history } from '../../helpers';

/* COMPONENTS */
import { Alert, Coinbase, Chart } from '../../components';

/* CSS */
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    //listen on url change
    history.listen((location, action) => {
      // clear alert on location change
      props.dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        <Alert alert={alert} />
        <div className="charts">
          <Chart params="ETH-EUR" apiMethod={coinbaseService.getSpotPrice} />
          <Chart params="ETH-EUR" apiMethod={coinbaseService.getSellPrice} />
          <Chart params="ETH-EUR" apiMethod={coinbaseService.getBuyPrice} />
        </div>
        <ul>
          <li>
            <Link to="/">Coinbase</Link>
          </li>
        </ul>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Coinbase
                {...props}
                apiKey={keys.apiKey}
                apiSecret={keys.apiSecret}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  alert: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
