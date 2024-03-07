import React, { useEffect } from 'react';
import "./Closed.css";

import Menu from '@mui/material/Menu';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Stations } from "./ClosedData.js";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
import useClosed from './useClosed.js';

const Closed = () => {

  const {
    fromDate,
    setFromDate,
    toDate,
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    setToDate,
    handleClick,
    handleShow,
    isFieldReadOnly,
    handleShowAll,
    department,
    hidePopup,
    handleInputChange,
    handleExcelDownload,
    handlePdfDownload,
    handleButtonClick,
    reversedRows,
    handleButtonClickTripsheet,
    columns
  } = useClosed();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);


  return (
    <div className="Closed-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-Closed">
              <div className="input-field">
                <div className="input" style={{ width: "70%" }}>
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
                <div className="input" style={{ width: '130px' }}>
                  <Button variant="contained" onClick={handleShow} disabled={isFieldReadOnly("read")}>Show</Button>
                </div>
                <div className="input" style={{ width: '120px' }}>
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
                    value={department}
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
                <div className="input" style={{ width: '150px' }}>
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <React.Fragment>
                        <Button variant="outlined" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
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
                <div className="input" style={{ width: '150px' }}>
                  <Button variant="contained" onClick={handleButtonClick}>
                    Tripsheet
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
        <div className="table-bookingCopy-Closed">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={reversedRows}
              columns={columns}
              onRowClick={(event) => handleButtonClickTripsheet(event.row)}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Closed