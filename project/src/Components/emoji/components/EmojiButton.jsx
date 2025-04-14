/**
 * EmojiButton Component
 * Renders a single emoji button.
 *
 * Props:
 * - emoji: The emoji to display.
 * - handleInputButtonClick: Function to handle emoji button clicks.
 */
function EmojiButton({ emoji, handleInputButtonClick }) {
    return (
        <button className="emoji-button" onClick={() => handleInputButtonClick(emoji)}>
            {emoji}
        </button>
    );
}

export default EmojiButton;