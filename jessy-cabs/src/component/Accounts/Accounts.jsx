import React, { useEffect, useState } from 'react';
import './Accounts.css'
import ClearIcon from '@mui/icons-material/Clear';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import { Link, Outlet, useLocation } from 'react-router-dom';


const MenuItem = ({ label, to, activeMenuItem, handleMenuItemClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            className={`menu-link ${isActive ? 'actives' : ''}`}
            to={to}
            onClick={() => handleMenuItemClick(label)}
        >
            {label}
        </Link>
    );
};

const Accounts = () => {
    const [activeMenuItem, setActiveMenuItem] = useState('');
    const [info, setInfo] = useState(false);
    const [warningMessage, setwarningMessage] = useState({});
    //for popup
    const hidePopup = () => {
        setInfo(false);
    };
    useEffect(() => {
        if (info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [info]);
    useEffect(() => {
        const storedActiveMenuItem = localStorage.getItem('activeMenuItem');
        setActiveMenuItem(storedActiveMenuItem || '');
    }, []);

    const handleMenuItemClickMsgInfo = () => {
        setInfo(true);
        setwarningMessage('Under Development');
    };
    return (
        <div className='Accounts-conatiner' id='menu'>
            <div className='menu-bar'>

                <MenuItem label="Expense" menuItemKey="Cash Flow" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClickMsgInfo} />
                <MenuItem label="Income" menuItemKey="Driver Master" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClickMsgInfo} />
                <MenuItem label="Profit & Loss" menuItemKey="Profit & Loss" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClickMsgInfo} />

            </div>
            {info &&
                <div className='alert-popup Info' >
                    <div className="popup-icon"> <BsInfo style={{ color: '#fff', fontSize: '23px' }} /> </div>
                    <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                    <p style={{ color: '#000' }}>{warningMessage}</p>
                </div>
            }
            <Outlet />
        </div>
    )
}

export default Accounts;
