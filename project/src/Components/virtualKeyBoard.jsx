import { useState } from "react";
import ChangeLayout from "./ChangeLayout";
import Screen from "./Screen";
import KeyBoard from "./keyBoard/KeyBoard";
import { getLanguage } from "./data/LanguagesData";
import "../css/KeyBoardStylee.css";
import EmojiKeyBoard from "./emoji/EmojiKeyBoard";
import StyleSelector from "./StyleSelector";
import FileManager from "./FileManager";

const initialLanguage = getLanguage("english");

function VirtualKeyBoard({ activeUser }) {
  const [iso_639_2, setIso6392] = useState(initialLanguage.iso_639_2);
  const [languageName, setLanguageName] = useState(initialLanguage.languageName);
  const [translatedName, setTranslatedName] = useState(initialLanguage.translatedName);
  const [keyList, setKeyList] = useState(initialLanguage.keyList);
  const [placeholder, setPlaceholder] = useState(initialLanguage.placeholder);
  const [stack, setStack] = useState([[]]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [emojiActive, setEmojiActive] = useState(false);
  const [isShift, setIsShift] = useState(false);
  const [currentStyle, setCurrentStyle] = useState({
    fontFamily: "Arial",
    fontSize: "16px",
    color: "#000000",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const getText = () => stack[stack.length - 1];

  const setStackFromFile = (loadedData) => {
    setStack([loadedData]);
    setCursorPosition(loadedData.length);
  };

  const toggleEmojiActive = () => {
    setEmojiActive((prev) => !prev);
  };

  const deleteChar = () => {
    setStack((prevStack) => {
      const newStack = [...prevStack];
      const lastItem = [...newStack[newStack.length - 1]];

      if (cursorPosition > 0) {
        lastItem.splice(cursorPosition - 1, 1);
      }

      newStack[newStack.length - 1] = lastItem;
      return newStack;
    });

    if (cursorPosition > 0) {
      setCursorPosition((prev) => prev - 1);
    }
  };

  const changeLanguage = (language) => {
    const newLanguage = getLanguage(language) || initialLanguage;
    setIso6392(newLanguage.iso_639_2);
    setLanguageName(newLanguage.languageName);
    setTranslatedName(newLanguage.translatedName);
    setKeyList(newLanguage.keyList);
    setPlaceholder(newLanguage.placeholder);
  };

  const handleInputButtonClick = (char) => {
    setStack((prevStack) => {
      const newStack = [...prevStack];
      const lastItem = [...newStack[newStack.length - 1]];
      lastItem.splice(cursorPosition, 0, { char, style: currentStyle });
      newStack[newStack.length - 1] = lastItem;
      return newStack;
    });

    setCursorPosition((prev) => prev + 1);
  };

  const handleEvent = (event) => {
    if (event === "backspace") {
      deleteChar();
    }
    if (event === "leftCursor") {
      setCursorPosition((prev) => Math.max(prev - 1, 0));
    }
    if (event === "rightCursor") {
      setCursorPosition((prev) =>
        Math.min(prev + 1, stack[stack.length - 1].length)
      );
    }
  };

  const handleStyleChange = (styleKey, value) => {
    setCurrentStyle((prevStyle) => ({
      ...prevStyle,
      [styleKey]: value,
    }));
  };

  return (
    <div className="main-container">
      <div className="change_layout">
        <FileManager
          getText={getText}
          setStackFromFile={setStackFromFile}
          activeUser={activeUser}
        />
        <ChangeLayout
          setLanguage={changeLanguage}
          changeState={toggleEmojiActive}
          isEmojiActive={emojiActive}
        />
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a word..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="screenDiv">
        <Screen
          text={
            stack.length && stack[stack.length - 1].length
              ? stack[stack.length - 1]
              : placeholder
          }
          searchQuery={searchQuery}
          cursorPosition={cursorPosition}
        />
      </div>
      {emojiActive ? (
        <EmojiKeyBoard handleInputButtonClick={handleInputButtonClick} />
      ) : (
        <KeyBoard
          langCode={iso_639_2}
          language={languageName}
          keyList={keyList}
          setisShift={setIsShift}
          isShift={isShift}
          handleButtonClick={handleInputButtonClick}
          handleEvent={handleEvent}
        />
      )}
      <StyleSelector onSelectStyle={handleStyleChange} />
    </div>
  );
}

export default VirtualKeyBoard;
