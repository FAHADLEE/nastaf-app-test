import React, { useEffect } from 'react';
import "./EmployeeCreation.css";
import Box from "@mui/material/Box";
import Input from '@mui/material/Input';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from "@mui/material/Autocomplete";
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import { StationName } from "./EmployeeCreationData";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

// FONTAWESOME
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingFlag } from "@fortawesome/free-solid-svg-icons";
import { faImagePortrait } from "@fortawesome/free-solid-svg-icons";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";

// REACT ICONS
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";

// ICONS
import BadgeIcon from "@mui/icons-material/Badge";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import useEmplyeecreation from './useEmplyeecreation';

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

const EmployeeCreation = () => {

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
    handleAutocompleteChange,
    showPasswords,
    handleClickShowPasswords,
    handleMouseDownPasswords,
    handleMouseDownPassword,
    showPassword,
    handleClickShowPassword,
    passwordsMatch,
    columns,
    isEditMode,
    handleEdit,
  } = useEmplyeecreation();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  return (
    <div className="EmployeeCreation-main">
      <div className="EmployeeCreation-form-container">
        <form onSubmit={handleClick}>
          <div className="EmployeeCreation-header">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="id"
                  label="ID"
                  name="userid"
                  value={selectedCustomerData?.userid || book.userid}
                  onChange={handleChange}
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <FontAwesomeIcon icon={faImagePortrait} size="lg" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="user-name"
                  label="User Mail-Id"
                  name="username"
                  value={selectedCustomerData?.username || book.username}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <FontAwesomeIcon icon={faBuildingFlag} size="lg" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-stationname"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "stationname")}
                  value={StationName.find((option) => option.Option)?.label || selectedCustomerData?.stationname || ''}
                  options={StationName.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || selectedCustomerData?.stationname || ''}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="Station Name" name="stationname" />
                    )
                  }
                  }
                />
              </div>
              <div className="input" style={{ width: "330px" }}>
                <div className="icone">
                  <ListAltIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="designation"
                  value={selectedCustomerData?.designation || book.designation}
                  onChange={handleChange}
                  label="Designation"
                  id="designation"
                  variant="standard"
                />
              </div>
              <div className="input" style={{ width: "330px" }}>
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="organizationname"
                  value={selectedCustomerData?.organizationname || book.organizationname}
                  onChange={handleChange}
                  label="Organization"
                  id="organizationname"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "240px" }}>
                <div className="icone">
                  <FontAwesomeIcon icon={faUnlockKeyhole} size="lg" />
                </div>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="userpassword"
                    value={selectedCustomerData?.userpassword || book.userpassword}
                    onChange={handleChange}
                    id="password"
                    type={showPasswords ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswords}
                          onMouseDown={handleMouseDownPasswords}
                        >
                          {showPasswords ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className="input" style={{ width: "240px" }}>
                <div className="icone">
                  <FontAwesomeIcon icon={faLock} size="lg" />
                </div>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                  <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                  <Input
                    name="userconfirmpassword"
                    value={selectedCustomerData?.userconfirmpassword || book.userconfirmpassword}
                    onChange={handleChange}
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="confirm-password"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Active
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="active"
                    onChange={handleChange}
                    value={selectedCustomerData?.active || book.active}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="input-field">
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
          {passwordsMatch &&
            <div className='alert-popup Warning' >
              <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
              <p>Passwords do not match. Please try again.</p>
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
          <div className="EmployeeCreation-table-container">
            <div className="table-EmployeeCreations">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeCreation;
