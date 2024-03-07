import { useState } from 'react';
import "./Billings.css";
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

const Billings = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const handleMenuItemClick = (menuItem) => {
    localStorage.setItem('activeMenuItem', menuItem);
    setActiveMenuItem(menuItem);
  };

  return (

    <div className="billings-conatiner" id="menu">
      <div className="menu-bar">
        <MenuItem
          label="Billing"
          to="/home/billing/billing"
          menuItemKey="Billing"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Transfer"
          to="/home/billing/transfer"
          menuItemKey="Transfer"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Covering Bill"
          to="/home/billing/coveringbill"
          menuItemKey="Covering Bill"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
      </div>

      <Outlet />

    </div>

  );
};

export default Billings;
