import firebase from 'firebase/app';
import {useDispatch, useSelector} from '../Store';
import {dlog} from '../../utils/log';
import useDatabaseActions from '../Database/useDatabaseActions'

const whiteList = {email: true, firstName: true, lastName: true, photoUrl: true};

const useProfileActions = () => {
  const dispatch = useDispatch();
  const STORE_PROFILE = useSelector((state) => state.profile);
  const {updateDoc, readDoc} = useDatabaseActions();
  /**
   * initialize profile before entering the dashboard.
   * This runs when the user logs in or signs up. 
   * Data is pulled from firebase auth. 
   * Only using the Auth data - email, uid, emailVerified
   */
  const initialize = async () => {
    try {
      const user = firebase.auth().currentUser;
      let email;
      let uid;
      let emailVerified;
      let firstName;
      let lastName;
      let photoUrl;
      if (user != null) {
        email = user.email;
        emailVerified = user.emailVerified;
        uid = user.uid;
      }
      // get profile data from the database
      const {data, error} = await readDoc('users', uid);
      if (!error && data) {
        firstName = data.firstName || '';
        lastName = data.lastName || '';
        photoUrl = data.photoUrl || null;
      }
      dispatch({type: 'PROFILE_INIT', payload: {initialized: true, email, emailVerified, uid, firstName, lastName, photoUrl}});
    } catch (error) {
      console.trace('useProfileActions initialize error: ', error);
    }
  };
  /*
   * Update profile data in the database  
   * photoUrl, Name, 
   */
  const updateProfile = async (data) => {
    try {
      const {uid} = STORE_PROFILE || {};
      const updates = {};
      Object.entries(data).forEach(([key, value]) => {
        if (whiteList[key] && STORE_PROFILE[key] !== value) {
          updates[key] = value;
        }
      });
      if (!Object.keys(updates).length) {
        return {error: true, errorMessage: 'EMPTY_UPDATE'};
      }
      const {error} = await updateDoc('users', uid, data);
      if (!error) {
        if (!error) {
          dispatch({type: 'PROFILE_BASIC_UPDATE', payload: updates});
        }
      }
      return {error};
    } catch (error) {
      dlog('updateProfile error: ', error);
    }
    return {error: true};
  };
  const reset = () => {
    dispatch({type: 'PROFILE_RESET'});
  };
  return {
    initialize,
    reset,
    updateProfile,
  };
};

export default useProfileActions;
