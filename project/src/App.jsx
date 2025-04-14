import React from 'react';
import KeyRow from './components/keyboard/layouts/keys/KeyRow.jsx';

function App() {
  // const [input, setInput] = useState('');

  // // Called when a key is pressed
  // function handleKeyPress(value) {
  //   if (value === '*backspace*') {
  //     setInput((prev) => prev.slice(0, -1));
  //   } else {
  //     setInput((prev) => prev + value);
  //   }
  // }

  function handleKeyPress2(value) {
    console.log(value); // Log the pressed key value to the console
  }

  // Example row of keys
  const test_list_of_keys = [
    { label: 'tab', value: '\t', size: 1.5 },
    { label: 'q', value: 'q', size: 1 },
    { label: 'w', value: 'w', size: 1 },
    { label: 'e', value: 'e', size: 1 },
    { label: 'r', value: 'r', size: 1 },
    { label: 't', value: 't', size: 1 },
    { label: 'y', value: 'y', size: 1 },
    { label: 'u', value: 'u', size: 1 },
    { label: 'i', value: 'i', size: 1 },
    { label: 'o', value: 'o', size: 1 },
    { label: 'p', value: 'p', size: 1 },
    { label: 'backspace', value: '*backspace*', size: 3 },
  ];

  return (
    <div style={{ padding: '2em' }}>
      <h1>Virtual Keyboard Test</h1>

      <KeyRow list_of_keys={test_list_of_keys} onKeyPress={handleKeyPress2} />
    </div>
  );
}

export default App;
