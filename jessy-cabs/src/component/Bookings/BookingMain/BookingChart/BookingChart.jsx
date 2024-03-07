import React, { useEffect } from "react";

import "./BookingChart.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// ICONS
import ClearIcon from "@mui/icons-material/Clear";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import useBookingchart from "./useBookingchart";

const BookingChart = () => {
  const {
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    handleClick,
    isFieldReadOnly,
    hidePopup,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    vehicles,
    columns,
    showBookedStatusAll,
  } = useBookingchart();

  useEffect(() => {
    if (actionName === "List") {
      handleClick(null, "List");
    }
  }, [actionName, handleClick]);
  return (
    <div className="BookingChart-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-BookingChart">
              <div className="input-field">
                <div className="input" style={{ width: "50%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="From Date"
                      format="DD/MM/YYYY"
                      value={fromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "50%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="To Date"
                      format="DD/MM/YYYY"
                      value={toDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "460px" }}>
                  <Button
                    variant="contained"
                    onClick={() => showBookedStatusAll(fromDate, toDate)}
                    disabled={isFieldReadOnly("read")}
                  >
                    Show Booked Status All
                  </Button>
                </div>
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
        <div className="table-bookingCopy-BookingChart">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              className="Scroll-Style"
              rows={vehicles}
              columns={columns}
              pageSize={5}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingChart;
