import "./Auth.css";

function Login() {
  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Welcome back</h1>
        <p className="subtitle">Log in to your Dressify account</p>

        <form className="auth-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button className="btn primary full">Log In</button>
        </form>

        <p className="switch">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
