import React, { useEffect } from "react";
import "./Employe.css";
import "jspdf-autotable";
import dayjs from "dayjs";

import Box from "@mui/material/Box";

import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import { TextField } from "@mui/material";
import { AiOutlineFileSearch } from "react-icons/ai";

import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

// ICONS
import useEmployee from "./useEmployee";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ChecklistIcon from "@mui/icons-material/Checklist";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import DeviceHubRoundedIcon from "@mui/icons-material/DeviceHubRounded";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import TransgenderRoundedIcon from "@mui/icons-material/TransgenderRounded";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
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

const Employe = () => {
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
    formData,
    handleDateChange,
    handleExcelDownload,
    handlePdfDownload,
    columns,
    searchText,
    setSearchText,
    handleShowAll,
    allFile,
    handleCloseDialog,
    dialogOpen,
    setFile,
    isEditMode,
    handleEdit,
    handleContextMenu,
    handleimagedelete,
    handleClosedeleteDialog,
    dialogdeleteOpen,
    setError,
    setErrorMessage,
  } = useEmployee();

  useEffect(() => {
    if (actionName === "List") {
      handleClick(null, "List");
    }
  }, [actionName, handleClick]);

  return (
    <div className="Employe-form Scroll-Style-hide">
      <form onSubmit={handleClick}>
        <div className="detail-container-main-Employe">
          <div className="container-Employe">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="id"
                  label="Employe ID"
                  name="empid"
                  autoComplete="new-password"
                  value={selectedCustomerData?.empid || book.empid}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PermIdentityIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="name"
                  label="Name"
                  name="empname"
                  autoComplete="new-password"
                  value={selectedCustomerData?.empname || book.empname}
                  onChange={handleChange}
                />
              </div>
              <div className="input" style={{ width: "215px" }}>
                <div className="icone">
                  <EmailIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="emailid"
                  label="Email Id"
                  name="empemailid"
                  autoComplete="new-password"
                  value={selectedCustomerData?.empemailid || book.empemailid}
                  onChange={handleChange}
                />
              </div>
              <div className="input" style={{ width: "215px" }}>
                <div className="icone">
                  <PhoneIphoneIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="mobile"
                  label="Mobile"
                  name="empmobile"
                  autoComplete="new-password"
                  value={selectedCustomerData?.empmobile || book.empmobile}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <WorkOutlineRoundedIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="jobroll"
                  label="Job Roll"
                  name="jobroll"
                  autoComplete="new-password"
                  value={selectedCustomerData?.jobroll || book.jobroll}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Joining Date"
                    format="DD/MM/YYYY"
                    value={
                      formData.joiningdate || selectedCustomerData.joiningdate
                        ? dayjs(selectedCustomerData.joiningdate)
                        : null
                    }
                    onChange={(date) => handleDateChange(date, "joiningdate")}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField
                        {...inputProps}
                        inputRef={inputRef}
                        value={selectedCustomerData?.joiningdate}
                      />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              <div className="input" style={{ width: "215px" }}>
                <div className="icone">
                  <TransgenderRoundedIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="gender"
                  label="Gender"
                  name="gender"
                  autoComplete="new-password"
                  value={selectedCustomerData?.gender || book.gender}
                  onChange={handleChange}
                />
              </div>
              <div className="input" style={{ width: "215px" }}>
                <div className="icone">
                  <BloodtypeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="bloodgroup"
                  label="Blood Group"
                  name="bloodgroup"
                  autoComplete="new-password"
                  value={selectedCustomerData?.bloodgroup || book.bloodgroup}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "415px" }}>
                <div className="icone">
                  <AddHomeWorkIcon color="action" />
                </div>
                <TextField
                  sx={{ width: "415px" }}
                  size="small"
                  id="address1"
                  label="Address"
                  name="address1"
                  autoComplete="new-password"
                  value={selectedCustomerData?.address1 || book.address1}
                  onChange={handleChange}
                  variant="standard"
                />
              </div>
              <div className="input" style={{ width: "215px" }}>
                <div className="icone">
                  <ContactMailIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="aadharcard"
                  label="Aadhar Card"
                  name="aadharcard"
                  autoComplete="new-password"
                  value={selectedCustomerData?.aadharcard || book.aadharcard}
                  onChange={handleChange}
                />
              </div>
              <div className="input" style={{ width: "215px" }}>
                <div className="icone">
                  <FactCheckIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="pancard"
                  label="Pan Card"
                  name="pancard"
                  autoComplete="new-password"
                  value={selectedCustomerData?.pancard || book.pancard}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "415px" }}>
                <div className="icone">
                  <LocationCityIcon color="action" />
                </div>
                <TextField
                  sx={{ width: "415px" }}
                  size="small"
                  id="address2"
                  name="address2"
                  autoComplete="new-password"
                  value={selectedCustomerData?.address2 || book.address2}
                  onChange={handleChange}
                  variant="standard"
                />
              </div>
              <div className="input" style={{ width: "215px" }}>
                <div className="icone">
                  <EscalatorWarningIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="guardian"
                  label="Guardian"
                  name="guardian"
                  autoComplete="new-password"
                  value={selectedCustomerData?.guardian || book.guardian}
                  onChange={handleChange}
                />
              </div>
              <div className="input" style={{ width: "215px" }}>
                <div className="icone">
                  <CurrencyRupeeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="fixedsalary"
                  label="Fixed Salary"
                  name="fixedsalary"
                  autoComplete="new-password"
                  value={selectedCustomerData?.fixedsalary || book.fixedsalary}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "260px" }}>
                <div className="icone">
                  <DeviceHubRoundedIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="uanid"
                  label="UAN Id"
                  name="uanid"
                  autoComplete="new-password"
                  value={selectedCustomerData?.uanid || book.uanid}
                  onChange={handleChange}
                />
              </div>
              <div className="input" style={{ width: "260px" }}>
                <div className="icone">
                  <MedicalInformationIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="esino"
                  label="ESI No"
                  name="esino"
                  autoComplete="new-password"
                  value={selectedCustomerData?.esino || book.esino}
                  onChange={handleChange}
                />
              </div>
              <div className="input" style={{ width: "250px" }}>
                <div className="icone">
                  <DirectionsCarIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="drivinglicence no"
                  label="Drving Licence No"
                  name="licenceno"
                  autoComplete="new-password"
                  value={selectedCustomerData?.licenceno || book.licenceno}
                  onChange={handleChange}
                />
              </div>
              <div className="input" style={{ width: "20px" }}>
                {selectedCustomerData?.empid || book.empid ? (
                  <Button component="label">
                    <UploadFileIcon />
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
                    <UploadFileIcon />
                  </Button>
                )}
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "160px" }}>
                {isEditMode ? (
                  <Button variant="contained" onClick={handleEdit}>Edit</Button>
                ) : (
                  <Button variant="contained" onClick={handleAdd} disabled={isFieldReadOnly("new")}>Add</Button>
                )}
              </div>
            </div>
          </div>
        </div>
        {error && (
          <div className="alert-popup Error">
            <div className="popup-icon">
              {" "}
              <ClearIcon style={{ color: "#fff" }} />{" "}
            </div>
            <span className="cancel-btn" onClick={hidePopup}>
              <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
            </span>
            <p>{errorMessage}</p>
          </div>
        )}
        {warning && (
          <div className="alert-popup Warning">
            <div className="popup-icon">
              {" "}
              <ErrorOutlineIcon style={{ color: "#fff" }} />{" "}
            </div>
            <span className="cancel-btn" onClick={hidePopup}>
              <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
            </span>
            <p>{warningMessage}</p>
          </div>
        )}
        {success && (
          <div className="alert-popup Success">
            <div className="popup-icon">
              {" "}
              <FileDownloadDoneIcon style={{ color: "#fff" }} />{" "}
            </div>
            <span className="cancel-btn" onClick={hidePopup}>
              <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
            </span>
            <p>{successMessage}</p>
          </div>
        )}
        {info && (
          <div className="alert-popup Info">
            <div className="popup-icon">
              {" "}
              <BsInfo style={{ color: "#fff" }} />{" "}
            </div>
            <span className="cancel-btn" onClick={hidePopup}>
              <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
            </span>
            <p>{infoMessage}</p>
          </div>
        )}
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
                onClick={(event) =>
                  handleClick(event, action.name, selectedCustomerId)
                }
              />
            ))}
          </StyledSpeedDial>
        </Box>
        <div className="Employe-search-container">
          <div className="input-field" style={{ justifyContent: "center" }}>
            <div className="input" style={{ width: "230px" }}>
              <div className="icone">
                <AiOutlineFileSearch
                  color="action"
                  style={{ fontSize: "27px" }}
                />
              </div>
              <TextField
                size="small"
                id="id"
                label="Search"
                name="searchText"
                value={searchText || ''}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="input" style={{ width: "140px" }}>
              <Button variant="contained" onClick={handleShowAll}>Search</Button>
            </div>
          </div>
        </div>
        <div className="Download-btn">
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button
                  variant="contained"
                  endIcon={<ExpandCircleDownOutlinedIcon />}
                  {...bindTrigger(popupState)}
                >
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
        <div className="table-bookingCopy-Employe ">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              className="Scroll-Style"
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick}
              pageSize={5}
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
                <h3>are you sure you want to delete</h3>
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
  );
};

export default Employe;
