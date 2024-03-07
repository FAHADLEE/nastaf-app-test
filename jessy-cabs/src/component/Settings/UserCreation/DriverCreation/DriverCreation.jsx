import React, { useEffect } from 'react';
import "./DriverCreation.css";
import Box from "@mui/material/Box";
import Input from '@mui/material/Input';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from "@mui/material/Autocomplete";
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import { StationName, ViewFor } from "./DriverCreationData";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

// FONTAWESOME
import { faFileInvoice, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingFlag } from "@fortawesome/free-solid-svg-icons";
import { faImagePortrait } from "@fortawesome/free-solid-svg-icons";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { faSheetPlastic } from "@fortawesome/free-solid-svg-icons";

// REACT ICONS
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";

// ICONS
import BadgeIcon from "@mui/icons-material/Badge";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PostAddIcon from '@mui/icons-material/PostAdd';
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import TaxiAlertIcon from '@mui/icons-material/TaxiAlert';
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import useDrivercreation from './useDrivercreation';
import { APIURL } from "../../../url";

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
    { icon: <BookmarkAddedIcon />, name: "Add" },
];

const DriverCreation = () => {
    const apiUrl = APIURL;
    const {
        selectedCustomerData,
        selectedCustomerId,
        rows,
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
        handleRowClick,
        handleAdd,
        hidePopup,
        handleAutocompleteChange,
        showPasswords,
        handleClickShowPasswords,
        handleMouseDownPasswords,
        passwordsMatch,
        columns,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleCloseDialog,
        dialogOpen,
        allFile,
        setFile,
        setLicencepdf,
        isEditMode,
        handleEdit,
        handleContextMenu,
        handleimagedelete,
        handleClosedeleteDialog,
        dialogdeleteOpen,
        setError,
        setErrorMessage,
    } = useDrivercreation();

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    }, [actionName, handleClick]);

    return (
        <div className="DriverCreation-main">
            <div className="DriverCreation-form-container">
                <form onSubmit={handleClick}>
                    <div className="DriverCreation-header">
                        <div className="input-field">
                            <div className="input">
                                <div className="icone">
                                    <BadgeIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="id"
                                    label="ID"
                                    name="userid"
                                    value={selectedCustomerData?.userid || book.userid}
                                    onChange={handleChange}
                                    variant="standard"
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <FontAwesomeIcon icon={faImagePortrait} size="lg" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="user-name"
                                    label="User Mail-Id"
                                    name="username"
                                    value={selectedCustomerData?.username || book.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <FontAwesomeIcon icon={faBuildingFlag} size="lg" />
                                </div>
                                <Autocomplete
                                    fullWidth
                                    size="small"
                                    id="free-solo-demo-stationname"
                                    freeSolo
                                    sx={{ width: "20ch" }}
                                    value={StationName.find((option) => option.Option)?.label || selectedCustomerData?.stationname || ''}
                                    onChange={(event, value) => handleAutocompleteChange(event, value, "stationname")}
                                    options={StationName.map((option) => ({
                                        label: option.Option,
                                    }))}
                                    getOptionLabel={(option) => option.label || selectedCustomerData?.stationname || ''}
                                    renderInput={(params) => {
                                        return (
                                            <TextField {...params} label="Station Name" name="stationname" />
                                        )
                                    }
                                    }
                                />
                            </div>
                            <div className="input" style={{ width: "330px" }}>
                                <div className="icone">
                                    <ListAltIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    name="designation"
                                    value={selectedCustomerData?.designation || book.designation}
                                    onChange={handleChange}
                                    label="Designation"
                                    id="designation"
                                    sx={{ m: 1, width: "200ch" }}
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="input" style={{ width: "240px" }}>
                                <div className="icone">
                                    <FontAwesomeIcon icon={faUnlockKeyhole} size="lg" />
                                </div>
                                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input
                                        name="userpassword"
                                        value={selectedCustomerData?.userpassword || book.userpassword}
                                        onChange={handleChange}
                                        id="password"
                                        type={showPasswords ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPasswords}
                                                    onMouseDown={handleMouseDownPasswords}
                                                >
                                                    {showPasswords ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div className="input" style={{ width: "240px" }}>
                                <div className="icone">
                                    <FontAwesomeIcon icon={faLock} size="lg" />
                                </div>
                                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                                    <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                                    <Input
                                        name="userconfirmpassword"
                                        value={selectedCustomerData?.userconfirmpassword || book.userconfirmpassword}
                                        onChange={handleChange}
                                        id="confirm-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="confirm-password"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                            </div>
                            <div className="input radio">
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                        Active
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="active"
                                        onChange={handleChange}
                                        value={selectedCustomerData?.active || book.active}
                                    >
                                        <FormControlLabel
                                            value="yes"
                                            control={<Radio />}
                                            label="Yes"
                                        />
                                        <FormControlLabel
                                            value="no"
                                            control={<Radio />}
                                            label="No"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <QuizOutlinedIcon color="action" />
                                </div>
                                <Autocomplete
                                    fullWidth
                                    size="small"
                                    id="free-solo-demo-viewfor"
                                    freeSolo
                                    sx={{ width: "20ch" }}
                                    value={ViewFor.find((option) => option.Option)?.label || selectedCustomerData?.viewfor || ''}
                                    onChange={(event, value) => handleAutocompleteChange(event, value, "viewfor")}
                                    options={ViewFor.map((option) => ({
                                        label: option.Option,
                                    }))}
                                    getOptionLabel={(option) => option.label || selectedCustomerData?.viewfor || ''}
                                    renderInput={(params) => {
                                        return (
                                            <TextField {...params} label="View For" name="viewfor" />
                                        )
                                    }
                                    }
                                />
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
                                    value={selectedCustomerData?.address1 || book.address1}
                                    onChange={handleChange}
                                    label="Address"
                                    id="address1"
                                    sx={{ m: 1, width: "200ch" }}
                                    variant="standard"
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <AccountBalanceWalletIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="basicsalary"
                                    label="Basic Salary"
                                    name="basicsalary"
                                    value={selectedCustomerData?.basicsalary || book.basicsalary}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <TaxiAlertIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    name="licenseno"
                                    value={selectedCustomerData?.licenseno || book.licenseno}
                                    onChange={handleChange}
                                    label="License No"
                                    id="licenseno"
                                />
                            </div>
                            <div className="input" style={{ width: "170px" }}>
                                <TextField
                                    size="small"
                                    name="licenseexpdate"
                                    value={selectedCustomerData?.licenseexpdate || book.licenseexpdate}
                                    onChange={handleChange}
                                    label="License Exp Date"
                                    id="licenseexpdate"
                                    sx={{ m: 1, width: "140ch" }}
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
                                    name="streetno"
                                    value={selectedCustomerData?.streetno || book.streetno}
                                    onChange={handleChange}
                                    id="streetno"
                                    sx={{ m: 1, width: "200ch" }}
                                    variant="standard"
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <RateReviewIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    name="esino"
                                    value={selectedCustomerData?.esino || book.esino}
                                    onChange={handleChange}
                                    label="ESI No"
                                    id="ESINo"
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <PostAddIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    name="badgeno"
                                    value={selectedCustomerData?.badgeno || book.badgeno}
                                    onChange={handleChange}
                                    label="Badge No"
                                    id="badgeno"
                                />
                            </div>
                            <div className="input" style={{ width: "170px" }}>
                                <TextField
                                    size="small"
                                    name="badgeexpdate"
                                    value={selectedCustomerData?.badgeexpdate || book.badgeexpdate}
                                    onChange={handleChange}
                                    label="Badge Exp Date"
                                    id="badgeexpdate"
                                    sx={{ m: 1, width: "140ch" }}
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="input" style={{ width: "400px" }}>
                                <div className="icone">
                                    <LocationCityIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    name="city"
                                    value={selectedCustomerData?.city || book.city}
                                    onChange={handleChange}
                                    id="address3"
                                    sx={{ m: 1, width: "200ch" }}
                                    variant="standard"
                                />
                            </div>

                            <div className="input">
                                <div className="icone">
                                    <FontAwesomeIcon icon={faSheetPlastic} size="lg" />
                                </div>
                                <TextField
                                    size="small"
                                    name="pfno"
                                    value={selectedCustomerData?.pfno || book.pfno}
                                    onChange={handleChange}
                                    label="PF No"
                                    id="PFNo"
                                />
                            </div>
                            <div className="input" style={{ width: "160px" }}>

                                {selectedCustomerData?.userid || book.userid ? (
                                    <Button color="primary" variant="contained" disabled={isFieldReadOnly("new")} component="label">
                                        License
                                        <input
                                            type="file"
                                            style={{ display: "none" }}
                                            onChange={(e) => setLicencepdf(e.target.files[0])}
                                        />
                                    </Button>
                                ) : (
                                    <Button color="primary" variant="contained" disabled={isFieldReadOnly("new")} onClick={() => {
                                        setError(true);
                                        setErrorMessage("Please Enter Booking No");
                                    }}>
                                        License
                                    </Button>
                                )}

                            </div>
                            <div className="input" >
                                <div className="icone">
                                    <FontAwesomeIcon icon={faFileInvoice} size="lg" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="durationofyears"
                                    label="Duration Of Years"
                                    value={selectedCustomerData?.durationofyears || book.durationofyears}
                                    onChange={handleChange}
                                    name="durationofyears"
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="input" style={{ width: "260px" }}>
                                <div className="icone">
                                    <AssignmentIndIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    name="aadharno"
                                    value={selectedCustomerData?.aadharno || book.aadharno}
                                    onChange={handleChange}
                                    label="Aadhar-card No"
                                    id="aadharno"
                                    sx={{ m: 1, width: "230ch" }}
                                    variant="standard"
                                />
                            </div>
                            <div className="input" style={{ width: "160px" }}>
                                {selectedCustomerData?.userid || book.userid ? (
                                    <Button color="primary" variant="contained" disabled={isFieldReadOnly("new")} component="label">
                                        aadhar card
                                        <input
                                            type="file"
                                            style={{ display: "none" }}
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                    </Button>
                                ) : (
                                    <Button color="primary" variant="contained" disabled={isFieldReadOnly("new")} onClick={() => {
                                        setError(true);
                                        setErrorMessage("Please Enter Booking No");
                                    }}>
                                        aadhar card
                                    </Button>
                                )}
                            </div>
                            <div className="input" style={{ width: "160px" }}>
                                {isEditMode ? (
                                    <Button variant="contained" onClick={handleEdit}>Edit</Button>
                                ) : (
                                    <Button variant="contained" onClick={handleAdd} disabled={isFieldReadOnly("new")}>Add</Button>
                                )}
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
                    {success &&
                        <div className='alert-popup Success' >
                            <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                            <p>{successMessage}</p>
                        </div>
                    }
                    {info &&
                        <div className='alert-popup Info' >
                            <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                            <p>{infoMessage}</p>
                        </div>
                    }
                    {passwordsMatch &&
                        <div className='alert-popup Warning' >
                            <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                            <p>Passwords do not match. Please try again.</p>
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
                    <div className="DriverCreation-table-container">
                        <div className="table-DriverCreations">
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                onRowClick={handleRowClick}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                            />
                        </div>
                        <Dialog open={dialogOpen} onClose={handleCloseDialog} >
                            <DialogContent>
                                <div style={{ position: 'relative' }}>
                                    {Array.isArray(allFile) && allFile.map((img, index) => (
                                        <div key={index} style={{ position: 'relative' }}>
                                            <embed src={`http://${apiUrl}/images/` + img.fileName} type="application/pdf" width="100%" height="600px" />
                                            <button onClick={() => handleimagedelete(img.fileName)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }} />
                                        </div>
                                    ))}
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Dialog open={dialogdeleteOpen} onClose={handleClosedeleteDialog}>
                            <DialogContent>
                                <div>
                                    <h3>Are you sure you want to delete?</h3>
                                    <div>
                                        <Button onClick={handleContextMenu}>yes</Button>
                                        <Button onClick={handleClosedeleteDialog}>No</Button>
                                    </div>

                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DriverCreation