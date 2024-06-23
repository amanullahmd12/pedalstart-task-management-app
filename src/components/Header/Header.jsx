import React from "react";
import TaskIcon from '@mui/icons-material/Task';
import './Header.css'; // Import your CSS file
import Logo from '../../assets/logo.svg';

function Header() {
  return (
    <header>
        <div className="header-logo">
                <img src={Logo} alt="Taskly Logo" className="logo" />
      <h1 className="">
        Taskly
      </h1>
      </div>
    </header>
  );
}

export default Header;
