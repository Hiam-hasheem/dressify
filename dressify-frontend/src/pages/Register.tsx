import "./Auth.css";

function Register() {
  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Create account</h1>
        <p className="subtitle">Join Dressify and start selling</p>

        <form className="auth-form">
          <input type="text" placeholder="Full name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm password" />

          <button className="btn primary full">Register</button>
        </form>

        <p className="switch">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
