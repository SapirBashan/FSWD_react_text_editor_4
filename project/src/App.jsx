import './App.css';
import { useState, useEffect } from 'react';
import VirtualKeyBoard from './Components/virtualKeyBoard';
import Login from './Components/Login';

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("activeUser");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // If user is not set, show login screen
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  // If user exists, show virtual keyboard
  return <VirtualKeyBoard activeUser={user} />;
}

export default App;
