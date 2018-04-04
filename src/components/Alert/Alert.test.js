import React from 'react';
import { shallow } from 'enzyme';

import { Alert } from './Alert';

it('renders Alert without crashing', () => {
  shallow(<Alert />);
});
