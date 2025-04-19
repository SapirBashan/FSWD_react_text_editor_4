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
  console.log('RenderNonLiteralKey', isShift);
  const keyActions = {
    'key-bspc': () => handleEvent('backspace'),
    'key-caps': () => setisShift(!isShift),
    'key-lshift': () => setisShift(!isShift),
    'key-rshift': () => setisShift(!isShift),
    'key-return': () => handleButtonClick('\n'),
    'key-spc': () => handleButtonClick('\xa0'),
    'key-tab': () => handleButtonClick('\u00A0\u00A0\u00A0\u00A0'),
  };

  const action = keyActions[item[0]];

  return (
    <div key={index} className={`key ${item[0]}`} onClick={action}>
      {displayText}
    </div>
  );
}

export default RenderNonLiteralKey;