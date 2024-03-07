import React from 'react'
import './Receiveds.css'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import Pending from './Pending/Pending';
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import VehicleStatement from './VehicleStatement/VehicleStatement';

const Receiveds = () => {
    const [value, setValue] = React.useState("pending");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div className="form-container-receiveds">
                <div className="container-main">
                    <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Pending" value="pending" />
                                    <Tab label="Vehicle Statement" value="vehiclestatement" />
                                </TabList>
                            </Box>
                            <TabPanel value="pending"><Pending /></TabPanel>
                            <TabPanel value="vehiclestatement"><VehicleStatement /></TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div >
        </>
    )
}

export default Receiveds