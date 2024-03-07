import React, { useState, useEffect } from 'react'
import jsPDF from 'jspdf';
import dayjs from "dayjs";
import { saveAs } from 'file-saver';
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';
import { TripType } from './TravelExpenseData';
import SpeedDial from "@mui/material/SpeedDial";
import { Menu, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


// ICONS
import { BiTrip } from "react-icons/bi";
import { MdContacts } from "react-icons/md";
import { ImPriceTags } from "react-icons/im";
import { ImLocation2 } from "react-icons/im";
import MapIcon from '@mui/icons-material/Map';
import { AiFillAppstore } from "react-icons/ai";
import { MdEditDocument } from "react-icons/md";
import ClearIcon from '@mui/icons-material/Clear';
import { BsFillFilePostFill } from "react-icons/bs";
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from "@mui/icons-material/Delete";
import { AiOutlineFileSearch } from "react-icons/ai";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ChecklistIcon from "@mui/icons-material/Checklist";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import RateReviewIcon from '@mui/icons-material/RateReview';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';


// TABLE
const columns = [
    { field: "id", headerName: "Sno", width: 50 },
    { field: "travelexpenseno   ", headerName: "TravelExpense No", width: 150 },
    { field: "travelexpensetype", headerName: "TravelExpense Type", width: 150 },
    { field: "travelexpensediscription", headerName: "Discription", width: 130 },
    { field: "triptype", headerName: "Trip Type", width: 150 },
    { field: "personname", headerName: "Person Name", width: 120 },
    { field: "totalmembers", headerName: "Total Members", width: 120 },
    { field: "contactno", headerName: "Contact No", width: 120 },
    { field: "email", headerName: "Email Id", width: 120 },
    { field: "fromlocation", headerName: "From Location", width: 120 },
    { field: "tolocation", headerName: "To Location", width: 120 },
    { field: "fromtraveldate", headerName: "From Travel Date", width: 130 },
    { field: "totraveldate", headerName: "To Travel Date", width: 120 },
    { field: "totaldays", headerName: "Total Days", width: 120 },
    { field: "foodexpense", headerName: "Food Expense", width: 120 },
    { field: "hotelrent", headerName: "Hotel Rent", width: 120 },
    { field: "medicalexpense", headerName: "Medical Expense", width: 120 },
    { field: "totalamount", headerName: "Total Amount", width: 120 },
    { field: "expensebills", headerName: "Expense Bills", width: 120 },
];

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
];

