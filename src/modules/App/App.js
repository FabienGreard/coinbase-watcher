import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

/* ACTIONS */
import { alertActions } from '../../_actions';

/* SERVICES */
import { gdaxService } from '../../_services';

/* HELPERS */
import { history, keys } from '../../helpers';

/* COMPONENTS */
import { Alert, Chart, Gdax } from '../../components';

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

  componentDidMount = async () => {
    const data = await gdaxService.getProductHistoricRates('ETH-EUR', 60);
    console.log(data);
  };

  getProductHistorcRates = () => {
    return Math.round(Math.random() * 10);
  };

  render() {
    const { alert } = this.props;

    const getProductHistorcRates = this.getProductHistorcRates;

    return (
      <div>
        <Alert alert={alert} />
        <div className="charts">
          <Chart
            title={'Line chart'}
            data={[{ x: 0, y: 0, value: 0 }]}
            liveData={getProductHistorcRates}
          />
        </div>
        <ul>
          <li>
            <Link to="/">Gdax</Link>
          </li>
        </ul>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Gdax
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
