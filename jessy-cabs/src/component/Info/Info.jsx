import { useState } from 'react';
import "./Info.css";
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

const Info = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('');

  const handleMenuItemClick = (menuItem) => {
    localStorage.setItem('activeMenuItem', menuItem);
    setActiveMenuItem(menuItem);
  };


  return (

    <div className="Info-conatiner" id="menu">
      <div className="menu-bar">
        <MenuItem
          label="Rate Type"
          to="/home/info/ratetype"
          menuItemKey="Rate Type"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Rate Management"
          to="/home/info/ratemanagement"
          menuItemKey="Rate Management"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Mailers"
          to="/home/info/mailer"
          menuItemKey="Mailers"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Fuel Info"
          to="/home/info/fuelinfo"
          menuItemKey="FuelInfo"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
      </div>

      <Outlet />



    </div>

  );
};

export default Info;
