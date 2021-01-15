import firebase from 'firebase/app';
import {dlog} from '../../utils/log';
import {useSelector} from '../Store';
import useProfileActions from '../Profile/useProfileActions';

const useCloudStorageActions = () => {
  const profile = useSelector((state: any) => state.profile);
  const profileActions = useProfileActions();
  const storage = firebase.storage();

  const upload = async (path: string, fileName: string, file: any) => {
    let error = false;
    try {
      const storageRef = storage.ref();
      const photoUrlRef = storageRef.child(`${path}/${fileName}`);
      const snapshot = await photoUrlRef.put(file);
      const downloadURL = await snapshot.ref.getDownloadURL();
      return {error, downloadURL};
    } catch (errorMessage) {
      error = true
      dlog('updateProfileImage error: ', errorMessage);
    }
    return {error};
  }

  /**
   * upload profile image to the storage bucket. Then update Database user url;
   */
  const updateProfileImage = async (file: any) => {
    let error = false;
    let downloadURL;
    try {
      ({error, downloadURL} = await upload(`/users/${profile.uid}/`, 'profile-image.jpg', file));
      ({error} = await profileActions.updateProfile({photoUrl: downloadURL}));
    } catch (error) {
      dlog('updateProfileImage error: ', error);
    }
    return {error};
  };
  // console.log(storage);
  return {
    updateProfileImage,
  };

};

export default useCloudStorageActions;
