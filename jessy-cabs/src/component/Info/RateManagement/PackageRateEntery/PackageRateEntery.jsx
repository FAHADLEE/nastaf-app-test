import React, { useEffect } from 'react';
import "./PackageRateEntery.css";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import { RateType, PriceTag, VehicleType, Duty } from "./PackageRateEnteryData.js";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CarCrashIcon from '@mui/icons-material/CarCrash';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ChecklistIcon from "@mui/icons-material/Checklist";
import RateReviewIcon from '@mui/icons-material/RateReview';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import TypeSpecimenOutlinedIcon from '@mui/icons-material/TypeSpecimenOutlined';
import usePackagerateentry from './usePackagerateentry.js';

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

const PackageRateEntery = () => {

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
    columns,
    isEditMode,
    handleEdit,
  } = usePackagerateentry();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  return (
    <div className="PackageRateEntery-form Scroll-Style-hide">
      <form action="">
        <div className="PackageRateEntery-container-main">
          <div className="container-left">
            <div className="copy-title-btn-PackageRateEntery">
              <div className="input-field">
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <TypeSpecimenOutlinedIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-ratetype"
                    freeSolo
                    onChange={(event, value) => handleAutocompleteChange(event, value, "ratetype")}
                    value={RateType.find((option) => option.optionvalue)?.label || selectedCustomerData?.ratetype || ''}
                    options={RateType.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || selectedCustomerData?.ratetype || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="RateType" name="ratetype" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <LocalOfferOutlinedIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-pricetag"
                    freeSolo
                    sx={{ width: "20ch" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "pricetag")}
                    value={PriceTag.find((option) => option.optionvalue)?.label || selectedCustomerData?.pricetag || ''}
                    options={PriceTag.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || selectedCustomerData?.pricetag || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="PriceTag" name="pricetag" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input">
                  <TextField
                    size="small"
                    id="id"
                    sx={{ width: "300px" }}
                    label="Package"
                    name="package"
                    autoComplete="new-password"
                    value={selectedCustomerData?.package || book.package}
                    onChange={handleChange}
                    variant="standard"
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <RateReviewIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    sx={{ width: "300px" }}
                    label="Validity"
                    name="Validity"
                    autoComplete="new-password"
                    value={selectedCustomerData?.Validity || book.Validity}
                    onChange={handleChange}
                    variant="standard"
                  />
                </div>
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <CarCrashIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-vehicleType"
                    freeSolo
                    sx={{ width: "20ch" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "vehicleType")}
                    value={VehicleType.find((option) => option.optionvalue)?.label || selectedCustomerData?.vehicleType || ''}
                    options={VehicleType.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || selectedCustomerData?.vehicleType || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="VehicleType" name="vehicleType" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='PackageRateEntery-container-bottom'>
          <div className="input-field">
            <div className="input" style={{ width: "200px" }}>
              <div className="icone">
                <EngineeringIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                size="small"
                id="free-solo-demo-duty"
                freeSolo
                sx={{ width: "20ch" }}
                onChange={(event, value) => handleAutocompleteChange(event, value, "duty")}
                value={Duty.find((option) => option.optionvalue)?.label || selectedCustomerData?.duty || ''}
                options={Duty.map((option) => ({
                  label: option.option,
                }))}
                getOptionLabel={(option) => option.label || selectedCustomerData?.duty || ''}
                renderInput={(params) => {
                  return (
                    <TextField {...params} label="Duty" name="duty" inputRef={params.inputRef} />
                  )
                }
                }
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="Hours"
                name="Hours"
                autoComplete="new-password"
                value={selectedCustomerData?.Hours || book.Hours}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="KMS"
                name="KMS"
                autoComplete="new-password"
                value={selectedCustomerData?.KMS || book.KMS}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="Rate"
                name="Rate"
                autoComplete="new-password"
                value={selectedCustomerData?.Rate || book.Rate}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="PerHour"
                name="PerHour"
                autoComplete="new-password"
                value={selectedCustomerData?.PerHour || book.PerHour}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="PerKMS"
                name="PerKMS"
                autoComplete="new-password"
                value={selectedCustomerData?.PerKMS || book.PerKMS}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "110px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="extraHours"
                name="extraHours"
                autoComplete="new-password"
                value={selectedCustomerData?.extraHours || book.extraHours}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="extraKMS"
                name="extraKMS"
                autoComplete="new-password"
                value={selectedCustomerData?.extraKMS || book.extraKMS}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="chtime"
                label="ChTime"
                name="chtime"
                autoComplete="new-password"
                value={selectedCustomerData?.chtime || book.chtime}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "110px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="UptoHours"
                name="UptoHours"
                autoComplete="new-password"
                value={selectedCustomerData?.UptoHours || book.UptoHours}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="A.KMS"
                name="AKMS"
                autoComplete="new-password"
                value={selectedCustomerData?.AKMS || book.AKMS}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="N.Halt"
                name="NHalt"
                autoComplete="new-password"
                value={selectedCustomerData?.NHalt || book.NHalt}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="Bata"
                name="Bata"
                autoComplete="new-password"
                value={selectedCustomerData?.Bata || book.Bata}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="ChKMS"
                name="ChKMS"
                autoComplete="new-password"
                value={selectedCustomerData?.ChKMS || book.ChKMS}
                onChange={handleChange}
              />
            </div>

            <div className="input" style={{ width: "100px" }}>
              {isEditMode ? (
                <Button variant="contained" onClick={handleEdit}>Edit</Button>
              ) : (
                <Button variant="contained" onClick={handleAdd} disabled={isFieldReadOnly("new")}>Save</Button>
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
        <div className="table-bookingCopy-PackageRateEntery">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick}
              pageSize={5}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default PackageRateEntery