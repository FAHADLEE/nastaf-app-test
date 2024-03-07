import React, { useEffect } from 'react';
import 'jspdf-autotable';
import dayjs from "dayjs";
import "./Accountinfo.css";
import Box from "@mui/material/Box";
import Menu from '@mui/material/Menu';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

// ICONS
import StoreIcon from "@mui/icons-material/Store";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Undergroup, Vehicleinfo } from "./Accountinfo";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import InputAdornment from "@mui/material/InputAdornment";
import ChecklistIcon from "@mui/icons-material/Checklist";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import RateReviewIcon from "@mui/icons-material/RateReview";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useAccountinfo from './useAccountinfo';

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
const Accuntinfo = () => {

  const {
    selectedCustomerData,
    selectedCustomerId,
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
    handleAutocompleteChange,
    handleExcelDownload,
    handlePdfDownload,
    rows,
    columns,
    isEditMode,
    handleEdit,
  } = useAccountinfo();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  return (
    <div className="account-form">
      <form onSubmit={handleClick}>
        <div className="detail-container-main-account">
          <div className="container-left-account">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <SwitchAccountIcon color="action" />
                </div>
                <TextField
                  name="accountNo"
                  label="Account No"
                  margin="normal"
                  size="small"
                  id="standard-size-normal"
                  autoComplete="new-password"
                  value={selectedCustomerData?.accountNo || book.accountNo}
                  onChange={handleChange}
                  variant="standard"
                />
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    value={selectedCustomerData.Accdate ? dayjs(selectedCustomerData.Accdate) : null || book.Accdate ? dayjs(book.Accdate) : null}
                    format="DD/MM/YYYY"
                    onChange={(date) => handleDateChange(date, 'Accdate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.Accdate} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              <div className="input">
                <div className="icone">
                  <MinorCrashIcon color="action" />
                </div>
                <TextField
                  name="vehicleTravels"
                  autoComplete="new-password"
                  value={selectedCustomerData?.vehicleTravels || book.vehicleTravels}
                  onChange={handleChange}
                  label="Vehicle/Travels"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <ContactPhoneIcon color="action" />
                </div>
                <TextField
                  name="phone"
                  autoComplete="new-password"
                  value={selectedCustomerData?.phone || book.phone}
                  onChange={handleChange}
                  label="Phone"
                  id="phone"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "415px" }}>
                <div className="icone">
                  <AddHomeWorkIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="address1"
                  autoComplete="new-password"
                  value={selectedCustomerData?.address1 || book.address1}
                  onChange={handleChange}
                  label="Address"
                  id="remark"
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PermIdentityIcon color="action" />
                </div>
                <TextField
                  name="cperson"
                  autoComplete="new-password"
                  value={selectedCustomerData?.cperson || book.cperson}
                  onChange={handleChange}
                  label="C Person"
                  id="cperson"
                  variant="standard"
                />
              </div>
              <div className="input radio">
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-vehicleInfo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "underGroup")}
                  value={Undergroup.find((option) => option.Option)?.label || selectedCustomerData?.underGroup || ''}
                  options={Undergroup.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || selectedCustomerData?.underGroup || ''}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="Under Group" name="underGroup" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "415px" }}>
                <div className="icone">
                  <HomeTwoToneIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="streetNo"
                  autoComplete="new-password"
                  value={selectedCustomerData?.streetNo || book.streetNo}
                  onChange={handleChange}
                  id="remark"
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AttachEmailIcon color="action" />
                </div>
                <TextField
                  name="email"
                  autoComplete="new-password"
                  value={selectedCustomerData?.email || book.email}
                  onChange={handleChange}
                  label="Email"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <TextField
                  type="number"
                  name='vehCommission'
                  autoComplete="new-password"
                  value={selectedCustomerData?.vehCommission || book.vehCommission}
                  onChange={handleChange}
                  label="Veh.Commission"
                  size="small"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "25ch" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "415px" }}>
                <div className="icone">
                  <LocationCityIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="city"
                  autoComplete="new-password"
                  value={selectedCustomerData?.city || book.city}
                  onChange={handleChange}
                  id="address3"
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                />
              </div>
              <div className="input radio">
                <div className="icone">
                  <StoreIcon color="action" />
                </div>
                <TextField
                  name="entity"
                  autoComplete="new-password"
                  value={selectedCustomerData?.entity || book.entity}
                  onChange={handleChange}
                  label="Opening Balance"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-vehicleInfo"
                  freeSolo
                  sx={{ m: 1, width: "25ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "vehicleInfo")}
                  value={Vehicleinfo.find((option) => option.Option)?.label || selectedCustomerData?.vehicleInfo || ''}
                  options={Vehicleinfo.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || selectedCustomerData?.vehicleInfo || ''}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="Vehicle Info" name="vehicleInfo" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="input-field">
          <div className="input">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Is Runing
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="isRunning"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.isRunning || book.isRunning}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="input radio">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                A/C Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="acType"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.acType || book.acType}
              >
                <FormControlLabel value="Dr" control={<Radio />} label="Dr" />
                <FormControlLabel value="Cr" control={<Radio />} label="Cr" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="input">
            <div className="icone">
              <RateReviewIcon color="action" />
            </div>
            <TextField
              name="rateType"
              autoComplete="new-password"
              value={selectedCustomerData?.rateType || book.rateType}
              onChange={handleChange}
              label="Rate Type"
              id="standard-size-normal"
              variant="standard"
            />
          </div>
          <div className="input" style={{ width: "160px" }}>
            {isEditMode ? (
              <Button variant="contained" onClick={handleEdit}>Edit</Button>
            ) : (
              <Button variant="contained" onClick={handleAdd} disabled={isFieldReadOnly("new")}>Add</Button>
            )}
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
        <div className="SpeedDial" style={{ "paddingTop": "96px" }}>
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
        <div className="table-customer-lists">
          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={handleRowClick}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </form>
    </div>
  );
};

export default Accuntinfo;
