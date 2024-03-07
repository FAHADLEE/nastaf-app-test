import React, { useEffect } from 'react';
import "./TransferReport.css";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Autocomplete } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { Menu, TextField } from "@mui/material";
import Mapinvoice from './Mapinvoice/Mapinvoice';
import Luxuryinvoice from './Luxuryinvoice/Luxuryinvoice';
import Reportinvoice from './Reportinvoice/Reportinvoice';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Stations } from "../../../Bookings/Receiveds/Pending/PendingData";
import Mailpdf from './Mailpdf/Mailpdf';

//for popup
import ClearIcon from '@mui/icons-material/Clear';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

//for pdf

//dialog box
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

// ICONS
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { faBuilding, faFileInvoiceDollar, faNewspaper, faTags } from "@fortawesome/free-solid-svg-icons";
import useTransferreport from './useTransferreport';

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "vcode", headerName: "VCode", width: 130 },
  { field: "guestname", headerName: "User Name", width: 130 },
];

const TransferReport = () => {

  const {
    rows,
    actionName,
    error,
    success,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    handleClick,
    isFieldReadOnly,
    ratetypeforpage,
    hidePopup,
    organizationdata,
    routedData,
    date,
    customer,
    tripData,
    bankOptions,
    selectedImage,
    setCustomer,
    servicestation,
    handleserviceInputChange,
    handleEInvoiceClick,
    handleMapInvoiceClick,
    handleLuxuryInvoiceClick,
    pbpopupOpen,
    handlePopupClose,
    npopupOpen,
    handleETripsheetClick,
    lxpopupOpen,
    handleExcelDownload,
    handlePdfDownload,
    routeData,
    roundedAmount,
    sumTotalAndRounded,
    totalValue,
    attachedImage,
    organizationaddress1,
    organizationaddress2,
    popupOpen,
    organizationcity,
    organizationgstnumber,

  } = useTransferreport();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  return (
    <div className="TransferReport-form Scroll-Style-hide">
      <form >
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-TransferReport">
              <div className="input-field" style={{ justifyContent: 'center' }}>
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faTags} size="lg" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="Reference No"
                    name="referenceno"
                    autoComplete='off'
                    disabled={isFieldReadOnly("read")}
                  />
                </div>
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="Invoice No"
                    value={routedData[0]?.invoiceno || ''}
                    name="invoiceno"
                    autoComplete='off'
                  />
                </div>
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faNewspaper} size="xl" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="MIS Format"
                    name="misformat"
                    autoComplete='off'
                  />
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="Date"
                        name="date"
                        value={date}
                        format="DD/MM/YYYY"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "400px" }}>
                  <div className="icone">
                    <HailOutlinedIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={customer || (tripData.length > 0 ? tripData[0].customer : '')}
                    options={bankOptions}
                    onChange={(event, value) => setCustomer(value)}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Organization" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
                <div className="input">
                  <TextField
                    size="small"
                    id="id"
                    label="Rate Type"
                    value={ratetypeforpage || ''}
                    name="ratetype"
                    autoComplete='off'
                  />
                </div>
                <div className="input">
                  <TextField
                    size="small"
                    id="id"
                    label="Invoice Date"
                    value={(routedData[0]?.Billingdate) || ''}
                    name="Billdate"
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" >
                  <TextField
                    size="small"
                    id="id"
                    label="From Date"
                    value={(routedData[0]?.fromdate) || ''}
                    name="fromdate"
                    autoComplete='off'
                  />
                </div>
                <div className="input" >
                  <TextField
                    size="small"
                    id="id"
                    label="To Date"
                    value={(routedData[0]?.todate) || ''}
                    name="todate"
                    autoComplete='off'
                  />
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
                    value={servicestation || (tripData.length > 0 ? tripData[0].department : '') || ''}
                    options={Stations.map((option) => ({
                      label: option.optionvalue,
                    }))}
                    onChange={(event, value) => handleserviceInputChange(event, value)}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Stations" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "100px" }}>
                  <Button variant="contained" onClick={() => handleEInvoiceClick()} disabled={isFieldReadOnly("new")}>PDF Bill</Button>
                </div>
                <div className="input" style={{ width: "180px" }}>
                  <Button variant="outlined" disabled={isFieldReadOnly("new")} onClick={handleETripsheetClick} >Booking Mail</Button>
                </div>
                <div className="input" style={{ width: "180px" }}>
                  <Button variant="contained" onClick={() => handleMapInvoiceClick()} disabled={isFieldReadOnly("new")}>Image With Invoice Normal</Button>
                </div>
                <div className="input" style={{ width: "180px" }}>
                  <Button variant="contained" onClick={() => handleLuxuryInvoiceClick()} disabled={isFieldReadOnly("new")}>Image With Invoice Luxury</Button>
                </div>
              </div>
            </div>
            {/* normal invoice */}
            <Dialog open={pbpopupOpen} onClose={handlePopupClose}>
              <DialogContent>
                <Reportinvoice
                  organizationdata={organizationdata}
                  routedData={routedData}
                  selectedImage={selectedImage}
                  routeData={routeData}
                  roundedAmount={roundedAmount}
                  sumTotalAndRounded={sumTotalAndRounded}
                  totalValue={totalValue}
                  organizationaddress1={organizationaddress1}
                  organizationaddress2={organizationaddress2}
                  organizationcity={organizationcity}
                  organizationgstnumber={organizationgstnumber}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePopupClose} variant="contained" color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            {/* booking mail dialog box */}
            <Dialog open={popupOpen} onClose={handlePopupClose}>
              <DialogContent>
                <Mailpdf attachedImage={attachedImage} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePopupClose} variant="contained" color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

            {/* mapinnvoice */}
            <Dialog open={npopupOpen} onClose={handlePopupClose}>
              <DialogContent>
                <Mapinvoice />
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePopupClose} variant="contained" color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            {/* luxuryinvoice */}
            <Dialog open={lxpopupOpen} onClose={handlePopupClose}>
              <DialogContent>
                <Luxuryinvoice />
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePopupClose} variant="contained" color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
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
        <div className="billing-tables-TransferReport">
          <div className="table-bookingCopy-TransferReport">
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </div>
          </div>
          <div className="tripsheet-table-transferReport">
            <div className="TransferReport-Box">
              <div className="booking-update">
                <div className="Scroll-Style" style={{ overflow: 'scroll', height: 300, width: "100%" }}>
                  <table>
                    <thead id="update-header">
                      <tr>
                        <th>TripSheet No</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.length === 0 ? (
                        <tr>
                          <td colSpan={6}>No data available.</td>
                        </tr>
                      ) : (
                        rows.map((rows) => (
                          <tr id='update-row' key={rows.tripid} >
                            <td>TS {rows.tripid}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "150px" }}>
                <Button variant="outlined">Select</Button>
              </div>
              <div className="input" style={{ width: "150px" }}>
                <Button variant="contained">Unselect</Button>
              </div>
            </div>
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
        </div>
      </form>
    </div>
  )
}

export default TransferReport