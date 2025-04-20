import React from 'react';
import RenderLiteralKey from './RenderLiteralKey';
import RenderNonLiteralKey from './RenderNonLiteralKey';


// List of non-literal keys
export const nonLiterals = [
    'key-bspc',
    'key-caps',
    'key-tab',
    'key-return',
    'key-lshift',
    'key-rshift',
    'key-Emojis',
    'key-Select_all',
    'key-language',
    'key-lCursor',
    'key-backwards',
    'key-rCursor',
    'key-spc',
];

/**
 * RenderRow Component
 * Renders a single row of keys.
 *
 * Props:
 * - row: An array of key definitions for the row.
 * - rowIndex: The index of the row.
 * - isShift: A boolean indicating whether the Shift key is active.
 * - Other props are passed down to key rendering functions.
 */
function RenderRow({ row, rowIndex, isShift, ...props }) {
    return (
        <div key={rowIndex} className="d-flex justify-center">
            {row.map((item, index) => {
                // Determine the display text based on the Shift state and item properties
                const displayText = isShift ? item[2] || item[1] : item[1];
                return nonLiterals.includes(item[0])
                    ? <RenderNonLiteralKey key={index} item={item} index={index} isShift={isShift} displayText={displayText} {...props} />
                    : <RenderLiteralKey key={index} item={item} index={index} displayText={displayText} {...props} />;
            })}
        </div>
    );
}

export default RenderRow;