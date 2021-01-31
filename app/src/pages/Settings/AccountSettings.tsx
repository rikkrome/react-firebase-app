import React, { useEffect, useMemo, useReducer } from 'react';
import { useSelector } from '../../providers/Store';
import useAuthActions from '../../providers/Auth/useAuthActions';
import SaveBtn from '../../components/SaveBtn';
import Button from '../../components/Button';
import XSvg from '../../assets/icons/xSVG';
import CheckAllSvg from '../../assets/icons/CheckAllSvg';
import { dlog } from '../../utils/log';

interface StateTypes {
  initialized: boolean;
  email: string;
  editEmail: boolean;
  emailCurrentPassword: string;
  emailErrorMessage: string;
  editPassword: boolean;
  passwordCurrentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  passwordMessage: { type: string, text: string };
}

const passwordMessageBase = { type: '', text: '' };

const initialState: StateTypes = {
  initialized: false,
  email: '',
  editEmail: false,
  emailCurrentPassword: '',
  emailErrorMessage: '',
  editPassword: false,
  passwordCurrentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
  passwordMessage: passwordMessageBase,
};

function reducer(state: StateTypes, action: { type: string, payload?: any }) {
  const { type, payload } = action || {};
  switch (type) {
    case 'initialized':
      return { ...state, ...payload, initialized: true };
    case 'save_email':
      return { ...state, email: payload.email || '' };
    case 'edit_email':
      return { ...state, editEmail: payload.editEmail || false, emailCurrentPassword: '', emailErrorMessage: '' };
    case 'save_email_current_password':
      return { ...state, emailCurrentPassword: payload.emailCurrentPassword || '', emailErrorMessage: '' };
    case 'email_error_meaagse':
      return { ...state, emailErrorMessage: payload.emailErrorMessage || '' };
    case 'edit_password':
      return { ...state, editPassword: payload.editPassword || false, passwordCurrentPassword: '', newPassword: '', confirmNewPassword: '', passwordMessage: passwordMessageBase };
    case 'save_password_current_password':
      return { ...state, passwordCurrentPassword: payload.passwordCurrentPassword || '', passwordMessage: passwordMessageBase };
    case 'save_new_password':
      return { ...state, newPassword: payload.newPassword || '', passwordMessage: passwordMessageBase };
    case 'save_confirm_new_password':
      return { ...state, confirmNewPassword: payload.confirmNewPassword || '', passwordMessage: passwordMessageBase };
    case 'password_error_message':
      return { ...state, passwordMessage: { type: 'danger', text: payload.errorMessage }, newPassword: '', confirmNewPassword: '', passwordCurrentPassword: '' };
    case 'password_successful_update':
      return { ...state, passwordMessage: { type: 'success', text: 'Saved!' }, newPassword: '', confirmNewPassword: '', passwordCurrentPassword: '', editPassword: false }
    case 'reset':
      return { ...initialState };
    default:
      throw new Error();
  }
}

