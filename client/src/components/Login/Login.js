import { useState } from 'react';
import './Login.css';
function Login({ onChangePage }) {
  const [data, setData] = useState({
    password: '',
    username: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <form className="sign-form">
      <h3>Login</h3>
      <div className="form-control">
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={data.username}
        />
      </div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={data.password}
        />
      </div>

      <div className="form-options">
        <span onClick={onChangePage}>Don't have an account? Sign up</span>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default Login;
