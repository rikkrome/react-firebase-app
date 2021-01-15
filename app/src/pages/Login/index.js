import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './styles.css';
import useAuthActions from '../../providers/Auth/useAuthActions';
import loginImage from '../../assets/images/login-img.png';

const Login = () => {
  const authActions = useAuthActions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const login = async () => {
    const {error, errorMessage} = await authActions.signIn(email, password);
    if (error) {
      setMessage(errorMessage);
    }
  };

  const signupLink = <Link to="/signup">Sign up</Link>;

  const forgotPasswordLink = (
    <Link to="/password-reset" className="text-muted">
      <small>Forgot password?</small>
    </Link>
  );
  const form = (
    <form>
      <div className="form-group">
        <div className="mb-1">
          <label>Email address</label>
        </div>
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
        <div className="d-flex justify-content-between mt-3 mb-1">
          <label>Password</label>
          {forgotPasswordLink}
        </div>
        <input
          type="password"
          className="form-control form-control-lg"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div style={{minHeight: 16}}>
          <p className="text-danger">{message}</p>
        </div>
      </div>
      <div className="d-grid">
        <button type="button" className="btn btn-primary btn-lg" onClick={login}>
          Log in
      </button>
      </div>
      <p className="form-text text-muted text-center mt-2">Don&apos;t have an account yet? {signupLink}.</p>
    </form>
  );

  const imageSection = (
    <div className="media">
      <img width="100%" height="auto" className="mr-3" src={loginImage} alt="login" />
    </div>
  );

  return (
    <div className="d-flex container align-items-center login-container">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 offset-xl-2 offset-md-1 order-md-2 mb-5 mb-md-0">{imageSection}</div>
        <div className="col-12 col-md-5 col-xl-4 order-md-1 my-5">
          <h1 className="text-center mb-3">Sign in</h1>
          {form}
        </div>
      </div>
    </div>
  );
};

export default Login;
