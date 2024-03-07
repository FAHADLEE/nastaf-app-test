import React, { useState, useEffect } from 'react'
import jsPDF from 'jspdf';
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { saveAs } from 'file-saver';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


// ICONS
import { ImPriceTags } from "react-icons/im";
import { ImLocation2 } from "react-icons/im";
import { Menu, TextField } from "@mui/material";
import { AiFillAppstore } from "react-icons/ai";
import { MdEditDocument } from "react-icons/md";
import { HiDocumentText } from "react-icons/hi";
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import { AiOutlineFileSearch } from "react-icons/ai";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

// TABLE
const columns = [
    { field: "id", headerName: "Sno", width: 50 },
    { field: "rentdescription", headerName: "Rent Description", width: 130 },
    { field: "advanceamount", headerName: "Advance Amount", width: 130 },
    { field: "monthlyrent", headerName: "Monthly Rent", width: 130 },
    { field: "rentdate", headerName: "Rent Date", width: 120 },
    { field: "address", headerName: "Address", width: 140 },
    { field: "termsandconditions", headerName: "Terms/Conditions", width: 130 },
    { field: "repaymentshedule", headerName: "Repayment Shedule", width: 140 },
    { field: "outstandingbalance", headerName: "Outstanding Balance", width: 150 },
    { field: "agreementcopy", headerName: "Agreement Copy", width: 130 },
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
    // { icon: <BookmarkAddedIcon />, name: "Add" },
];

const PropetiesRent = () => {

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
            row['insuranceinformation'],
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
                            <BadgeIcon color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="RentDescription"
                            label="Rent Description"
                            name="RentDescription"
                            autoComplete="new-password"
                            autoFocus
                        />
                    </div>
                    <div className="input" style={{ width: "210px" }}>
                        <div className="icone">
                            <RateReviewIcon color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="id"
                            label="Advance Amount"
                            name="AdvanceAmount"
                            autoFocus
                        />
                    </div>
                    <div className="input">
                        <div className="icone">
                            <ImPriceTags style={{ fontSize: "25px" }} color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="id"
                            label="Monthly Rent"
                            name="MonthlyRent"
                            autoFocus
                        />
                    </div>
                    <div className="input">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Rent Date"
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
                    <div className="input" style={{ width: "400px" }}>
                        <div className="icone">
                            <AddHomeWorkIcon color="action" />
                        </div>
                        <TextField
                            size="small"
                            name="address1"
                            label="Address"
                            id="remark"
                            sx={{ m: 1, width: "200ch" }}
                            variant="standard"
                        />
                    </div>
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <AiFillAppstore style={{ fontSize: "25px" }} color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="id"
                            label="Terms and Conditions"
                            name="Othersdescription"
                            autoComplete="new-password"
                            autoFocus
                        />
                    </div>
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <HiDocumentText style={{ fontSize: "25px" }} color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="id"
                            label="Repayment Schedule"
                            name="legaldocuments"
                            autoFocus
                        />
                    </div>
                </div>
                <div className="input-field">
                    <div className="input" style={{ width: "400px" }}>
                        <div className="icone">
                            <HomeTwoToneIcon color="action" />
                        </div>
                        <TextField
                            size="small"
                            name="address2"
                            id="remark"
                            sx={{ m: 1, width: "200ch" }}
                            variant="standard"
                        />
                    </div>
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <ImLocation2 style={{ fontSize: "25px" }} color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="Location"
                            label="Location"
                            name="Location"
                            autoComplete="new-password"
                            autoFocus
                        />
                    </div>
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <FactCheckIcon color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="id"
                            label="Outstanding Balance"
                            name="registrationslicenses"
                            autoComplete="new-password"
                            autoFocus
                        />
                    </div>
                </div>
                <div className="input-field" style={{ justifyContent: 'center' }}>
                    <div className="input" style={{ width: "230px" }}>
                        <Button startIcon={<MdEditDocument />} color="primary" variant="contained" component="label">
                            Agreement Copy
                            <input
                                type="file"
                                style={{ display: "none" }}
                            />
                        </Button>
                    </div>
                    <div className="input" style={{ width: "100px" }}>
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
                        <div className="input-field">
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
                            <div className="input" style={{ width: '123px' }}>
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

export default PropetiesRent