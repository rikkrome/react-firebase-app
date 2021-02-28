import React, {createContext, useContext, useReducer} from 'react';
import auth from '../Auth/reducers';
import profile from '../Profile/reducers';
import system from '../System/reducers';
import {dlog} from '../../utils/log';
import dispatchSideEffects from './dispatchSideEffects';

const StoreContext = createContext();

const initialState = {};

const combinedReducers = {auth, profile, system};

function reducer(state, action = {}) {
  try {
    const updatedState = {};
    Object.entries(combinedReducers).forEach(([key, reducerFunc]) => {
      const sectionState = reducerFunc(state[key], action);
      updatedState[key] = {...sectionState};
    });
    return {...state, ...updatedState};
  } catch (error) {
    dlog('reducer error: ', error);
  }
  return state;
}

export const useSelector = (cb) => {
  const [state] = useContext(StoreContext);
  if (cb && typeof cb === 'function') {
    return cb(state);
  }
  return null;
};

export const useDispatch = () => {
  const [, dispatch] = useContext(StoreContext);
  return ({type, payload}) => {
    dispatch({type, payload});
    dispatchSideEffects({type, dispatch});
  };
};

const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState, reducer);
  return <StoreContext.Provider value={[state, dispatch]}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
