import firebase from 'firebase/app';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from '../Store';
import useDatabaseActions from '../Database/useDatabaseActions'
import useProfileActions from '../Profile/useProfileActions';
import {log, dlog} from '../../utils/log';


const useAuthActions = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const {createNewUser} = useDatabaseActions();
  const {updateProfile} = useProfileActions();

  const signIn = async (email, password) => {
    if (!password || !email) {
      return {error: true, errorType: 'EMPTY_PASSWORD', errorMessage: 'Please check email or password.'};
    }
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return {error: false, errorType: null};
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        return {error: true, errorType: 'EMPTY_PASSWORD', errorMessage};
      });
    if (!res.error) {
      dispatch({type: 'AUTH_SIGN_IN'});
      // nav to dashboard
      const {from} = location.state || {from: {pathname: '/dashboard'}};
      history.replace(from);
    }
    return res;
  };

  const signUp = async (email, password) => {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({additionalUserInfo, user}) => {
          const {uid} = user || {};
          const {isNewUser} = additionalUserInfo || {};
          return {data: {uid, isNewUser}, error: false, errorType: null};
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          return {error: true, errorType: 'EMPTY_PASSWORD', errorMessage};
        });
      if (!res.error && res.data) {
        const {uid} = res.data || {};
        // post new user to DB.
        await createNewUser(uid)
        // nav to dashboard
        const {from} = location.state || {from: {pathname: '/dashboard'}};
        history.replace(from);
      }
      return res;
    } catch (error) {
      console.trace('error: ', error);
    }
    return {error: true, errorMessage: 'system error'};
  };

  const signOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        dispatch({type: 'AUTH_SIGN_OUT'});
        // nav to root
        const {from} = location.state || {from: {pathname: '/login'}};
        history.replace(from);
      })
      .catch(() => {
        // An error happened.
      });
  };

  const passwordReset = async (emailAddress) => {
    try {
      const res = await firebase
        .auth()
        .sendPasswordResetEmail(emailAddress)
        .then(() => {
          // Email sent.
          return {error: false, errorType: null};
        })
        .catch((error) => {
          // An error happened.
          const errorMessage = error.message;
          return {error: true, errorType: 'CATCH_ERROR', errorMessage};
        });
      return res;
    } catch (error) {
      debugger;
    }
    return {error: true};
  };

  const updatePassword = async (newPassword, userProvidedPassword) => {
    try {
      const user = firebase.auth().currentUser;
      let error = false;
      try {
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          userProvidedPassword
        );
        await user.reauthenticateWithCredential(credential);
      } catch (errorMessage) {
        log('update email re-auth error: ', errorMessage);
        error = true;
        return {error: true, errorMessage: errorMessage && errorMessage.message ? errorMessage.message : 'The password is invalid or the user does not have a password.'};
      }
      try {
        if (!error) {
          await user.updatePassword(newPassword);
          return {error: false};
        }
      } catch (errorMessage) {
        dlog('Auth updateEmail action error: ', errorMessage)
        return {error: true, errorMessage}
      }
    } catch (errorMessage) {
      dlog('Auth updateEmail error: ', errorMessage);
    }
    return {error: true};
  }

  const updateEmail = async (newEmail, userProvidedPassword) => {
    try {
      const user = firebase.auth().currentUser;
      let error = false;
      try {
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          userProvidedPassword
        );
        await user.reauthenticateWithCredential(credential);
      } catch (errorMessage) {
        log('update email re-auth error: ', errorMessage);
        error = true;
        return {error: true, errorMessage: errorMessage && errorMessage.message ? errorMessage.message : 'The password is invalid or the user does not have a password.'};
      }
      try {
        if (!error) {
          await user.updateEmail(newEmail);
          await updateProfile({email: newEmail});
          return {error: false};
        }
      } catch (errorMessage) {
        dlog('Auth updateEmail action error: ', errorMessage)
      }
    } catch (errorMessage) {
      dlog('Auth updateEmail error: ', errorMessage);
    }
    return {error: true};
  }

  const sendEmailVerification = async () => {
    try {
      const user = firebase.auth().currentUser;
      try {
        await user.sendEmailVerification()
      } catch (errorMessage) {
        log('update email re-auth error: ', errorMessage);
        return {error: true, errorMessage: errorMessage && errorMessage.message ? errorMessage.message : 'Sending email error.'};
      }
      return { error: false };
    } catch (errorMessage) {
      dlog('Auth updateEmail error: ', errorMessage);
    }
    return {error: true};
  }

  return {
    signIn,
    signUp,
    signOut,
    passwordReset,
    updatePassword,
    updateEmail,
    sendEmailVerification,
  };
};

export default useAuthActions;
