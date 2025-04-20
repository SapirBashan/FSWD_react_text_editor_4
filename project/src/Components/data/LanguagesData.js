const languagesData = [
  {
    iso_639_2: "eng",
    languageName: "English",
    translatedName: "English",
    keyList: [
      [["", "`", "~"], ["", "1", "!"], ["", "2", "@"], ["", "3", "#"], ["", "4", "$"], ["", "5", "%"], ["", "6", "^"], ["", "7", "&"], ["", "8", "*"], ["", "9", "("], ["", "0", ")"], ["", "-", "_"], ["", "=", "+"], ["key-bspc", "←"]],
      [["key-tab", "tab"], ["", "q", "Q"], ["", "w", "W"], ["", "e", "E"], ["", "r", "R"], ["", "t", "T"], ["", "y", "Y"], ["", "u", "U"], ["", "i", "I"], ["", "o", "O"], ["", "p", "P"], ["", "[", "{"], ["", "]", "}"], ["key-fwslash", "\\", "|"]],
      [["key-caps", "caps"], ["", "a", "A"], ["", "s", "S"], ["", "d", "D"], ["", "f", "F"], ["", "g", "G"], ["", "h", "H"], ["", "j", "J"], ["", "k", "K"], ["", "l", "L"], ["", ";", ":"], ["", "'", "\""], ["key-return", "↵"]],
      [["key-lshift", "shift"], ["", "z", "Z"], ["", "x", "X"], ["", "c", "C"], ["", "v", "V"], ["", "b", "B"], ["", "n", "N"], ["", "m", "M"], ["", ",", "<"], ["", ".", ">"], ["", "/", "?"], ["key-rshift", "shift"]],
      [["key-backwards", "↶"], ["key-language", "🌐"], ["key-Emojis", "😊"], ["key-spc", "space"], ["key-Select_all", "all"], ["key-lCursor", "⬅"], ["key-rCursor", "➡"]]
    ],
    placeholder: "type here"
  },
  {
    iso_639_2: "heb",
    languageName: "Hebrew",
    translatedName: "עברית",
    keyList: [
      [["", "`", "~"], ["", "1", "!"], ["", "2", "@"], ["", "3", "#"], ["", "4", "$"], ["", "5", "%"], ["", "6", "^"], ["", "7", "&"], ["", "8", "*"], ["", "9", "("], ["", "0", ")"], ["", "-", "_"], ["", "=", "+"], ["key-bspc", "←"]],
      [["key-tab", "tab"], ["", "/"], ["", "'"], ["", "ק"], ["", "ר"], ["", "א"], ["", "ט"], ["", "ו"], ["", "ן"], ["", "ם"], ["", "פ"], ["", "[", "{"], ["", "]", "}"], ["key-fwslash", "\\", "|"]],
      [["key-caps", "caps"], ["", "ש"], ["", "ד"], ["", "ג"], ["", "כ"], ["", "ע"], ["", "י"], ["", "ח"], ["", "ל"], ["", "ך"], ["", "ף"], ["", "."], ["key-return", "↵"]],
      [["key-lshift", "shift"], ["", "ז"], ["", "ס"], ["", "ב"], ["", "ה"], ["", "נ"], ["", "מ"], ["", "צ"], ["", "ת"], ["", ","], ["", "?"], ["key-rshift", "shift"]],
      [["key-backwards", "↶"], ["key-language", "🌐"], ["key-Emojis", "😊"], ["key-spc", "space"], ["key-Select_all", "all"], ["key-lCursor", "⬅"], ["key-rCursor", "➡"]]
    ],
    placeholder: "הקלד כאן"
  }
];
export default languagesData;

// This function returns the language object based on the provided language name.
const getLanguage = (languageName) => {
  const lowercasedLanguageName = languageName.toLowerCase();
  return languagesData.find((language) => language.languageName.toLowerCase() === lowercasedLanguageName);
};
export { getLanguage };

