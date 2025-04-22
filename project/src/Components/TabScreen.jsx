import React from "react";
import Screen from "./Screen";
import "../css/KeyBoardStylee.css";

function TabScreen({ text, searchQuery, cursorPosition, focus, setFocus, setText }) {
  // Function to handle tab switching
  const handleTabClick = (tabIndex) => {
    setFocus(tabIndex); // Update the focus to the selected tab
  };

  // Function to add a new file
  const addFile = () => {
    const newFile = []; // New empty file
    setText((prevText) => [...prevText, newFile]); // Add the new file to the text array
    setFocus(text.length); // Set focus to the new file
  };

  // Function to delete the current file
  const deleteFile = () => {
    if (text.length > 1) {
      setText((prevText) => prevText.filter((_, index) => index !== focus)); // Remove the focused file
      setFocus((prevFocus) => (prevFocus > 0 ? prevFocus - 1 : 0)); // Adjust focus to the previous file
    } else {
      alert("You must have at least one file open."); // Prevent deleting the last file
    }
  };

  return (
    <div className="tab-screen-container">
      {/* Tabs for switching between documents */}
      <div className="tabs">
        {text.map((_, index) => (
          <div
            key={index}
            className={`tab ${index === focus ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            Document {index + 1}
          </div>
        ))}
        <button onClick={addFile} className="add-file-button">
          + Add File
        </button>
      </div>

      {/* Writing area for the active document */}
      <div className="screenDiv">
        <Screen
          text={text[focus]} // Display the content of the focused document
          searchQuery={searchQuery}
          cursorPosition={cursorPosition}
        />
      </div>

      {/* Delete file button */}
      <div className="delete-file-container">
        <button onClick={deleteFile} className="delete-file-button">
          Delete File
        </button>
      </div>
    </div>
  );
}

export default TabScreen;