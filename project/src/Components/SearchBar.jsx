import React, { useState } from "react";

function searchTextAlgorithm(textArray, searchQuery) {
  if (!searchQuery) return []; // If no search query, return an empty array

  const queryLength = searchQuery.length;
  const result = []; // Array to store the indices and lengths of matches

  for (let i = 0; i <= textArray.length - queryLength; i++) {
    // Extract a substring of the same length as the search query
    const substring = textArray.slice(i, i + queryLength).map((item) => item.char).join('');

    // Check if the substring matches the search query (case-insensitive)
    if (substring.toLowerCase() === searchQuery.toLowerCase()) {
      result.push({ start: i, length: queryLength });
    }
  }

  //console.log(result); // Log the result for debugging
  return result;
}

function SearchBar({ searchQuery, setSearchQuery, Stack, setStack, focus, setIsInputFocused }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newQuery, setNewQuery] = useState(searchQuery);

  // Function to handle opening the pop-up
  const openPopup = () => {
    setNewQuery(searchQuery); // Initialize the pop-up input with the current search query
    setIsPopupOpen(true);
  };

  // Function to handle closing the pop-up
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Function to handle saving the new query
  const saveNewQuery = () => {
    // Update the search query
    setSearchQuery(newQuery);

    // Update the content of the focused file in the stack
    setStack((prevStack) => {
      const updatedStack = [...prevStack];
      const focusedFile = updatedStack[focus];

      // Get the indices of matches using searchTextAlgorithm
      const matches = searchTextAlgorithm(focusedFile, searchQuery);

      // Replace all occurrences of the search query with the new query
      const updatedFile = focusedFile.map((item, index) => {
        // Check if the current index is part of a match
        const match = matches.find(
          (match) => index >= match.start && index < match.start + match.length
        );

        if (match) {
          // Replace the matched text with the new query
          const relativeIndex = index - match.start;
          return {
            ...item,
            char: newQuery[relativeIndex] || "", // Replace with the corresponding character from newQuery
          };
        }

        return item; // Keep the original item if it's not part of a match
      });

      updatedStack[focus] = updatedFile;
      return updatedStack;
    });

    setIsPopupOpen(false); // Close the pop-up
  };

   return (
    <div className="search-bar">
      {/* Search input with focus handlers */}
      <input
        type="text"
        placeholder="Search for a word..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />
      <button onClick={openPopup} className="edit-query-button">
        Edit Query
      </button>

      {/* Pop-up window */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Edit Search Query</h3>
            <textarea
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
              rows="4"
              cols="30"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <div className="popup-buttons">
              <button onClick={saveNewQuery} className="save-button">
                Save
              </button>
              <button onClick={closePopup} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default SearchBar;