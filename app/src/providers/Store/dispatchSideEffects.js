import { dlog } from '../../utils/log';

const dispatchSideEffects = ({ type, dispatch }) => {
  try {
    if (type === 'AUTH_SIGN_OUT') {
      // reset all states
      dispatch({ type: 'PROFILE_RESET' });
    }
  } catch (error) {
    dlog('dispatchSideEffects error: ', error);
  }
};

export default dispatchSideEffects;
