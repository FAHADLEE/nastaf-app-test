import React, { useState } from "react";
import dayjs from "dayjs";
import "./Excelimport.css";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
import { CustomerName } from "./Exceliport";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Checkbox } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";


// ICONS
import BackupIcon from "@mui/icons-material/Backup";
import DescriptionIcon from "@mui/icons-material/Description";


// TABLE START
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "registerno", headerName: "Register No", width: 130 },
  { field: "band", headerName: "Band", width: 130 },
  { field: "employeeno", headerName: "Employee No", width: 90 },
  { field: "employeename", headerName: "Employee Name", width: 160 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "shift", headerName: "Shift", width: 130 },
  { field: "picktime", headerName: "Pick Time", width: 130 },
  { field: "reportingaddress", headerName: "Reporting Address", width: 130 },
  { field: "cartype", headerName: "Car Type", width: 130 },
  { field: "ac", headerName: "AC", width: 130 }, // Unique field value
  { field: "project", headerName: "Project", width: 130 }, // Unique field value
  { field: "importid", headerName: "Import ID", width: 130 }, // Unique field value
];

const rows = [
  {
    id: 1,
    registerno: 1,
    band: "Band 1",
    employeeno: "Employee 1",
    employeename: "John Doe",
    date: "2023-06-07",
    shift: "Morning",
    picktime: "9:00 AM",
    reportingaddress: "123 Street, Apt 4B, City",
    cartype: "ABC Car",
    ac: "Yes",
    project: "Project 1",
    importid: "Import 1",
  },
  {
    id: 2,
    registerno: 2,
    band: "Band 2",
    employeeno: "Employee 2",
    employeename: "Jane Smith",
    date: "2023-06-08",
    shift: "Evening",
    picktime: "2:00 PM",
    reportingaddress: "456 Avenue, Unit 8, Town",
    cartype: "XYZ Car",
    ac: "No",
    project: "Project 2",
    importid: "Import 2",
  },
];
// TABLE START

const Excelimport = () => {
  const [sheets, setSheets] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetNames = workbook.SheetNames;

        if (sheetNames.length > 0) {
          setSheets(sheetNames);
        }
      };

      reader.readAsArrayBuffer(file);
    } else {
      setSheets([]);
    }
  };

  return (
    <div className="bookingcopy-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-ExcelImport">
              <div className="input-field">
                <div className="input">
                  <div className="icone">
                    <BackupIcon color="action" />
                  </div>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<DescriptionIcon />}
                  >
                    Excel
                    <input
                      type="file"
                      onChange={handleFileChange}
                      onClick={(e) => (e.target.value = null)} // Reset file input value on click
                      style={{ display: "none" }}
                    />
                  </Button>
                </div>
                <div className="input" style={{ width: "50%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Booking Date" format="DD/MM/YYYY" defaultValue={dayjs()} />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "70px" }}>
                  <Button variant="outlined">Show</Button>
                </div>
                <div className="input" style={{ width: "70px" }}>
                  <Button variant="contained">Save</Button>
                </div>
              </div>
              <div className="input-field">
                <div className="input">
                  <div className="icone">
                    <DescriptionIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={sheets.map((option) => option)}
                    options={sheets.map((option) => ({ label: option }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Sheet" />
                    )}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    {/* <AirportShuttleIcon color="action" /> */}
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={CustomerName.map((option) => option.optionvalue)}
                    options={CustomerName.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Customer Name" />
                    )}
                  />
                </div>
                <div className="input">
                  <FormControlLabel
                    value="Ignore Existing"
                    control={<Checkbox size="small" />}
                    label="Ignore Existing"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-bookingCopy-Excelimport">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Excelimport;
