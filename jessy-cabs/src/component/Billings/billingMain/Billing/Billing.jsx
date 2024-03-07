import React, { useEffect } from 'react';
import "./Billing.css";
import {
    Autocomplete,
    InputAdornment,
    TextField,
} from "@mui/material";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import SpeedDial from "@mui/material/SpeedDial";

import Paymentinvoice from '../Accountsinvoice/Paymentinvoice';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GiMoneyStack } from "@react-icons/all-files/gi/GiMoneyStack";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
//dialog box
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import CarCrashIcon from '@mui/icons-material/CarCrash';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import TollTwoToneIcon from "@mui/icons-material/TollTwoTone";
import EngineeringIcon from "@mui/icons-material/Engineering";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import { faArrowRightArrowLeft, faMoneyBillTransfer, faBoxesPacking, faCloudMoon, faCoins, faEquals, faFileContract, faFileInvoiceDollar, faMagnifyingGlassChart, faMoneyBill1Wave, faNewspaper, faPercent, faPersonCircleCheck, faRoad, faSackDollar, faShapes, faStopwatch, faTags, faWindowRestore, faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons"
import useBilling from './useBilling';

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
    { icon: <PrintIcon />, name: "Print" },
    { icon: <CancelPresentationIcon />, name: "Cancel" },
    { icon: <DeleteIcon />, name: "Delete" },
    { icon: <ModeEditIcon />, name: "Edit" },
    { icon: <BookmarkAddedIcon />, name: "Add" },
];

