import { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = () => {
    const trimmed = username.trim();
    if (!trimmed) {
      alert("Please enter a username");
      return;
    }

    if (localStorage.getItem(trimmed)) {
      alert("Username already exists. Please choose a different username.");
      return;
    }

    // Save new user to localStorage
    localStorage.setItem(trimmed, JSON.stringify({ username: trimmed }));
    alert("Registration successful! You can now sign in.");
    setIsRegistering(false);
    setUsername('');
  };

  const handleSignIn = () => {
    const trimmed = username.trim();
    if (!trimmed) {
      alert("Please enter a username");
      return;
    }

    if (!localStorage.getItem(trimmed)) {
      alert("Username not found. Please register first.");
      return;
    }

    // Save active user to localStorage and notify parent
    localStorage.setItem("activeUser", trimmed);
    onLogin(trimmed);
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>{isRegistering ? "Register" : "Sign In"}</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '10px', width: '200px' }}
      />
      <br /><br />
      {isRegistering ? (
        <>
          <button onClick={handleRegister}>Register</button>
          <br /><br />
          <button onClick={() => setIsRegistering(false)}>Already have an account? Sign In</button>
        </>
      ) : (
        <>
          <button onClick={handleSignIn}>Sign In</button>
          <br /><br />
          <button onClick={() => setIsRegistering(true)}>Don't have an account? Register</button>
        </>
      )}
    </div>
  );
}

export default Login;