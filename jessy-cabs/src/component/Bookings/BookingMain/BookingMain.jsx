import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Booking from "./Booking/Booking.jsx";
import TabContext from "@mui/lab/TabContext";
import BookingCopy from "./BookingCopy/BookingCopy.jsx";
import BokkingChart from "./BookingChart/BookingChart.jsx";

const BookingMain = () => {
  const [value, setValue] = React.useState("booking");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="form-container-booking">
      <div className="container-main">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Booking" value="booking" />
                <Tab label="Booking Copy" value="bookingcopy" />
                {/* <Tab label="Excel Import" value="excelimport" /> */}
                <Tab label="Booking Chart" value="bookingchart" />
              </TabList>
            </Box>
            <TabPanel value="booking">
              <Booking />
            </TabPanel>
            <TabPanel value="bookingcopy">
              <BookingCopy />
            </TabPanel>
            <TabPanel value="excelimport">
              {/* <Excelimport /> */}
            </TabPanel>
            <TabPanel value="bookingchart">
              <BokkingChart />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default BookingMain;
