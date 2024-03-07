import React, { useEffect } from 'react';
import './MailageDetails.css';
import "jspdf-autotable";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Menu from '@mui/material/Menu';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump, faGaugeHigh, faGaugeSimple } from "@fortawesome/free-solid-svg-icons";

// ICONS
import BadgeIcon from "@mui/icons-material/Badge";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import CommuteIcon from '@mui/icons-material/Commute';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useMailagedetails from './useMailagedetails';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));
const actions = [
  { icon: <ChecklistIcon />, name: "List" },
  { icon: <CancelPresentationIcon />, name: "Cancel" },
  { icon: <DeleteIcon />, name: "Delete" },
  { icon: <ModeEditIcon />, name: "Edit" },
  { icon: <BookmarkAddedIcon />, name: "Add" },
];

const MailageDetails = () => {

  const {
    selectedCustomerData,
    selectedCustomerId,
    rows,
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    book,
    handleClick,
    handleChange,
    isFieldReadOnly,
    handleRowClick,
    handleAdd,
    hidePopup,
    handleDateChange,
    initialOdometer,
    setInitialOdometer,
    finalOdometer,
    setFinalOdometer,
    fuelConsumption,
    setFuelConsumption,
    calculateMileage,
    mileage,
    columns,
    isEditMode,
    handleEdit,

  } = useMailagedetails();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  return (
    <div className="form-container-FuelInfo">
      <div className="MailageDetails-Main">
        <form >
          <div className="MailageDetails-page-header">
            <div className="detailsFuel">
              <div className="input-field">
                <div className="input" >
                  <div className="icone">
                    <CarCrashIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="VehicleNo"
                    label="Vehicle No"
                    name="VehicleNo"
                    autoComplete="new-password"
                    value={selectedCustomerData?.VehicleNo || book.VehicleNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="input" >
                  <div className="icone">
                    <CommuteIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="VehicleName"
                    label="Vehicle Name"
                    name="VehicleName"
                    autoComplete="new-password"
                    value={selectedCustomerData?.VehicleName || book.VehicleName}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Fill Date"
                      format="DD/MM/YYYY"
                      value={selectedCustomerData.filldate ? dayjs(selectedCustomerData.filldate) : null}
                      onChange={(date) => handleDateChange(date, 'filldate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='filldate' value={selectedCustomerData.filldate} />
                      )}
                    </DatePicker>
                  </LocalizationProvider>
                </div>
                <div className="input">

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Empty Date"
                      format="DD/MM/YYYY"
                      value={selectedCustomerData.emptydate ? dayjs(selectedCustomerData.emptydate) : null}
                      onChange={(date) => handleDateChange(date, 'emptydate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='emptydate' value={selectedCustomerData.emptydate} />
                      )}
                    </DatePicker>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="input-field">
                <div className="input" >
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="DriverName"
                    label="Driver Name"
                    name="DriverName"
                    autoComplete="new-password"
                    value={selectedCustomerData?.DriverName || book.DriverName}
                    onChange={handleChange}
                  />
                </div>
                <div className="input" >
                  <div className="icone">
                    <CurrencyRupeeIcon color='action' />
                  </div>
                  <TextField
                    size="small"
                    id="FuelPrice"
                    label="Fuel Price"
                    name="FuelPrice"
                    autoComplete="new-password"
                    value={selectedCustomerData?.FuelPrice || book.FuelPrice}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faGaugeSimple} size="lg" />
                  </div>
                  <TextField
                    size="small"
                    id="InitialOdometerReading"
                    label="Initial Odometer Reading"
                    name="InitialOdometerReading"
                    autoComplete="new-password"
                    value={selectedCustomerData?.InitialOdometerReading || book.InitialOdometerReading || initialOdometer}
                    sx={{ width: "250px" }}
                    variant="standard"
                    onChange={(e) => {
                      handleChange(e);
                      setInitialOdometer(e.target.value);
                    }}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faGaugeHigh} size="lg" />
                  </div>
                  <TextField
                    size="small"
                    id="FinalOdometerReading"
                    label="Final Odometer Reading"
                    sx={{ width: "250px" }}
                    name="FinalOdometerReading"
                    autoComplete="new-password"
                    value={selectedCustomerData?.FinalOdometerReading || book.FinalOdometerReading || finalOdometer}
                    variant="standard"
                    onChange={(e) => {
                      handleChange(e);
                      setFinalOdometer(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "250px" }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faGasPump} size="xl" />
                  </div>
                  <TextField
                    size="small"
                    id="FuelConsumptioninliters"
                    label="Fuel Consumption (in liters)"
                    sx={{ width: "250px" }}
                    name="FuelConsumptioninliters"
                    autoComplete="new-password"
                    value={selectedCustomerData?.FuelConsumptioninliters || book.FuelConsumptioninliters || fuelConsumption}
                    variant="standard"
                    onChange={(e) => {
                      handleChange(e);
                      setFuelConsumption(e.target.value);
                    }}
                  />
                </div>
                <div className="input" >
                  <Button color="primary" variant="outlined" onClick={calculateMileage}>
                    Calculate Mileage
                  </Button>
                </div>
                <div className="input" style={{ width: "70px" }}>
                  {/* <Button color="primary" variant="contained" onClick={handleAdd} disabled={isFieldReadOnly("new")}>
                    Add
                  </Button> */}
                  <div className="input" style={{ width: "160px" }}>
                    {isEditMode ? (
                      <Button variant="contained" onClick={handleEdit}>Edit</Button>
                    ) : (
                      <Button variant="contained" onClick={handleAdd} disabled={isFieldReadOnly("new")}>Add</Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2>Mileage: </h2>
              <p>
                <span className="mailage-icone">
                  <FontAwesomeIcon icon={faGaugeHigh} size="lg" />
                </span>
                {mileage.toFixed(2)} km/L
              </p>
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
            <Box sx={{ position: "relative", mt: 3, height: 320 }}>
              <StyledSpeedDial
                ariaLabel="SpeedDial playground example"
                icon={<SpeedDialIcon />}
                direction="left"
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={(event) => handleClick(event, action.name, selectedCustomerId)}
                  />
                ))}
              </StyledSpeedDial>
            </Box>
            <div className="Download-btn">
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                      Download
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem>Excel</MenuItem>
                      <MenuItem >PDF</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </div>
            <div className="table-bookingCopy-Employe">
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  onRowClick={handleRowClick}
                  pageSize={5}
                />
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  )
}

export default MailageDetails