import React from 'react';
import { shallow } from 'enzyme';

import { Chart } from './Chart';

it('renders Chart without crashing', () => {
  shallow(<Chart data={[{ x: 0, y: 0, value: 50 }]} />);
});
