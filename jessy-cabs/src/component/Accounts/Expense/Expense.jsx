import React from 'react'
import './Expense.css'
import Asset from './Asset/Asset';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Others from './Others/Others';
import TabList from "@mui/lab/TabList";
import PayRoll from './PayRoll/PayRoll';
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import PettyCash from './PettyCash/PettyCash';
import Liabilities from './Liabilities/Liabilities';

const Expense = () => {
  const [value, setValue] = React.useState("pettycash");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="form-container-Expense">
      <div className="container-main">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Petty Cash" value="pettycash" />
                <Tab label="Pay Roll" value="payroll" />
                <Tab label="Assets" value="assets" />
                <Tab label="Liabilities" value="liabilities" />
                <Tab label="Others" value="others" />
              </TabList>
            </Box>
            <TabPanel value="pettycash"><PettyCash /></TabPanel>
            <TabPanel value="payroll"><PayRoll /></TabPanel>
            <TabPanel value="assets"><Asset /></TabPanel>
            <TabPanel value="liabilities"><Liabilities /></TabPanel>
            <TabPanel value="others"><Others /></TabPanel>
          </TabContext>
        </Box>
      </div>
    </div >
  )
}

export default Expense