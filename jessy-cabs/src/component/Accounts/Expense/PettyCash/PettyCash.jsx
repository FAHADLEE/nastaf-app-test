import React, { useState, useEffect, useCallback } from 'react';
import "./PettyCash.css";
import axios from "axios";
import jsPDF from 'jspdf';
import dayjs from "dayjs";
import { saveAs } from 'file-saver';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/material/styles";
import { Menu, TextField } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import { AiOutlineFileSearch } from "react-icons/ai";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ChecklistIcon from "@mui/icons-material/Checklist";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

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
    // { icon: <BookmarkAddedIcon />, name: "Add" },
];

// TABLE

const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "voucherno", headerName: "VoucherNo", width: 130 },
    { field: "date", headerName: "Payment Date", width: 130 },
    { field: "Billname", headerName: "Bill Name", width: 130 },
    { field: "PaymentCategory", headerName: "Payment Category", width: 150 },
    { field: "amount", headerName: "Amount", width: 130 },
];

const PettyCash = () => {
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [toDate, setToDate] = useState(dayjs());
    const [fromDate, setFromDate] = useState(dayjs());
    // const [errorMessage, setErrorMessage] = useState(false);
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [info, setInfo] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage] = useState({});

    const convertToCSV = (data) => {
        const header = columns.map((column) => column.headerName).join(",");
        const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
        return [header, ...rows].join("\n");
    };
    const handleExcelDownload = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "customer_details.csv");
    };
    const handlePdfDownload = () => {
        const pdf = new jsPDF();
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Customer Details", 10, 10);
        // Modify tableData to exclude the index number
        const tableData = rows.map((row) => [
            row['id'],
            row['voucherno'],
            row['printName'],
            row['Billname'],
            row['date'],
            row['PaymentCategory'],
            row['amount']
        ]);
        pdf.autoTable({
            head: [['Sno', 'VoucherNo', 'Payment Date', 'Bill Name', 'Payment Category', 'Amount']],
            body: tableData,
            startY: 20,
        });
        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'Customer_Details.pdf');
    };

    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setInfo(false);
        setWarning(false);
    };
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [error]);
    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [warning]);
    useEffect(() => {
        if (info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [info]);
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [success]);

    const [book, setBook] = useState({
        voucherno: '',
        Billname: '',
        date: '',
        PaymentCategory: '',
        amount: '',
    });
    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        if (type === 'checkbox') {
            // For checkboxes, update the state based on the checked value
            setBook((prevBook) => ({
                ...prevBook,
                [name]: checked,
            }));
            setSelectedCustomerData((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
        } else {
            // For other input fields, update the state based on the value
            setBook((prevBook) => ({
                ...prevBook,
                [name]: value,
            }));
            setSelectedCustomerData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    const handleDateChange = (date) => {
        const startOfDay = dayjs(date).startOf('day').format();
        setBook((prevBook) => ({
            ...prevBook,
            date: startOfDay,
        }));
    };
    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            voucherno: '',
            Billname: '',
            date: '',
            PaymentCategory: '',
            amount: '',
        }));
        setSelectedCustomerData({});
    };
    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
    }, []);


    const handleAdd = async () => {
        const Billname = book.Billname;
        if (!Billname) {
            setError(true);
            setErrorMessage("fill mantatory fields");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8081/pettycash', book);
            handleCancel(); // Assuming you have defined the handleCancel function to perform the necessary actions after the POST request is successful
            setSuccessMessage("Successfully Added");
        } catch (error) {
            setErrorMessage("Check your Network Connection");
        }
    };
    const handleClick = async (event, actionName, voucherno) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const response = await axios.get('http://localhost:8081/pettycash');
                const data = response.data;
                setRows(data);
                setSuccessMessage("Successfully listed");
            } else if (actionName === 'Cancel') {
                handleCancel();
            } else if (actionName === 'Delete') {
                await axios.delete(`http://localhost:8081/pettycash/${voucherno}`);
                setSelectedCustomerData(null);
                setSuccessMessage("Successfully Deleted");
                handleCancel();
            } else if (actionName === 'Edit') {
                const selectedCustomer = rows.find((row) => row.voucherno === voucherno);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                await axios.put(`http://localhost:8081/pettycash/${voucherno}`, updatedCustomer);
                handleCancel();
            }
        } catch {
            setError(true);
            setErrorMessage("Check Network Connection")
        }
    };
    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });

    return (
        <div className="PettyCash-form Scroll-Style-hide">
            <form onSubmit={handleClick}>
                <div className="PettyCash-page-header">
                    <div className="input-field">
                        <div className="input" style={{ width: "300px" }}>
                            <div className="icone">
                                <BadgeIcon color="action" />
                            </div>
                            <TextField
                                size="small"
                                id="voucher"
                                label="Voucher No"
                                name="voucherno"
                                autoComplete="new-password"
                                value={selectedCustomerData?.voucherno || book.voucherno}
                                onChange={handleChange}
                                autoFocus
                            />
                        </div>
                        <div className="input" style={{ width: "220px" }}>
                            <div className="icone">
                                <RateReviewIcon color="action" />
                            </div>
                            <TextField
                                size="small"
                                id="id"
                                label="Bill Name"
                                name="Billname"
                                autoComplete="new-password"
                                value={selectedCustomerData?.Billname || book.Billname}
                                onChange={handleChange}
                                autoFocus
                            />
                        </div>
                        <div className="input">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
                                    value={selectedCustomerData?.date ? dayjs(selectedCustomerData?.date) : null}
                                    onChange={handleDateChange}
                                >
                                    {({ inputProps, inputRef }) => (
                                        <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.date} />
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
                                label="Payment Category"
                                name="PaymentCategory"
                                autoComplete="new-password"
                                value={selectedCustomerData?.PaymentCategory || book.PaymentCategory}
                                onChange={handleChange}
                                autoFocus
                            />
                        </div>
                        <div className="input" style={{ width: "220px" }}>
                            <div className="icone">
                                <BadgeIcon color="action" />
                            </div>
                            <TextField
                                size="small"
                                id="amount"
                                label="Amount"
                                name="amount"
                                autoComplete="new-password"
                                value={selectedCustomerData?.amount || book.amount}
                                onChange={handleChange}
                                autoFocus
                            />
                        </div>
                        <div className="input" style={{ width: "100px" }}>
                            <Button variant="contained" onClick={handleAdd}>Add</Button>
                        </div>
                    </div>
                </div>
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-PettyCash">
                            <div className="input-field" style={{ justifyContent: 'center' }}>
                                <div className="input" style={{ width: "230px" }}>
                                    <div className="icone">
                                        <AiOutlineFileSearch color="action" style={{ fontSize: "27px" }} />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="id"
                                        label="Search"
                                        name="Search"
                                        autoFocus
                                    />
                                </div>
                                <div className="input">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="From Date"
                                            value={fromDate}
                                            onChange={(date) => setFromDate(date)}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="input">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="To Date"
                                            value={toDate}
                                            onChange={(date) => setToDate(date)}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="input" style={{ width: "140px" }}>
                                    <Button variant="contained">Search</Button>
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
                <div className="table-bookingCopy-PettyCash">
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

export default PettyCash