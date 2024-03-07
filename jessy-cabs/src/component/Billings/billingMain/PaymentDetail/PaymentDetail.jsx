import React, { useEffect } from 'react';
import "./PaymentDetail.css";

import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';

import { Autocomplete, Menu, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import ListAltIcon from "@mui/icons-material/ListAlt";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import usePaymentdetails from './usePaymentdetails';


const PaymentDetail = () => {

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
    billingno,
    handleInputChange,
    customer,
    bankOptions,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleShow,
    handleExcelDownload,
    handlePdfDownload,
    totalAmount,
    paidAmount,
    pendingAmount,
    reversedRows,
    handleButtonClickTripsheet,
    columns

    // ... (other state variables and functions)
  } = usePaymentdetails();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  return (
    <div className="PaymentDetail-form Scroll-Style-hide">
      <form >
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-PaymentDetail">
              <div className="input-field" style={{ justifyContent: 'center' }}>
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <ListAltIcon color="action" style={{ fontSize: "27px" }} />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="Billing No"
                    name="billingno"
                    value={billingno || ''}
                    onChange={handleInputChange}
                    autoComplete='off'
                  />
                </div>
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <HailOutlinedIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={customer}
                    options={bankOptions}
                    onChange={handleInputChange}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Organization" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
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
              <div className="input-field" style={{ justifyContent: 'center' }}>
                <div className="input" style={{ width: "140px" }}>
                  <Button variant="contained" onClick={handleShow} disabled={isFieldReadOnly("read")}>Search</Button>
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
        {info &&
          <div className='alert-popup Info' >
            <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{infoMessage}</p>
          </div>
        }
        {success &&
          <div className='alert-popup Success' >
            <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{successMessage}</p>
          </div>
        }
        <div className='total-container'>
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
          <div className='amount-calculator'>
            <div className='total-inputs' >
              <label htmlFor="">Total Amount:</label>
              <input type="number" value={totalAmount} readOnly />
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Paid Amount:</label>
              <input type="number" value={paidAmount} readOnly />
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Pending Amount:</label>
              <input type="number" value={pendingAmount} readOnly />
            </div>
          </div>
        </div>
        <div className="table-bookingCopy-PaymentDetail">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={reversedRows}
              columns={columns}
              onRowClick={(event) => handleButtonClickTripsheet(event.row)}
              pageSize={5}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default PaymentDetail