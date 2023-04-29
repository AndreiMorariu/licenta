import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Auth.css';
import { logIn, signUp } from '../../actions/AuthAction';

function Auth() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpass: '',
  });

  const [isSignedUp, setIsSignedUp] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignedUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setIsPasswordValid(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setIsPasswordValid(true);
    setData({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmpass: '',
    });
  };

  return (
    <div className="auth">
      <form className="sign-form" onSubmit={handleSubmit}>
        <h3>{isSignedUp ? 'Sign Up' : 'Login'}</h3>

        {isSignedUp && (
          <>
            <div className="form-control">
              <input
                type="text"
                placeholder="First Name"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
            </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          </>
        )}

        <div className="form-control">
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
          />
        </div>
        <div className="form-control">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
          />
        </div>
        {isPasswordValid || (
          <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>
            *Passwords do not match
          </span>
        )}
        {isSignedUp && (
          <div className="form-control">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmpass"
              onChange={handleChange}
              value={data.confirmpass}
            />
          </div>
        )}
        <div className="form-options">
          <span
            onClick={() => {
              setIsSignedUp((prev) => !prev);
              resetForm();
            }}
          >
            {isSignedUp
              ? 'Already have an account? Login'
              : "Don't have an account? Sign Up"}
          </span>
          <button type="submit">{isSignedUp ? 'Sign Up' : 'Login'}</button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
