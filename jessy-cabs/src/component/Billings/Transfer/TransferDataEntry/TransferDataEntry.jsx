import React, { useEffect } from 'react';
import "./TransferDataEntry.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from "dayjs";
import MenuItem from '@mui/material/MenuItem';
import { Menu, TextField } from "@mui/material";
import { Stations } from "../../../Bookings/Receiveds/Pending/PendingData";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";

import { Autocomplete } from "@mui/material";

//for pdf


// ICONS
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { faBuilding, faFileInvoiceDollar, faTags } from "@fortawesome/free-solid-svg-icons";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useTransferdataentry from './useTransferdataentry';

const TransferDataEntry = () => {

  const {
    rows,
    actionName,
    error,
    success,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    book,
    handleClick,
    handleChange,
    isFieldReadOnly,
    hidePopup,
    date,
    Billingdate,
    selectedCustomerDatas,
    invoiceno,
    handleKeyenter,
    customer,
    tripData,
    bankOptions,
    setCustomer,
    fromDate,
    handleDateChange,
    setFromDate,
    toDate,
    setToDate,
    info,
    infoMessage,
    servicestation,
    handleserviceInputChange,
    handleShow,
    handleCancel,
    handleClickGenerateBill,
    handleExcelDownload,
    handlePdfDownload,
    handleBillRemove,
    totalKm,
    totalTime,
    totalAmount,
    columns,
    setRowSelectionModel,
    handleRowSelection,

    // ... (other state variables and functions)
  } = useTransferdataentry();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);


  return (
    <div className="TransferDataEntry-form Scroll-Style-hide">
      <form >
        <div className="detail-container-main">
          <div className="TransferDataEntry">
            <div className="container-left">
              <div className="copy-title-btn-TransferDataEntry">
                <div className="input-field" >
                  <div className="input" style={{ width: "230px" }}>
                    <div className="icone">
                      <FontAwesomeIcon icon={faTags} size="lg" />
                    </div>
                    <TextField
                      size="small"
                      id="id"
                      label="Group Trip ID"
                      name="tripid"
                      value={book.tripid || ''}
                      onChange={handleChange}
                      autoComplete='off'
                    />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="Date"
                        name="date"
                        value={date}
                        format="DD/MM/YYYY"
                      />
                      <DatePicker
                        label="Bill Date"
                        name="Billingdate"
                        value={Billingdate || selectedCustomerDatas?.Billingdate ? dayjs(selectedCustomerDatas?.Billingdate) : null}
                        format="DD/MM/YYYY"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="input-field" >
                  <div className="input" >
                    <div className="icone">
                      <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />
                    </div>
                    <TextField
                      size="small"
                      id="id"
                      label="Invoice No"
                      name="invoiceno"
                      value={invoiceno || book.invoiceno || selectedCustomerDatas.invoiceno || ''}
                      onChange={handleChange}
                      autoComplete='off'
                      onKeyDown={handleKeyenter}
                    />
                  </div>
                  <div className="input" style={{ width: "420px" }}>
                    <div className="icone">
                      <HailOutlinedIcon color="action" />
                    </div>
                    <Autocomplete
                      fullWidth
                      id="free-solo-demo"
                      freeSolo
                      size="small"
                      value={customer || selectedCustomerDatas.customer || (tripData.length > 0 ? tripData[0].customer : '') || ''}
                      options={bankOptions}
                      onChange={(event, value) => setCustomer(value)}
                      renderInput={(params) => {
                        return (
                          <TextField {...params} label="Organization" name='customer' inputRef={params.inputRef} />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="input-field">
                  <div className="input" >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                          value={selectedCustomerDatas.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate || ''}
                          format="DD/MM/YYYY"
                          onChange={(date) => {
                            handleDateChange(date, 'fromdate');
                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                            const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
                            setFromDate(parsedDate);
                          }}
                        >
                          {({ inputProps, inputRef }) => (
                            <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerDatas?.fromdate} />
                          )}
                        </DatePicker>
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="input" >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                          value={selectedCustomerDatas.todate ? dayjs(selectedCustomerDatas.todate) : toDate || ''}
                          format="DD/MM/YYYY"
                          onChange={(date) => {
                            handleDateChange(date, 'todate');
                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                            const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
                            setToDate(parsedDate);
                          }}
                        >
                          {({ inputProps, inputRef }) => (
                            <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerDatas?.todate} />
                          )}
                        </DatePicker>
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="input" >
                    <div className="icone">
                      <FontAwesomeIcon icon={faBuilding} size="xl" />
                    </div>
                    <Autocomplete
                      fullWidth
                      id="free-solo-demo"
                      freeSolo
                      size="small"
                      value={servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || ''}
                      options={Stations.map((option) => ({
                        label: option.optionvalue,
                      }))}
                      onChange={(event, value) => handleserviceInputChange(event, value)}
                      renderInput={(params) => {
                        return (
                          <TextField {...params} label="Stations" name='station' inputRef={params.inputRef} />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="input-field" >
                  <div className="input">
                    <Button variant="contained" onClick={handleShow} disabled={isFieldReadOnly("new")}>List</Button>
                  </div>
                  <div className="input">
                    <Button variant="contained" onClick={handleCancel}>Cancel</Button>
                  </div>
                  <div className="input">
                    <Button variant="outlined" onClick={handleClickGenerateBill} >Bill Generate</Button>
                  </div>
                </div>
                <div className="input-field">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="total-container-TransferDataEntry">
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
            <div className="total-inputs" style={{ marginTop: '25px' }}>
              <Button variant="outlined" onClick={handleBillRemove} >Remove Selected</Button>
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Total Kms:</label>
              <input type="text" value={totalKm} readOnly />
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Total Hours:</label>
              <input type="text" value={totalTime} readOnly />
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Amount:</label>
              <input type="text" value={totalAmount} readOnly />
            </div>
          </div>
        </div>
        <div className="table-bookingCopy-TransferDataEntry">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              // rows={reversedRows}
              rows={rows}
              columns={columns}
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
                handleRowSelection(newRowSelectionModel);
              }}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
          {error &&
            <div className='alert-popup Error'>
              <div className="popup-icon"><ClearIcon style={{ color: '#fff' }} /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
              <p>{errorMessage}</p>
            </div>
          }
          {success &&
            <div className='alert-popup Success'>
              <div className="popup-icon"><FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
              <p>{successMessage}</p>
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
        </div>
      </form>
    </div>
  )
}

export default TransferDataEntry