import React, { useEffect } from 'react';
import "./VehicleStatement.css";

import Menu from '@mui/material/Menu';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import { Stations } from "./VehicleStatementData";
import Autocomplete from "@mui/material/Autocomplete";
import DialogTitle from '@material-ui/core/DialogTitle';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useVehiclestatement from './useVehiclestatement';


const VehicleStatement = () => {

  const {
    actionName,
    handleClick,
    rows,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    isFieldReadOnly,
    hidePopup,
    servicestation,
    handleInputChange,
    fromDate,
    setFromDate,
    toDate,
    handleShow,
    handleShowAll,
    handleExcelDownload,
    handlePdfDownload,
    handleButtonClick,
    popupOpen,
    handlePopupClose,
    selectedRow,
    handleBookingClick,
    handleTripsheetClick,
    setToDate,
    columns
  } = useVehiclestatement();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  return (
    <div className="VehicleStatement-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="SearchContainer-VehicleStatement">
              <div className="input-field">
                <div className="input">
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={servicestation}
                    options={Stations.map((option) => ({
                      label: option.optionvalue,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    onChange={handleInputChange}
                    renderInput={(params) =>
                      <TextField {...params} label="Vendor Name From" />
                    }
                  />
                </div>
                <div className="input">
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={servicestation}
                    options={Stations.map((option) => ({
                      label: option.optionvalue,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    onChange={handleInputChange}
                    renderInput={(params) =>
                      <TextField {...params} label="Vendor Name To" />
                    }
                  />
                </div>
                <div className="input" style={{ width: "60%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="From Date"
                        value={fromDate}
                        onChange={(date) => setFromDate(date)}
                      />
                      <DatePicker
                        label="To Date"
                        value={toDate}
                        onChange={(date) => setToDate(date)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

              </div>
              <div className="input-field" style={{ justifyContent: "center" }}>
                <div className="input" style={{ width: "130px" }} >
                  <Button variant="outlined" onClick={handleShow} disabled={isFieldReadOnly("read")}>Show</Button>
                </div>
                <div className="input" style={{ width: "110px" }} >
                  <Button variant="contained" onClick={handleShowAll} disabled={isFieldReadOnly("read")}>Show All</Button>
                </div>
              </div>
              <div className="input-field" style={{ justifyContent: "end" }}>
                <div className="input" style={{ width: "130px" }}>
                  <TextField
                    margin="normal"
                    size="small"
                    id="paidamount"
                    label="Paid Amount"
                    name="paidamount"
                    autoComplete="off"
                  />
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
        <div className="table-bookingCopy-VehicleStatement">
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
              rows={rows}
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

export default VehicleStatement