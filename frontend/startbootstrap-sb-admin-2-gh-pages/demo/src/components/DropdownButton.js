import React, { useState } from "react";

const DropdownButton = ({ label, content, style }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <a className={`dropdown-button ${style}`} onClick={toggleDropdown}>
        {label}
      </a>
      {isOpen && <div>{content}</div>}
    </div>
  );
};

export default DropdownButton;
