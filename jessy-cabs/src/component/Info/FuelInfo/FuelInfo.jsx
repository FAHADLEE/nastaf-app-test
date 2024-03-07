import React from "react";
import "./FuelInfo.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import FuelRate from "./FuelRate/FuelRate";
import TabContext from "@mui/lab/TabContext";
import MailageDetails from "./MailageDetails/MailageDetails";


const FuelInfo = () => {
  const [value, setValue] = React.useState("MailageDetails");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="FuelInfo-main">
      <div className="FuelInfo-form-container">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Mailage Details" value="MailageDetails" />
                <Tab label="FuelRate" value="FuelRate" />
              </TabList>
            </Box>
            <TabPanel value="MailageDetails">
              <MailageDetails />
            </TabPanel>
            <TabPanel value="FuelRate">
              <FuelRate />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default FuelInfo;
