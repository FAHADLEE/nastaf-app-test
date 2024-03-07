import React, { useState, useEffect } from 'react';
import './OnlineBooking.css';
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { APIURL } from "../url";

const OnlineBooking = () => {
  const apiUrl = APIURL;

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});

  const [formValues, setFormValues] = useState({
    guestname: '',
    guestmobileno: '',
    email: '',
    startdate: '',
    starttime: '',
    pickup: '',
    useage: '',
    duty: '',
    vehType: '',
    remarks: '',
  });
  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);
  useEffect(() => {
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [info]);
  const [book, setBook] = useState({
    guestname: '',
    guestmobileno: '',
    email: '',
    startdate: '',
    starttime: '',
    pickup: '',
    useage: '',
    duty: '',
    vehType: '',
    remarks: '',
  });
  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      guestname: '',
      guestmobileno: '',
      email: '',
      startdate: '',
      starttime: '',
      pickup: '',
      useage: '',
      duty: '',
      vehType: '',
      remarks: '',
    }));
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    if (type === 'checkbox') {
      setBook((prevBook) => ({
        ...prevBook,
        [name]: checked,
      }));
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: checked,
      }));
    } else {
      const fieldValue = type === 'time' ? value : value;
      setBook((prevBook) => ({
        ...prevBook,
        [name]: fieldValue,
      }));
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: fieldValue,
      }));
    }
  };
  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://${apiUrl}/booking`, book);
      handleCancel();
      handlecheck();
      setSuccess(true);
      setSuccessMessage("Successfully Added");
    } catch {
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  };

  const handlecheck = async () => {

    try {
      const dataToSend = {
        guestname: formValues.guestname,
        guestmobileno: formValues.guestmobileno,
        email: formValues.email,
        startdate: formValues.startdate,
        starttime: formValues.starttime,
        pickup: formValues.pickup,
        useage: formValues.useage,
        duty: formValues.duty,
        vehType: formValues.vehType,
        remarks: formValues.remarks,
      };

      await axios.post(`http://${apiUrl}/send-onbook-email`, dataToSend);
      setSuccess(true);
      setSuccessMessage("Mail sented Successfully");
    } catch (error) {
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  };

  return (
    <div className="booking-container">
      <h2 className='title'>Online Booking Form</h2>
      <form className="booking-forms" method='post'>
        <div className='item'>
          <label className='input-lable' htmlFor="name">Guest Name:</label>
          <input
            className='input-item'
            type="text"
            id="name"
            name="guestname"
            value={book.guestname || formValues.guestname || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className='item'>
          <label className='input-lable' htmlFor="mobile">Mobile:</label>
          <input
            className='input-item'
            type="text"
            id="mobile"
            name="guestmobileno"
            value={book.guestmobileno || formValues.guestmobileno || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className='item'>
          <label className='input-lable' htmlFor="email">Email:</label>
          <input
            className='input-item'
            type="email"
            id="email"
            name="email"
            value={book.email || formValues.email || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className='items'>
          <div className='item'>
            <label className='input-lable' htmlFor="email">Booking Date:</label>
            <input
              type="date"
              name='startdate'
              value={book.startdate || formValues.startdate || ''}
              onChange={handleChange}
              className='input-item'
            />
          </div>
          <div className='item'>
            <label className='input-lable' htmlFor="email">Booking Time:</label>
            <input type="time"
              name='starttime'
              onChange={handleChange}
              value={book.starttime || formValues.starttime || ''}
              className='input-item'
            />
          </div>
        </div>
        <div className='item'>
          <label className='input-lable' htmlFor="pickup">Pickup Location:</label>
          <input
            className='input-item'
            type="text"
            id="pickup"
            name="pickup"
            value={book.pickup || formValues.pickup || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className='item'>
          <label className='input-lable' htmlFor="drop">Drop Location:</label>
          <input
            className='input-item'
            type="text"
            id="drop"
            name="useage"
            value={book.useage || formValues.useage || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className='item'>
          <label className='input-lable' htmlFor="usage">Usage:</label>
          <select
            id='selects'
            name="duty"
            value={book.duty || formValues.duty || ''}
            onChange={handleChange}
            required
          >
            <option value="">UsageType</option>
            <option value="Local">Local</option>
            <option value="Oneway">Oneway</option>
            <option value="OutStation">OutStation</option>
            <option value="Transfer">Transfer</option>
          </select>
        </div>
        <div className='item'>
          <label className='input-lable' htmlFor="usage">Vehicle Type:</label>
          <select
            id='selects'
            name="vehType"
            value={book.vehType || formValues.vehType || ''}
            onChange={handleChange}
            required
          >
            <option>Vehicle Type</option>
            <option>Sedan</option>
            <option>Semi Premium</option>
            <option>Premium</option>
            <option>SUV</option>
            <option>Luxury</option>
            <option>Super Luxury</option>
            <option>Bus</option>
          </select>
        </div>
        <div className='item'>
          <label className='input-lable' htmlFor="usage">Remark:</label>
          <textarea
            name='remarks'
            value={book.remarks || formValues.remarks || ''}
            onChange={handleChange}
            className='textareas'
            placeholder='Enter Your Remarks'>
          </textarea>
        </div>
        <button className='btns-online' type="button" onClick={handleAdd}>Submit</button>
        {error &&
          <div className='alert-popup Error' >
            <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{errorMessage}</p>
          </div>
        }
        {warning &&
          <div className='alert-popup Warning' >
            <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{warningMessage}</p>
          </div>
        }
        {success &&
          <div className='alert-popup Success' >
            <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{successMessage}</p>
          </div>
        }
        {info &&
          <div className='alert-popup Info' >
            <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{infoMessage}</p>
          </div>
        }
      </form>
    </div>
  );
};

export default OnlineBooking;
