import { createMockStore } from 'redux-test-utils';
import { alertActions } from './';

describe('Alert', () => {
  it('alert is cleared', () => {
    const store = createMockStore({});
    store.dispatch(alertActions.clear());
    expect(store.getActions()).toEqual([{ type: 'ALERT_CLEAR' }]);
  });
  it('alert is success', () => {
    const store = createMockStore({});
    store.dispatch(alertActions.success());
    expect(store.getActions()).toEqual([{ type: 'ALERT_SUCCESS' }]);
  });
  it('alert is error', () => {
    const store = createMockStore({});
    store.dispatch(alertActions.error());
    expect(store.getActions()).toEqual([{ type: 'ALERT_ERROR' }]);
  });
});
