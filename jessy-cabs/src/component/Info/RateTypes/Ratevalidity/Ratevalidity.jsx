import React, { useEffect } from 'react';
import dayjs from "dayjs";
import "./Ratevalidity.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import RateReviewIcon from '@mui/icons-material/RateReview';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import useRatevalidity from './useRatevalidity';


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


const Ratevalidity = () => {

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
        columns,
        isEditMode,
        handleEdit,
    } = useRatevalidity();

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    }, [actionName, handleClick]);

    return (
        <div className="RateValidity-form Scroll-Style-hide">
            <form action="">
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-RateValidity">
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
                                <div className="input" style={{ width: "30%" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="From Date"
                                            format="DD/MM/YYYY"
                                            value={selectedCustomerData.fromdate ? dayjs(selectedCustomerData.fromdate) : null}
                                            onChange={(date) => handleDateChange(date, 'fromdate')}
                                        >
                                            {({ inputProps, inputRef }) => (
                                                <TextField {...inputProps} inputRef={inputRef} name='fromdate' value={selectedCustomerData.fromdate} />
                                            )}
                                        </DatePicker>
                                    </LocalizationProvider>
                                </div>
                                <div className="input" style={{ width: "30%" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="To Date"
                                            format="DD/MM/YYYY"
                                            value={selectedCustomerData.todate ? dayjs(selectedCustomerData.todate) : null}
                                            onChange={(date) => handleDateChange(date, 'todate')}
                                        >
                                            {({ inputProps, inputRef }) => (
                                                <TextField {...inputProps} inputRef={inputRef} name='todate' value={selectedCustomerData.todate} />
                                            )}
                                        </DatePicker>
                                    </LocalizationProvider>
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
                                        label="ReMarks"
                                        name="Remarks"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.Remarks || book.Remarks}
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
                <div className="table-bookingCopy-RateValidity">
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            onRowClick={handleRowClick}
                            pageSize={5}
                        />
                    </div>
                </div>
            </form >
        </div >
    )
}

export default Ratevalidity