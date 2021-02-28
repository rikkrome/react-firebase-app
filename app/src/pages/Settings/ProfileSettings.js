/**
 * ProfileSettings
 * View & Edit - Profile Photo, First Name, Last Name
 *
 */
import React, {useEffect, useMemo, useReducer} from 'react';
import Avatar from '../../components/Avatar';
import {useSelector} from '../../providers/Store';
import useProfileActions from '../../providers/Profile/useProfileActions';
// import useSystemActions from '../../providers/System/useSystemActions';
import useCloudStorageActions from '../../providers/CloudStorage/useCloudStorageActions';
import SaveBtn from '../../components/SaveBtn';
import {dlog} from '../../utils/log';
import Button from '../../components/Button';

const initialState = {
  initialized: false,
  firstName: '',
  lastName: '',
  selectedImage: null,
};

function reducer(state, action) {
  const {type, payload} = action || {};
  const {selectedImage} = payload || {};
  const {image, file} = selectedImage || {};
  switch (type) {
    case 'initialized':
      return {...state, ...payload, initialized: true};
    case 'save_first_name':
      return {...state, firstName: payload.firstName || ''};
    case 'save_last_name':
      return {...state, lastName: payload.lastName || ''};
    case 'save_selected_image':
      return {...state, selectedImage: {image, file}}
    case 'cancel_selected_image':
      return {...state, selectedImage: {image, file: null}}
    default:
      throw new Error();
  }
}

const ProfileSettings = () => {

  const profile = useSelector((state) => state.profile);
  const profileActions = useProfileActions();
  // const {PushAlert} = useSystemActions();
  const cloudStorageActions = useCloudStorageActions();
  const [state, localDispatch] = useReducer(reducer, initialState);
  const {firstName, lastName, selectedImage} = state || {};

  useEffect(() => {
    // effect
    if (profile && profile.initialized && !state.initialized) {
      localDispatch({type: 'initialized', payload: {firstName: profile.firstName || '', lastName: profile.lastName || '', selectedImage: {image: profile.photoUrl || null, file: null}}})
    }
  }, [profile, state.initialized]);

  const onSaveProfileImage = async () => {
    try {
      if (selectedImage && selectedImage.file) {
        const {error} = await cloudStorageActions.updateProfileImage(selectedImage.file);
        localDispatch({type: 'save_selected_image', payload: {selectedImage: {image: selectedImage.image, file: null}}})
        return {error};
      }
    } catch (errorMessage) {
      dlog('onSaveProfileImage error: ', errorMessage);
    }
    return {error: true};
  }

  const onCancelSaveProfileImage = () => {
    try {
      if (selectedImage && selectedImage.file) {
        localDispatch({type: 'cancel_selected_image', payload: {selectedImage: {image: profile.photoUrl || null}}})
      }
    } catch (errorMessage) {
      dlog('onSaveProfileImage error: ', errorMessage);
    }
  }

  const onImageChange = (event) => {
    try {

      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        // ----
        const reader = new FileReader();
        reader.onload = (e) => {
          localDispatch({type: 'save_selected_image', payload: {selectedImage: {image: e.target.result, file}}})
        };
        reader.readAsDataURL(file);
        // ---
      }
    } catch (errorMessage) {
      dlog('onImageChange error: ', errorMessage)
    }
  };

  const saveProfileImageBtnDisabled = useMemo(() => !selectedImage || selectedImage && !selectedImage.file, [selectedImage])

  const AvatarSection = (
    <div className="card mt-3">
      <div className="card-body bg-light">
        <div className="row">
          <div className="col d-flex flex-row align-items-center mb-4 ">
            <div className="row">
              <div className="col-12 col-md-3">
                <Avatar uri={selectedImage && selectedImage.image ? selectedImage.image : profile.photoUrl} size={100} />
              </div>
              <div className="col-12 col-md-9 p-3">
                <form>
                  <div className="form-group d-flex flex-column ">
                    <label htmlFor="exampleFormControlFile1">Edit Profile Image</label>
                    <input type="file" className="form-control" onChange={onImageChange} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row ">
          {saveProfileImageBtnDisabled ? null : (
            <div className="col d-flex flex-row justify-content-end">
              <Button label="Cancel" className="btn btn-danger me-3" onClick={onCancelSaveProfileImage} disabled={saveProfileImageBtnDisabled} />
              <SaveBtn onClick={onSaveProfileImage} disabled={saveProfileImageBtnDisabled} />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const BasicBtnOnPress = async () => {
    const res = await profileActions.updateProfile({firstName, lastName});
    return res;
  };

  const SaveBtnDisabled = useMemo(() => {
    let disabled = true;
    if (firstName && profile.firstName !== firstName) {
      disabled = false;
    }
    if (lastName && profile.lastName !== lastName) {
      disabled = false;
    }
    return disabled;
  }, [firstName, lastName, profile.lastName, profile.firstName]);

  const BasicForms = (
    <div className="card mt-3">
      <div className="card-body bg-light">
        <form>
          <div className="form-group">
            <div className="row">
              <div className="col-12 col-md-4 mb-3">
                <label>First Name</label>
                <input
                  type="name"
                  className="form-control form-control-lg"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => localDispatch({type: 'save_first_name', payload: {firstName: e.target.value}})}
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>Last Name</label>
                <input
                  type="name"
                  className="form-control form-control-lg"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => localDispatch({type: 'save_last_name', payload: {lastName: e.target.value}})}
                />
              </div>
              <div className="col-12 col-md-4" />
            </div>
          </div>
        </form>
        {SaveBtnDisabled ? null : <SaveBtn onClick={BasicBtnOnPress} disabled={SaveBtnDisabled} />}
      </div>
    </div>
  );

  return (
    <div className="container p-4">
      {AvatarSection}
      {BasicForms}
    </div>
  );
};

export default ProfileSettings;
