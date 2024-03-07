import React, { useEffect, useState } from 'react';
import './Transfer.css'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TransferDataEntry from './TransferDataEntry/TransferDataEntry';
import TransferList from './TransferList/TransferList';
import TransferReport from './TransferReport/TransferReport';

const Transfer = () => {
  const [value, setValue] = useState("transferlist");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam) {
      setValue(tabParam);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="form-container-Transfer">
      <div className="container-main">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Transfer List" value="transferlist" />
                <Tab label="Data Entry" value="dataentry" />
                <Tab label="Transfer Report" value="TransferReport" />
              </TabList>
            </Box>
            <TabPanel value="transferlist"><TransferList /></TabPanel>
            <TabPanel value="dataentry"><TransferDataEntry /></TabPanel>
            <TabPanel value="TransferReport"><TransferReport /></TabPanel>
          </TabContext>
        </Box>

      </div>
    </div >
  )
}

export default Transfer