const ProfileSettings = () => {
  const profile = useSelector((state: any) => state.profile);
  const { updatePassword, updateEmail } = useAuthActions()
  const [state, localDispatch] = useReducer(reducer, initialState);
  const { email, editEmail, emailCurrentPassword, emailErrorMessage, editPassword, passwordCurrentPassword, newPassword, confirmNewPassword, passwordMessage } = state || {};

  useEffect(() => {
    // effect
    if (profile && profile.initialized && !state.initialized) {
      localDispatch({ type: 'initialized', payload: { email: profile.email || '' } })
    }
  }, [profile, state.initialized]);

  const onUpdateEmail = async () => {
    try {
      const { error, errorMessage } = await updateEmail(email, emailCurrentPassword);
      if (error) {
        localDispatch({ type: 'email_error_meaagse', payload: { emailErrorMessage: errorMessage } });
      }
      return { error }
    } catch (err) {
      dlog('onUpdateEmail errorMessage: ', err)
    }
  }

  const EmailForm = (
    <div className="mt-3">
      <form>
        <div className="form-group">
          <div className="row">
            <div className="col-12 col-md-6">
              <label>New Email Address</label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="name@address.com"
                value={email}
                onChange={(e) => localDispatch({ type: 'save_email', payload: { email: e.target.value } })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 mt-3 mb-3">
              <label>Your Current Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="******"
                value={emailCurrentPassword}
                onChange={(e) => localDispatch({ type: 'save_email_current_password', payload: { emailCurrentPassword: e.target.value } })}
              />
            </div>
          </div>
        </div>
      </form>
      <div className="row d-flex justify-content-end">
        <div className="col">
          <label className="text-danger">{emailErrorMessage}</label>
        </div>
        <div className="col d-flex justify-content-end">
          <Button label="Cancel" className="btn btn-link" onClick={() => localDispatch({ type: 'edit_email', payload: { editEmail: false } })} />
          <SaveBtn onClick={onUpdateEmail} disabled={profile.email === email || !emailCurrentPassword} />
        </div>
      </div>
    </div>
  );

  const EmailPreview = (
    <div>
      <div className="row">
        <div className="col-12 mb-3">
          {profile.email}
        </div>
      </div>
      <Button label="Update Email" className="btn btn-link p-0 mt-2 me-3" onClick={() => localDispatch({ type: 'edit_email', payload: { editEmail: true } })} />
      {!profile.emailVerified ? (
        <button type="button" className="btn btn-danger ml-2">
          Verify Email
        </button>
      ) : null}
    </div>
  )
  const EmailSection = (
    <div className="card">
      <div className="card-header">Email</div>
      <div className="card-body">
        {editEmail ? EmailForm : EmailPreview}
      </div>
    </div>
  )
  const passwordsMatch = useMemo(() => {
    if (newPassword !== confirmNewPassword || !newPassword || !confirmNewPassword) {
      return false;
    }
    return true;
  }, [newPassword, confirmNewPassword])

  const onUpdatePassword = async () => {
    try {
      const { error, errorMessage } = await updatePassword(newPassword, passwordCurrentPassword);
      if (error) {
        localDispatch({ type: 'password_error_message', payload: { errorMessage } });
      }
      if (!error) {
        localDispatch({ type: 'password_successful_update' })
      }
      return { error }
    } catch (err) {
      dlog('onUpdatePassword error: ', err)
    }
    return { error: true };
  }
  const ConfirmIcon = confirmNewPassword === newPassword ? <CheckAllSvg className="ml-2 text-success" width={28} height={28} /> : <XSvg className="ml-2 text-danger" width={28} height={28} />;

  const PasswordMessage = <label className={`text-${passwordMessage.type}`}>{passwordMessage.text}</label>;
  const PasswordForm = (
    <div className="mt-3">
      <form>
        <div className="form-group">
          <div className="row">
            <div className="col-12 col-md-6">
              <label>Your Current Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="******"
                value={passwordCurrentPassword}
                onChange={(e) => localDispatch({ type: 'save_password_current_password', payload: { passwordCurrentPassword: e.target.value } })}
              />
            </div>
            <div className="col col-md-6" />
          </div>
          <div className="row mt-2">
            <div className="col-12 col-md-6 mb-2">
              <label>New Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="******"
                value={newPassword}
                onChange={(e) => localDispatch({ type: 'save_new_password', payload: { newPassword: e.target.value } })}
              />
            </div>
            <div className="col-12 col-md-6 mb-2">
              <div className="d-flex" >
                <label>Confirm New Password</label>
                {newPassword || confirmNewPassword ? ConfirmIcon : null}
              </div>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="******"
                value={confirmNewPassword}
                onChange={(e) => localDispatch({ type: 'save_confirm_new_password', payload: { confirmNewPassword: e.target.value } })}
              />
            </div>
          </div>
        </div>
      </form>
      <div className="row d-flex justify-content-end">
        <div className="col ">
          {PasswordMessage}
        </div>
        <div className="col d-flex justify-content-end">
          <SaveBtn onClick={onUpdatePassword} disabled={!passwordsMatch || !passwordCurrentPassword} />
          <Button label="Cancel" className="btn btn-link" onClick={() => localDispatch({ type: 'edit_password', payload: { editPassword: false } })} />
        </div>
      </div>
    </div>
  );

  const PasswordPreview = (
    <div>
      <div className="row">
        <div className="col">
          *********
        </div>
      </div>
      <Button label="Update Password" className="btn btn-link p-0 mt-2" onClick={() => localDispatch({ type: 'edit_password', payload: { editPassword: true } })} />
    </div>
  )

  const PasswordSection = (
    <div className="card mt-3">
      <div className="card-header">Your Password {passwordMessage.type === 'success' ? PasswordMessage : null}</div>
      <div className="card-body">
        {editPassword ? PasswordForm : PasswordPreview}
      </div>
    </div>
  )

  return (
    <div className="container p-4">
      {EmailSection}
      {PasswordSection}
    </div>
  );
};

export default ProfileSettings;
