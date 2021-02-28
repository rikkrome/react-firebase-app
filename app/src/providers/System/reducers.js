import { PUSH_ALERT, CLEAR_ALL_ALERTS } from './constants';

const initialState = {
  alerts: [],
};

const ACTION_HANDLERS = {
  [PUSH_ALERT]: (state, action) => {
    const { payload } = action;
    const {alerts} = payload || {};
    return { ...state, alerts, };
  },
  [CLEAR_ALL_ALERTS]: (state) => {
    return { ...state, alerts: [], };
  }
};

export { initialState };

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
