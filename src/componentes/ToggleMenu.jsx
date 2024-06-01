import React from 'react';
import { FaBars } from 'react-icons/fa';

function ToggleMenu({ onClick }) {
  return (
    <div className="menu-icon" onClick={onClick}>
      <FaBars />
    </div>
  );
}

export default ToggleMenu;
