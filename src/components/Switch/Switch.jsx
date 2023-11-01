import "./switch.css"
import React, { useState } from "react";

const Switch = ({handleDarkMode, darkMode}) => {
  //const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    //setIsActive(!isActive);
    handleDarkMode()
  };

  return (
    <div>
      <label className={`switch ${darkMode ? "active" : ""}`}>
        <input type="checkbox" checked={darkMode} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default Switch;
