import React, { useEffect } from 'react';
import "./BookingCopy.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import AutoModeIcon from "@mui/icons-material/AutoMode";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import useBookingcopy from './useBookingcopy';

const BookingCopy = () => {
  const {
    rows,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    actionName,
    handleClick,
    isFieldReadOnly,
    hidePopup,
    bookingno,
    handleInputChange,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleShow,
    columns
  } = useBookingcopy();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  return (
    <div className="bookingcopy-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="input-field copy-title-btn-BookingCopy">
              <div className="input">
                <div className="icone">
                  <AutoModeIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="bookingno"
                  label="Booking No"
                  id="bookingno"
                  value={bookingno}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input" style={{ width: "60%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label="From Date"
                      format="DD/MM/YYYY"
                      value={fromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                    <DatePicker
                      label="To Date"
                      format="DD/MM/YYYY"
                      value={toDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="input" style={{ width: "70px" }}>
                <Button variant="outlined" onClick={handleShow} disabled={isFieldReadOnly("read")}>Show</Button>
              </div>
            </div>
          </div>
        </div>
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
        <div className="table-bookingCopy-BookingCopy">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingCopy;
