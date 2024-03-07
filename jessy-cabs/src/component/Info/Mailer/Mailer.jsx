import React from 'react';
import './Mailer.css'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import SMSReport from './SMSReport/SMSReport';
import SMSFormat from './SMSFromat/SMSFormat';
import MailDetails from './MailDetails/MailDetails'; 

const Mailer = () => {

    const [value, setValue] = React.useState("Mailer");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="form-container-Mailer">
            <div className="container-main">
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Mailer" value="Mailer" />
                                <Tab label="SMS Report" value="SMSReport" />
                                <Tab label="SMS Format" value="SMSFormat" />
                            </TabList>
                        </Box>
                        <TabPanel value="Mailer"><MailDetails /></TabPanel>
                        <TabPanel value="SMSReport"><SMSReport /></TabPanel>
                        <TabPanel value="SMSFormat"><SMSFormat /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div >
    )
}

export default Mailer