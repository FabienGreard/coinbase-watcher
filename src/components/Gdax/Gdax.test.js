import React from 'react';
import { shallow } from 'enzyme';

import { Gdax } from './Gdax';

/* PRIVATE KEYS */
import { keys } from '../../keys';

it('renders Coinbase without crashing', () => {
  if (!keys) {
    shallow(<Gdax apiKey="xxxx" apiSecret="***" />);
  }
  shallow(<Gdax apiKey={keys.apiKey} apiSecret={keys.apiSecret} />);
});
