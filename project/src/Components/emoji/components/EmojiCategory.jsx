import EmojiList from "./EmojiList";

/**
 * EmojiCategory Component
 * Renders a single emoji category with its emojis.
 *
 * Props:
 * - category: The name of the emoji category.
 * - emojis: Array of emojis in the category.
 * - handleInputButtonClick: Function to handle emoji button clicks.
 */
function EmojiCategory({ category, emojis, handleInputButtonClick }) {
    return (
        <div className="emoji-category">
            <h3 className="emoji-category-title">{category}</h3>
            <EmojiList emojis={emojis} handleInputButtonClick={handleInputButtonClick} />
        </div>
    );
}

export default EmojiCategory;