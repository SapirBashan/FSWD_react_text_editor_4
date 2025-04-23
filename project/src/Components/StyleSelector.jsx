import React from "react";
import "./StyleSelector.css";
import SearchBar from "./SearchBar";



/**
 * StyleSelector Component
 * Allows users to select text styles (font, size, color, etc.).
 *
 * Props:
 * - onSelectStyle: Callback function to pass the selected style to the parent component.
 */
function StyleSelector({ onSelectStyle }) {
    return (
        <div className="style-selector">
            <div className="style-control">
                <label>Font Family</label>
                <select onChange={(e) => onSelectStyle("fontFamily", e.target.value)}>
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                </select>
            </div>

            <div className="style-control">
                <label>Font Size</label>
                <select onChange={(e) => onSelectStyle("fontSize", e.target.value)}>
                    <option value="12px">12px</option>
                    <option value="16px">16px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                    <option value="32px">32px</option>
                </select>
            </div>

            <div className="style-control">
                <label>Text Color</label>
                <input
                    type="color"
                    onChange={(e) => onSelectStyle("color", e.target.value)}
                />
            </div>


        </div>
    );
}

export default StyleSelector;