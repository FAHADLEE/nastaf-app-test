import { useState } from 'react';
import "./Registration.css";
import { Link, Outlet, useLocation } from "react-router-dom";

const MenuItem = ({ label, to, activeMenuItem, handleMenuItemClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      className={`menu-link ${isActive ? "actives" : ""}`}
      to={to}
      onClick={() => handleMenuItemClick(label)}
    >
      {label}
    </Link>
  );
};

const Registration = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const handleMenuItemClick = (menuItem) => {
    localStorage.setItem('activeMenuItem', menuItem);
    setActiveMenuItem(menuItem);
  };

  return (
    <div className="Registration-conatiner" id="menu">
      <div className="menu-bar">
        <MenuItem
          label="Customer"
          to="/home/registration/customer"
          menuItemKey="Customer"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Supplier"
          to="/home/registration/supplier"
          menuItemKey="Supplier"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Employees"
          to="/home/registration/employes"
          menuItemKey="Employees"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
      </div>
      <Outlet />

    </div>
  );
};

export default Registration;
