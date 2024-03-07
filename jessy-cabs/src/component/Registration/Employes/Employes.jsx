import React from 'react';
import './Employes.css';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import Employe from './Employe/Employe';
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

const Employes = () => {
    const [value, setValue] = React.useState("employes");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="form-container-Emplyes">
            <div className="container-main ">
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Employes" value="employes" />
                            </TabList>
                        </Box>
                        <TabPanel value="employes"><Employe /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div >
    )
}

export default Employes