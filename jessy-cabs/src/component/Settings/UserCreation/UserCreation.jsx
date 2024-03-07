import React from "react";
import "./UserCreation.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import AppUserList from "./AppUserList/AppUserList";
import DriverCreation from "./DriverCreation/DriverCreation";
import EmployeeCreation from "./EmployeeCreation/EmployeeCreation";

const UserCreation = () => {
    const [value, setValue] = React.useState("Employee");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="main-setting-main">
            <div className="main-setting-form-container">
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList onChange={handleChange}>
                                <Tab label="User" value="Employee" />
                                <Tab label="Driver" value="Driver" />
                                <Tab label="App User List" value="appuserlist" />
                            </TabList>
                        </Box>
                        <TabPanel value="Employee"><EmployeeCreation /></TabPanel>
                        <TabPanel value="Driver"><DriverCreation /></TabPanel>
                        <TabPanel value="appuserlist"> <AppUserList /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    );
};

export default UserCreation