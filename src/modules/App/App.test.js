import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';

import { history, store } from '../../helpers';
import { App } from './';

describe('App', () => {
  it('renders App without crashing', () => {
    mount(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });
  it('History change', () => {
    history.push('/');
    expect(history.location.pathname).toEqual('/');
  });
  it('Redirect is working', () => {
    history.push('/not-working');
    expect(history.location.pathname).toEqual('/');
  });
});
