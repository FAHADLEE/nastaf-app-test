import React from 'react';
import "./SMSReport.css";
import dayjs from "dayjs";
import { Status } from "./SMSReportData";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DescriptionIcon from "@mui/icons-material/Description";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";


const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "serialid", headerName: "Serial Id", width: 130 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "time", headerName: "Time", width: 130 },
  { field: "Phone", headerName: "Phone", width: 130 },
  { field: "Message", headerName: "Message", width: 130 },
  { field: "Status", headerName: "Status", width: 130 },
];

const rows = [
  {
    id: 1,
    serialid: 222,
    date: "2023-06-07",
    time: "9:00 AM",
    Phone: "Morning",
    Message: "9:00 AM",
    Status: "123 Street, Apt 4B, City",

  },
  {
    id: 2,
    serialid: 223,
    date: "2023-06-08",
    time: "9:00 AM",
    Phone: "Evening",
    Message: "2:00 PM",
    Status: "456 Avenue, Unit 8, Town",
  },
  // Add more rows as needed
];

const SMSReport = () => {

  return (
    <div className="smsreport-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-SMSReport">
              <div className="input-field">
                <div className="input" style={{ width: "50%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="From Date" defaultValue={dayjs()} />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "50%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="To Date" defaultValue={dayjs()} />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "120px" }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<DescriptionIcon />}
                  >
                    Excel
                    <input
                      type="file"

                      style={{ display: "none" }}
                    />
                  </Button>
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "300px" }}>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={Status.map((option) => option.optionvalue)}
                    options={Status.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Status" />
                    )}
                  />
                </div>
                <div className="input" style={{ width: "120px" }}>
                  <Button variant="contained">Show</Button>
                </div>
                <div className="input" style={{ width: "120px" }}>
                  <Button variant="outlined">Show All</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-bookingCopy-SMSReport">
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
  )
}

export default SMSReport