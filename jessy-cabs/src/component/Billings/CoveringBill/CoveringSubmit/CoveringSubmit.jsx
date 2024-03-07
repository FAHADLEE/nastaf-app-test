import React, { useEffect } from 'react';
import "./CoveringSubmit.css";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { Menu, TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Stations } from "../../../Bookings/Receiveds/Pending/PendingData";

import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ClearIcon from '@mui/icons-material/Clear';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// ICONS
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useCoversubmit from './useCoversubmit';

const CoveringSubmit = () => {

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
        tripData,
        bankOptions,
        setCustomer,
        selectedCustomerDatas,
        fromDate,
        handleDateChange,
        setFromDate,
        toDate,
        setToDate,
        servicestation,
        handleserviceInputChange,
        handleExcelDownload,
        handlePdfDownload,
        handleShow,
        columns,
    } = useCoversubmit();

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    }, [actionName, handleClick]);

    return (
        <div className="CoveringSubmit-form Scroll-Style-hide">
            <form >
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-CoveringSubmit">
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
                                        value={customer || (tripData.length > 0 ? tripData[0].customer : '') || ''}
                                        options={bankOptions}
                                        onChange={(event, value) => setCustomer(value)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Organization" name='customer' inputRef={params.inputRef} />
                                            );
                                        }}
                                    />
                                </div>
                                <div className="input" >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                value={selectedCustomerDatas.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate || ''}
                                                format="DD/MM/YYYY"
                                                onChange={(date) => {
                                                    handleDateChange(date, 'fromdate');
                                                    const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                                    const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
                                                    setFromDate(parsedDate);
                                                }}
                                            >
                                                {({ inputProps, inputRef }) => (
                                                    <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerDatas?.fromdate} />
                                                )}
                                            </DatePicker>
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                <div className="input" >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                value={selectedCustomerDatas.todate ? dayjs(selectedCustomerDatas.todate) : toDate || ''}
                                                format="DD/MM/YYYY"
                                                onChange={(date) => {
                                                    handleDateChange(date, 'todate');
                                                    const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                                    const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
                                                    setToDate(parsedDate);
                                                }}
                                            >
                                                {({ inputProps, inputRef }) => (
                                                    <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerDatas?.todate} />
                                                )}
                                            </DatePicker>
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div className="input-field" >
                                <div className="input" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faBuilding} size="xl" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        id="free-solo-demo"
                                        freeSolo
                                        size="small"
                                        value={servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || ''}
                                        options={Stations.map((option) => ({
                                            label: option.optionvalue,
                                        }))}
                                        onChange={(event, value) => handleserviceInputChange(event, value)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Stations" name='station' inputRef={params.inputRef} />
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
                <div className="table-bookingCopy-CoveringSubmit">
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection
                        />
                    </div>
                </div>
            </form>
            {error &&
                <div className='alert-popup Error' >
                    <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
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

export default CoveringSubmit