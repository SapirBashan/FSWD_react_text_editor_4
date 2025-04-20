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
function Screen({ text, searchQuery, cursorPosition }) {
  console.log(cursorPosition)
  /**
   * Highlights the search query in the text.
   *
   * @param {Array} textArray - The array of text objects to process.
   * @returns {JSX.Element[]} - An array of JSX elements with the search query highlighted.
   */
  const highlightText = (textArray) => {
    if (!searchQuery) {
      // If no search query, render the text as-is
      return textArray.map((item, index) =>
        item.char === '\n' ? (<br key={index} />) : (<span key={index} style={item.style}>{item.char}</span>)
      );
    }

    const queryLength = searchQuery.length;
    const result = [];
    let buffer = ''; // Buffer to collect non-matching characters
    let bufferStyle = null; // Style for the buffer

    for (let i = 0; i < textArray.length; i++) {
      const { char, style } = textArray[i];

      if (char === '\n') {
        // If a newline character is encountered, add the buffer to the result
        result.push(
          <span key={`${i}-remaining`} style={bufferStyle}>
            {buffer}
          </span>
        );
        result.push(<br key={`${i}-newline`} />);
        buffer = ''; // Reset the buffer
        bufferStyle = null; // Reset the style
        continue;
      }

      buffer += char;
      bufferStyle = bufferStyle || style;


      // Check if the buffer ends with the search query
      if (buffer.slice(-queryLength).toLowerCase() === searchQuery.toLowerCase()) {
        // Add non-highlighted part of the buffer
        if (buffer.length > queryLength) {
          const nonHighlighted = buffer.slice(0, -queryLength);
          result.push(
            <span key={`${i}-non`} style={bufferStyle}>
              {nonHighlighted}
            </span>
          );
        }

        // Add the highlighted part
        result.push(
          <span
            key={`${i}-highlight`}
            style={{ ...style, backgroundColor: 'yellow' }}
          >
            {buffer.slice(-queryLength)}
          </span>
        );

        // Reset the buffer
        buffer = '';
        bufferStyle = null;
      }
    }

    // Add any remaining characters in the buffer
    if (buffer) {
      result.push(
        <span key="remaining" style={bufferStyle}>
          {buffer}
        </span>
      );
    }

    return result;
  };


  const desplayCursor = (text) => {
    const textJsx = highlightText(text); // Highlight the text
    const result = []; // Array to hold the final JSX elements

    // Iterate through the highlighted text and insert the cursor at the correct position
    textJsx.forEach((element, index) => {
      result.push(element); // Add the current text element

      // If the cursorPosition matches the current index, insert the cursor
      if (index === cursorPosition) {
        result.push(
          <span key="cursor" className="cursor"></span>
        );
      }
    });

    // If the cursorPosition is at the end of the text, add the cursor at the end
    if (cursorPosition === text.length) {
      result.push(
        <span key="cursor-end" className="cursor"></span>
      );
    }

    return result;
  };

  if (Array.isArray(text)) {
    return <div className="DivTextArea">{desplayCursor(text)}</div>;
  } else {
    return (
      <div className="DivTextArea">
        <span>{text}</span>
      </div>
    );
  }
}

export default Screen;