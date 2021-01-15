import React, {useState, useEffect, useRef} from 'react';
import useAuthActions from '../../providers/Auth/useAuthActions';

const PasswordReset = () => {
  const mounted = useRef(true);
  const authActions = useAuthActions();
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const onPasswordReset = async () => {
    setLoading(true);
    const {error, errorMessage} = await authActions.passwordReset(email);
    if (mounted.current) {
      if (error) {
        setAlertMessage({type: 'warning', message: errorMessage});
      } else {
        // email sent
        setDone(true);
        setAlertMessage({type: 'success', message: 'Email Sent'});
      }
      setLoading(false);
    }
  };

  const form = (
    <>
      <h1>Forgot your password?</h1>
      <form className="mt-4">
        <div className="form-group">
          <label>Email address</label>
          <input
            disabled={done}
            type="email"
            className="form-control form-control-lg"
            placeholder="name@address.com"
            onChange={(e) => {
              setAlertMessage(null);
              setEmail(e.target.value);
            }}
          />
        </div>
      </form>
    </>
  );

  const SignUpBtn = loading ? (
    <button type="button" className="btn btn-primary btn-block btn-lg" disabled>
      <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
      Loading...
    </button>
  ) : (
      <button
        type="button"
        className={`btn btn-block btn-lg ${done ? 'btn-secondary' : 'btn-primary'}`}
        onClick={onPasswordReset}
        disabled={done}
      >
        Send me reset password instructions
      </button>
    );
  const AlertMessage = alertMessage ? (
    <div className={`alert alert-${alertMessage.type} mt-4`} role="alert">
      {alertMessage.message}
    </div>
  ) : null;

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3" />
        <div className="col-12 col-lg-6">
          {form}
          {SignUpBtn}
          {AlertMessage}
        </div>
        <div className="col-lg-3" />
      </div>
    </div>
  );
};

export default PasswordReset;
