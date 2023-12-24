import React from 'react'
import './Header.css'
import logo from '../../assets/logo-dark.png'

const Header = () => {
    return (
      <header className="Header">
        <img src={logo} alt='logo' style={{width:'150px'}} className='header-logo'/>
        <h1>CUSTOMERS</h1>
      </header>
    );
  };

export default Header