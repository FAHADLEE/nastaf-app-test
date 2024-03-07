import React from 'react'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Accountinfo from './Account_Info/Accountinfo.jsx';
import Vehicaleinfo from './Vehicale_Info/Vehicaleinfo.jsx';

const Suppliers = () => {
    const [value, setValue] = React.useState("accounting_info");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="form-container">
            <div className="container-main">
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Accounting Info" value="accounting_info" />
                                <Tab label="Vehicle Info" value="vehicle_info" />

                            </TabList>
                        </Box>
                        <TabPanel value="accounting_info"><Accountinfo /></TabPanel>
                        <TabPanel value="vehicle_info"><Vehicaleinfo /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    )
}

export default Suppliers