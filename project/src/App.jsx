import './App.css';
import { useState } from 'react';
import VirtualKeyBoard from './Components/virtualKeyBoard';
import Login from './Components/Login';

function App() {
  // Load user from localStorage directly during initialization
  const [user, setUser] = useState(localStorage.getItem("activeUser"));

  // If user is not set, show login screen
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  // If user exists, show virtual keyboard
  return <VirtualKeyBoard activeUser={user} />;
}

export default App;