import React from 'react';
import { shallow } from 'enzyme';

import { Coinbase } from './Coinbase';

/* PRIVATE KEYS */
import { keys } from '../../keys';

it('renders Coinbase without crashing', () => {
  if (!keys) {
    shallow(<Coinbase apiKey="xxxx" apiSecret="***" />);
  }
  shallow(<Coinbase apiKey={keys.apiKey} apiSecret={keys.apiSecret} />);
});
