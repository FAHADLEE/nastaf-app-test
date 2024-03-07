import React from 'react';
import './Dispatcheds.css';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Billed from './Billed/Billed';
import Closed from './Closed/Closed';
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Dispatched from './Dispatched/Dispatched';

const Dispatcheds = () => {
    const [value, setValue] = React.useState("dispatched");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="form-container-dispatched">
            <div className="container-main">
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Dispatched" value="dispatched" />
                                <Tab label="Closed" value="closed" />
                                <Tab label="Billed" value="billed" />
                            </TabList>
                        </Box>
                        <TabPanel value="dispatched"><Dispatched /></TabPanel>
                        <TabPanel value="closed"><Closed /></TabPanel>
                        <TabPanel value="billed"><Billed /> </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div >
    )
}

export default Dispatcheds