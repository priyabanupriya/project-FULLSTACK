// Header.js

//import React, { useState } from 'react';
import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Home');

  // Update active tab based on the current route
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab('Home');
    } else if (location.pathname === '/add') {
      setActiveTab('AddUser');
    } else if (location.pathname === '/about') {
      setActiveTab('About');
    }
  }, [location.pathname]);

  return (
    <div className="header">
      <p className="logo">User Management System</p>
      <div className="header-right">
        <Link to="/home">
          <p className={`tab ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab('Home')}>
            Home
          </p>
        </Link>
        <Link to="/add">
          <p className={`tab ${activeTab === 'AddUser' ? 'active' : ''}`} onClick={() => setActiveTab('AddUser')}>
            Add User
          </p>
        </Link>
        <Link to="/about">
          <p className={`tab ${activeTab === 'About' ? 'active' : ''}`} onClick={() => setActiveTab('About')}>
            About
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
