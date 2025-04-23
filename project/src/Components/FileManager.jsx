import { useState } from 'react';

function FileManager({ getText, setStackFromFile, activeUser, onLogout, setIsInputFocused }) {
  const [fileName, setFileName] = useState('');

  const getStorageKey = (name) => `${activeUser}_${name}`;

  const save = () => {
    if (!fileName) {
      alert("Please enter a file name first!");
      return;
    }
    const content = JSON.stringify(getText());
    localStorage.setItem(getStorageKey(fileName), content);
    alert(`File "${fileName}" was saved.`);
  };

  const saveAs = () => {
    const name = prompt("Enter a file name:");
    if (name) {
      setFileName(name);
      const content = JSON.stringify(getText());
      localStorage.setItem(getStorageKey(name), content);
      alert(`File "${name}" was saved.`);
    }
  };

  const open = () => {
    const name = prompt("Enter a file name to open:");
    if (name) {
      const content = localStorage.getItem(getStorageKey(name));
      if (content) {
        setFileName(name);
        setStackFromFile(JSON.parse(content));
        alert(`File "${name}" was loaded.`);
      } else {
        alert(`File "${name}" not found.`);
      }
    }
  };

  const downloadPdf = () => {
    const textArray = getText() || [];
    const text = textArray.map(item => `<span style="
      font-family: ${item.style?.fontFamily || 'Arial'};
      font-size: ${item.style?.fontSize || '16px'};
      color: ${item.style?.color || '#000000'};
    ">${item.char}</span>`).join('');

    const htmlContent = `
      <html>
        <head><title>${fileName || 'document'}</title></head>
        <body style="padding: 40px; font-family: Arial;">
          <div>${text}</div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `;

    const newWindow = window.open('', '_blank');
    newWindow.document.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
  };

  const logout = () => {
    localStorage.removeItem("activeUser");
    if (onLogout) {
      onLogout();
    } else {
      window.location.reload(); // Refresh the page if no callback is provided
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: '10px',
      backgroundColor: '#ADB5BD',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Added this to center horizontally
      gap: '10px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        maxWidth: '1200px', // Added max-width for better layout on wide screens
        width: '100%',
        justifyContent: 'center' // Center the inner content
      }}>
        <button 
          onClick={logout} 
          style={{ 
            backgroundColor: '#27619c', 
            color: 'white' 
          }}
        >Logout</button>

        <button onClick={save}>Save</button>
        <button onClick={saveAs}>Save As</button>
        <button onClick={open}>Open</button>
        <button onClick={downloadPdf}>Export to PDF</button>
        <input
          type="text"
          placeholder="File Name"
          value={fileName}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          onChange={(e) => setFileName(e.target.value)}
        />
      </div>
    </div>
  );
}

export default FileManager;
