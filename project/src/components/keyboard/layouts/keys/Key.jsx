import React from 'react';
import styles from './Key.module.css';

/**
 * Key Component
 * Represents an individual key on the virtual keyboard.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.label - The text displayed on the key.
 * @param {string} props.value - The value of the key, passed to the `onPress` callback when clicked.
 * @param {number} [props.size=1] - The size of the key, used to adjust its width. Default is 1.
 * @param {Function} [props.onPress] - Callback function triggered when the key is clicked.
 */
function Key(props) {
  /**
   * Handles the key press event.
   * Calls the `onPress` callback with the key's value if the callback is provided.
   */
  function handleClick() {
    if (props.onPress) {
      props.onPress(props.value);
    }
  }

  /**
   * Dynamically adjusts the width of the key based on its size.
   * The width is calculated as `size * 2.5em`.
   */
  const keyStyle = {
    width: `${(props.size || 1) * 2.5}em`
  };

  return (
    <button
      className={styles.key} // Apply CSS styles from Key.module.css
      style={keyStyle} // Apply dynamic width
      onClick={handleClick} // Handle click events
    >
      {props.label} {/* Display the key's label */}
    </button>
  );
}

export default Key;