const TravelExpense = () => {

    const [infoMessage] = useState({});
    const [errorMessage] = useState({});
    const [warningMessage] = useState({});
    const [successMessage] = useState({});
    const [selectedCustomerData] = useState({});
    const [toDate, setToDate] = useState(dayjs());
    const [fromDate, setFromDate] = useState(dayjs());
    const [rows] = useState([]);
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [info, setInfo] = useState(false);
    const [success, setSuccess] = useState(false);


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
            row['descriptionoftheliability'],
            row['CreditorInformation'],
            row['PrincipalAmount'],
            row['ownerofOthers'],
            row['legaldocuments'],
            row['registrationlicense'],
            row['warrantyinformation'],
            row['maintenancerecordes'],
            row['TravelExpenseinformation'],
            row['invoicecopy']
        ]);
        pdf.autoTable({
            head: [['Sno', 'descriptionoftheliability', 'Payment Date', 'Bill Name', 'Payment Category', 'Amount']],
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
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);
    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [warning]);
    useEffect(() => {
        if (info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [info]);
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    return (
        <>
            <div className="Others-page-header">
                <div className="input-field">
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <BsFillFilePostFill style={{ fontSize: "27px" }} color="action" />
                        </div>
                        <TextField
                            size="small"
                            name="TravelExpenseNo"
                            label="TravelExpense No"
                            id="remark"
                        />
                    </div>
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <RateReviewIcon color="action" />
                        </div>
                        <TextField
                            size="small"
                            name="Vehicle Type"
                            label="Vehicle Type"
                            id="remark"
                        />
                    </div>
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <AiFillAppstore style={{ fontSize: "27px" }} color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="Discription"
                            label="Discription"
                            name="Discription"
                            autoFocus
                        />
                    </div>
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <BiTrip color="action" style={{ fontSize: "27px" }} />
                        </div>
                        <Autocomplete
                            fullWidth
                            id="free-solo-demo"
                            freeSolo
                            size="small"
                            value={TripType.map((option) => option.optionvalue)}
                            options={TripType.map((option) => ({
                                label: option.Option,
                            }))}
                            getOptionLabel={(option) => option.label || ""}
                            renderInput={(params) => (
                                <TextField {...params} label="Trip Type" />)}
                        />
                    </div>
                </div>
                <div className="input-field">
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <PersonIcon style={{ fontSize: "27px" }} color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="id"
                            label="Person Name"
                            name="PersonName"
                            autoFocus
                        />
                    </div>
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <GroupAddIcon color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="id"
                            label="Total Members"
                            name="TotalMembers"
                            autoFocus
                        />
                    </div>
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <MdContacts style={{ fontSize: "27px" }} color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="id"
                            label="Contact No"
                            name="contact"
                            autoFocus
                        />
                    </div>
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <AttachEmailIcon style={{ fontSize: "27px" }} color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="id"
                            label="Email ID"
                            name="emailid"
                            autoFocus
                        />
                    </div>
                </div>
                <div className="input-field">
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <ImLocation2 color="action" style={{ fontSize: "27px" }} />
                        </div>
                        <TextField
                            size="small"
                            id="Location"
                            label="From-Location"
                            name="Location"
                            autoComplete="new-password"
                            autoFocus
                        />
                    </div>
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <MapIcon color="action" style={{ fontSize: "27px" }} />
                        </div>
                        <TextField
                            size="small"
                            id="Location"
                            label="To-Location"
                            name="Location"
                            autoComplete="new-password"
                            autoFocus
                        />
                    </div>
                    <div className="input">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="From-Travel-Date"
                                value={selectedCustomerData.dateofacquisition ? dayjs(selectedCustomerData.startdate) : null}
                            >
                                {({ inputProps, inputRef }) => (
                                    <TextField  {...inputProps} inputRef={inputRef} value={selectedCustomerData?.dateofacquisition} />
                                )}
                            </DatePicker>
                        </LocalizationProvider>
                    </div>
                    <div className="input">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="To-Travel-Date"
                                value={selectedCustomerData.dateofacquisition ? dayjs(selectedCustomerData.startdate) : null}
                            >
                                {({ inputProps, inputRef }) => (
                                    <TextField  {...inputProps} inputRef={inputRef} value={selectedCustomerData?.dateofacquisition} />
                                )}
                            </DatePicker>
                        </LocalizationProvider>
                    </div>
                </div>
                <div className="input-field">
                    <div className="input" style={{ width: "220px" }}>
                        <div className="icone">
                            <CalendarMonthIcon color="action" />
                        </div>
                        <DemoItem>
                            <TextField
                                name="totaldays"
                                label="Total Days"
                                size="small"
                                type="number"
                                id="total-days"
                                variant="standard"
                            />
                        </DemoItem>
                    </div>
                    <div className="input" style={{ width: "210px" }}>
                        <div className="icone">
                            <FastfoodIcon color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="FoodExpense"
                            label="Food Expense"
                            name="FoodExpense"
                            autoFocus
                        />
                    </div>
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <HomeTwoToneIcon color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="HotelRoomExpense"
                            label="Hotel Room Expense"
                            name="HotelRoomExpense"
                            autoFocus
                        />
                    </div>
                    <div className="input" style={{ width: "210px" }}>
                        <div className="icone">
                            <VaccinesIcon color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="MedicalExpense"
                            label="Medical Expense"
                            name="MedicalExpense"
                            autoFocus
                        />
                    </div>
                </div>
                <div className="input-field">
                    <div className="input" style={{ width: "210px" }}>
                        <div className="icone">
                            <ImPriceTags style={{ fontSize: "27px" }} color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="TotalAmount"
                            label="Total Amount"
                            name="TotalAmount"
                            autoFocus
                        />
                    </div>
                    <div className="input">
                        <Button startIcon={<MdEditDocument />} color="primary" variant="contained" component="label">
                            Expense Bills
                            <input
                                type="file"
                                style={{ display: "none" }}
                            />
                        </Button>
                    </div>
                </div>
                <div className="input-field" style={{ justifyContent: 'center' }}>
                    <div className="input" style={{ width: "100px", marginTop: "30px" }}>
                        <Button variant="contained">Add</Button>
                    </div>
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
                            />
                        ))}
                    </StyledSpeedDial>
                </Box>
            </div>
            <div className="detail-container-main">
                <div className="container-left">
                    <div className="copy-title-btn-Others">
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
            <div className="table-bookingCopy-Others">
                <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                    />
                </div>
            </div>
        </>
    )
}

export default TravelExpense