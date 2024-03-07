import React, { useEffect } from 'react';
import "./TripSheet.css";
import {
  Apps,
  VehicleRate,
  Status,
  HireTypes,
  Department,
  DocumentType,
  Duty,
  Pickup,
  Email,
  Select,
} from "./TripSheetdata";
import dayjs from "dayjs";
import { Table } from "@mui/joy";
import Tabs from "@mui/joy/Tabs";
import Box from "@mui/material/Box";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Invoice from '../Invoice/Invoice';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/joy/Tab";

import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//dialog box
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// ICONS
import CallIcon from "@mui/icons-material/Call";
import StoreIcon from "@mui/icons-material/Store";
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import StreamIcon from "@mui/icons-material/Stream";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import EditNoteIcon from "@mui/icons-material/EditNote";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import PaymentsIcon from "@mui/icons-material/Payments";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TollTwoToneIcon from "@mui/icons-material/TollTwoTone";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import MinorCrashSharpIcon from "@mui/icons-material/MinorCrashSharp";
import BackupTableSharpIcon from "@mui/icons-material/BackupTableSharp";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AppsOutageOutlinedIcon from "@mui/icons-material/AppsOutageOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";
// FontAwesomeIcon Link
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { faStamp } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEquals } from "@fortawesome/free-solid-svg-icons";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { faSquareParking } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";
import useTripsheet from './useTripsheet';

// UpdateTbaleRowsGPSSlider TABLE START
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "name", headerName: "Attach Name", width: 130 },
  { field: "path", headerName: "Attach Path", width: 130 },
  { field: "documenttype", headerName: "Document Type", width: 130 },
  { field: "tripid", headerName: "Trip ID", width: 90 },
];
// Update Table
const UpdateTbaleColumns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "document", headerName: "Document", width: 130 },
  { field: "documentname", headerName: "Document Name", width: 130 },
  { field: "filename", headerName: "File Name", width: 90 },
];

const UpdateTbaleRows = [
  {
    id: 1,
    document: 1,
    documentname: "Employee 1",
    filename: "John Doe",
  },
  {
    id: 2,
    document: 2,
    documentname: "Band 2",
    filename: "Employee 2",
  },
];

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
  { icon: <CancelPresentationIcon />, name: "Cancel" },
  { icon: <DeleteIcon />, name: "Delete" },
  { icon: <ModeEditIcon />, name: "Edit" },
  { icon: <BookmarkAddedIcon />, name: "Add" },
];

const maplogcolumns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "tripid", headerName: "TripSheet No", width: 130 },
  { field: "date", headerName: "Trip Date", width: 160 },
  { field: "time", headerName: "Trip Time", width: 130 },
  { field: "trip_type", headerName: "Trip Type", width: 160 },
  { field: "place_name", headerName: "Place Name", width: 600 },
];

