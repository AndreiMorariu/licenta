import './Signup.css';

function Signup({ onChangePage, onSubmit }) {
  return (
    <form className="sign-form" onSubmit={handleFormSubmit}>
      <h3>Sign up</h3>
      <div className="form-control">
        <input type="text" placeholder="First Name" name="firstname" />
      </div>
      <div className="form-control">
        <input type="text" placeholder="Last Name" name="lastname" />
      </div>
      <div className="form-control">
        <input type="text" placeholder="Username" name="username" />
      </div>
      <div className="form-control">
        <input type="password" placeholder="Password" name="password" />
      </div>
      {confirmPassword || (
        <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>
          *Passwords do not match
        </span>
      )}
      <div className="form-control">
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmpass"
        />
      </div>
      <div className="form-options">
        <span>Already have an account? Login</span>
        <button type="submit">Sign up</button>
      </div>
    </form>
  );
}

export default Signup;
