import React from 'react';
import { shallow } from 'enzyme';

import { Chart } from './Chart';

it('renders Chart without crashing', () => {
  shallow(<Chart />);
});