const TripSheet = () => {

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
    formData,
    handleKeyDown,
    handleDateChange,
    handleAutocompleteChange,
    packageData,
    smsguest,
    sendEmail,
    setSendEmail,
    formValues,
    selectedCustomerDatas,
    setDriverSMS,
    DriverSMS,
    calculateTotalDays,
    setStartTime,
    setBook,
    setFormData,
    setSelectedCustomerData,
    setCloseTime,
    calculateTotalTime,
    organizationdata,
    popupOpen,
    setSmsGuest,
    handleKeyEnter,
    setSelectedCustomerDatas,
    setreporttime,
    setshedintime,
    shedKilometers,
    calculateTotalKilometers,
    additionalTime,
    handleETripsheetClick,
    handlePopupClose,
    tripSheetData,
    attachedImage,
    routeData,
    signimageUrl,
    selectedImage,
    GmapimageUrl,
    setCloseTime2,
    setStartTime2,
    packageDetails,
    calculateExkmAmount,
    calculateExHrsAmount,
    calculateNightAmount,
    calculateTotalAmount,
    calculatedriverconvienceAmount,
    calculateExkmAmount2,
    calculateExHrsAmount2,
    calculateNightAmount2,
    calculatedriverconvienceAmount2,
    calculateTotalAmount2,
    handleTripmapClick,
    mapimgpopupOpen,
    handleimgPopupClose,
    mapimageUrls,
    handleTripmaplogClick,
    maplogimgpopupOpen,
    row,
    handleUpload,
    handleRefresh,
    handleButtonClick,
    handleTripRowClick,
    imgpopupOpen,
    generateLink,
    selectedRow,
    imageUrl,
    link,
    isSignatureSubmitted,
    isEditMode,
    handleEdit,
  } = useTripsheet();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  return (
    <div className="form-container">
      <div className="Tripsheet-form">
        <form action="">
          <span className="Title-Name">Trip Sheet</span>
          <div className="Tripsheet-header">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <ListAltIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="tripid"
                  label="Trip Sheet No"
                  name="tripid"
                  value={formData.tripid || selectedCustomerData.tripid || book.tripid || ''}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="password"
                  autoFocus
                  disabled={isFieldReadOnly("read")}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="bookingid"
                  label="Booking ID"
                  name="bookingno"
                  value={formData.bookingno || selectedCustomerData.bookingno || book.bookingno || ''}
                  onChange={handleChange}
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                  <DatePicker
                    value={formData.tripsheetdate || selectedCustomerData.tripsheetdate ? dayjs(selectedCustomerData.tripsheetdate) : null || book.tripsheetdate ? dayjs(book.tripsheetdate) : dayjs()}
                    format="DD/MM/YYYY"
                    label='Tripsheet Date'
                    onChange={(date) => handleDateChange(date, 'tripsheetdate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.tripsheetdate} />
                    )}
                  </DatePicker>

                </LocalizationProvider>
              </div>
              <div className="input">
                <div className="icone">
                  <QuizOutlinedIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "status")}
                  value={Status.find((option) => option.optionvalue)?.label || formData.status || selectedCustomerData.status || book.status || 'Opened'}
                  options={Status.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || formData.status || selectedCustomerData.status || book.status || 'Opened'}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="Status" autoComplete="password" name="status" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AccountBalanceWalletIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="billingno"
                  label="Billing No"
                  name="billingno"
                  value={formData.billingno || selectedCustomerData.billingno || book.billingno || ''}
                  onChange={handleChange}
                  autoComplete="password"
                  required
                />
              </div>
            </div>
            <div className="input-field checkbox">
              <div className="input">
                <div className="icone">
                  <AppsOutageOutlinedIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "apps")}
                  value={Apps.find((option) => option.optionvalue)?.label || formData.apps || selectedCustomerData.apps || book.apps || 'Waiting'}
                  options={Apps.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || formData.apps || selectedCustomerData.apps || book.apps || 'Waiting'}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="Apps" autoComplete="password" name="apps" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
              <div className="input">
                <div className="icone">
                  <HailOutlinedIcon color="action" />
                </div>
                <TextField
                  name="customer"
                  value={formData.customer || selectedCustomerData.customer || book.customer || packageData.customer || ''}
                  onChange={handleChange}
                  label="Customer"
                  id="standard-size-normal"
                  variant="standard"
                  required
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <RateReviewIcon color="action" />
                </div>
                <TextField
                  name="orderedby"
                  value={formData.orderedby || selectedCustomerData.orderedby || book.orderedby || ''}
                  onChange={handleChange}
                  label="Ordered By"
                  id="standard-size-normal"
                  variant="standard"
                  autoComplete="password"
                  required
                />
              </div>
              {/* <FormControlLabel
                value="smsguest"
                control={
                  <Checkbox
                    size="small"
                    name="smsguest"
                    checked={smsguest || formData.smsguest || book.smsguest}
                    onChange={(event) => {
                      setBook({ ...book, smsguest: event.target.checked });
                      setFormData({ ...formData, guestsms: event.target.checked });
                      setSmsGuest(event.target.checked);
                    }}
                  />
                }
                label="Guest SMS"
              /> */}
               <FormControlLabel
                  value="smsguest"
                  control={
                    <Checkbox
                      size="small"
                      checked={smsguest}
                      onChange={(event) => setSmsGuest(event.target.checked)}
                    />
                  }
                  label="Guest SMS"
                />
              {/* <FormControlLabel
                name="booker"
                value="booker"
                control={<Checkbox size="small" />}
                label="Booker"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(formData.booker || selectedCustomerData?.booker || book.booker)}
              /> */}
              {/* <FormControlLabel
                name="emailcheck"
                value="email"
                label="Email"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(formData.emailcheck || selectedCustomerData?.emailcheck || book.emailcheck)}
                control={<Checkbox size="small" checked={sendEmail || formData.emailcheck || selectedCustomerData?.emailcheck || book.emailcheck} onChange={(event) => setSendEmail(event.target.checked)} />}
              /> */}
                   <FormControlLabel
                  value="email"
                  control={
                    <Checkbox
                      size="small"
                      checked={sendEmail}
                      onChange={(event) => setSendEmail(event.target.checked)}
                    />
                  }
                  label="Email"
                />
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <PhoneIphoneIcon color="action" />
                </div>
                <TextField
                  name="mobile"
                  value={formData.mobile || selectedCustomerData.mobile || book.mobile || ''}
                  onChange={handleChange}
                  label="Mobile"
                  id="standard-size-normal"
                  size="small"
                  autoComplete="password"
                  required
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AssignmentIndIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  id="username"
                  label="Guest Name"
                  name="guestname"
                  value={formData.guestname || selectedCustomerData.guestname || formValues.guestname || book.guestname || ''}
                  onChange={handleChange}
                  size="small"
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <CallIcon color="action" />
                </div>
                <TextField
                  name="guestmobileno"
                  value={formData.guestmobileno || selectedCustomerData.guestmobileno || formValues.guestmobileno || book.guestmobileno || ''}
                  onChange={handleChange}
                  label="Phone (Cell)"
                  id="Phonecell"
                  size="small"
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AttachEmailIcon color="action" />
                </div>
                <TextField
                  name="email"
                  value={formData.email || selectedCustomerData.email || formValues.email || book.email || ''}
                  onChange={handleChange}
                  label="Email"
                  id="email"
                  size="small"
                  autoComplete="password"
                />
              </div>
            </div>
          </div>
          <div className="detail-container-main-Tripsheet">
            <div className="container-left-Tripsheet">
              <div className="input-field">
                <div className="input" style={{ width: "400px" }}>
                  <div className="icone">
                    <AddHomeWorkIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="address1"
                    value={formData.address1 || selectedCustomerData.address1 || book.address1 || ''}
                    onChange={handleChange}
                    label="Address"
                    id="remark"
                    sx={{ m: 1, width: "200ch" }}
                    variant="standard"
                    autoComplete="password"
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "400px" }}>
                  <div className="icone">
                    <HomeTwoToneIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="streetno"
                    value={formData.streetno || selectedCustomerData.streetno || book.streetno || ''}
                    onChange={handleChange}
                    id="remark"
                    sx={{ m: 1, width: "200ch" }}
                    variant="standard"
                    autoComplete="password"
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "400px" }}>
                  <div className="icone">
                    <LocationCityIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="city"
                    value={formData.city || selectedCustomerData.city || book.city || ''}
                    onChange={handleChange}
                    id="address3"
                    sx={{ m: 1, width: "200ch" }}
                    variant="standard"
                    autoComplete="password"
                  />
                </div>
              </div>
            </div>
            <div className="container-right-Tripsheet">
              <div className="textbox">
                <div className="textboxlist">
                  <div className="textboxlist-customer list-updates">
                    <span>
                      <div className="Scroll-Style" style={{ overflow: 'scroll', width: '500px', height: '220px' }}>
                        <Table hoverRow borderAxis="y">
                          <thead>
                            <tr>
                              <th>Vehicle_Name</th>
                              <th>Vehicle_Type</th>
                              <th>Driver_name</th>
                              <th>Driver_phone</th>
                              <th>Supplier</th>
                              <th>Online_Access</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows.length === 0 ? (
                              <tr>
                                <td colSpan={7}>No data available.</td>
                              </tr>
                            ) : (
                              rows.map((row) => (
                                <tr key={row.id} onClick={() => handleRowClick(row)}>
                                  <td>{row.vehRegNo}</td>
                                  <td>{row.vehType}</td>
                                  <td>{row.driverName}</td>
                                  <td>{row.mobileNo}</td>
                                  <td>{row.supplier}</td>
                                  <td>{row.onlineAccess}</td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="secend-container">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <HowToRegIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "hireTypes")}
                  value={HireTypes.find((option) => option.option)?.label || formData.hireTypes || formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || ''}
                  options={HireTypes.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || formData.hireTypes || formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || ''}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="Hire Types" autoComplete="password" name="hireTypes" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
              <div className="input">
                <div className="icone">
                  <StoreIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "department")}
                  value={Department.find((option) => option.optionvalue)?.label || formData.department || formValues.department || selectedCustomerData.department || book.department || ''}
                  options={Department.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || formData.department || formValues.department || selectedCustomerData.department || book.department || ''}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="Department" autoComplete="password" name="department" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
              <div className="input" style={{ width: "240px" }}>
                <div className="icone">
                  <CarCrashIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="vehiclerigsterno"
                  label="Vehicle Rigster No"
                  name="vehRegNo"
                  value={formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo || ''}
                  onChange={handleChange}
                  onKeyDown={handleKeyEnter}
                  autoComplete="password"
                />
              </div>
              <div className="input" style={{ width: "150px" }}>
                <TextField
                  margin="normal"
                  size="small"
                  id="category"
                  label="category"
                  name="category"
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <NoCrashIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "vehType")}
                  value={VehicleRate.find((option) => option.optionvalue)?.label || formData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType || ''}
                  options={VehicleRate.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || formData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType || ''}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="Vehicle Rate" autoComplete="password" name="vehType" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <SensorOccupiedIcon color="action" />
                </div>
                <TextField
                  name="driverName"
                  value={formData.driverName || selectedCustomerData.driverName || formValues.driverName || selectedCustomerDatas.driverName || book.driverName || ''}
                  onChange={handleChange}
                  label="Driver Name"
                  id="drivername"
                  variant="standard"
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PhoneIphoneIcon color="action" />
                </div>
                <TextField
                  name="mobileNo"
                  value={formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo || ''}
                  onChange={handleChange}
                  label="Cell"
                  id="cell"
                  variant="standard"
                  autoComplete="password"
                />
              </div>
              <div className="input radio">
                {/* <FormControlLabel
                  id="DriverSMS"
                  value="DriverSMS"
                  control={
                    <Checkbox
                      size="small"
                      checked={DriverSMS || formData.DriverSMS || book.DriverSMS}
                      onChange={(event) => {
                        setBook({ ...book, DriverSMS: event.target.checked });
                        setFormData({ ...formData, DriverSMS: event.target.checked });
                        setDriverSMS(event.target.checked);
                      }}
                    />
                  }
                  label="Driver SMS"
                /> */}
                     <FormControlLabel
                  value="DriverSMS"
                  control={
                    <Checkbox
                      size="small"
                      checked={DriverSMS}
                      onChange={(event) => setDriverSMS(event.target.checked)}
                    />
                  }
                  label="Driver SMS"

                />
              </div>
              <div className="input radio">
                {/* <FormControlLabel
                  id="DriverSMS"
                  value="DriverSMS"
                  control={
                    <Checkbox
                      size="small"
                      checked={formData.gps || book.gps}
                      onChange={(event) => {
                        setBook({ ...book, gps: event.target.checked });
                        setFormData({ ...formData, gps: event.target.checked });
                      }}
                    />
                  }
                  label="GPS"
                /> */}
            
              </div>
              <div className="input">
                <div className="icone">
                  <AttachEmailIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "email1")}
                  value={Email.find((option) => option.optionvalue)?.label || formData.email1 || selectedCustomerData.email1 || book.email1 || ''}
                  options={Email.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || formData.email1 || selectedCustomerData.email1 || book.email1 || ''}
                  renderInput={(params) => {
                    params.inputProps.value = formData.email1 || selectedCustomerData.email1 || book.email1 || ''
                    return (
                      <TextField {...params} label="Email" autoComplete="new-password" name="email1" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <EngineeringIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "duty")}
                  value={Duty.find((option) => option.optionvalue)?.label || formData.duty || selectedCustomerData.duty || book.duty || ''}
                  options={Duty.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || formData.duty || selectedCustomerData.duty || book.duty || ''}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="Duty" autoComplete="password" name="duty" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AirlineStopsIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "pickup")}
                  value={Pickup.find((option) => option.optionvalue)?.label || formData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup || ''}
                  options={Pickup.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || formData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup || ''}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="Pickup" autoComplete="password" name="pickup" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
              <div className="input">
                <div className="icone">
                  <DataUsageIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="useage"
                  value={formData.useage || selectedCustomerData.useage || formValues.useage || book.useage || ''}
                  onChange={handleChange}
                  label="Usage"
                  id="usage"
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <StreamIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="request"
                  value={formData.request || selectedCustomerData.request || book.request || ''}
                  onChange={handleChange}
                  label="Request"
                  id="request"
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="customercode"
                  value={formData.customercode || selectedCustomerData.customercode || book.customercode || ''}
                  onChange={handleChange}
                  label="Customer Code"
                  id="customer-code"
                  autoComplete="password"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={formData.startdate || selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null || book.startdate ? dayjs(book.startdate) : null}
                    format="DD/MM/YYYY"
                    onChange={(date) => handleDateChange(date, 'startdate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.startdate} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Close Date"
                    value={formData.closedate || selectedCustomerData.closedate ? dayjs(selectedCustomerData.closedate) : null || book.closedate ? dayjs(book.closedate) : null}
                    format="DD/MM/YYYY"
                    onChange={(date) => handleDateChange(date, 'closedate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.closedate} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              <div className="input">
                <div className="icone">
                  <CalendarMonthIcon color="action" />
                </div>
                <DemoItem>
                  <TextField
                    name="totaldays"
                    value={formData.totaldays || calculateTotalDays() || book.totaldays || ''}
                    label="Total Days"
                    size="small"
                    type="number"
                    id="total-days"
                    variant="standard"
                    autoComplete="password"
                  />
                </DemoItem>
              </div>
              <div className="input">
                <div className="icone">
                  <RecentActorsIcon color="action" />
                </div>
                <TextField
                  size="small"
                  value={formData.employeeno || selectedCustomerData.employeeno || book.employeeno || ''}
                  onChange={handleChange}
                  name="employeeno"
                  label="Employee No"
                  id="employeeno"
                  autoComplete="password"
                />
              </div>
              <div className="input" style={{ width: "300px" }}>
                <div className="icone">
                  <CurrencyRupeeTwoToneIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="advancepaidtovendor"
                  value={formData.advancepaidtovendor || selectedCustomerData.advancepaidtovendor || book.advancepaidtovendor || ''}
                  onChange={handleChange}
                  label="Advance-Paid-To-Vendor"
                  id="advance-paid-to-vendor"
                  autoComplete="password"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input time">
                <label>shed out Time</label>
                <input
                  type="time"
                  name='starttime'
                  value={formData.starttime || selectedCustomerData.starttime || book.starttime || ''}
                  onChange={(event) => {
                    setBook({ ...book, starttime: event.target.value });
                    setStartTime(event.target.value);
                    setFormData({ ...formData, starttime: event.target.value });
                    setSelectedCustomerData({ ...selectedCustomerData, starttime: event.target.value });
                  }}
                />
              </div>
              <div className="input time">
                <label>Report Time</label>
                <input
                  type="time"
                  name="reporttime"
                  value={formData.reporttime || selectedCustomerData.reporttime || book.reporttime || ''}
                  onChange={(event) => {
                    setSelectedCustomerData({ ...selectedCustomerData, reporttime: event.target.value });
                    setSelectedCustomerDatas({ ...selectedCustomerDatas, reporttime: event.target.value });
                    setBook({ ...book, reporttime: event.target.value });
                    setreporttime(event.target.value);
                  }}
                />
              </div>
              <div className="input time" >
                <label>Close Time</label>
                <input
                  type="time"
                  name="shedintime"
                  value={formData.shedintime || selectedCustomerData.shedintime || book.shedintime || ''}
                  onChange={(event) => {
                    setSelectedCustomerData({ ...selectedCustomerData, shedintime: event.target.value });
                    setSelectedCustomerDatas({ ...selectedCustomerDatas, shedintime: event.target.value });
                    setBook({ ...book, shedintime: event.target.value });
                    setshedintime(event.target.value);
                  }}
                />
              </div>
              <div className="input time" >
                <label>Shed-In Time</label>
                <input
                  type="time"
                  name="closetime"
                  value={formData.closetime || selectedCustomerData.closetime || book.closetime || ''}
                  onChange={(event) => {
                    setSelectedCustomerData({ ...selectedCustomerData, closetime: event.target.value });
                    setSelectedCustomerDatas({ ...selectedCustomerDatas, closetime: event.target.value });
                    setBook({ ...book, closetime: event.target.value });
                    setCloseTime(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <FontAwesomeIcon icon={faRoad} size="lg" />
                </div>
                <TextField
                  name="shedout"
                  value={formData.shedout || book.shedout || selectedCustomerData.shedout || ''}
                  onChange={handleChange}
                  label="Shed Out"
                  id="shedout"
                  size='small'
                  type="number"
                  autoComplete="password"
                />
              </div>
              <div className="input" style={{ width: "180px" }}>
                <TextField
                  name="startkm"
                  value={formData.startkm || selectedCustomerData.startkm || book.startkm || ''}
                  onChange={handleChange}
                  size="small"
                  label="Start KM"
                  type="number"
                  id="outlined-start-adornment"
                  autoComplete="password"
                />
              </div>
              <div className="input" style={{ width: "180px" }}>
                <TextField
                  name="closekm"
                  value={formData.closekm || selectedCustomerData.closekm || book.closekm || ''}
                  onChange={handleChange}
                  label="Close KM"
                  size="small"
                  type="number"
                  id="outlined-start-adornment"
                  autoComplete="password"
                />
              </div>
              <div className="input" style={{ width: "180px" }}>
                <div className="icone">
                  <FontAwesomeIcon icon={faRoad} size="lg" />
                </div>
                <TextField
                  name="shedin"
                  value={formData.shedin || book.shedin || selectedCustomerData.shedin || ''}
                  onChange={handleChange}
                  label="Shed In"
                  type="number"
                  id="shedin"
                  size='small'
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <FontAwesomeIcon icon={faRoad} size="lg" />
                </div>
                <TextField
                  name="shedkm"
                  value={formData.shedkm || book.shedkm || selectedCustomerData.shedkm || shedKilometers.shedkm || ''}
                  onChange={handleChange}
                  label="Add KM"
                  type="number"
                  id="shedkm"
                  size='small'
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <FontAwesomeIcon icon={faRoad} size="lg" />
                </div>
                <TextField
                  name="totalkm1"
                  value={formData.totalkm1 || packageData.totalkm1 || book.totalkm1 || selectedCustomerData.totalkm1 || calculateTotalKilometers() || ''}
                  onChange={handleChange}
                  label="Total KM"
                  id="totalkm1"
                  type="number"
                  size='small'
                  autoComplete="password"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <FontAwesomeIcon icon={faStopwatch} size="lg" />
                </div>
                <TextField
                  name="additionaltime"
                  value={formData.additionaltime || book.additionaltime || selectedCustomerData.additionaltime || additionalTime.additionaltime || ''}
                  onChange={handleChange}
                  label="Additional Time"
                  id="additionaltime"
                  variant="standard"
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <FontAwesomeIcon icon={faStopwatch} size="lg" />
                </div>
                <TextField
                  name="totaltime"
                  value={formData.totaltime || packageData.totaltime || book.totaltime || selectedCustomerData.totaltime || calculateTotalTime() || ''}
                  onChange={handleChange}
                  label="Total Time"
                  id="totaltime"
                  variant="standard"
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <FontAwesomeIcon icon={faStamp} />
                </div>
                <TextField
                  name="permit"
                  value={formData.permit || selectedCustomerData.permit || book.permit || ''}
                  onChange={handleChange}
                  label="Permit"
                  id="permit"
                  variant="standard"
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <FontAwesomeIcon icon={faSquareParking} />
                </div>
                <TextField
                  name="parking"
                  value={formData.parking || selectedCustomerData.parking || book.parking || ''}
                  onChange={handleChange}
                  label="Parking"
                  id="parking"
                  variant="standard"
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <TollTwoToneIcon color="action" />
                </div>
                <TextField
                  name="toll"
                  value={formData.toll || selectedCustomerData.toll || book.toll || ''}
                  onChange={handleChange}
                  label="Toll"
                  id="Toll"
                  variant="standard"
                  autoComplete="password"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "250px" }}>
                <div className="icone">
                  <BackupTableSharpIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="vpermettovendor"
                  value={formData.vpermettovendor || selectedCustomerData.vpermettovendor || book.vpermettovendor || ''}
                  onChange={handleChange}
                  label="v-permet-To-Vendor"
                  id="v-permet-to-vendor"
                  autoComplete="password"
                />
              </div>
              <div className="input" style={{ width: "250px" }}>
                <div className="icone">
                  <MinorCrashSharpIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="vendortoll"
                  value={formData.vendortoll || selectedCustomerData.vendortoll || book.vendortoll || ''}
                  onChange={handleChange}
                  label="Vendor-Toll"
                  id="vendor-toll"
                  autoComplete="password"
                />
              </div>
              <div className="input" style={{ width: "250px" }}>
                <div className="icone">
                  <PaymentsIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="customeradvance"
                  value={formData.customeradvance || selectedCustomerData.customeradvance || book.customeradvance || ''}
                  onChange={handleChange}
                  label="Customer-Advance"
                  id="customer-advance"
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <Button startIcon={<BorderColorIcon />} variant="outlined" onClick={handleETripsheetClick} disabled={isFieldReadOnly("new")}>
                  E-Tripsheet
                </Button>
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "400px" }}>
                <div className="icone">
                  <MarkChatReadIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="remark"
                  value={formData.remark || selectedCustomerData.remark || book.remark || ''}
                  onChange={handleChange}
                  label="Remark"
                  id="remark"
                  multiline
                  rows={5}
                  sx={{ m: 2, width: "400ch" }}
                  autoComplete="password"
                />
              </div>
              <Dialog open={popupOpen} onClose={handlePopupClose}>
                <DialogContent>
                  <Invoice tripSheetData={tripSheetData} organizationdata={organizationdata} selectedImage={selectedImage} attachedImage={attachedImage} routeData={routeData} formData={calculateTotalTime} book={book} signimageUrl={signimageUrl} GmapimageUrl={GmapimageUrl} selectedCustomerData={selectedCustomerData} selectedCustomerDatas={selectedCustomerDatas} selectedTripid={localStorage.getItem('selectedTripid')} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handlePopupClose} variant="contained" color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              <div className="input" style={{ width: "160px" }}>
                {isEditMode ? (
                  <Button variant="contained" onClick={handleEdit}>Edit</Button>
                ) : (
                  <Button variant="contained" onClick={handleAdd} disabled={isFieldReadOnly("new")}>Add</Button>
                )}
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
          <div className="Tipsheet-content-table-main">
            <Tabs
              className='Scroll-Style'
              size="sm"
              aria-label="Pricing plan"
              defaultValue={0}
              sx={(theme) => ({
                width: "100%",
                height: "330px",
                "--Tabs-gap": "0px",
                borderRadius: "lg",
                boxShadow: "sm",
                overflow: "auto",
                border: `2px solid #ccc`,
              })}
            >
              <TabList
                sx={{
                  "--ListItem-radius": "0px",
                  borderRadius: 0,
                  [`& .${tabClasses.root}`]: {
                    fontWeight: "lg",
                    flex: 1,
                    bgcolor: "background.body",
                    position: "relative",
                    [`&.${tabClasses.selected}`]: {
                      color: "primary.500",
                    },
                    [`&.${tabClasses.selected}:before`]: {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      bottom: -1,
                      width: "100%",
                      height: 2,
                      bgcolor: "primary.400",
                    },
                    [`&.${tabClasses.focusVisible}`]: {
                      outlineOffset: "-3px",
                    },
                  },
                }}
              >
                <Tab>Booking</Tab>
                <Tab>Vendor Info</Tab>
                <Tab>Vendor Bill</Tab>
                <Tab>Customer Bill</Tab>
                <Tab>Alert</Tab>
                <Tab>GPS Att</Tab>
                <Tab>Message</Tab>
              </TabList>
              <TabPanel value={0} sx={{ p: 2 }}>
                <div className="Customer-Booking-Slider">
                  <div className="input-field">
                    <div className="input" style={{ width: "200px" }}>
                      <Button
                        variant="outlined"
                        sx={{
                          bgcolor: "#9fed64",
                          color: "#fff",
                          border: `2px solid #fff`,
                          "&:hover": {
                            bgcolor: "transparent",
                            color: "#9fed64",
                            border: `2px solid #9fed64`,
                          },
                        }}
                      >
                        SMS Waiting
                      </Button>
                    </div>
                    <div className="input" style={{ width: "90px" }}>
                      <Button
                        variant="outlined"
                        sx={{
                          bgcolor: "#ed6464",
                          color: "#fff",
                          border: `2px solid #fff`,
                          "&:hover": {
                            bgcolor: "transparent",
                            color: "#ed6464",
                            border: `2px solid #ed6464`,
                          },
                        }}
                      >
                        Failed
                      </Button>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <div
                        className="icone"
                        style={{ padding: "0px 10px 0px 5px" }}
                      >
                        <FontAwesomeIcon icon={faFolderOpen} size="lg" />
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-demo"
                        freeSolo
                        sx={{ width: "20ch" }}
                        onChange={(event, value) => handleAutocompleteChange(event, value, "documenttype")}
                        value={DocumentType.find((option) => option.optionvalue)?.label || formData.documenttype || selectedCustomerData.documenttype || book.documenttype || ''}
                        options={DocumentType.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || formData.documenttype || selectedCustomerData.documenttype || book.documenttype || ''}
                        renderInput={(params) => {
                          return (
                            <TextField {...params} label="Document Type" autoComplete="password" name="documenttype" inputRef={params.inputRef} />
                          )
                        }
                        }
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faFileLines} size="lg" />
                      </div>
                      <TextField
                        name="documentnotes"
                        value={formData.documentnotes || selectedCustomerData.documentnotes || book.documentnotes || ''}
                        onChange={handleChange}
                        label="Document Notes"
                        id="document-notes"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                    <div className="input" style={{ width: "90px" }}>
                      <Button variant="outlined">Select</Button>
                    </div>
                    <div className="input" style={{ width: "90px" }}>
                      <Button variant="contained">Refresh</Button>
                    </div>
                  </div>
                  <div className="table-TripSheet">
                    <div style={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={UpdateTbaleRows}
                        columns={UpdateTbaleColumns}
                        pageSize={5}
                        checkboxSelection
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={1} sx={{ p: 2 }}>
                <div className="Customer-Vendor-Info-Slider">
                  <div className="input-field">
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faSuitcaseRolling} size="lg" />
                      </div>
                      <TextField
                        name="VendorTripNo"
                        value={formData.tripid || selectedCustomerData.tripid || book.tripid || ''}
                        onChange={handleChange}
                        label="Vendor Trip No"
                        id="Vendor-Trip-No"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                    <div className="input" style={{ width: "250px" }}>
                      <div className="icone">
                        <NoCrashIcon color="action" />
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-demo"
                        freeSolo
                        sx={{ width: "20ch" }}
                        onChange={(event, value) => handleAutocompleteChange(event, value, "vehType")}
                        value={VehicleRate.find((option) => option.optionvalue)?.label || formData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType || ''}
                        options={VehicleRate.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || formData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType || ''}
                        renderInput={(params) => {
                          return (
                            <TextField {...params} label="Vehicle type" autoComplete="password" name="vehType" inputRef={params.inputRef} />
                          )
                        }
                        }
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <EngineeringIcon color="action" />
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-demo"
                        freeSolo
                        sx={{ width: "20ch" }}
                        onChange={(event, value) => handleAutocompleteChange(event, value, "duty1")}
                        value={Duty.find((option) => option.optionvalue)?.label || formData.duty || selectedCustomerData.duty || book.duty || ''}
                        options={Duty.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || formData.duty || selectedCustomerData.duty || book.duty || ''}
                        renderInput={(params) => {
                          return (
                            <TextField {...params} label="Duty" autoComplete="password" name="duty1" inputRef={params.inputRef} />
                          )
                        }
                        }
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Start Date">
                          <DatePicker
                            value={formData.startdate || selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null || book.startdate ? dayjs(book.startdate) : null}
                            onChange={(date) => handleDateChange(date, 'startdate1')}
                          >
                            {({ inputProps, inputRef }) => (
                              <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.startdate} />
                            )}
                          </DatePicker>
                        </DemoItem>
                      </LocalizationProvider>
                    </div>
                    <div className="input">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Close Date">
                          <DatePicker
                            value={formData.closedate || selectedCustomerData.closedate ? dayjs(selectedCustomerData.closedate) : null || book.closedate ? dayjs(book.closedate) : null}
                            onChange={(date) => handleDateChange(date, 'closedate1')}
                          >
                            {({ inputProps, inputRef }) => (
                              <TextField {...inputProps} inputRef={inputRef} autoComplete="password" value={selectedCustomerData?.closedate} />
                            )}
                          </DatePicker>
                        </DemoItem>
                      </LocalizationProvider>
                    </div>
                    <div className="input">
                      <div className="icone">
                        <CalendarMonthIcon color="action" />
                      </div>
                      <DemoItem>
                        <TextField
                          name="totaldays"
                          value={calculateTotalDays() || ''}
                          label="Total Days"
                          size="small"
                          type="number"
                          id="total-days"
                          variant="standard"
                          autoComplete="password"
                        />
                      </DemoItem>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input time">
                      <label>Start Time</label>
                      <input
                        type="time"
                        value={formData.starttime || selectedCustomerData.starttime || book.starttime || ''}
                        onChange={(event) => {
                          setSelectedCustomerData({ ...selectedCustomerData, starttime2: event.target.value });
                          setSelectedCustomerDatas({ ...selectedCustomerDatas, starttime2: event.target.value });
                          setBook({ ...book, starttime2: event.target.value });
                          setStartTime2(event.target.value);
                        }}
                        name="starttime2"
                      />
                    </div>
                    <div className="input time">
                      <label>Close Time</label>
                      <input
                        type="time"
                        value={formData.closetime || selectedCustomerData.closetime || book.closetime || ''}
                        onChange={(event) => {
                          setSelectedCustomerData({ ...selectedCustomerData, closetime2: event.target.value });
                          setSelectedCustomerDatas({ ...selectedCustomerDatas, closetime2: event.target.value });
                          setBook({ ...book, closetime2: event.target.value });
                          setCloseTime2(event.target.value);
                        }}
                        name="closetime2"
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faStopwatch} size="lg" />
                      </div>
                      <TextField
                        name="totaltime"
                        value={formData.totaltime || calculateTotalTime() || book.totaltime || selectedCustomerData.totaltime || ''}
                        label="Total Time"
                        id="total-time"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <TextField
                        name="startkm1"
                        value={formData.startkm || selectedCustomerData.startkm || book.startkm || ''}
                        onChange={handleChange}
                        size="small"
                        label="Start KM"
                        type="number"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: "23ch" }}
                        autoComplete="password"
                      />
                    </div>
                    <div className="input">
                      <TextField
                        name="closekm1"
                        value={formData.closekm || selectedCustomerData.closekm || book.closekm || ''}
                        onChange={handleChange}
                        label="Close KM"
                        size="small"
                        type="number"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: "23ch" }}
                        autoComplete="password"
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faRoad} size="lg" />
                      </div>
                      <TextField
                        name="totalkm1"
                        value={formData.totalkm1 || calculateTotalKilometers() || book.totalkm1 || packageData.totalkm1 || selectedCustomerData.totalkm1 || ''}
                        label="Total KM"
                        id="total-km"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <div className="icone">
                        <EditNoteIcon color="action" />
                      </div>
                      <TextField
                        name="remark"
                        value={formData.remark || selectedCustomerData.remark || book.remark || ''}
                        onChange={handleChange}
                        label="Remarks"
                        id="remark"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faMoneyBill1Wave} />
                      </div>
                      <TextField
                        name="caramount"
                        value={formData.caramount || selectedCustomerData.caramount || book.caramount || ''}
                        onChange={handleChange}
                        label="Car Amount"
                        id="car-amount"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={2} sx={{ p: 2 }}>
                <div className="Customer-Vendor-Bill-Slider">
                  <div className="input-field">
                    <div className="input">
                      <div
                        className="icone"
                        style={{ padding: "0px 10px 0px 5px" }}
                      >
                        <FontAwesomeIcon icon={faStopwatch} size="lg" />
                      </div>
                      <TextField
                        name="minhrs"
                        value={formData.minhrs || selectedCustomerData.minhrs || book.minhrs || packageDetails[0]?.Hours || ''}
                        onChange={handleChange}
                        label="Min.Hrs"
                        id="min-hrs"
                        size="small"
                        autoComplete="password"
                      />
                    </div>
                    <div className="input">
                      <div
                        className="icone"
                        style={{ padding: "0px 10px 0px 5px" }}
                      >
                        <FontAwesomeIcon icon={faRoad} size="lg" />
                      </div>
                      <TextField
                        name="minkm"
                        value={formData.minkm || packageDetails[0]?.KMS || book.minkm || selectedCustomerData.minkm || ''}
                        label="Min.Km"
                        id="minkm"
                        size="small"
                        autoComplete="password"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <div className="icone">
                        <Inventory2Icon color="action" />
                      </div>
                      <TextField
                        name="package"
                        value={formData.package || selectedCustomerData.package || book.package || packageDetails[0]?.package || ''}
                        onChange={handleChange}
                        label="Package"
                        id="package"
                        size="small"
                        variant="standard"
                        sx={{ m: 1, width: "60ch" }}
                        autoComplete="password"
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount"
                        value={formData.amount || selectedCustomerData.amount || book.amount || packageDetails[0]?.Rate || ''}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
                        id="amount"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faRoad} />
                      </div>
                      <TextField
                        name="exkm"
                        value={book.exkm || packageDetails[0]?.extraKMS || ''}
                        onChange={handleChange}
                        label="Ex.Km"
                        id="ex-km"
                        size="small"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField size="small"
                        name='exkmTkm'
                        value={formData.exkmTkm || selectedCustomerData.exkmTkm || book.exkmTkm || ''}
                        onChange={handleChange}
                        id="exkmTkm"
                        variant="standard"
                        autoComplete="password" />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount1"
                        value={book.amount1 || calculateExkmAmount() || ''}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
                        id="amount"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faStopwatch} />
                      </div>
                      <TextField
                        name="exHrs"
                        value={formData.exHrs || selectedCustomerData.exHrs || book.exHrs || packageDetails[0]?.extraHours || ''}
                        onChange={handleChange}
                        label="Ex.Hrs"
                        id="ex-Hrs"
                        size="small"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField
                        size="small"
                        name='exHrsTHrs'
                        value={formData.exHrsTHrs || selectedCustomerData.exHrsTHrs || book.exHrsTHrs || ''}
                        onChange={handleChange}
                        variant="standard" />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount2"
                        value={book.amount2 || calculateExHrsAmount() || ''}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
                        id="amount"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faCloudMoon} />
                      </div>
                      <TextField
                        name="night"
                        value={formData.night || selectedCustomerData.night || book.night || packageDetails[0]?.NHalt || ''}
                        onChange={handleChange}
                        label="Night"
                        id="night"
                        size="small"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField
                        size="small"
                        name='nightThrs'
                        value={formData.nightThrs || selectedCustomerData.nightThrs || book.nightThrs || ''}
                        onChange={handleChange}
                        variant="standard"
                        autoComplete="password" />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount3"
                        value={book.amount3 || calculateNightAmount() || ''}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
                        id="amount"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faMoneyBill1Wave} />
                      </div>
                      <TextField
                        name="driverconvenience"
                        value={formData.driverconvenience || selectedCustomerData.driverconvenience || book.driverconvenience || ''}
                        onChange={handleChange}
                        label="Driver Convenience"
                        id="driver-convenience"
                        size="small"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField
                        size="small"
                        name='dtc'
                        value={formData.dtc || selectedCustomerData.dtc || book.dtc || ''}
                        onChange={handleChange}
                        variant="standard"
                        autoComplete="password" />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount4"
                        value={book.amount4 || calculatedriverconvienceAmount() || ''}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
                        id="amount"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                  </div>
                  <div className="input-field">

                    <div className="input">
                      <div
                        className="icone"
                        style={{ padding: "0px 10px 0px 10px" }}
                      >
                        <FontAwesomeIcon icon={faMoneyBillTrendUp} size="lg" />
                      </div>
                      <TextField
                        name="netamount"
                        value={book.netamount || calculateTotalAmount() || ''}
                        onChange={handleChange}
                        size="small"
                        label="Net Amount"
                        id="net-amount"
                        autoComplete="password"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <TextField
                        name="vehcommission"
                        value={formData.vehcommission || selectedCustomerData.vehcommission || book.vehcommission || ''}
                        onChange={handleChange}
                        type="number"
                        label="Veh.Commission"
                        size="small"
                        id="outlined-start-adornment"
                        autoComplete="password"
                        sx={{ m: 1, width: "25ch" }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">%</InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <div className="input">
                      <TextField
                        name="caramount"
                        value={formData.caramount || selectedCustomerData.caramount || book.caramount || ''}
                        onChange={handleChange}
                        size="small"
                        label="Car Amount"
                        id="car-amount"
                        autoComplete="password"
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={3} sx={{ p: 2 }}>
                <div className="Customer-Customer-Bill-Slider">
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <div className="icone">
                        <Inventory2Icon color="action" />
                      </div>
                      <TextField
                        name="pack"
                        value={formData.pack || selectedCustomerData.pack || book.pack || packageDetails[0]?.package || ''}
                        onChange={handleChange}
                        label="Pack"
                        id="pack"
                        size="small"
                        variant="standard"
                        autoComplete="password"
                        sx={{ m: 1, width: "60ch" }}
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount5"
                        value={formData.amount5 || selectedCustomerData.amount5 || book.amount5 || packageDetails[0]?.Rate || ''}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
                        autoComplete="password"
                        id="amount"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faRoad} />
                      </div>
                      <TextField
                        name="exkm1"
                        value={book.exkm1 || packageDetails[0]?.extraKMS || ''}
                        onChange={handleChange}
                        label="Ex.Km"
                        id="ex-km"
                        autoComplete="password"
                        size="small"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField size="small"
                        name='exkmTkm2'
                        value={formData.exkmTkm2 || selectedCustomerData.exkmTkm2 || book.exkmTkm2 || ''}
                        onChange={handleChange}
                        id="exkmTkm"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount6"
                        value={book.amount6 || calculateExkmAmount2() || ''}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
                        autoComplete="password"
                        id="amount"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faStopwatch} />
                      </div>
                      <TextField
                        name="exHrs1"
                        value={formData.exHrs1 || selectedCustomerData.exHrs1 || book.exHrs1 || packageDetails[0]?.extraHours || ''}
                        onChange={handleChange}
                        label="Ex.Hrs"
                        id="ex-Hrs"
                        size="small"
                        autoComplete="password"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField
                        size="small"
                        name='exHrsTHrs2'
                        value={formData.exHrsTHrs2 || selectedCustomerData.exHrsTHrs2 || book.exHrsTHrs2 || ''}
                        onChange={handleChange}
                        variant="standard"
                      />

                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount7"
                        value={book.amount7 || calculateExHrsAmount2() || ''}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
                        autoComplete="password"
                        id="amount"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faCloudMoon} />
                      </div>
                      <TextField
                        name="night1"
                        value={formData.night1 || selectedCustomerData.night1 || book.night1 || packageDetails[0]?.NHalt || ''}
                        onChange={handleChange}
                        label="Night"
                        id="night"
                        autoComplete="password"
                        size="small"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField
                        size="small"
                        name='nightThrs2'
                        value={formData.nightThrs2 || selectedCustomerData.nightThrs2 || book.nightThrs2 || ''}
                        onChange={handleChange}
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount8"
                        value={formData.amount8 || selectedCustomerData.amount8 || book.amount8 || calculateNightAmount2() || ''}
                        onChange={handleChange}
                        size="small"
                        autoComplete="password"
                        label="Amount"
                        id="amount"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faMoneyBill1Wave} />
                      </div>
                      <TextField
                        name="driverconvenience1"
                        value={formData.driverconvenience1 || selectedCustomerData.driverconvenience1 || book.driverconvenience1 || ''}
                        onChange={handleChange}
                        label="Driver Convenience"
                        autoComplete="password"
                        id="driver-convenience"
                        size="small"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField
                        size="small"
                        name='dtc2'
                        value={formData.dtc2 || selectedCustomerData.dtc2 || book.dtc2 || ''}
                        onChange={handleChange}
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount9"
                        value={book.amount9 || calculatedriverconvienceAmount2() || ''}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
                        id="amount"
                        autoComplete="password"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField
                        name="rud"
                        value={formData.rud || selectedCustomerData.rud || book.rud || ''}
                        onChange={handleChange}
                        label="Rud"
                        id="rud"
                        size="small"
                        autoComplete="password"
                        variant="standard"
                        sx={{ m: 1, width: "60ch" }}
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="netamount1"
                        value={book.netamount1 || calculateTotalAmount2() || ''}
                        onChange={handleChange}
                        size="small"
                        label="Net Amount"
                        id="net-amount"
                        autoComplete="password"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faTags} />
                      </div>
                      <TextField
                        name="discount"
                        value={formData.discount || selectedCustomerData.discount || book.discount || ''}
                        onChange={handleChange}
                        label="Discount"
                        id="discount"
                        size="small"
                        autoComplete="password"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField size="small" variant="standard" />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="ons"
                        value={formData.ons || selectedCustomerData.ons || book.ons || ''}
                        onChange={handleChange}
                        size="small"
                        label="On"
                        autoComplete="password"
                        id="on"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input radio">
                      <FormControlLabel
                        name="manualbills"
                        value="manualbills"
                        control={<Checkbox size="small" />}
                        label="Manual Bills"
                        autoComplete="new-password"
                        onChange={handleChange}
                        checked={Boolean(formData.manualbills || selectedCustomerData?.manualbills || book.manualbills)}
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <AccountBalanceWalletIcon color="action" />
                      </div>
                      <TextField
                        name="balance"
                        value={formData.balance || selectedCustomerData.balance || book.balance || ''}
                        onChange={handleChange}
                        size="small"
                        autoComplete="password"
                        label="Balance"
                        id="balance"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <TextField size="small" variant="standard" autoComplete="password" />
                    </div>
                    <div className="input">
                      <div
                        className="icone"
                        style={{
                          padding: "0px 10px 0px 0px",
                          "font-size": "20px",
                        }}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </div>
                      <TextField size="small" variant="standard" autoComplete="password" />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={4} sx={{ p: 2 }}>
                <div className="Customer-Alert-Slider">
                  <div className="input-field">
                    <div className="input">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="FC">
                          <DatePicker
                            value={selectedCustomerDatas.fcdate || selectedCustomerData.fcdate ? dayjs(selectedCustomerData.fcdate) : null || book.fcdate ? dayjs(book.fcdate) : null}
                            onChange={(date) => handleDateChange(date, 'fcdate')}
                          >
                            {({ inputProps, inputRef }) => (
                              <TextField {...inputProps} inputRef={inputRef} autoComplete="password" value={selectedCustomerDatas.fcdate || selectedCustomerData?.fcdate} />
                            )}
                          </DatePicker>
                        </DemoItem>
                      </LocalizationProvider>
                    </div>
                    <div className="input">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Tax Date">
                          <DatePicker
                            value={selectedCustomerData.taxdate ? dayjs(selectedCustomerData.taxdate) : null || book.taxdate ? dayjs(book.taxdate) : null}
                            onChange={(date) => handleDateChange(date, 'taxdate')}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="taxdate"
                                autoComplete="password"
                                value={selectedCustomerData.taxdate || ''}
                                inputRef={params.inputRef}
                              />
                            )}
                          />
                        </DemoItem>
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Ins">
                          <DatePicker
                            value={selectedCustomerData.insdate ? dayjs(selectedCustomerData.insdate) : null || book.insdate ? dayjs(book.insdate) : null}
                            onChange={(date) => handleDateChange(date, 'insdate')}
                          >
                            {({ inputProps, inputRef }) => (
                              <TextField {...inputProps} inputRef={inputRef} autoComplete="password" value={selectedCustomerData?.insdate} />
                            )}
                          </DatePicker>
                        </DemoItem>
                      </LocalizationProvider>
                    </div>
                    <div className="input">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="St.Permit">
                          <DatePicker
                            value={selectedCustomerData.stpermit ? dayjs(selectedCustomerData.stpermit) : null || book.stpermit ? dayjs(book.stpermit) : null}
                            onChange={(date) => handleDateChange(date, 'stpermit')}
                          >
                            {({ inputProps, inputRef }) => (
                              <TextField {...inputProps} inputRef={inputRef} autoComplete="password" value={selectedCustomerData?.stpermit} />
                            )}
                          </DatePicker>
                        </DemoItem>
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <TextField
                        name="maintenancetype"
                        value={formData.maintenancetype || selectedCustomerData.maintenancetype || book.maintenancetype || ''}
                        onChange={handleChange}
                        label="Maintenance Type"
                        id="maintenance-type"
                        autoComplete="password"
                        size="small"
                        sx={{ m: 1, width: "60ch" }}
                      />
                    </div>
                    <div className="input">
                      <TextField
                        name="kilometer"
                        value={formData.kilometer || selectedCustomerData.kilometer || book.kilometer || ''}
                        onChange={handleChange}
                        size="small"
                        autoComplete="password"
                        label="Kilometer"
                        id="kilometer"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <TextField size="small" sx={{ m: 1, width: "60ch" }} autoComplete="password" />
                    </div>
                    <div className="input">
                      <TextField size="small" autoComplete="password" />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <TextField size="small" sx={{ m: 1, width: "60ch" }} autoComplete="password" />
                    </div>
                    <div className="input">
                      <TextField size="small" autoComplete="password" />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <TextField size="small" sx={{ m: 1, width: "60ch" }} autoComplete="password" />
                    </div>
                    <div className="input">
                      <TextField size="small" autoComplete="password" />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <TextField size="small" sx={{ m: 1, width: "60ch" }} autoComplete="password" />
                    </div>
                    <div className="input">
                      <TextField size="small" autoComplete="password" />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <div className="icone">
                        <EngineeringIcon color="action" />
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-demo"
                        freeSolo
                        sx={{ width: "20ch" }}
                        onChange={(event, value) => handleAutocompleteChange(event, value, "selects")}
                        value={Select.find((option) => option.optionvalue)?.label || formData.selects || selectedCustomerData.selects || book.selects || ''}
                        options={Select.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || formData.selects || selectedCustomerData.selects || book.selects || ''}
                        renderInput={(params) => {
                          params.inputProps.value = formData.selects || selectedCustomerData.selects || book.selects || ''
                          return (
                            <TextField {...params} label="Select" autoComplete="password" name="selects" inputRef={params.inputRef} />
                          )
                        }
                        }
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={5} sx={{ p: 2 }}>
                <div className="Customer-Gps-att-Slider">
                  <div className="input-field">
                    <div className="input">
                      <Button>View GPS TripSheet</Button>
                    </div>
                    <div className="input">
                      <Button onClick={handleTripmapClick}>View GPS Map</Button>
                    </div>
                    <Dialog open={mapimgpopupOpen} onClose={handleimgPopupClose}>
                      <DialogContent>
                        <img className='dialogboximg mapview' src={mapimageUrls} alt='imagess' />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleimgPopupClose} variant="contained" color="primary">
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <div className="input">
                      <Button onClick={handleTripmaplogClick}>View GPS Log</Button>
                    </div>
                    <Dialog open={maplogimgpopupOpen} onClose={handleimgPopupClose}>
                      <DialogContent>
                        <div className="table-customer-lists">
                          <DataGrid
                            rows={row}
                            columns={maplogcolumns}
                          />
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleimgPopupClose} variant="contained" color="primary">
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <div className="input">
                      <Button>View Closing</Button>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faFolderOpen} size="lg" />
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-demo"
                        freeSolo
                        sx={{ width: "20ch" }}
                        onChange={(event, value) => handleAutocompleteChange(event, value, "documenttype")}
                        value={DocumentType.find((option) => option.optionvalue)?.label || formData.documenttype || selectedCustomerData.documenttype || book.documenttype || ''}
                        options={DocumentType.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || formData.documenttype || selectedCustomerData.documenttype || book.documenttype || ''}
                        renderInput={(params) => {
                          return (
                            <TextField {...params} label="Document Type" autoComplete="password" name="documenttype" inputRef={params.inputRef} />
                          )
                        }
                        }
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faFileLines} size="lg" />
                      </div>
                      <TextField
                        name="on1"
                        value={selectedCustomerData.on1 || book.on1 || ''}
                        onChange={handleChange}
                        size="document-notes"
                        label="Document Notes"
                        autoComplete="password"
                        id="document-notes"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "220px" }}>
                      <Button variant="contained" onClick={handleUpload}>Select File & Upload</Button>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "400px" }}>
                      <div className="icone">
                        <MarkChatReadIcon color="action" />
                      </div>
                      <TextField
                        size="small"
                        sx={{ m: 1, width: "300ch" }}
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>
                    <div className="input">
                      <Button variant="outlined" onClick={handleRefresh}>Refresh</Button>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <Button onClick={handleButtonClick}>Manual Marking</Button>
                    </div>
                    <div className="input">
                      <Button>Delete GPS Log</Button>
                    </div>
                    <div className="input radio">
                      <FormControlLabel
                        name="reload"
                        value="reload"
                        control={<Checkbox size="small" />}
                        label="Reload"
                        autoComplete="new-password"
                        onChange={handleChange}
                        checked={Boolean(formData.reload || selectedCustomerData?.reload || book.reload)}
                      />
                    </div>
                  </div>
                  <div className="table-TripSheet">
                    <div style={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        onRowClick={handleTripRowClick}
                        pageSize={5}
                        checkboxSelection
                      />
                    </div>
                  </div>
                  <Dialog open={imgpopupOpen} onClose={handleimgPopupClose}>
                    <DialogContent>
                      {selectedRow && (
                        // <img className='dialogboximg' src={imageUrl} alt={selectedRow.name} />
                        <embed src={imageUrl} type="application/pdf" width="100%" height="600px" />
                      )}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleimgPopupClose} variant="contained" color="primary">
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </TabPanel>
              <TabPanel value={6} sx={{ p: 2 }}>
                <div className="Customer-Message-Slider">
                  <div className="input-field">
                    <div>
                      <Button onClick={generateLink}>Generate Link</Button>
                    </div>
                    {link && (
                      <div>
                        {isSignatureSubmitted ? (
                          <p>Signature already submitted. Cannot access this link.</p>
                        ) : (
                          <div>
                            <p>Copy this link to send to the passenger:</p>
                            <div>
                              <textarea readOnly style={{ width: '400px', height: '8  0px' }}>{link}</textarea>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripSheet;
