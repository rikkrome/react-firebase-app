import { AUTH_INIT, AUTH_SIGN_IN, AUTH_SIGN_OUT } from './constants';

const initialState = {
  isAuthorized: false,
  initialized: false,
};

const ACTION_HANDLERS = {
  [AUTH_INIT]: (state, action) => {
    const { payload } = action;
    return { ...state, ...payload };
  },
  [AUTH_SIGN_IN]: (state) => {
    return { ...state, isAuthorized: true };
  },
  [AUTH_SIGN_OUT]: () => {
    return { ...initialState };
  },
};

export { initialState };

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
