import React from "react";
import "./Sidebar.css"; 
import logo from "../../assets/logo.png";
import icon from '../../assets/customers_icon.png';

const Sidebar = () => {
  return (
    <aside className="app-sidebar">
      <img src={logo} alt="logo" className="logo" />
      <nav>
        <img src={icon} alt="icon" className="icon" />
          <p>CUSTOMERS</p>
      </nav>
    </aside>
  );
};

export default Sidebar;
