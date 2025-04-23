import { useState, useEffect } from "react";
import Screen from "./Screen";
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
  const [history, setHistory] = useState([]);
  const [focus, setFocus] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [emojiActive, setEmojiActive] = useState(false);
  const [isShift, setIsShift] = useState(false);
  const [isCapsLock, setIsCapsLock] = useState(false);
  const [currentStyle, setCurrentStyle] = useState({
    fontFamily: "Arial",
    fontSize: "16px",
    color: "#000000",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [selectionRange, setSelectionRange] = useState(null);

  const deleteSelectedText = () => {
    if (!selectionRange) return;

    setHistory((prevHistory) => [...prevHistory, [...stack]]);
    setStack((prevStack) => {
      const newStack = [...prevStack];
      const currentFile = [...newStack[focus]];
      currentFile.splice(selectionRange.start, selectionRange.end - selectionRange.start);
      newStack[focus] = currentFile;
      return newStack;
    });
    setCursorPosition(selectionRange.start);
    setSelectionRange(null);
  };

  const replaceSelectedText = (newText) => {
    if (!selectionRange) return;

    setHistory((prevHistory) => [...prevHistory, [...stack]]);
    setStack((prevStack) => {
      const newStack = [...prevStack];
      const currentFile = [...newStack[focus]];
      
      // First delete the selected text
      currentFile.splice(selectionRange.start, selectionRange.end - selectionRange.start);
      
      // Then insert the new text
      const newChars = newText.split('').map(char => ({
        char,
        style: currentStyle
      }));
      
      currentFile.splice(selectionRange.start, 0, ...newChars);
      newStack[focus] = currentFile;
      return newStack;
    });
    
    setCursorPosition(selectionRange.start + newText.length);
    setSelectionRange(null);
  };

  const copySelectedText = () => {
    if (!selectionRange) return;
    
    const selectedText = stack[focus]
      .slice(selectionRange.start, selectionRange.end)
      .map(item => item.char)
      .join('');
    
    navigator.clipboard.writeText(selectedText);
  };

  const cutSelectedText = () => {
    copySelectedText();
    deleteSelectedText();
  };

  const pasteText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (selectionRange) {
        replaceSelectedText(text);
      } else {
        // Insert at cursor position
        setHistory((prevHistory) => [...prevHistory, [...stack]]);
        setStack((prevStack) => {
          const newStack = [...prevStack];
          const currentFile = [...newStack[focus]];
          const newChars = text.split('').map(char => ({
            char,
            style: currentStyle
          }));
          currentFile.splice(cursorPosition, 0, ...newChars);
          newStack[focus] = currentFile;
          return newStack;
        });
        setCursorPosition(cursorPosition + text.length);
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  
  const getText = () => stack[focus];

  const setStackFromFile = (loadedData) => {
    setHistory([]);
    setStack([loadedData]);
    setFocus(0);
    setCursorPosition(loadedData.length);
  };

  const toggleEmojiActive = () => {
    setEmojiActive((prev) => !prev);
  };

  const deleteChar = () => {
    setHistory((prevHistory) => [...prevHistory, [...stack]]);
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
    setHistory((prevHistory) => [...prevHistory, [...stack]]);
    setStack((prevStack) => {
      const newStack = [...prevStack];
      const lastItem = [...newStack[focus]];
      lastItem.splice(cursorPosition, 0, { char, style: currentStyle });
      newStack[focus] = lastItem;
      return newStack;
    });
    setEmojiActive(false);
    setCursorPosition((prev) => prev + 1);
  };

  const undo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      setStack(previousState);
      setCursorPosition(previousState[focus]?.length || 0);
    } else {
      alert("Nothing to undo!");
    }
  };

  const handleEvent = (event) => {
    if (event === "backspace") {
      if (selectionRange) {
        deleteSelectedText(); // Trigger the deleteSelectedText function
      } else {
        deleteChar();
      }
    }
    if (event === "leftCursor") {
      setCursorPosition((prev) => Math.max(prev - 1, 0));
    }
    if (event === "rightCursor") {
      setCursorPosition((prev) => Math.min(prev + 1, stack[focus].length));
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

  const changeLanguage = (name) => {
    const lang = getLanguage(name.toLowerCase());
    setIso6392(lang.iso_639_2);
    setLanguageName(lang.languageName);
    setTranslatedName(lang.translatedName);
    setKeyList(lang.keyList);
    setPlaceholder(lang.placeholder);
  };
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isInputFocused) return;
  
      if (e.key === "Backspace") {
        if (selectionRange) {
          deleteSelectedText(); // Trigger the deleteSelectedText function
          e.preventDefault();
        } else {
          deleteChar();
        }
      } else if (e.key === "Delete") {
        if (selectionRange) {
          deleteSelectedText(); // Trigger the deleteSelectedText function
          e.preventDefault();
        }
      } else if (e.key === "ArrowLeft" && e.shiftKey) {
        // Extend selection left
        setSelectionRange((prev) => ({
          start: prev?.start || cursorPosition,
          end: Math.max(cursorPosition - 1, 0),
        }));
        setCursorPosition((prev) => Math.max(prev - 1, 0));
        e.preventDefault();
      } else if (e.key === "ArrowRight" && e.shiftKey) {
        // Extend selection right
        setSelectionRange((prev) => ({
          start: prev?.start || cursorPosition,
          end: Math.min(cursorPosition + 1, stack[focus].length),
        }));
        setCursorPosition((prev) => Math.min(prev + 1, stack[focus].length));
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        // Move cursor left (clear selection)
        setSelectionRange(null);
        setCursorPosition((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "ArrowRight") {
        // Move cursor right (clear selection)
        setSelectionRange(null);
        setCursorPosition((prev) => Math.min(prev + 1, stack[focus].length));
      } else if (e.key === "a" && e.ctrlKey) {
        // Select all
        setSelectionRange({
          start: 0,
          end: stack[focus].length,
        });
        e.preventDefault();
      } else if (e.key === "c" && e.ctrlKey) {
        // Copy
        copySelectedText();
        e.preventDefault();
      } else if (e.key === "x" && e.ctrlKey) {
        // Cut
        cutSelectedText();
        e.preventDefault();
      } else if (e.key === "v" && e.ctrlKey) {
        // Paste
        pasteText();
        e.preventDefault();
      } else if (e.key === "CapsLock") {
        setIsCapsLock((prev) => !prev);
      } else if (e.key === "Shift" && e.altKey) {
        const nextLanguage = iso_639_2 === "eng" ? "Hebrew" : "English";
        changeLanguage(nextLanguage);
      } else if (e.key === "z" && e.ctrlKey) {
        undo();
      } else if (e.key.length === 1 && !e.ctrlKey) {
        if (selectionRange) {
          replaceSelectedText(e.key);
          e.preventDefault();
        } else {
          const char = isCapsLock || isShift ? e.key.toUpperCase() : e.key.toLowerCase();
          handleInputButtonClick(char);
        }
      }
    };
  
    window.addEventListener("keydown", handleKeyDown); 
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    cursorPosition,
    stack,
    currentStyle,
    isCapsLock,
    isShift,
    iso_639_2,
    isInputFocused,
    selectionRange,
    focus,
  ]);


  return (
    <div className="main-container">
      <div className="change_layout">
        <div className="keyboard-outer-container">
          <div className="keyboard-wrapper">
        <FileManager
          getText={getText}
          setStackFromFile={setStackFromFile}
          activeUser={activeUser}
          setIsInputFocused={setIsInputFocused}
        />
      </div>

      <div className="screenDiv">
        <div className="controls-row">
          <StyleSelector onSelectStyle={handleStyleChange} />
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            Stack={stack}
            setStack={setStack}
            focus={focus}
            setIsInputFocused={setIsInputFocused}  // Add this prop
          />
        </div>
        

        <TabScreen
          text={stack}
          setText={setStack}
          searchQuery={searchQuery}
          cursorPosition={cursorPosition}
          focus={focus}
          setFocus={setFocus}
          onSelectionChange={setSelectionRange}
        />
      </div>

      <div className="selection-controls">
        <button onClick={copySelectedText} disabled={!selectionRange}>Copy</button>
        <button onClick={cutSelectedText} disabled={!selectionRange}>Cut</button>
        <button onClick={pasteText}>Paste</button>
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
    </div>
    </div>
    </div>
  );
}

export default VirtualKeyBoard;
