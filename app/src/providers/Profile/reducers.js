import { PROFILE_INIT, PROFILE_BASIC_UPDATE, PROFILE_RESET } from './constants';

const initialState = {
  initialized: false,
};

const ACTION_HANDLERS = {
  [PROFILE_INIT]: (state, action) => {
    const { payload } = action;
    return { ...state, ...payload };
  },
  [PROFILE_BASIC_UPDATE]: (state, action) => {
    const { payload } = action;
    return { ...state, ...payload };
  },
  [PROFILE_RESET]: () => {
    return initialState;
  },
};

export { initialState };

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