const Billing = () => {

    const {
        selectedCustomerData,
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
        hidePopup,
        formData,
        selectedCustomerDatas,
        handleKeyDown,
        handleKeyenter,
        handleDateChange,
        calculateTotalAmount,
        calculateTotalAmount2,
        calculateTotalAmount3,
        calculateTotalAmount4,
        calculateGrossAmount,
        calculatePayableAmount,
        calculateRoundOff,
        calculateroundedPayableAmount,
        calculatePendingAmount,
        setSelectedBankAccount,
        handleAutocompleteChange,
        selectedBankAccount,
        bankOptions,
        popupOpen,
        handlePopupClose,
        organizationdata,
        tripSheetData,
        triprequest,
        tripcode,
        tripdepartment,
        routeData,
        BalanceValue,
        TotalAmountValue,
        roundOffValue,
        tripShedkm,
        tripshedin,
        tripshedout,
        tripreporttime,
        selectedImage,
        tripshedintime,
        tripadditionaltime,
        tripstartkm,
        tripclosekm,
        tripstarttime,
        handleKeyenter2,
        tripclosetime,
        tripstartdate,
        tripclosedate,
        organizationaddress1,
        organizationaddress2,
        organizationcity,
        organizationgstnumber,
        GmapimageUrl,
        mapimageUrl,

        // ... (other state variables and functions)
    } = useBilling();

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    }, [actionName, handleClick]);

    return (
        <div className="form-container">
            <div className="Billing-form">
                <form onSubmit={handleClick}>
                    <div className="Billing-page-header">
                        <div className="input-field">
                            <div className="input">
                                <div className="icone">
                                    <ListAltIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="tripid"
                                    label="Trip Sheet No"
                                    name="tripid"
                                    autoFocus
                                    autoComplete="off"
                                    value={formData.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || book.tripid || ''}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    disabled={isFieldReadOnly("read")}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <BadgeIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="Billingno"
                                    label="Billing No"
                                    name="billingno"
                                    autoComplete="new-password"
                                    value={formData.billingno || selectedCustomerData.billingno || selectedCustomerDatas.billingno || book.billingno || ''}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyenter2}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <BadgeIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="invoiceno"
                                    label="Invoice No"
                                    name="invoiceno"
                                    autoComplete="new-password"
                                    value={formData.invoiceno || selectedCustomerData.invoiceno || selectedCustomerDatas.invoiceno || book.invoiceno || ''}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyenter}
                                />
                            </div>
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Billing Date"
                                        value={formData.Billingdate || selectedCustomerDatas.Billingdate ? dayjs(selectedCustomerDatas.Billingdate) : null || selectedCustomerData.Billingdate ? dayjs(selectedCustomerData.Billingdate) : null || book.Billingdate ? dayjs(book.Billingdate) : dayjs() || ''}
                                        format="DD/MM/YYYY"
                                        onChange={(date) => handleDateChange(date, 'Billingdate')}
                                    >
                                        {({ inputProps, inputRef }) => (
                                            <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.Billingdate} />
                                        )}
                                    </DatePicker>
                                </LocalizationProvider>
                            </div>
                            <div className="input" style={{ width: "120px" }}>
                                <TextField
                                    type='number'
                                    margin="normal"
                                    size="small"
                                    label="Total Kms"
                                    name="totalkm1"
                                    value={formData.totalkm1 || selectedCustomerData.totalkm1 || selectedCustomerDatas.totalkm1 || book.totalkm1 || ''}
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input" style={{ width: "120px" }}>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="TotalHours"
                                    label="Total Hours"
                                    name="totaltime"
                                    autoComplete="new-password"
                                    value={formData.totaltime || selectedCustomerData.totaltime || selectedCustomerDatas.totaltime || book.totaltime || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="input-field" >
                            <div className="input" style={{ width: "300px" }}>
                                <div className="icone">
                                    <HailOutlinedIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    sx={{ width: "300px" }}
                                    id="Customer"
                                    label="Customer"
                                    name="customer"
                                    autoComplete="new-password"
                                    value={formData.customer || selectedCustomerData.customer || selectedCustomerDatas.customer || book.customer || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input" style={{ width: "300px" }}>
                                <div className="icone">
                                    <FontAwesomeIcon icon={faBoxesPacking} size="lg" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    sx={{ width: "300px" }}
                                    id="Supplier"
                                    label="Supplier"
                                    name="supplier"
                                    autoComplete="new-password"
                                    value={formData.supplier || selectedCustomerData.supplier || selectedCustomerDatas.supplier || book.supplier || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Trip Date"
                                        value={formData.startdate || selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null || selectedCustomerDatas.startdate ? dayjs(selectedCustomerDatas.startdate) : null || book.startdate ? dayjs(book.startdate) : null}
                                        format="DD/MM/YYYY"
                                        onChange={(date) => handleDateChange(date, 'startdate')}
                                    >
                                        {({ inputProps, inputRef }) => (
                                            <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.startdate} />
                                        )}
                                    </DatePicker>
                                </LocalizationProvider>
                            </div>
                            <div className="input" style={{ width: "111px" }}>
                                <TextField
                                    type='number'
                                    margin="normal"
                                    size="small"
                                    id="totaldays"
                                    label="Total Days"
                                    name="totaldays"
                                    autoComplete="new-password"
                                    value={formData.totaldays || selectedCustomerData.totaldays || selectedCustomerDatas.totaldays || book.totaldays || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="input-field" >
                            <div className="input" style={{ width: "300px" }}>
                                <div className="icone">
                                    <FontAwesomeIcon icon={faPersonCircleCheck} size="lg" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    sx={{ width: "300px" }}
                                    id="guestname"
                                    label="Gust Name"
                                    name="guestname"
                                    autoComplete="new-password"
                                    value={formData.guestname || selectedCustomerData.guestname || selectedCustomerDatas.guestname || book.guestname || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input" style={{ width: "300px" }}>
                                <div className="icone">
                                    <FontAwesomeIcon icon={faNewspaper} size="xl" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    sx={{ width: "300px" }}
                                    id="rateType"
                                    label="Rate Type"
                                    name="rateType"
                                    autoComplete="new-password"
                                    value={formData.rateType || selectedCustomerData.rateType || selectedCustomerDatas.rateType || book.rateType || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <DirectionsCarFilledIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="vehRegNo"
                                    label="Vehicle No"
                                    name="vehRegNo"
                                    autoComplete="new-password"
                                    value={formData.vehRegNo || selectedCustomerData.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <DirectionsCarFilledIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="Trips"
                                    label="Trips"
                                    name="trips"
                                    autoComplete="new-password"
                                    value={formData.trips || selectedCustomerData.trips || selectedCustomerDatas.trips || book.trips || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="Billing-page-secend-container">
                        <div className="Billing-secend-left">
                            <div className="input-field">
                                <div className="input" style={{ width: "360px" }}>
                                    <div className="icone">
                                        <CarCrashIcon color="action" />
                                    </div>
                                    <TextField
                                        name="vehType"
                                        autoComplete="new-password"
                                        value={formData.vehType || selectedCustomerData.vehType || selectedCustomerDatas.vehType || book.vehType || ''}
                                        onChange={handleChange}
                                        label="Vehicle Type"
                                        id="vehType"
                                        size="small"
                                        sx={{ m: 1, width: "60ch" }}
                                    />
                                </div>
                                <div className="input" style={{ width: "170px" }}>
                                    <div className="icone">
                                        <EngineeringIcon color="action" />
                                    </div>
                                    <TextField
                                        label='Duty'
                                        name="duty"
                                        autoComplete="new-password"
                                        value={formData.duty || selectedCustomerData.duty || selectedCustomerDatas.duty || book.duty || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="duty"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "360px" }}>
                                    <div className="icone">
                                        <Inventory2Icon color="action" />
                                    </div>
                                    <TextField
                                        name="MinCharges"
                                        autoComplete="new-password"
                                        value={formData.MinCharges || selectedCustomerData.package || selectedCustomerDatas.MinCharges || book.MinCharges || ''}
                                        onChange={handleChange}
                                        label="Min.Charges"
                                        id="MinCharges"
                                        size="small"
                                        variant="standard"
                                        sx={{ m: 1, width: "60ch" }}
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", paddingTop: "20px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        name="minchargeamount"
                                        autoComplete="new-password"
                                        value={formData.minchargeamount || selectedCustomerData.netamount || selectedCustomerDatas.minchargeamount || book.minchargeamount || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="amount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "170px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faRoad} />
                                    </div>
                                    <TextField
                                        type='number'
                                        name="ChargesForExtra"
                                        autoComplete="new-password"
                                        value={formData.ChargesForExtra || selectedCustomerData.totalkm1 || selectedCustomerDatas.ChargesForExtra || book?.ChargesForExtra || ''}
                                        onChange={handleChange}
                                        label="Charges For Extra"
                                        id="ChargesForExtra"
                                        size="small"
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">KMS</InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", paddingTop: "20px" }}>
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField size="small"
                                        type='number'
                                        name='ChargesForExtraamount'
                                        autoComplete="new-password"
                                        value={formData.ChargesForExtraamount || selectedCustomerData.ChargesForExtraamount || selectedCustomerDatas.ChargesForExtraamount || book.ChargesForExtraamount || ''}
                                        onChange={handleChange}
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", paddingTop: "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        name="cfeamount"
                                        autoComplete="new-password"
                                        value={calculateTotalAmount() || ''}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount1"
                                        id="cfeamount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "170px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faStopwatch} />
                                    </div>
                                    <TextField
                                        name="ChargesForExtraHRS"
                                        autoComplete="new-password"
                                        value={formData.ChargesForExtraHRS || selectedCustomerData.totaltime || selectedCustomerDatas.ChargesForExtraHRS || book.ChargesForExtraHRS || ''}
                                        onChange={handleChange}
                                        label="Charges For Extra"
                                        id="ChargesForExtra"
                                        size="small"
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">HRS</InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", paddingTop: "20px" }}>
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField size="small"
                                        type='number'
                                        name='ChargesForExtraHRSamount'
                                        autoComplete="new-password"
                                        value={formData.ChargesForExtraHRSamount || selectedCustomerData.ChargesForExtraHRSamount || selectedCustomerDatas.ChargesForExtraHRSamount || book.ChargesForExtraHRSamount || ''}
                                        onChange={handleChange}
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", paddingTop: "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        name="cfehamount"
                                        autoComplete="new-password"
                                        value={calculateTotalAmount2()}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount2"
                                        id="cfehamount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "170px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faCloudMoon} />
                                    </div>
                                    <TextField
                                        type='number'
                                        name="NightHalt"
                                        autoComplete="new-password"
                                        value={formData.NightHalt || selectedCustomerData.night || selectedCustomerDatas.NightHalt || book.NightHalt || ''}
                                        onChange={handleChange}
                                        label="Night Halt"
                                        id="NightHalt"
                                        size="small"
                                        variant="standard"
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", paddingTop: "20px" }}>
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField size="small" variant="standard"
                                        type='number'
                                        name='NightHaltamount'
                                        autoComplete="new-password"
                                        value={formData.NightHaltamount || selectedCustomerData.NightHaltamount || selectedCustomerDatas.NightHaltamount || book.NightHaltamount || ''}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }} />
                                </div>
                                <div className="input" style={{ width: "170px", paddingTop: "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        type='number'
                                        name="nhamount"
                                        autoComplete="new-password"
                                        value={book.nhamount || calculateTotalAmount3() || ''}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount"
                                        id="nhamount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "170px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faMoneyBill1Wave} />
                                    </div>
                                    <TextField
                                        type='number'
                                        label="Driver Bata"
                                        name='driverbata'
                                        autoComplete="new-password"
                                        value={formData.driverbata || selectedCustomerData.driverbata || selectedCustomerDatas.driverbata || book.driverbata || ''}
                                        onChange={handleChange}
                                        id="driverbata"
                                        size="small"
                                        variant="standard"
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", paddingTop: "20px" }}>
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField size="small" variant="standard"
                                        type='number'
                                        name='driverbataamount'
                                        autoComplete="new-password"
                                        value={formData.driverbataamount || selectedCustomerData.driverbataamount || selectedCustomerDatas.driverbataamount || book.driverbataamount || ''}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }} />
                                </div>
                                <div className="input" style={{ width: "170px", paddingTop: "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        type='number'
                                        name="dbamount"
                                        autoComplete="new-password"
                                        value={book.dbamount || calculateTotalAmount4() || ''}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount"
                                        id="dbamount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "355px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />
                                    </div>
                                    <TextField
                                        name="OtherCharges"
                                        autoComplete="new-password"
                                        value={formData.OtherCharges || selectedCustomerData.OtherCharges || selectedCustomerDatas.OtherCharges || book.OtherCharges || ''}
                                        onChange={handleChange}
                                        label="Other Charges"
                                        id="OtherCharges"
                                        size="small"
                                        variant="standard"
                                        sx={{ m: 1, width: "60ch" }}
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", paddingTop: "20px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        type='number'
                                        name="OtherChargesamount"
                                        autoComplete="new-password"
                                        value={formData.OtherChargesamount || selectedCustomerData.OtherChargesamount || selectedCustomerDatas.OtherChargesamount || book.OtherChargesamount || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="amount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "260px", paddingTop: "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faFileContract} size="lg" />
                                    </div>
                                    <TextField
                                        type='number'
                                        name='permitothertax'
                                        label="Permit / Other Tax"
                                        autoComplete="new-password"
                                        value={formData.permitothertax || selectedCustomerData.permitothertax || selectedCustomerDatas.permitothertax || book.permitothertax || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="amount"
                                    />
                                </div>
                                <div className="input" style={{ width: "260px", paddingTop: "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faWindowRestore} size="lg" />
                                    </div>
                                    <TextField
                                        type='number'
                                        label="Parking / Toll Charges"
                                        name='parkingtollcharges'
                                        autoComplete="new-password"
                                        value={formData.parkingtollcharges || selectedCustomerData.parkingtollcharges || selectedCustomerDatas.parkingtollcharges || book.parkingtollcharges || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="amount"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="Billing-secend-right">
                            <div className="input-field" >
                                <div className="input" style={{ width: "200px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faRoad} />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="MinKilometers"
                                        label="Min Kilometers"
                                        name="MinKilometers"
                                        autoComplete="new-password"
                                        value={formData.MinKilometers || selectedCustomerData.minkm || selectedCustomerDatas.MinKilometers || book.MinKilometers || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input" style={{ width: "200px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faStopwatch} />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="MinHours"
                                        label="Min Hours"
                                        name="MinHours"
                                        autoComplete="new-password"
                                        value={formData.MinHours || selectedCustomerData.minhrs || selectedCustomerDatas.MinHours || book.MinHours || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "200px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faMagnifyingGlassChart} size="lg" />
                                    </div>
                                    <TextField
                                        type='number'
                                        margin="normal"
                                        size="small"
                                        id="GrossAmount"
                                        label="Gross Amount"
                                        name="GrossAmount"
                                        autoComplete="new-password"
                                        value={calculateGrossAmount() || book.GrossAmount || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input" style={{ width: "200px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faShapes} size="lg" />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="AfterTaxAmount"
                                        label="After Tax Amount"
                                        name="AfterTaxAmount"
                                        autoComplete="new-password"
                                        value={formData.AfterTaxAmount || selectedCustomerData.AfterTaxAmount || selectedCustomerDatas.AfterTaxAmount || book.AfterTaxAmount || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "200px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faTags} size="lg" />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="DiscountAmount"
                                        label="Discount Amount"
                                        name="DiscountAmount"
                                        autoComplete="new-password"
                                        value={formData.DiscountAmount || selectedCustomerData.DiscountAmount || selectedCustomerDatas.DiscountAmount || book.DiscountAmount || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input" style={{ width: "200px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faPercent} />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        name='DiscountAmount2'
                                        size="small"
                                        autoComplete="new-password"
                                        value={formData.DiscountAmount2 || selectedCustomerData.DiscountAmount2 || selectedCustomerDatas.DiscountAmount2 || book.DiscountAmount2 || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faArrowRightArrowLeft} size="lg" />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="AdvanceReceived"
                                        label="Advance Received"
                                        name="AdvanceReceived"
                                        autoComplete="new-password"
                                        value={formData.AdvanceReceived || selectedCustomerData.AdvanceReceived || selectedCustomerDatas.AdvanceReceived || book.AdvanceReceived || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faCoins} size="lg" />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="BalanceReceivable"
                                        label="Balance Receivable"
                                        name="BalanceReceivable"
                                        autoComplete="new-password"
                                        value={calculatePayableAmount() || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" >
                                    <div className="icone">
                                        <ChangeCircleIcon color="active" />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="RoundedOff"
                                        label="Rounded Off"
                                        name="RoundedOff"
                                        autoComplete="new-password"
                                        value={calculateRoundOff() || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faSackDollar} size="xl" />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="NetAmount"
                                        label="Net Amount"
                                        name="NetAmount"
                                        autoComplete="new-password"
                                        value={calculateroundedPayableAmount() || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" >
                                    <div className="icone">
                                        <GiMoneyStack style={{ fontSize: '23px' }} />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="Totalamount"
                                        label="Total Amount"
                                        name="Totalamount"
                                        autoComplete="new-password"
                                        value={calculateroundedPayableAmount() || selectedCustomerDatas.Totalamount || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faMoneyBillTrendUp} size="lg" />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="paidamount"
                                        label="Paid Amount"
                                        name="paidamount"
                                        autoComplete="new-password"
                                        value={formData.paidamount || selectedCustomerData.paidamount || selectedCustomerDatas.paidamount || book.paidamount || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" >
                                    <div className="icone">
                                        <PendingActionsIcon />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="pendingamount"
                                        label="Pending Amount"
                                        name="pendingamount"
                                        autoComplete="new-password"
                                        value={calculatePendingAmount() || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faMoneyBillTransfer} size="lg" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        size="small"
                                        id="free-solo-demo-BankAccount"
                                        freeSolo
                                        sx={{ width: "20ch" }}
                                        onChange={(event, value) => {
                                            setSelectedBankAccount(value);
                                            handleAutocompleteChange(event, value, "BankAccount")
                                        }}
                                        value={formData.BankAccount || selectedBankAccount || selectedCustomerData.BankAccount || selectedCustomerDatas.BankAccount || book.BankAccount || ''}
                                        options={bankOptions}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Bank Account" name="BankAccount" inputRef={params.inputRef} />
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Dialog open={popupOpen} onClose={handlePopupClose}>
                        <DialogContent>
                            <Paymentinvoice tripSheetData={tripSheetData}
                                triprequest={triprequest}
                                tripcode={tripcode}
                                selectedImage={selectedImage}
                                organizationdata={organizationdata}
                                tripdepartment={tripdepartment}
                                routeData={routeData}
                                BalanceValue={BalanceValue}
                                TotalAmountValue={TotalAmountValue}
                                roundOff={roundOffValue}
                                book={book}
                                selectedCustomerData={selectedCustomerData}
                                tripShedkm={tripShedkm}
                                tripshedin={tripshedin}
                                tripshedout={tripshedout}
                                tripreporttime={tripreporttime}
                                tripshedintime={tripshedintime}
                                tripadditionaltime={tripadditionaltime}
                                tripstartkm={tripstartkm}
                                tripclosekm={tripclosekm}
                                tripstarttime={tripstarttime}
                                tripclosetime={tripclosetime}
                                tripstartdate={tripstartdate}
                                tripclosedate={tripclosedate}
                                selectedCustomerDatas={selectedCustomerDatas}
                                organizationaddress1={organizationaddress1}
                                organizationaddress2={organizationaddress2}
                                organizationcity={organizationcity}
                                organizationgstnumber={organizationgstnumber}
                                GmapimageUrl={GmapimageUrl}
                                mapimageUrl={mapimageUrl}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handlePopupClose} variant="contained" color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </form>
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
                                onClick={(event) => handleClick(event, action.name)}

                            />
                        ))}
                    </StyledSpeedDial>
                </Box>
            </div>
        </div>
    )
}

export default Billing