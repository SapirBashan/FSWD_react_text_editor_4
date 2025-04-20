import { useState } from 'react';

function FileManager({ getText, setStackFromFile, activeUser, onLogout }) {
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
    <div style={{ margin: '10px' }}>
      <button onClick={save}>Save</button>
      <button onClick={saveAs}>Save As</button>
      <button onClick={open}>Open</button>
      <button onClick={downloadPdf}>Export to PDF</button>
      <button onClick={logout} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>Logout</button>
      <input
        type="text"
        placeholder="File Name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        style={{ marginLeft: '10px' }}
      />
    </div>
  );
}

export default FileManager;