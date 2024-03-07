import React, { useEffect } from 'react';
import "./TransferList.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { Autocomplete } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { Menu, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import { Stations } from "../../../Bookings/Receiveds/Pending/PendingData";

// ICONS
import { faBuilding, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useTransferlist from './useTransferlist';

// Assuming you have unique IDs in your data, you can set the `id` field dynamically

const TransferList = () => {

    const {
        rows,
        actionName,
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        handleClick,
        isFieldReadOnly,
        hidePopup,
        customer,
        bankOptions,
        setCustomer,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        selectedStatus,
        setSelectedStatus,
        servicestation,
        handleserviceInputChange,
        handleShow,
        handleExcelDownload,
        handlePdfDownload,
        columns,
        handleButtonClickTripsheet,

    } = useTransferlist();

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    }, [actionName, handleClick]);


    return (
        <div className="TransferList-form Scroll-Style-hide">
            <form >
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-TransferList">
                            <div className="input-field" style={{ justifyContent: 'center' }}>
                                <div className="input" style={{ width: "230px" }}>
                                    <div className="icone">
                                        <HailOutlinedIcon color="action" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        id="free-solo-demo"
                                        freeSolo
                                        size="small"
                                        value={customer}
                                        options={bankOptions}
                                        onChange={(event, value) => setCustomer(value)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Organization" inputRef={params.inputRef} />
                                            );
                                        }}
                                    />
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                                        <DatePicker
                                            label="From Date"
                                            format="DD/MM/YYYY"
                                            value={fromDate}
                                            onChange={(date) => setFromDate(date)}
                                        />
                                        <DatePicker
                                            label="To Date"
                                            format="DD/MM/YYYY"
                                            value={toDate}
                                            onChange={(date) => setToDate(date)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <div className="input">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faNewspaper} size="xl" />
                                    </div>
                                    <select name="status" className='input-select' value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                        <option value="" disabled>Select Status</option>
                                        <option value="all">All</option>
                                        <option value="billed">Billed</option>
                                        <option value="notbilled">Not Billed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faBuilding} size="xl" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        id="free-solo-demo"
                                        freeSolo
                                        size="small"
                                        value={servicestation}
                                        options={Stations.map((option) => ({
                                            label: option.optionvalue,
                                        }))}
                                        onChange={(event, value) => handleserviceInputChange(event, value)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Stations" inputRef={params.inputRef} />
                                            );
                                        }}
                                    />
                                </div>
                                <div className="input" style={{ width: "140px" }}>
                                    <Button variant="contained" onClick={handleShow} disabled={isFieldReadOnly("read")}>Search</Button>
                                </div>
                            </div>
                        </div>
                    </div>
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
                <div className="table-bookingCopy-TransferList">
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            onRowClick={(event) => handleButtonClickTripsheet(event.row)}
                            pageSize={5}
                            checkboxSelection
                            getRowId={(row) => row.id}
                            disableRowSelectionOnClick
                        />
                    </div>
                </div>
            </form>
            {error &&
                <div className='alert-popup Error'>
                    <div className="popup-icon"><ClearIcon style={{ color: '#fff' }} /> </div>
                    <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                    <p>{errorMessage}</p>
                </div>
            }
            {success &&
                <div className='alert-popup Success'>
                    <div className="popup-icon"><FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
                    <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                    <p>{successMessage}</p>
                </div>
            }
            {warning &&
                <div className='alert-popup Warning' >
                    <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
                    <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                    <p>{warningMessage}</p>
                </div>
            }
        </div>
    )
}

export default TransferList