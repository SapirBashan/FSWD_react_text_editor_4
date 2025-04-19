import React from 'react';

/**
 * RenderLiteralKey Component
 * Renders a literal key (e.g., letters, numbers).
 *
 * Props:
 * - item: The key definition.
 * - index: The index of the key in the row.
 * - displayText: The text to display on the key.
 * - handleButtonClick: Function to handle key clicks.
 */
function RenderLiteralKey({ item, index, displayText, handleButtonClick }) {
  return (
    <div
      key={index}
      className={`key ${item[0]}`}
      onClick={() => handleButtonClick(displayText)}
    >
      {displayText}
    </div>
  );
}

export default RenderLiteralKey;