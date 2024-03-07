import React from 'react'
import './Income.css'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import PayRoll from '../Expense/PayRoll/PayRoll';
import AssetIncome from './AssetIncome/AssetIncome';

const Income = () => {
  const [value, setValue] = React.useState("AssetIncome");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="form-container-Income">
      <div className="container-main">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Asset Income" value="AssetIncome" />
                <Tab label="Pay Roll" value="payroll" />
              </TabList>
            </Box>
            <TabPanel value="AssetIncome"><AssetIncome /></TabPanel>
            <TabPanel value="payroll"><PayRoll /></TabPanel>
          </TabContext>
        </Box>
      </div>
    </div >
  )
}

export default Income