import React, {useState, useEffect, useRef} from 'react';
import useAuthActions from '../../providers/Auth/useAuthActions';
import {Link} from 'react-router-dom';

const SignUp = () => {
  const mounted = useRef(true);
  const authActions = useAuthActions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const onSignUp = async () => {
    if (confirmPassword !== password) {
      setMessage('Passwords do not match.');
      return;
    }
    setLoading(true);
    await authActions.signUp(email, password, ({error, errorMessage}) => {
      if (error) {
        setMessage(errorMessage);
      }
    });
    if (mounted.current) {
      setLoading(false);
    }
  };

  const form = (
    <form>
      <div className="form-group">
        <label className="mb-1">Email address</label>
        <input
          type="email"
          className="form-control form-control-lg"
          placeholder="name@address.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <div className="mt-3 mb-1">
          <label>Password</label>
        </div>
        <input
          type="password"
          className="form-control form-control-lg"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <div className="mt-3 mb-1">
          <label>Confirm Password</label>
        </div>
        <input
          type="password"
          className="form-control form-control-lg"
          placeholder="Enter your password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>
    </form>
  );

  const SignUpBtn = (
    <div className="d-grid mt-3 mb-3">
      {loading ? (
        <button type="button" className="btn btn-primary btn-block btn-lg" disabled>
          <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
      Loading...
        </button>
      ) : (
          <button type="button" className="btn btn-primary btn-block btn-lg" onClick={onSignUp}>
            Sign Up
          </button>
        )}
    </div>
  );

  const ErrorMessage = (
    <div className="mt-4" style={{height: 16}}>
      <p className="text-danger">{message}</p>
    </div>
  );

  const loginLink = <Link to="/login">Login</Link>;

  const loginTextSection = <p className="form-text text-muted text-center mt-2">Have an account? {loginLink}.</p>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3" />
        <div className="col-12 col-lg-6">
          <h1 className="mb-3">Sign Up</h1>
          {form}
          {SignUpBtn}
          {loginTextSection}
          {ErrorMessage}
        </div>
        <div className="col-lg-3" />
      </div>
    </div>
  );
};

export default SignUp;
