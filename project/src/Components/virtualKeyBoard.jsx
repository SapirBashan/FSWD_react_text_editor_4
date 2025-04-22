import { useState, useEffect } from "react";
import KeyBoard from "./keyBoard/KeyBoard";
import { getLanguage } from "./data/LanguagesData";
import "../css/KeyBoardStylee.css";
import EmojiKeyBoard from "./emoji/EmojiKeyBoard";
import StyleSelector from "./StyleSelector";
import FileManager from "./FileManager";
import TabScreen from "./TabScreen";
import SearchBar from "./SearchBar";

const initialLanguage = getLanguage("english");

function VirtualKeyBoard({ activeUser }) {
  const [iso_639_2, setIso6392] = useState(initialLanguage.iso_639_2);
  const [languageName, setLanguageName] = useState(initialLanguage.languageName);
  const [translatedName, setTranslatedName] = useState(initialLanguage.translatedName);
  const [keyList, setKeyList] = useState(initialLanguage.keyList);
  const [placeholder, setPlaceholder] = useState(initialLanguage.placeholder);
  const [stack, setStack] = useState([[]]);
  const [history, setHistory] = useState([]); // History for undo functionality
  const [focus, setFocus] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [emojiActive, setEmojiActive] = useState(false);
  const [isShift, setIsShift] = useState(false);
  const [isCapsLock, setIsCapsLock] = useState(false); // New state for Caps Lock
  const [currentStyle, setCurrentStyle] = useState({fontFamily: "Arial",fontSize: "16px",color: "#000000",});
  const [searchQuery, setSearchQuery] = useState("");

  const getText = () => stack[focus];

  const setStackFromFile = (loadedData) => {
    setHistory([]); // Clear history when loading a new file
    setStack([loadedData]);
    setFocus(0);
    setCursorPosition(loadedData.length);
  };

  const toggleEmojiActive = () => {
    setEmojiActive((prev) => !prev);
  };

  const deleteChar = () => {
    setHistory((prevHistory) => [...prevHistory, [...stack]]); // Save current state to history
    setStack((prevStack) => {
      const newStack = [...prevStack];
      const lastItem = [...newStack[focus]];

      if (cursorPosition > 0) {
        lastItem.splice(cursorPosition - 1, 1);
      }

      newStack[focus] = lastItem;
      return newStack;
    });

    if (cursorPosition > 0) {
      setCursorPosition((prev) => prev - 1);
    }
  };

  const handleInputButtonClick = (char) => {
    setHistory((prevHistory) => [...prevHistory, [...stack]]); // Save current state to history
    setStack((prevStack) => {
      const newStack = [...prevStack];
      const lastItem = [...newStack[focus]];
      lastItem.splice(cursorPosition, 0, { char, style: currentStyle });
      newStack[focus] = lastItem;
      return newStack;
    });

    setEmojiActive(false); // Close emoji keyboard if open
    setCursorPosition((prev) => prev + 1);
  };

  const undo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setHistory((prevHistory) => prevHistory.slice(0, -1)); // Remove the last state from history
      setStack(previousState);
      setCursorPosition(previousState[focus]?.length || 0); // Adjust cursor position
    } else {
      alert("Nothing to undo!");
    }
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
        Math.min(prev + 1, stack[focus].length)
      );
    }
    if (event === "changeLanguage") {
      const nextLanguage = iso_639_2 === "eng" ? "Hebrew" : "English";
      changeLanguage(nextLanguage);
    }
    if (event === "emojis") {
      toggleEmojiActive();
    }
    if (event === "backwards") {
      undo();
    }
  };

  const handleStyleChange = (styleKey, value) => {
    setCurrentStyle((prevStyle) => ({
      ...prevStyle,
      [styleKey]: value,
    }));
  };

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.key === "Backspace") {
  //       deleteChar();
  //     } else if (e.key === "ArrowLeft") {
  //       setCursorPosition((prev) => Math.max(prev - 1, 0));
  //     } else if (e.key === "ArrowRight") {
  //       setCursorPosition((prev) =>
  //         Math.min(prev + 1, stack[stack.length - 1].length)
  //       );
  //     } else if (e.key === "CapsLock") {
  //       setIsCapsLock((prev) => !prev);
  //     } else if (e.key === "Shift" && e.altKey) {
  //       const nextLanguage = iso_639_2 === "eng" ? "Hebrew" : "English";
  //       changeLanguage(nextLanguage);
  //     } else if ((e.key === "z" && e.ctrlKey )) {
  //       undo(); // Handle Ctrl+Z for undo
  //     } else if (e.key.length === 1) {
  //       const char = isCapsLock || isShift ? e.key.toUpperCase() : e.key.toLowerCase();
  //       handleInputButtonClick(char);
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [cursorPosition, stack, currentStyle, isCapsLock, isShift, iso_639_2]);

  return (
    <div className="main-container">
      <div className="change_layout">
        <FileManager
          getText={getText}
          setStackFromFile={setStackFromFile}
          activeUser={activeUser}
        />
      </div>
      <div className="search-bar">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          Stack={stack}
          setStack={setStack}
          focus={focus}
        />
      </div>
      <div className="screenDiv">
        <TabScreen
          text={stack}
          setText={setStack} 
          searchQuery={searchQuery}
          cursorPosition={cursorPosition}
          focus={focus}
          setFocus={setFocus}
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