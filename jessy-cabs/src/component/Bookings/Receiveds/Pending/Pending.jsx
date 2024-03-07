import React, { useEffect } from 'react';
import "./Pending.css";
import Menu from '@mui/material/Menu';
import { Stations } from "./PendingData";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import Autocomplete from "@mui/material/Autocomplete";
import DialogTitle from '@material-ui/core/DialogTitle';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import usePending from './usePending';

const Pending = () => {

  const {
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    handleClick,
    isFieldReadOnly,
    hidePopup,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleShow,
    handleShowAll,
    servicestation,
    handleInputChange,
    handleButtonbooking,
    handleButtontripsheet,
    handleExcelDownload,
    handlePdfDownload,
    reversedRows,
    handleButtonClick,
    popupOpen,
    handlePopupClose,
    selectedRow,
    handleBookingClick,
    handleTripsheetClick,
    columns
  } = usePending();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  return (
    <div className="pending-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-Pending">
              <div className="input-field">
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
                <div className="input" style={{ width: "130px" }} >
                  <Button variant="outlined" onClick={handleShow} disabled={isFieldReadOnly("read")}>Show</Button>
                </div>
                <div className="input" style={{ width: "110px" }} >
                  <Button variant="outlined" onClick={handleShowAll} disabled={isFieldReadOnly("read")}>Show All</Button>
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "300px" }}>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={servicestation}
                    options={Stations.map((option) => ({
                      label: option.optionvalue,
                    }))}
                    onChange={(event, value) => handleInputChange(event, value)}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Stations" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
                <div className="input" style={{ width: "140px" }}>
                  <Button variant="contained" onClick={handleButtonbooking}>New Booking</Button>
                </div>
                <div className="input" style={{ width: '170px' }}>
                  <Button variant="contained" onClick={handleButtontripsheet}>
                    New TripSheet
                  </Button>
                </div>
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
        <div className="table-bookingCopy-Pending">
          <div className="Download-btn">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                    Download
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={handleExcelDownload}>Excel</MenuItem>
                    <MenuItem onClick={handlePdfDownload}>PDF</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              // rows={rows}
              rows={reversedRows}
              columns={columns}
              onRowClick={(event) => handleButtonClick(event.row)}
              pageSize={5}
            />
            <Dialog open={popupOpen} onClose={handlePopupClose}>
              <DialogTitle>Select an Option</DialogTitle>
              <DialogContent>
                {selectedRow && (
                  <div>
                    <Button onClick={handleBookingClick}>Booking</Button>
                    <Button onClick={handleTripsheetClick}>Tripsheet</Button>
                  </div>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePopupClose} variant="contained" color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Pending