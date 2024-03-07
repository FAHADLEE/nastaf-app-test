import React from 'react'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import DriverBataRate from './DriverBataRate/DriverBataRate';
import PackageRateEntery from './PackageRateEntery/PackageRateEntery';

const RateManagement = () => {

  const [value, setValue] = React.useState("packagerateentery");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="form-container-PackageRateEntery">
      <div className="container-main">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Package Rate" value="packagerateentery" />
                <Tab label="Driver Bata Rate" value="driverbatarate" />
              </TabList>
            </Box>
            <TabPanel value="packagerateentery"><PackageRateEntery /></TabPanel>
            <TabPanel value="driverbatarate"><DriverBataRate /></TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  )
}

export default RateManagement