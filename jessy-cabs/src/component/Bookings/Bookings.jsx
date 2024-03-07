import { useState  } from 'react';
import "./Bookings.css";
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

const Bookings = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const handleMenuItemClick = (menuItem) => {
    localStorage.setItem('activeMenuItem', menuItem);
    setActiveMenuItem(menuItem);
  };

  return (

    <div className="Bookings-main">
      <div className="menu-bar">
        <MenuItem
          label="Booking"
          to="/home/bookings/booking"
          menuItemKey="Booking"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Trip Sheet"
          to="/home/bookings/tripsheet"
          menuItemKey="Trip Sheet"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Received"
          to="/home/bookings/received"
          menuItemKey="Received"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Dispatched"
          to="/home/bookings/dispatched"
          menuItemKey="Dispatched"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
      </div>

      <Outlet />

    </div>

  );
};

export default Bookings;
