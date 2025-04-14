import React from 'react';
import Key from './Key.jsx';
import styles from './KeyRow.module.css';

/**
 * KeyRow Component
 * Represents a row of keys in the virtual keyboard.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array<Object>} props.list_of_keys - An array of key objects, where each object contains:
 *                                             - `label` (string): The text displayed on the key.
 *                                             - `value` (string): The value of the key.
 *                                             - `size` (number): The size of the key (optional).
 * @param {Function} props.onKeyPress - Callback function triggered when a key is pressed.
 */
function KeyRow(props) {
  return (
    <div className="key-row">
      {props.list_of_keys.map(function (keyObj, index) {
        return (
          <Key
            key={index} // Unique key for each Key component in the row.
            label={keyObj.label} // Text displayed on the key.
            value={keyObj.value} // Value of the key.
            size={keyObj.size} // Size of the key (optional).
            onPress={props.onKeyPress} // Callback for key press events.
          />
        );
      })}
    </div>
  );
}

export default KeyRow;