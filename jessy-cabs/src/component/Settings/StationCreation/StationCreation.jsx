import React, { useEffect } from 'react';
import "./StationCreation.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { faBuildingFlag } from "@fortawesome/free-solid-svg-icons";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import useStationCreation from './useStationCreation';

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

// TABLE START
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "stationid", headerName: "Station_Id", width: 130 },
  { field: "Stationname", headerName: "Station_Name", width: 130 },
  { field: "active", headerName: "Active", width: 160 },
  { field: "shortname", headerName: "Station", width: 130 },
  { field: "ownbranch", headerName: "Own_Branch", width: 130 },
];
// TABLE END
const actions = [
  { icon: <ChecklistIcon />, name: "List" },
  { icon: <CancelPresentationIcon />, name: "Cancel" },
  { icon: <DeleteIcon />, name: "Delete" },
  { icon: <ModeEditIcon />, name: "Edit" },
  { icon: <BookmarkAddedIcon />, name: "Add" },
];

const StationCreation = () => {
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
    isEditMode,
    handleEdit,
  } = useStationCreation();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  return (
    <div className="stationcreation-main">
      <div className="stationcreation-form-container">
        <form action="">
          <span className="Title-Name">Station Creation</span>
          <div className="stationcreation-header">
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
                  name="stationid"
                  value={selectedCustomerData?.stationid || book.stationid}
                  autoComplete="new-password"
                  onChange={handleChange}
                  variant="standard"
                />
              </div>
              <div className="input" style={{ width: "380px" }}>
                <div className="icone">
                  <FontAwesomeIcon icon={faBuildingFlag} size="lg" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="Station-name"
                  label="Station Name"
                  sx={{ m: 1, width: "200ch" }}
                  name="Stationname"
                  value={selectedCustomerData?.Stationname || book.Stationname}
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </div>
              <div className="input" style={{ width: "300px" }}>
                <div className="icone">
                  <ListAltIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="short-name"
                  label="Short Name"
                  sx={{ m: 1, width: "200ch" }}
                  name="shortname"
                  value={selectedCustomerData?.shortname || book.shortname}
                  autoComplete="new-password"
                  onChange={handleChange}
                />

              </div>
            </div>
            <div className="input-field">
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Active
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="active"
                    value={selectedCustomerData?.active || book.active}
                    autoComplete="new-password"
                    onChange={handleChange}
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
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Own Branch
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="ownbranch"
                    value={selectedCustomerData?.ownbranch || book.ownbranch}
                    autoComplete="new-password"
                    onChange={handleChange}
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
          <div className="stationcreation-table-container">
            <div className="table-stationcreation">
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

export default StationCreation;
