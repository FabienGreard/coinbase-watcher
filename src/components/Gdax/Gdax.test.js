import React from 'react';
import { shallow } from 'enzyme';

import { Gdax } from './Gdax';

/* HELPERS */
import { keys } from '../../helpers';

it('renders Coinbase without crashing', () => {
  if (!keys) {
    shallow(<Gdax apiKey="xxxx" apiSecret="***" />);
  }
  shallow(<Gdax apiKey={keys.apiKey} apiSecret={keys.apiSecret} />);
});
