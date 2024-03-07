import React, { useState, useEffect } from 'react'
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';
import { Menu, TextField } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


// ICONS
import { MdContacts } from "react-icons/md";
import { ImPriceTags } from "react-icons/im";
import { ImLocation2 } from "react-icons/im";
import { AiFillAppstore } from "react-icons/ai";
import { MdEditDocument } from "react-icons/md";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import { BsFillFilePostFill } from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import RestoreIcon from '@mui/icons-material/Restore';
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import RateReviewIcon from '@mui/icons-material/RateReview';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';



// TABLE
const columns = [
    { field: "id", headerName: "Sno", width: 50 },
    { field: "BusinessExpenseno   ", headerName: "BusinessExpense No", width: 140 },
    { field: "Expensetype", headerName: "Expense Type", width: 130 },
    { field: "Expensediscription", headerName: "Expense Discription", width: 150 },
    { field: "billdate", headerName: "Bill Date", width: 143 },
    { field: "contactno", headerName: "Contact No", width: 130 },
    { field: "address", headerName: "Address", width: 130 },
    { field: "location", headerName: "Location", width: 130 },
    { field: "amount", headerName: "Amount", width: 130 },
    { field: "amountcopy", headerName: "Amount Copy", width: 130 },
    { field: "documentno", headerName: "Document No", width: 130 },
    { field: "renewaldate", headerName: "Renewal Date", width: 130 },
    { field: "renewalamount", headerName: "Renewal Amount", width: 130 },
    { field: "documentcopy", headerName: "Document Copy", width: 130 },
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

const BusinessExpense = () => {

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
            row['BusinessExpenseinformation'],
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
                            <BsFillFilePostFill style={{ fontSize: "25px" }} color="action" />
                        </div>
                        <TextField
                            size="small"
                            name="BusinessExpenseNo"
                            label="BusinessExpense No"
                            id="remark"
                        />
                    </div>
                    <div className="input" style={{ width: "210px" }}>
                        <div className="icone">
                            <RateReviewIcon color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="BusinessExpenseType"
                            label="Document Type"
                            name="BusinessExpenseType"
                            autoFocus
                        />
                    </div>
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <AiFillAppstore style={{ fontSize: "25px" }} color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="BusinessExpenseDiscription"
                            label="Document Discription"
                            name="BusinessExpenseDiscription"
                            autoFocus
                        />
                    </div>
                    <div className="input">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Bill Date"
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
                            <ImLocation2 color="action" style={{ fontSize: "25px" }} />
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
                            <MdContacts style={{ fontSize: "25px" }} color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="id"
                            label="Contact No"
                            name="contact"
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
                            <ImPriceTags style={{ fontSize: "25px" }} color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="Amount"
                            label="Amount"
                            name="Amount"
                            autoFocus
                        />
                    </div>
                    <div className="input">
                        <Button startIcon={<MdEditDocument />} color="primary" variant="contained" component="label">
                            Bill Copy
                            <input
                                type="file"
                                style={{ display: "none" }}
                            />
                        </Button>
                    </div>
                </div>
                <div className="input-field">
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <FilePresentIcon style={{ fontSize: "25px" }} color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="documentno"
                            label="Document No"
                            name="documentno"
                            autoFocus
                        />
                    </div>
                    <div className="input">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Renewal Date"
                                value={selectedCustomerData.dateofacquisition ? dayjs(selectedCustomerData.startdate) : null}
                            >
                                {({ inputProps, inputRef }) => (
                                    <TextField  {...inputProps} inputRef={inputRef} value={selectedCustomerData?.dateofacquisition} />
                                )}
                            </DatePicker>
                        </LocalizationProvider>
                    </div>
                    <div className="input" style={{ width: "230px" }}>
                        <div className="icone">
                            <RestoreIcon style={{ fontSize: "25px" }} color="action" />
                        </div>
                        <TextField
                            size="small"
                            id="renewwalamount"
                            label="Renewal Amount"
                            name="renewwalamount"
                            autoFocus
                        />
                    </div>
                    <div className="input">
                        <Button startIcon={<MdEditDocument />} color="primary" variant="contained" component="label">
                            Document Copy
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
            <div className="detail-container-main" >
                <div className="container-left" >
                    <div className="copy-title-btn-Others" >
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

export default BusinessExpense