import React from 'react';

/**
 * RenderNonLiteralKey Component
 * Renders a non-literal key (e.g., backspace, shift).
 *
 * Props:
 * - item: The key definition.
 * - index: The index of the key in the row.
 * - displayText: The text to display on the key.
 * - handleEvent: Function to handle special key events.
 * - setisShift: Function to toggle the Shift key state.
 * - isShift: Boolean indicating whether the Shift key is active.
 */
function RenderNonLiteralKey({ item, index, displayText, handleEvent, handleButtonClick, setisShift, isShift }) {
  const keyActions = {
    'key-bspc': () => handleEvent('backspace'),
    'key-caps': () => setisShift(!isShift),
    'key-lshift': () => setisShift(!isShift),
    'key-rshift': () => setisShift(!isShift),
    'key-return': () => handleButtonClick('\n'),
    'key-spc': () => handleButtonClick('\xa0'),
    'key-tab': () => handleButtonClick('\u00A0\u00A0\u00A0\u00A0'),
    'key-rCursor': () => handleEvent('rightCursor'),
    'key-lCursor': () => handleEvent('leftCursor'),
    'key-Emojis': () => handleEvent('emojis'),
    'key-Select_all': () => handleEvent('selectAll'),
    'key-language': () => handleEvent('changeLanguage'),
    'key-backwards': () => handleEvent('backwards'),
  };

  const action = keyActions[item[0]];

  return (
    <div key={index} className={`key ${item[0]}`} onClick={action}>
      {displayText}
    </div>
  );
}

export default RenderNonLiteralKey;