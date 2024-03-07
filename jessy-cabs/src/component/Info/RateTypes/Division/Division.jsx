import React, { useEffect } from 'react';
import "./Division.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import { CustomerName } from "./DivisionData.js";
import Autocomplete from "@mui/material/Autocomplete";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, } from "@mui/material";

// ICONS
import ClearIcon from "@mui/icons-material/Clear";
import BadgeIcon from "@mui/icons-material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import useDivision from './useDivision.js';

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
// TABLE
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "DivisionName", headerName: "Division Name", width: 130 },
  { field: "customername", headerName: "Customer Name", width: 130 },
  { field: "active", headerName: "Active", width: 130 },
];

const Division = () => {

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
    isEditMode,
    handleEdit,
  } = useDivision();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  return (
    <div className="division-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-Division">
              <div className="input-field">
                <div className="input">
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="ID"
                    name="driverid"
                    autoComplete="new-password"
                    value={selectedCustomerData?.driverid || book.driverid}
                    onChange={handleChange}
                  />
                </div>
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <RateReviewIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="Division Name"
                    name="DivisionName"
                    autoComplete="new-password"
                    value={selectedCustomerData?.DivisionName || book.DivisionName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <WarehouseIcon color="action" />
                  </div>

                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-customername"
                    freeSolo
                    // sx={{ width: "20ch" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "customername")}
                    value={CustomerName.find((option) => option.optionvalue)?.label || selectedCustomerData?.customername || ''}
                    options={CustomerName.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || selectedCustomerData?.customername || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Customer Name" name="customername" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
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
                      autoComplete="new-password"
                      value={selectedCustomerData?.active || book.active}
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
                <div className="input" style={{ width: "100px" }}>
                  {isEditMode ? (
                    <Button variant="contained" onClick={handleEdit}>Edit</Button>
                  ) : (
                    <Button variant="contained" onClick={handleAdd} disabled={isFieldReadOnly("new")}>Add</Button>
                  )}
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
        <div className="table-bookingCopy-Division">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Division