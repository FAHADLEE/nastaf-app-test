import { useState } from 'react';
import "./Settings.css";
import { Link, Outlet, useLocation } from "react-router-dom";

const MenuItem = ({ label, to, handleMenuItemClick }) => {
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

const Settings = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('');

  const handleMenuItemClick = (menuItem) => {
    localStorage.setItem('activeMenuItem', menuItem);
    setActiveMenuItem(menuItem);
  };

  return (
    <div className="Settings-main">
      <div className="menu-bar">
        <MenuItem
          label="User Creation"
          to="/home/settings/usercreation"
          menuItemKey="User Creation"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Permission"
          to="/home/settings/permission"
          menuItemKey="Permission"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Station Creation"
          to="/home/settings/stationcreation"
          menuItemKey="Station Creation"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Main setting"
          to="/home/settings/mainsetting"
          menuItemKey="Main setting"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
      </div>
      <Outlet />
    </div>

  );
};

export default Settings;
