import '../css/KeyBoardStylee.css';

/**
 * Screen Component
 * Displays the text content of the virtual keyboard, either as plain text or styled characters.
 *
 * Props:
 * - text: The content to display. It can be:
 *   - An array of objects, where each object represents a character with optional styles (e.g., `{ char: 'A', style: { color: 'red' } }`).
 *   - A plain string to display as-is.
 * - searchQuery: The word or phrase to highlight in the displayed text.
 *
 * Functionality:
 * - If `text` is an array, it maps over the array and renders each character with its associated style.
 * - If `text` is a string, it renders the string directly.
 * - Highlights the `searchQuery` in the text by applying a yellow background.
 * - Handles newline characters (`\n`) in the array by rendering a `<br />` element.
 */
import { useState } from 'react';

function Screen({ text, searchQuery, cursorPosition, onSelectionChange }) {
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  

  // Handle mouse down to start selection
  const handleMouseDown = (index) => {
    setSelectionStart(index);
    setSelectionEnd(index);
    setIsSelecting(true);
  };



  // Handle mouse move to extend selection
  const handleMouseMove = (index) => {
    if (isSelecting) {
      setSelectionEnd(index);
      if (onSelectionChange) {
        onSelectionChange({
          start: Math.min(selectionStart, index),
          end: Math.max(selectionStart, index)
        });
      }
    }
  };

  // Handle mouse up to end selection
  const handleMouseUp = (index) => {
    if (isSelecting) {
      setSelectionEnd(index);
      setIsSelecting(false);
      if (onSelectionChange) {
        onSelectionChange({
          start: Math.min(selectionStart, index),
          end: Math.max(selectionStart, index)
        });
      }
    }
  };

  // Highlight text with search and selection
  // Inside the highlightText function, modify the isSearchMatch check:
  // Inside the highlightText function, modify the isSearchMatch check:
  const highlightText = (textArray) => {
    if (!textArray) return [];
    
    return textArray.map((item, index) => {
      const isSelected = selectionStart !== null && selectionEnd !== null && 
                        index >= Math.min(selectionStart, selectionEnd) && 
                        index <= Math.max(selectionStart, selectionEnd);
      
      let style = item.style || {};
      
      // Check if current position starts a match
      const potentialMatch = textArray.slice(index, index + searchQuery?.length || 0)
        .map(i => i.char)
        .join('');
      
      const isMatchStart = searchQuery && 
                          potentialMatch.toLowerCase() === searchQuery.toLowerCase();
  
      // If we're within a match range, highlight the character
      const isWithinMatch = searchQuery && 
                           Array.from({length: searchQuery.length})
                             .some((_, offset) => {
                               const matchStart = index - offset;
                               if (matchStart < 0) return false;
                               
                               const substring = textArray.slice(matchStart, matchStart + searchQuery.length)
                                 .map(i => i.char)
                                 .join('');
                               return substring.toLowerCase() === searchQuery.toLowerCase();
                             });
  
      if (isWithinMatch) {
        style = { ...style, backgroundColor: 'yellow' };
      }
  
      if (isSelected) {
        style = { ...style, backgroundColor: '#b5d5ff' };
      }
  
      return item.char === '\n' ? (
        <br key={index} />
      ) : (
        <span 
          key={index} 
          style={style}
          onMouseDown={() => handleMouseDown(index)}
          onMouseMove={() => handleMouseMove(index)}
          onMouseUp={() => handleMouseUp(index)}
        >
          {item.char}
        </span>
      );
    });
  };

  const displayCursor = (text) => {
    const textJsx = highlightText(text);
    const result = [];

    textJsx.forEach((element, index) => {
      if (index === cursorPosition) {
        result.push(<span key="cursor" className="cursor"></span>);
      }
      result.push(element);
    });

    if (cursorPosition === text.length) {
      result.push(<span key="cursor-end" className="cursor"></span>);
    }

    return result;
  };

  if (Array.isArray(text)) {
    return (
      <div 
        className="DivTextArea"
        onMouseLeave={() => setIsSelecting(false)}
      >
        {displayCursor(text)}
      </div>
    );
  } else {
    return (
      <div className="DivTextArea">
        <span>{text}</span>
      </div>
    );
  }
}

export default Screen;