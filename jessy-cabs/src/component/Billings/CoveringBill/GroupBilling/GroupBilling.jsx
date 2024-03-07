import React, { useEffect } from 'react';
import dayjs from "dayjs";
import "./GroupBilling.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { Autocomplete } from "@mui/material";
import { Menu, TextField } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { Stations } from "../../../Bookings/Receiveds/Pending/PendingData";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


// ICONS
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { faBuilding, faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useGroupbilling from './useGroupbilling';


const GroupBilling = () => {

    const {
        rows,
        actionName,
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        book,
        handleClick,
        handleChange,
        isFieldReadOnly,
        hidePopup,
        invoiceno,
        selectedCustomerDatas,
        handleKeyenter,
        customer,
        tripData,
        bankOptions,
        setCustomer,
        Billingdate,
        fromDate,
        handleDateChange,
        setFromDate,
        toDate,
        setToDate,
        servicestation,
        handleserviceInputChange,
        handleShow,
        handleExcelDownload,
        handleCoverPDFDownload,
        columns

    } = useGroupbilling();

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    }, [actionName, handleClick]);

    return (
        <div className="GroupBilling-form Scroll-Style-hide">
            <form >
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-GroupBilling">
                            <div className="input-field" >
                                <div className="input" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="id"
                                        label="Invoice No"
                                        name="invoiceno"
                                        value={invoiceno || book.invoiceno || selectedCustomerDatas.invoiceno || ''}
                                        onChange={handleChange}
                                        autoComplete='off'
                                        onKeyDown={handleKeyenter}
                                    />
                                </div>
                                <div className="input" style={{ width: "230px" }}>
                                    <div className="icone">
                                        <HailOutlinedIcon color="action" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        id="free-solo-demo"
                                        freeSolo
                                        size="small"
                                        value={customer || selectedCustomerDatas.customer || (tripData.length > 0 ? tripData[0].customer : '') || ''}
                                        options={bankOptions}
                                        onChange={(event, value) => setCustomer(value)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Organization" name='customer' inputRef={params.inputRef} />
                                            );
                                        }}
                                    />
                                </div>
                                <div className="input">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Bill Date"
                                                name="Billingdate"
                                                value={Billingdate || selectedCustomerDatas?.Billingdate ? dayjs(selectedCustomerDatas?.Billingdate) : null}
                                                format="DD/MM/YYYY"
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div className="input-field">
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
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "140px" }}>
                                    <Button variant="contained" onClick={handleShow} disabled={isFieldReadOnly("read")}>View Bill</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="download-container">
                    <div className="Download-btn">
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                                        Download
                                    </Button>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={handleExcelDownload}>Excel</MenuItem>
                                        <MenuItem onClick={handleCoverPDFDownload}>GST PDF</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "140px" }}>
                            <Button variant="contained">Delete Invoice</Button>
                        </div>
                        <div className="input" >
                            <Button variant="contained">Delete Selected Bill</Button>
                        </div>
                    </div>
                </div>

                <div className="table-bookingCopy-GroupBilling">
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </div>
                    {error &&
                        <div className='alert-popup Error' >
                            <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                            <p>{errorMessage}</p>
                        </div>
                    }
                    {success &&
                        <div className='alert-popup Success' >
                            <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
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
            </form>
        </div>
    )
}

export default GroupBilling