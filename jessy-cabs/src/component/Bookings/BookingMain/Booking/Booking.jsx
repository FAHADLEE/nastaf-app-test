import React, { useEffect } from "react";
import "./Booking.css";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import {
  Duty,
  Hire,
  PayType,
  Report,
  VehicleModel,
  Service_Station,
} from "./Booking";
import {
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from "@mui/material";

// ICONS
import InfoIcon from "@mui/icons-material/Info";
import SellIcon from "@mui/icons-material/Sell";
import ClearIcon from "@mui/icons-material/Clear";

import QrCodeIcon from "@mui/icons-material/QrCode";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import { AiOutlineFileSearch } from "react-icons/ai";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import CommuteIcon from "@mui/icons-material/Commute";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";

import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import EngineeringIcon from "@mui/icons-material/Engineering";

import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LocationCityIcon from "@mui/icons-material/LocationCity";

import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import TaxiAlertTwoToneIcon from "@mui/icons-material/TaxiAlertTwoTone";
import AddIcCallTwoToneIcon from "@mui/icons-material/AddIcCallTwoTone";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import HomeRepairServiceTwoToneIcon from "@mui/icons-material/HomeRepairServiceTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import useBooking from "./useBooking";

//dialog box
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { APIURL } from "../../../url";

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

const Booking = () => {
  const apiUrl = APIURL;
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
    getCurrentTime,
    setBook,
    setSelectedCustomerData,
    setBookingTime,
    selectedCustomerDatas,
    handleKeyEnter,
    formValues,
    handleenterSearch,
    handleAutocompleteChange,
    setFormData,
    setStartTime,
    guestsms,
    setGuestSms,
    sendEmail,
    setSendEmail,
    displayCopy,
    lastBookingNo,
    currentYear,
    setTripTime,
    handleClickHide,
    actions,
    searchText,
    setSearchText,
    setreporttime,
    storedUsername,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleShowAll,
    popupOpen,
    handlePopupClose,
    handleExcelDownload,
    handlePdfDownload,
    reversedRows,
    columns,
    handletableClick,
    setFile,
    dialogOpen,
    handleCloseDialog,
    allFile,
    handleButtonClick,
    isEditMode,
    handleEdit,
    handleContextMenu,
    handleimagedelete,
    handleClosedeleteDialog,
    dialogdeleteOpen,
    handleprevent,
    setErrorMessage,
    setError,
  } = useBooking();

  useEffect(() => {
    if (actionName === "List") {
      handleClick(null, "List");
    }
  }, [actionName, handleClick]);

  return (
    <div className="booking-form Scroll-Style-hide">
      <form onSubmit={handleClick}>
        <div className="detail-container-main">
          <div className="container-left">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <SwitchAccountIcon color="action" />
                </div>
                <TextField
                  name="bookingno"
                  label="Booking"
                  id="standard-size-normal"
                  autoComplete="new-password"
                  value={
                    formData.bookingno ||
                    selectedCustomerData.bookingno ||
                    book.bookingno ||
                    ""
                  }
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  variant="standard"
                  autoFocus
                />
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Booking Date">
                    <DatePicker
                      value={
                        formData.bookingdate || selectedCustomerData.bookingdate
                          ? dayjs(selectedCustomerData.bookingdate)
                          : null || book.bookingdate
                          ? dayjs(book.bookingdate)
                          : dayjs()
                      }
                      format="DD/MM/YYYY"
                      onChange={(date) => handleDateChange(date, "bookingdate")}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField
                          {...inputProps}
                          inputRef={inputRef}
                          value={selectedCustomerData?.bookingdate}
                        />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input time" style={{ marginTop: "45px" }}>
                <label>Booking Time</label>
                <input
                  type="time"
                  value={
                    formData.bookingtime ||
                    selectedCustomerData.bookingtime ||
                    book.bookingtime ||
                    getCurrentTime() ||
                    ""
                  }
                  format="DD/MM/YYYY"
                  onChange={(event) => {
                    setBook({ ...book, bookingtime: event.target.value });
                    setSelectedCustomerData({
                      ...selectedCustomerData,
                      bookingtime: event.target.value,
                    });
                    setBookingTime(event.target.value);
                  }}
                  name="bookingtime"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Status
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="status"
                    autoComplete="new-password"
                    value={
                      formData.status ||
                      selectedCustomerData.status ||
                      book.status ||
                      ""
                    }
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="pending"
                      control={<Radio />}
                      label="Pending"
                    />
                    <FormControlLabel
                      value="cancelled"
                      control={<Radio />}
                      label="Cancelled"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="input">
                <div className="icone">
                  <SellIcon color="action" />
                </div>
                <TextField
                  name="tripid"
                  autoComplete="new-password"
                  value={
                    formData.tripid ||
                    selectedCustomerData.tripid ||
                    book.tripid ||
                    ""
                  }
                  onChange={handleChange}
                  label="Trip Id"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PermIdentityIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="customer"
                  label="Customer"
                  name="customer"
                  value={
                    formData.customer ||
                    selectedCustomerData.customer ||
                    selectedCustomerDatas.customer ||
                    book.customer ||
                    ""
                  }
                  onChange={handleChange}
                  onKeyDown={handleKeyEnter}
                  autoComplete="new-password"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <HomeRepairServiceTwoToneIcon color="action" />
                </div>
                <TextField
                  name="orderedby"
                  autoComplete="new-password"
                  value={
                    formData.orderedby ||
                    selectedCustomerData.orderedby ||
                    selectedCustomerDatas.name ||
                    book.orderedby ||
                    ""
                  }
                  onChange={handleChange}
                  label="Ordered by"
                  id="orderedby"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AddIcCallTwoToneIcon color="action" />
                </div>
                <TextField
                  name="mobile"
                  autoComplete="new-password"
                  value={
                    formData.mobile ||
                    selectedCustomerData.mobile ||
                    selectedCustomerDatas.phoneno ||
                    book.mobile ||
                    ""
                  }
                  onChange={handleChange}
                  label="Mobile No"
                  id="mobile"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AccountCircleTwoToneIcon color="action" />
                </div>
                <TextField
                  name="guestname"
                  autoComplete="new-password"
                  value={
                    formData.guestname ||
                    selectedCustomerData.guestname ||
                    book.guestname ||
                    formValues.guestname ||
                    ""
                  }
                  onChange={handleChange}
                  label="Guest Name"
                  id="guestname"
                  variant="standard"
                  required
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <ContactPhoneIcon color="action" />
                </div>
                <TextField
                  name="guestmobileno"
                  autoComplete="new-password"
                  value={
                    formData.guestmobileno ||
                    selectedCustomerData.guestmobileno ||
                    formValues.guestmobileno ||
                    book.guestmobileno ||
                    ""
                  }
                  onChange={handleChange}
                  label="Guest Mobile No"
                  id="guestmobileno"
                  variant="standard"
                />
              </div>
              <div className="input radio">
                <div className="icone">
                  <AttachEmailIcon color="action" />
                </div>
                <TextField
                  name="email"
                  autoComplete="new-password"
                  value={
                    formData.email ||
                    selectedCustomerData.email ||
                    formValues.email ||
                    book.email ||
                    ""
                  }
                  onChange={handleChange}
                  label="Email"
                  id="email"
                  variant="standard"
                />
              </div>
              <div className="input radio">
                <div className="icone">
                  <RateReviewIcon color="action" />
                </div>
                <TextField
                  name="employeeno"
                  autoComplete="new-password"
                  value={
                    formData.employeeno ||
                    selectedCustomerData.employeeno ||
                    book.employeeno ||
                    ""
                  }
                  onChange={handleChange}
                  label="Employee No"
                  id="employeeno"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AddHomeWorkIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="streetname"
                  label="No.Street Name"
                  name="address1"
                  autoComplete="new-password"
                  value={
                    formData.address1 ||
                    selectedCustomerData.address1 ||
                    book.address1 ||
                    ""
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <HomeTwoToneIcon color="action" />
                </div>
                <TextField
                  name="streetno"
                  autoComplete="new-password"
                  value={
                    formData.streetno ||
                    selectedCustomerData.streetno ||
                    book.streetno ||
                    ""
                  }
                  onChange={handleChange}
                  label="Address"
                  id="address"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <LocationCityIcon color="action" />
                </div>
                <TextField
                  name="city"
                  autoComplete="new-password"
                  value={
                    formData.city ||
                    selectedCustomerData.city ||
                    book.city ||
                    ""
                  }
                  onChange={handleChange}
                  label="City"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) =>
                    handleAutocompleteChange(event, value, "report")
                  }
                  value={
                    Report.find((option) => option.Option)?.label ||
                    formData.report ||
                    selectedCustomerData.report ||
                    book.report ||
                    ""
                  }
                  options={Report.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) =>
                    option.label ||
                    formData.report ||
                    selectedCustomerData.report ||
                    book.report ||
                    ""
                  }
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label="Report"
                        autoComplete="password"
                        name="report"
                        inputRef={params.inputRef}
                      />
                    );
                  }}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <TaxiAlertTwoToneIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) =>
                    handleAutocompleteChange(event, value, "vehType")
                  }
                  value={
                    VehicleModel.find((option) => option.carmodel)?.label ||
                    formData.vehType ||
                    selectedCustomerData.vehType ||
                    book.vehType ||
                    ""
                  }
                  options={VehicleModel.map((option) => ({
                    label: option.carmodel,
                  }))}
                  getOptionLabel={(option) =>
                    option.label ||
                    formData.vehType ||
                    selectedCustomerData.vehType ||
                    book.vehType ||
                    ""
                  }
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label="Vehicle Type"
                        name="vehType"
                        inputRef={params.inputRef}
                      />
                    );
                  }}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AccountBalanceWalletTwoToneIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) =>
                    handleAutocompleteChange(event, value, "paymenttype")
                  }
                  value={
                    PayType.find((option) => option.Option)?.label ||
                    formData.paymenttype ||
                    selectedCustomerData.paymenttype ||
                    book.paymenttype ||
                    ""
                  }
                  options={PayType.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) =>
                    option.label ||
                    formData.paymenttype ||
                    selectedCustomerData.paymenttype ||
                    book.paymenttype ||
                    ""
                  }
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label="Payment Type"
                        name="paymenttype"
                        inputRef={params.inputRef}
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Report Date"
                    value={
                      formData.startdate || selectedCustomerData.startdate
                        ? dayjs(selectedCustomerData.startdate)
                        : dayjs() || book.startdate
                        ? dayjs(book.startdate)
                        : dayjs()
                    }
                    format="DD/MM/YYYY"
                    onChange={(date) => handleDateChange(date, "startdate")}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField
                        {...inputProps}
                        inputRef={inputRef}
                        value={selectedCustomerData?.startdate}
                      />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              <div className="input time">
                <label>Start Time</label>
                <input
                  type="time"
                  value={
                    formData.starttime ||
                    selectedCustomerData.starttime ||
                    book.starttime ||
                    ""
                  }
                  onChange={(event) => {
                    setFormData({ ...formData, starttime: event.target.value });
                    setSelectedCustomerData({
                      ...selectedCustomerData,
                      starttime: event.target.value,
                    });
                    setBook({ ...book, starttime: event.target.value });
                    setStartTime(event.target.value);
                  }}
                  name="starttime"
                />
              </div>
              <div className="input time">
                <label>Report Time</label>
                <input
                  type="time"
                  name="reporttime"
                  value={
                    formData.reporttime ||
                    selectedCustomerData.reporttime ||
                    book.reporttime ||
                    ""
                  }
                  onChange={(event) => {
                    setBook({ ...book, reporttime: event.target.value });
                    setreporttime(event.target.value);
                    setFormData({
                      ...formData,
                      reporttime: event.target.value,
                    });
                    setSelectedCustomerData({
                      ...selectedCustomerData,
                      reporttime: event.target.value,
                    });
                  }}
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
                  onChange={(event, value) =>
                    handleAutocompleteChange(event, value, "duty")
                  }
                  value={
                    Duty.find((option) => option.Option)?.label ||
                    formData.duty ||
                    selectedCustomerData.duty ||
                    book.duty ||
                    ""
                  }
                  options={Duty.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) =>
                    option.label ||
                    formData.duty ||
                    selectedCustomerData.duty ||
                    book.duty ||
                    ""
                  }
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label="Duty"
                        name="duty"
                        inputRef={params.inputRef}
                      />
                    );
                  }}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <LocationCityIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="streetname"
                  label="PickUp"
                  name="pickup"
                  autoComplete="new-password"
                  value={
                    formData.pickup ||
                    selectedCustomerData.pickup ||
                    formValues.pickup ||
                    book.pickup ||
                    ""
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <QrCodeIcon color="action" />
                </div>
                <TextField
                  name="customercode"
                  autoComplete="new-password"
                  value={
                    formData.customercode ||
                    selectedCustomerData.customercode ||
                    book.customercode ||
                    ""
                  }
                  onChange={handleChange}
                  label="Customer code"
                  id="customercode"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AppRegistrationIcon color="action" />
                </div>
                <TextField
                  name="registerno"
                  autoComplete="new-password"
                  value={
                    formData.registerno ||
                    selectedCustomerData.registerno ||
                    book.registerno ||
                    ""
                  }
                  onChange={handleChange}
                  label="Request No"
                  id="registerno"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AirplaneTicketIcon color="action" />
                </div>
                <TextField
                  name="flightno"
                  autoComplete="new-password"
                  value={
                    formData.flightno ||
                    selectedCustomerData.flightno ||
                    book.flightno ||
                    ""
                  }
                  onChange={handleChange}
                  label="Flight No"
                  id="flight"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <ForwardToInboxIcon color="action" />
                </div>
                <TextField
                  name="orderbyemail"
                  autoComplete="new-password"
                  value={
                    formData.orderbyemail ||
                    selectedCustomerData.orderbyemail ||
                    selectedCustomerDatas.customeremail ||
                    book.orderbyemail ||
                    ""
                  }
                  onChange={handleChange}
                  label="Order By Email"
                  id="orederbyemail"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <FmdBadIcon color="action" />
                </div>
                <TextField
                  name="remarks"
                  autoComplete="new-password"
                  value={
                    formData.remarks ||
                    selectedCustomerData.remarks ||
                    book.remarks ||
                    ""
                  }
                  onChange={handleChange}
                  label="Remarks"
                  id="remarks"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <DomainAddIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) =>
                    handleAutocompleteChange(event, value, "servicestation")
                  }
                  value={
                    Service_Station.find((option) => option.optionvalue)
                      ?.label ||
                    formData.servicestation ||
                    selectedCustomerData.servicestation ||
                    book.servicestation ||
                    ""
                  }
                  options={Service_Station.map((option) => ({
                    label: option.optionvalue,
                  }))}
                  getOptionLabel={(option) =>
                    option.label ||
                    formData.servicestation ||
                    selectedCustomerData.servicestation ||
                    book.servicestation ||
                    ""
                  }
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label="Service Station"
                        name="servicestation"
                        inputRef={params.inputRef}
                      />
                    );
                  }}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <InfoIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="advance"
                  autoComplete="new-password"
                  value={
                    formData.advance ||
                    selectedCustomerData.advance ||
                    book.advance ||
                    ""
                  }
                  onChange={handleChange}
                  label="Advance"
                  id="advance"
                  sx={{ m: 1, width: "25ch" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="container-right">
            <div className="booking-update-main">
              <div className="booking-update">
                <div
                  className="Scroll-Style"
                  style={{ overflow: "scroll", height: "220px" }}
                >
                  <table>
                    <thead id="update-header">
                      <tr>
                        <th>Organization_Name</th>
                        <th>Organizer</th>
                        <th>Email_Id</th>
                        <th>Address</th>
                        <th>Phone_No</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.length === 0 ? (
                        <tr>
                          <td colSpan={6}>No data available.</td>
                        </tr>
                      ) : (
                        rows.map((row) => (
                          <tr
                            id="update-row"
                            key={row.id}
                            onClick={() => handleRowClick(row)}
                          >
                            <td>{row.customer}</td>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{row.address1}</td>
                            <td>{row.phoneno}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="inpu-field">
              <div className="input">
                {/* <FormControlLabel
                  value="guestsms"
                  control={
                    <Checkbox
                      size="small"
                      name="guestsms"
                      // checked={guestsms || formData.guestsms || book.guestsms}
                      checked={Boolean(guestsms || formData.guestsms || book.guestsms)}

                      onChange={(event) => {
                        setBook({ ...book, guestsms: event.target.checked });
                        setFormData({ ...formData, guestsms: event.target.checked });
                        setGuestSms(event.target.checked);
                      }}
                    />
                  }
                  label="Guest SMS"
                /> */}

                <FormControlLabel
                  value="guestsms"
                  control={
                    <Checkbox
                      size="small"
                      checked={guestsms}
                      onChange={(event) => setGuestSms(event.target.checked)}
                    />
                  }
                  label="Guest SMS"
                />

                {/* <FormControlLabel
                  value="bookingsms"
                  control={<Checkbox size="small" />}
                  label="Booking SMS"
                /> */}
                {/* <FormControlLabel
                  id="sendMailCheckbox"
                  value="sendemail"
                  control={
                    <Checkbox
                      size="small"
                      checked={Boolean(
                        sendEmail || formData.sendemail || book.sendemail
                      )}
                      onChange={(event) => {
                        setBook({ ...book, sendemail: event.target.checked });
                        setFormData({
                          ...formData,
                          sendemail: event.target.checked,
                        });
                        setSendEmail(event.target.checked);
                      }}
                    />
                  }
                  label="Send Email"
                /> */}

                <FormControlLabel
                  id="sendMailCheckbox"
                  value="sendemail"
                  control={
                    <Checkbox
                      size="small"
                      checked={sendEmail}
                      onChange={(event) => setSendEmail(event.target.checked)}
                    />
                  }
                  label="Send Email"
                />

              </div>
              <div className="input">
                <TextField
                  margin="normal"
                  size="small"
                  id="usage"
                  label="Usage"
                  name="useage"
                  autoComplete="new-password"
                  value={
                    formData.useage ||
                    selectedCustomerData.useage ||
                    formValues.useage ||
                    book.useage ||
                    ""
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <TextField
                  margin="normal"
                  size="small"
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="new-password"
                  value={
                    formData.username ||
                    selectedCustomerData.username ||
                    book.username ||
                    storedUsername ||
                    ""
                  }
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={`copy-item ${displayCopy ? "block" : "none"}`}>
              <div className="input-field">
                <div className="input" style={{ width: "300px" }}>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo"
                    value={currentYear}
                    options={[currentYear]}
                    renderInput={(params) => (
                      <TextField {...params} label="Fin Years" />
                    )}
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem label="Trip Date">
                      <DatePicker
                        value={book.tripdate ? dayjs(book.tripdate) : dayjs()}
                        onChange={(date) => handleDateChange(date, "tripdate")}
                        format="DD/MM/YYYY"
                      >
                        {({ inputProps, inputRef }) => (
                          <TextField
                            {...inputProps}
                            inputRef={inputRef}
                            value={selectedCustomerData?.tripdate}
                          />
                        )}
                      </DatePicker>
                    </DemoItem>
                  </LocalizationProvider>
                </div>
                <div className="input time">
                  <label>Trip Time</label>
                  <input
                    type="time"
                    name="triptime"
                    value={
                      formData.triptime ||
                      selectedCustomerData.triptime ||
                      book.triptime ||
                      ""
                    }
                    onChange={(event) => {
                      setBook({ ...book, triptime: event.target.value });
                      setTripTime(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input-btn">
                  <span onClick={handleClickHide} className="btn">
                    Hide
                  </span>
                  <span className="btn">Copy</span>
                </div>
              </div>
            </div>
            <div className="inpu-field">
              <div className="input radio"></div>
              <div className="input-field">
                <div className="input">
                  {formData.bookingno ||
                  selectedCustomerData.bookingno ||
                  book.bookingno ? (
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={isFieldReadOnly("new")}
                      component="label"
                    >
                      Attach File
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onClick={handleprevent}
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={isFieldReadOnly("new")}
                      onClick={() => {
                        setError(true);
                        setErrorMessage("Please Enter Booking No");
                      }}
                    >
                      Attach File
                    </Button>
                  )}
                </div>
                <div className="input">
                  <Button
                    variant="outlined"
                    onClick={handleButtonClick}
                    disabled={isFieldReadOnly("new")}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                onClick={(event) =>
                  handleClick(event, action.name, selectedCustomerId)
                }
              />
            ))}
          </StyledSpeedDial>
        </Box>
        <div className="vehicle-confirm">
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <AirportShuttleIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                size="small"
                id="free-solo-demo"
                freeSolo
                sx={{ width: "20ch" }}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "hireTypes")
                }
                value={
                  Hire.find((option) => option.Option)?.label ||
                  formData.hireTypes ||
                  selectedCustomerData.hireTypes ||
                  book.hireTypes ||
                  ""
                }
                options={Hire.map((option) => ({
                  label: option.Option,
                }))}
                getOptionLabel={(option) =>
                  option.label ||
                  formData.hireTypes ||
                  selectedCustomerData.hireTypes ||
                  book.hireTypes ||
                  ""
                }
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Hire Types"
                      name="hireTypes"
                      inputRef={params.inputRef}
                    />
                  );
                }}
              />
            </div>
            <div className="input">
              <div className="icone">
                <AltRouteIcon color="action" />
              </div>
              <TextField
                name="travelsname"
                autoComplete="new-password"
                value={
                  formData.travelsname ||
                  selectedCustomerData.travelsname ||
                  book.travelsname ||
                  ""
                }
                onChange={handleChange}
                label="Travels Name"
                id="travelsname"
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <CarCrashIcon color="action" />
              </div>
              <TextField
                name="vehRegNo"
                autoComplete="new-password"
                value={
                  formData.vehRegNo ||
                  selectedCustomerData.vehRegNo ||
                  book.vehRegNo ||
                  ""
                }
                onChange={handleChange}
                label="Vehicle Register No"
                id="vehRegNo"
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <CommuteIcon color="action" />
              </div>
              <TextField
                name="vehiclemodule"
                autoComplete="new-password"
                value={
                  formData.vehiclemodule ||
                  selectedCustomerData.vehiclemodule ||
                  book.vehiclemodule ||
                  ""
                }
                onChange={handleChange}
                label="Vehical Type"
                id="vehiclemodule"
                variant="standard"
                required
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <NoCrashIcon color="action" />
              </div>
              <TextField
                name="driverName"
                autoComplete="new-password"
                value={
                  formData.driverName ||
                  selectedCustomerData.driverName ||
                  book.driverName ||
                  ""
                }
                onChange={handleChange}
                label="Driver Name"
                id="drivername"
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <AddIcCallTwoToneIcon color="action" />
              </div>
              <TextField
                name="mobileNo"
                autoComplete="new-password"
                value={
                  formData.mobileNo ||
                  selectedCustomerData.mobileNo ||
                  book.mobileNo ||
                  ""
                }
                onChange={handleChange}
                label="Driver Phone"
                id="mobileNo"
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <AttachEmailIcon color="action" />
              </div>
              <TextField
                name="travelsemail"
                autoComplete="new-password"
                value={
                  formData.travelsemail ||
                  selectedCustomerData.travelsemail ||
                  book.travelsemail ||
                  ""
                }
                onChange={handleChange}
                label="Travels Email"
                id="travelsemail"
                variant="standard"
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <div className="input" style={{ width: "160px" }}>
                {isEditMode ? (
                  <Button variant="contained" onClick={handleEdit}>
                    Edit
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleAdd}
                    disabled={isFieldReadOnly("new")}
                  >
                    Add
                  </Button>
                )}
              </div>
            </div>
          </div>
          <Dialog open={popupOpen} onClose={handlePopupClose}>
            <DialogContent>
              Booking Number:
              <br /> <h1>{lastBookingNo}</h1>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handlePopupClose}
                variant="contained"
                color="primary"
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
          {error && (
            <div className="alert-popup Error">
              <div className="popup-icon">
                {" "}
                <ClearIcon style={{ color: "#fff" }} />{" "}
              </div>
              <span className="cancel-btn" onClick={hidePopup}>
                <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
              </span>
              <p>{errorMessage}</p>
            </div>
          )}
          {warning && (
            <div className="alert-popup Warning">
              <div className="popup-icon">
                {" "}
                <ErrorOutlineIcon style={{ color: "#fff" }} />{" "}
              </div>
              <span className="cancel-btn" onClick={hidePopup}>
                <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
              </span>
              <p>{warningMessage}</p>
            </div>
          )}
          {info && (
            <div className="alert-popup Info">
              <div className="popup-icon">
                {" "}
                <BsInfo style={{ color: "#fff" }} />{" "}
              </div>
              <span className="cancel-btn" onClick={hidePopup}>
                <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
              </span>
              <p>{infoMessage}</p>
            </div>
          )}
          {success && (
            <div className="alert-popup Success">
              <div className="popup-icon">
                {" "}
                <FileDownloadDoneIcon style={{ color: "#fff" }} />{" "}
              </div>
              <span className="cancel-btn" onClick={hidePopup}>
                <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
              </span>
              <p>{successMessage}</p>
            </div>
          )}
        </div>
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-Booking">
              <div className="input-field" style={{ justifyContent: "center" }}>
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <AiOutlineFileSearch
                      color="action"
                      style={{ fontSize: "27px" }}
                    />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="Search"
                    name="searchText"
                    value={searchText || ""}
                    onKeyDown={handleenterSearch}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="From Date"
                      name="fromDate"
                      format="DD/MM/YYYY"
                      value={fromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="To Date"
                      name="toDate"
                      format="DD/MM/YYYY"
                      value={toDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "140px" }}>
                  <Button variant="contained" onClick={handleShowAll}>
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Download-btn">
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button
                  variant="contained"
                  endIcon={<ExpandCircleDownOutlinedIcon />}
                  {...bindTrigger(popupState)}
                >
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
        <div className="table-bookingCopy-Booking">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={reversedRows}
              columns={columns}
              onRowClick={handletableClick}
              pageSize={5}
              checkboxSelection
            />
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
              <DialogContent>
                <div style={{ position: "relative" }}>
                  {Array.isArray(allFile) &&
                    allFile.map((img, index) => (
                      <div key={index} style={{ position: "relative" }}>
                        <embed
                          src={`http://${apiUrl}/images/` + img.fileName}
                          type="application/pdf"
                          width="100%"
                          height="600px"
                        />
                        <button
                          onClick={() => handleimagedelete(img.fileName)}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            opacity: 0,
                          }}
                        />
                      </div>
                    ))}
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={dialogdeleteOpen} onClose={handleClosedeleteDialog}>
              <DialogContent>
                <div>
                  <h3>are you sure you want to delete</h3>
                  <div>
                    <Button onClick={handleContextMenu}>yes</Button>
                    <Button onClick={handleClosedeleteDialog}>No</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Booking;
