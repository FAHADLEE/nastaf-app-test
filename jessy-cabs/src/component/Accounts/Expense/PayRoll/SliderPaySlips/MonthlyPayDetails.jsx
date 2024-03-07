import React, { useState, useCallback, useEffect } from 'react';
import axios from "axios";
import jsPDF from 'jspdf';
import dayjs from "dayjs";
import { saveAs } from 'file-saver';
import { Menu } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

const MonthlyPayDetails = () => {
    const [rows, setRows] = useState([]);
    const [empid] = useState("");
    const [fromDate, setFromDate] = useState(dayjs());
    const [toDate, setToDate] = useState(dayjs());
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState(false);
    const [info, setInfo] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage] = useState({});

    // download function
    const convertToCSV = (data) => {
        const header = columns.map((column) => column.headerName).join(",");
        const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
        return [header, ...rows].join("\n");
    };
    const handleExcelDownload = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "Employee_Monthly_Payment_Details.csv");
    };
    const handlePdfDownload = () => {
        const pdf = new jsPDF('landscape');
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        // pdf.text('Employee PaySlip', 10, 10);
        const title = 'Employee_Monthly_Payment_Details';
        const pageWidth = pdf.internal.pageSize.getWidth();
        const textWidth = pdf.getStringUnitWidth(title) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
        const xPosition = (pageWidth - textWidth) / 2;
        const yPosition = 10;
        pdf.text(title, xPosition, yPosition);
        // Modify tableData to exclude the index number
        const tableData = rows.map((row, index) => [
            index + 1, // Adding a serial number column
            row['empid'],
            row['empname'],
            row['jobroll'],
            row['uanid'],
            row['esino'],
            row['salarydate'],
            row['empemailid'],
            row['empmobile'],
            row['takehomeamount'],
        ]);
        pdf.autoTable({
            head: [['Sno', 'Employee ID', 'Name', 'Job Roll', 'UAN ID', 'ESI NO', 'Joining Date', 'Email', 'Mobile', 'Take Home Amount']],
            body: tableData,
            startY: 20,
            theme: 'grid', // Use 'grid' theme for better visual separation
            width: 'auto',
            styles: {
                fontSize: 10,
                cellPadding: 5,
                valign: 'middle',
            },
        });
        pdf.save('Employee_Monthly_Payment_Details.pdf');
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
        if (success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [success]);
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

    const handleShow = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8081/payroll?empid=${empid}&fromDate=${fromDate.format('YYYY-MM-DD')}&toDate=${toDate.format('YYYY-MM-DD')}`);
            const data = response.data;
            setRows(data);
            setSuccessMessage("Successfully listed");

        } catch {
            setRows([]);
            setErrorMessage("Check your Network Connection");

        }
    }, [empid, fromDate, toDate]);

    // TABLE

    const columns = [
        { field: "id", headerName: "Sno", width: 50 },
        { field: "empid", headerName: "Employe ID", width: 140 },
        { field: "empname", headerName: "Name", width: 130 },
        { field: "jobroll", headerName: "Job Roll", width: 130 },
        { field: "uanid", headerName: "UAN ID", width: 140 },
        { field: "esino", headerName: "ESI NO", width: 140 },
        { field: "salarydate", headerName: "Joining Date", width: 130 },
        { field: "empemailid", headerName: "Email", width: 130 },
        { field: "empmobile", headerName: "Mobile", width: 130 },
        { field: "PF12", headerName: "EPF", width: 130 },
        { field: "ESIC0_75", headerName: "ESIC", width: 130 },
        { field: "grosspay", headerName: "Gross Pay", width: 130 },
        { field: "workingdays", headerName: "Working Days", width: 130 },
        { field: "leavedays", headerName: "Leave Days", width: 130 },
        { field: "basicsalary", headerName: "Basic Salary", width: 130 },
        { field: "houserentallowance", headerName: "House Rent Allowance", width: 160 },
        { field: "otherallowance", headerName: "Other Allowances", width: 150 },
        { field: "overtime", headerName: "Over Time", width: 130 },
        { field: "outstation", headerName: "OutStation / Airport Duty", width: 160 },
        { field: "extraworkingdays", headerName: "Extra Working Days", width: 160 },
        { field: "cellwash", headerName: "Cell Wash", width: 130 },
        { field: "totalerningsamount", headerName: "Total Earning Amount", width: 170 },
        { field: "otherdeducations", headerName: "Other Deduction", width: 140 },
        { field: "professionaltax", headerName: "Professional Tax", width: 140 },
        { field: "incometax", headerName: "Income Tax", width: 140 },
        { field: "advancepaid", headerName: "Advance Paid", width: 140 },
        { field: "advanceloan", headerName: "Advance Loan", width: 140 },
        { field: "totaldeductionamount", headerName: "Total Deducation", width: 140 },
        { field: "takehomeamount", headerName: "Take Home Amount", width: 140 },
    ];

    return (
        <>
            <div className="detail-container-main">
                <div className="container-left">
                    <div className="copy-title-btn-PettyCash">
                        <div className="input-field">
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="From">
                                        <DatePicker
                                            label="From Date"
                                            value={fromDate}
                                            onChange={(date) => setFromDate(date)}
                                        />
                                    </DemoItem>
                                </LocalizationProvider>
                            </div>
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="To">
                                        <DatePicker
                                            label="To Date"
                                            value={toDate}
                                            onChange={(date) => setToDate(date)}
                                        />
                                    </DemoItem>
                                </LocalizationProvider>
                            </div>
                            <div className="input" style={{ width: '80px', marginTop: "50px" }}>
                                <Button variant="contained" onClick={handleShow}>Search</Button>
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
            {info &&
                <div className='alert-popup Info' >
                    <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
                    <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                    <p>{infoMessage}</p>
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
                        pageSize={5}
                        checkboxSelection
                    />
                </div>
            </div>
        </>
    )
}

export default MonthlyPayDetails