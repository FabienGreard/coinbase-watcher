import React from 'react';
import { shallow } from 'enzyme';

import { Coinbase } from './Coinbase';

it('renders Coinbase without crashing', () => {
  shallow(<Coinbase apiKey="xxxx" apiSecret="***" />);
});
