import React from "react";
import "./UserSettings.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Themes from "./Themes/Themes";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import UserSetting from "./UserInfo/UserInfo";

const UserSettings = () => {
  const [value, setValue] = React.useState("UserInfo");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (

    <div className="UserSettings-main">
      <div className="form-container-UserSettings">
        <div className="container-main">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="User Info" value="UserInfo" />
                  <Tab label="Themes" value="Themes" />
                </TabList>
              </Box>
              <TabPanel value="UserInfo">
                <UserSetting />
              </TabPanel>
              <TabPanel value="Themes">
                <Themes />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>

  );
};

export default UserSettings;
