import React, { useState, useEffect, useCallback } from 'react';
import "./Liabilities.css";
import axios from "axios";
import jsPDF from 'jspdf';
import dayjs from "dayjs";
import { saveAs } from 'file-saver';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';
import SpeedDial from "@mui/material/SpeedDial";
import { Menu, TextField } from "@mui/material";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// ICONS
import { FiTrello } from "react-icons/fi";
import { BiReceipt } from "react-icons/bi";
import { AiFillCopy } from "react-icons/ai";
import { AiFillBook } from "react-icons/ai";
import { ImPriceTags } from "react-icons/im";
import { AiFillAppstore } from "react-icons/ai";
import { MdEditDocument } from "react-icons/md";
import { HiDocumentText } from "react-icons/hi";
import { GiBackwardTime } from "react-icons/gi";
import { CgFileDocument } from "react-icons/cg";
import BadgeIcon from "@mui/icons-material/Badge";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import { AiOutlineContainer } from "react-icons/ai";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsPersonExclamation } from "react-icons/bs";
import { AiOutlinePercentage } from "react-icons/ai";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import RateReviewIcon from '@mui/icons-material/RateReview';
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
  { field: "libilityno", headerName: "Liability No", width: 130 },
  { field: "liabilityname", headerName: "Liability Name", width: 130 },
  { field: "principalamount", headerName: "Principal Amount", width: 130 },
  { field: "descriptionoftheliability", headerName: "Description of the Liability", width: 180 },
  { field: "creditorinformation", headerName: "Creditor Information", width: 150 },
  { field: "principalamount", headerName: "Principal Amount", width: 130 },
  { field: "maturitydate", headerName: "Maturity Date", width: 120 },
  { field: "interestrate", headerName: "Interest Rate", width: 130 },
  { field: "termsandconditions", headerName: "Terms/Conditions", width: 130 },
  { field: "repaymentshedule", headerName: "Repayment Shedule", width: 150 },
  { field: "outstandingbalance", headerName: "Outstanding Balance", width: 150 },
  { field: "paymenthistory", headerName: "Payment History", width: 130 },
  { field: "accruedliabilities", headerName: "Accrued Liabilities", width: 130 },
  { field: "contingentliabilities", headerName: "Contingent Liabilities", width: 150 },
  { field: "creditrate", headerName: "Credit Rate", width: 100 },
  { field: "legaldocumentation", headerName: "Legal Documentation", width: 150 },
  { field: "inerestexpense", headerName: "Inerest Expense", width: 130 },
  { field: "debtconvenants", headerName: "Debt Convenants", width: 130 },
  { field: "amortizationdepreciation", headerName: "Amortization / Depreciation", width: 190 },
];


