import EmojiButton from "./EmojiButton";

/**
 * EmojiList Component
 * Renders a list of emoji buttons.
 *
 * Props:
 * - emojis: Array of emojis to display.
 * - handleInputButtonClick: Function to handle emoji button clicks.
 */
function EmojiList({ emojis, handleInputButtonClick }) {
    return (
        <div className="emoji-list">
            {emojis.map((emoji, index) => (
                <EmojiButton key={index} emoji={emoji} handleInputButtonClick={handleInputButtonClick} />
            ))}
        </div>
    );
}

export default EmojiList;