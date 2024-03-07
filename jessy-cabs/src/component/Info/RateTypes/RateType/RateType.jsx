import React, { useEffect } from 'react';
import "./RateType.css";
import "jspdf-autotable";

import Box from "@mui/material/Box";
import Menu from '@mui/material/Menu';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Stations } from "./RateTypeData.js";
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ChecklistIcon from "@mui/icons-material/Checklist";
import RateReviewIcon from '@mui/icons-material/RateReview';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, } from "@mui/material";
import useRatype from './useRatype.js';

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

const RateType = () => {

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
        formData,
        setBook,
        setStartTime,
        setCloseTime,
        handleExcelDownload,
        handlePdfDownload,
        columns,
        isEditMode,
        handleEdit,
    } = useRatype();

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    }, [actionName, handleClick]);

    return (
        <div className="ratetype-form Scroll-Style-hide">
            <form onSubmit={handleClick}>
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-RateType">
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
                                        <WarehouseIcon color="action" />
                                    </div>

                                    <Autocomplete
                                        fullWidth
                                        size="small"
                                        id="free-solo-demo-customerType"
                                        freeSolo
                                        onChange={(event, value) => handleAutocompleteChange(event, value, "stations")}
                                        value={Stations.find((option) => option.Option)?.label || selectedCustomerData?.stations || ''}
                                        options={Stations.map((option) => ({
                                            label: option.Option,
                                        }))}
                                        getOptionLabel={(option) => option.label || selectedCustomerData?.stations || ''}
                                        renderInput={(params) => {
                                            return (
                                                <TextField   {...params} label="Stations" name="stations" inputRef={params.inputRef} />
                                            )
                                        }
                                        }
                                    />
                                </div>
                                <div className="input">
                                    <div className="icone">
                                        <RateReviewIcon color="action" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="id"
                                        label="Rate Name"
                                        name="ratename"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.ratename || book.ratename}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "300px" }}>
                                    <div className="icone">
                                        <FactCheckIcon color="action" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="id"
                                        label="Validity"
                                        name="validity"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.validity || book.validity}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input radio" style={{ width: "120px" }}>
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
                                <div className="input times">
                                    <label>Start Time</label>
                                    <input
                                        type="time"
                                        value={formData.starttime || selectedCustomerData.starttime || book.starttime}
                                        onChange={(event) => {
                                            setBook({ ...book, starttime: event.target.value });
                                            setStartTime(event.target.value);
                                        }}
                                        name="starttime"
                                    />
                                </div>
                                <div className="input times">
                                    <label>Close Time</label>
                                    <input
                                        type="time"
                                        value={formData.closetime || selectedCustomerData.closetime || book.closetime}
                                        onChange={(event) => {
                                            setBook({ ...book, closetime: event.target.value });
                                            setCloseTime(event.target.value);
                                        }}
                                        name="closetime"
                                    />
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
                <div className="table-bookingCopy-RateType">
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

export default RateType