const Liabilities = () => {
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [rows, setRows] = useState([]);
  const [actionName] = useState('');
  const [toDate, setToDate] = useState(dayjs());
  const [fromDate, setFromDate] = useState(dayjs());
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
      row['descriptionoftheliability'],
      row['CreditorInformation'],
      row['PrincipalAmount'],
      row['ownerofLiabilities'],
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

  const [book, setBook] = useState({
    descriptionoftheliability: '',
    CreditorInformation: '',
    PrincipalAmount: '',
    dateofacquisition: '',
    Liabilitiesdescription: '',
    legaldocuments: '',
    ownerofLiabilities: '',
    registrationslicenses: '',
    warrantyinformation: '',
    maintenancerecords: '',
    insuranceinformation: '',

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
  const handleDateChange = (date, name) => {
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: formattedDate,
    }));
  };
  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      descriptionoftheliability: '',
      CreditorInformation: '',
      PrincipalAmount: '',
      dateofacquisition: '',
      ownerofLiabilities: '',
      Liabilitiesdescription: '',
      legaldocuments: '',
      registrationslicenses: '',
      warrantyinformation: '',
      maintenancerecords: '',
      insuranceinformation: '',
    }));
    setSelectedCustomerData({});
  };
  const handleRowClick = useCallback((params) => {
    const customerData = params.row;
    setSelectedCustomerData(customerData);
    setSelectedCustomerId(params.row.customerId);
  }, []);

  const handleAdd = async () => {
    const descriptionoftheliability = book.descriptionoftheliability;
    if (!descriptionoftheliability) {
      setError(true);
      setErrorMessage("fill mantatory fields");
      return;
    }
    try {
      const response = await axios.post('http://localhost:8081/Liabilities', book);
      handleCancel();
      setSuccessMessage("Successfully Added");
    } catch (error) {
      setErrorMessage("Check your Network Connection");
    }
  };
  const handleClick = async (event, actionName, descriptionoftheliability) => {
    event.preventDefault();
    try {
      if (actionName === 'List') {
        const response = await axios.get('http://localhost:8081/Liabilities');
        const data = response.data;
        setRows(data);
        setSuccessMessage("Successfully listed");
      } else if (actionName === 'Cancel') {
        handleCancel();
      } else if (actionName === 'Delete') {
        await axios.delete(`http://localhost:8081/Liabilities/${descriptionoftheliability}`);
        setSelectedCustomerData(null);
        setSuccessMessage("Successfully Deleted");
        handleCancel();
      } else if (actionName === 'Edit') {
        const selectedCustomer = rows.find((row) => row.descriptionoftheliability === descriptionoftheliability);
        const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        await axios.put(`http://localhost:8081/Liabilities/${descriptionoftheliability}`, updatedCustomer);
        handleCancel();
      }
    } catch (err) {
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
    <div className="Liabilities-form Scroll-Style-hide">
      <form onSubmit={handleClick}>
        <div className="Liabilities-page-header">
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <BadgeIcon color="action" />
              </div>
              <TextField
                size="small"
                id="descriptionoftheliability"
                label="Liability No"
                name="Descriptionoftheliability"
                autoComplete="new-password"
                value={selectedCustomerData?.descriptionoftheliability || book.descriptionoftheliability}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input">
              <div className="icone">
                <BsPersonExclamation style={{ fontSize: "25px" }} color="action" />
              </div>
              <TextField
                size="small"
                id="descriptionoftheliability"
                label="Liability Name"
                name="Descriptionoftheliability"
                autoComplete="new-password"
                value={selectedCustomerData?.descriptionoftheliability || book.descriptionoftheliability}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "260px" }}>
              <div className="icone">
                <FiTrello color="action" style={{ fontSize: "25px" }} />
              </div>
              <TextField
                size="small"
                id="descriptionoftheliability"
                label="Description of the Liability"
                name="Descriptionoftheliability"
                autoComplete="new-password"
                value={selectedCustomerData?.descriptionoftheliability || book.descriptionoftheliability}
                onChange={handleChange}
                autoFocus
              />
            </div>

            <div className="input">

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Invoice Date"
                  value={selectedCustomerData.dateofacquisition ? dayjs(selectedCustomerData.startdate) : null}
                  onChange={(date) => handleDateChange(date, 'dateofacquisition')}
                >
                  {({ inputProps, inputRef }) => (
                    <TextField  {...inputProps} inputRef={inputRef} value={selectedCustomerData?.dateofacquisition} />
                  )}
                </DatePicker>
              </LocalizationProvider>
            </div>
          </div>
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <AiOutlinePercentage style={{ fontSize: "25px" }} color="action" />
              </div>
              <TextField
                size="small"
                id="id"
                label="Interest Rate"
                name="Interest Rate"
                value={selectedCustomerData?.ownerofLiabilities || book.ownerofLiabilities}
                onChange={handleChange}
                autoFocus
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
                name="Liabilitiesdescription"
                value={selectedCustomerData?.Liabilitiesdescription || book.Liabilitiesdescription}
                onChange={handleChange}
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
                value={selectedCustomerData?.legaldocuments || book.legaldocuments}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "220px" }}>
              <div className="icone">
                <FactCheckIcon color="action" />
              </div>
              <TextField
                size="small"
                id="id"
                label="Outstanding Balance"
                name="registrationslicenses"
                value={selectedCustomerData?.registrationslicenses || book.registrationslicenses}
                onChange={handleChange}
                autoComplete="new-password"
                autoFocus
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <GiBackwardTime style={{ fontSize: "25px" }} color="action" />
              </div>
              <TextField
                size="small"
                id="warrantyinformation"
                label="Payment History"
                name="warrantyinformation"
                value={selectedCustomerData?.warrantyinformation || book.warrantyinformation}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "230px" }}>
              <div className="icone">
                <BiReceipt style={{ fontSize: "25px" }} color="action" />
              </div>
              <TextField
                size="small"
                id="maintenancerecords"
                label="Accrued Liabilities"
                name="maintenancerecords"
                value={selectedCustomerData?.maintenancerecords || book.maintenancerecords}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "230px" }}>
              <div className="icone">
                <AiFillCopy style={{ fontSize: "22px" }} color="action" />
              </div>
              <TextField
                size="small"
                id="insuranceinformation"
                label="Contingent Liabilities"
                name="insuranceinformation"
                value={selectedCustomerData?.insuranceinformation || book.insuranceinformation}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "220px" }}>
              <div className="icone">
                <AiOutlineContainer style={{ fontSize: "22px" }} />
              </div>
              <TextField
                size="small"
                id="insuranceinformation"
                label="Debt Covenants"
                name="insuranceinformation"
                value={selectedCustomerData?.insuranceinformation || book.insuranceinformation}
                onChange={handleChange}
                autoFocus
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <RateReviewIcon color="action" />
              </div>
              <TextField
                size="small"
                id="insuranceinformation"
                label="Credit Rating"
                name="insuranceinformation"
                value={selectedCustomerData?.insuranceinformation || book.insuranceinformation}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "230px" }}>
              <div className="icone">
                <CgFileDocument style={{ fontSize: "22px" }} color="action" />
              </div>
              <TextField
                size="small"
                id="insuranceinformation"
                label="Legal Documentation"
                name="insuranceinformation"
                value={selectedCustomerData?.insuranceinformation || book.insuranceinformation}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "230px" }}>
              <div className="icone">
                <AiFillBook style={{ fontSize: "22px" }} color="action" />
              </div>
              <TextField
                size="small"
                id="insuranceinformation"
                label="Interest Expense"
                name="insuranceinformation"
                value={selectedCustomerData?.insuranceinformation || book.insuranceinformation}
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
                label="Creditor Information"
                name="CreditorInformation"
                value={selectedCustomerData?.CreditorInformation || book.CreditorInformation}
                onChange={handleChange}
                autoFocus
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input" style={{ width: "270px" }}>
              <div className="icone">
                <MdEditDocument style={{ fontSize: "22px" }} color="action" />
              </div>
              <TextField
                size="small"
                id="insuranceinformation"
                label="Amortization / Depreciation"
                name="insuranceinformation"
                value={selectedCustomerData?.insuranceinformation || book.insuranceinformation}
                onChange={handleChange}
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
                label="Principal Amount"
                name="PrincipalAmount"
                value={selectedCustomerData?.PrincipalAmount || book.PrincipalAmount}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input">

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Due Date"
                  value={selectedCustomerData.dateofacquisition ? dayjs(selectedCustomerData.startdate) : null}
                  onChange={(date) => handleDateChange(date, 'dateofacquisition')}
                >
                  {({ inputProps, inputRef }) => (
                    <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.dateofacquisition} />
                  )}
                </DatePicker>
              </LocalizationProvider>
            </div>
            <div className="input" style={{ width: "160px" }}>
              <Button color="primary" variant="contained" component="label">
                Invoice Copy
                <input
                  type="file"
                  style={{ display: "none" }}
                />
              </Button>
            </div>
            <div className="input" style={{ width: "100px" }}>
              <Button variant="contained" onClick={handleAdd}>Add</Button>
            </div>
          </div>
        </div>
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-Liabilities">
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
        <div className="table-bookingCopy-Liabilities">
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

export default Liabilities