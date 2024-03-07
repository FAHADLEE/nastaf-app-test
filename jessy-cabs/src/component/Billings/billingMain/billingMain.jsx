import React from 'react'
import './BillingMain.css'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import Billing from './Billing/Billing';
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import BankAccount from './BankAccount/BankAccount';
import PaymentDetail from './PaymentDetail/PaymentDetail';


const BillingMain = () => {
  const [value, setValue] = React.useState("billing");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="form-container-BillingMain">
      <div className="container-main">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Billing" value="billing" />
                <Tab label="Payment" value="payment" />
                <Tab label="BankAccount Details" value="bankAccountdetails" />
              </TabList>
            </Box>
            <TabPanel value="billing"><Billing /></TabPanel>
            <TabPanel value="payment"><PaymentDetail /></TabPanel>
            <TabPanel value="bankAccountdetails"><BankAccount /></TabPanel>
          </TabContext>
        </Box>
       
      </div>
    </div >
  )
}

export default BillingMain