import firebase from 'firebase/app';
import {dlog} from '../../utils/log';

/**
 * useDatabaseActions hook
 * Actions for the Database.
 * create, update, delete
 */
const useDatabaseActions = () => {
  const db = firebase.firestore();

  /**
   * Create a new User doc in the Database on sign up.
   */
  const createNewUser = async (id: number) => {
    let error = false;
    try {
      if (!id) {
        return;
      }
      await db.collection('users').doc(`${id}`).set({
        id,
      });
    } catch (errorMessage) {
      error = true;
      dlog('createNewUser error: ', errorMessage);
    }
    return {error};
  }

  const updateDoc = async (collection: string, doc: string, data: any) => {
    try {
      await db.collection(collection).doc(doc).update(data);
      return {error: false};
    } catch (error) {
      dlog('updateSoc error: ', error);
    }
    return {error: true};
  }

  const readDoc = async (collection: string, doc: string) => {
    let error = false;
    try {
      const _doc = await db.collection(collection).doc(doc).get();
      if (_doc && _doc.exists) {
        return {data: _doc.data(), error};
      }
    } catch (errorMessage) {
      error = true;
      dlog('readDoc error: ', errorMessage);
    }
    return {error};
  }
  return {
    createNewUser,
    updateDoc,
    readDoc,
  };
}


export default useDatabaseActions;
