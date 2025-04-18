import { useEmojiData } from "../data/useEmojiData";
import EmojiCategory from "./components/EmojiCategory";
import "./EmojiKeyBoard.css";

/**
 * EmojiKeyBoard Component
 * Displays a virtual emoji keyboard with categories and emojis.
 *
 * Props:
 * - handleInputButtonClick: Function to handle emoji button clicks (receives the emoji as an argument).
 *
 * Functionality:
 * - Fetches emoji categories and their emojis using the `useEmojiData` hook.
 * - Renders each category with its corresponding emojis.
 * - Allows users to click on an emoji button, triggering the `handleInputButtonClick` function.
 */
function EmojiKeyBoard({ handleInputButtonClick }) {
    const emojiCategories = useEmojiData();

    return (
        <div className="emoji-keyboard">
            {Object.entries(emojiCategories).map(([category, emojis]) => (
                <EmojiCategory
                    key={category}
                    category={category}
                    emojis={emojis}
                    handleInputButtonClick={handleInputButtonClick}
                />
            ))}
        </div>
    );
}


export default EmojiKeyBoard;