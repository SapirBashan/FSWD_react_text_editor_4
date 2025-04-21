import { useState } from 'react';
import '../css/login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    if (!trimmedUsername || !trimmedPassword) {
      alert("Please enter both username and password");
      return;
    }

    if (localStorage.getItem(trimmedUsername)) {
      alert("Username already exists. Please choose a different username.");
      return;
    }

    // Save new user to localStorage
    localStorage.setItem(trimmedUsername, JSON.stringify({ username: trimmedUsername, password: trimmedPassword }));
    alert("Registration successful! You can now sign in.");
    setIsRegistering(false);
    setUsername('');
    setPassword('');
  };

  const handleSignIn = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    if (!trimmedUsername || !trimmedPassword) {
      alert("Please enter both username and password");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem(trimmedUsername));
    if (!storedUser || storedUser.password !== trimmedPassword) {
      alert("Invalid username or password. Please try again.");
      return;
    }

    // Save active user to localStorage and notify parent
    localStorage.setItem("activeUser", trimmedUsername);
    onLogin(trimmedUsername);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegistering ? "Register" : "Sign In"}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        {isRegistering ? (
          <>
            <button onClick={handleRegister} className="login-button">Register</button>
            <p className="toggle-text">
              Already have an account? <span onClick={() => setIsRegistering(false)}>Sign In</span>
            </p>
          </>
        ) : (
          <>
            <button onClick={handleSignIn} className="login-button">Sign In</button>
            <p className="toggle-text">
              Don't have an account? <span onClick={() => setIsRegistering(true)}>Register</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;