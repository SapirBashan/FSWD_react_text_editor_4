import React from 'react';
import RenderRow from './RenderRow';

/**
 * KeyBoard Component
 * Renders a virtual keyboard based on the provided language and key list.
 *
 * Props:
 * - langCode: The language code for the keyboard layout (e.g., "en", "fr").
 * - keyList: An array of rows, where each row is an array of key definitions.
 * - isShift: A boolean indicating whether the Shift key is active.
 * - setisShift: A function to toggle the Shift key state.
 * - handleButtonClick: A function to handle button clicks (receives the character as an argument).
 * - handleEvent: A function to handle special key events (e.g., backspace, tab).
 */
function KeyBoard({ langCode, keyList, isShift, ...props }) {
    console.log('KeyBoard', isShift);
    return (
        <div id="vk-board" className={`lang-${langCode}`}>
            {keyList && keyList.map((row, rowIndex) => (
                <RenderRow
                    key={rowIndex}
                    row={row}
                    rowIndex={rowIndex}
                    isShift={isShift}
                    {...props}
                />
            ))}
        </div>
    );
}

export default KeyBoard;