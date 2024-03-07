import React from "react";
import axios from "axios";
import "./Themes.css";
import { useThemes } from "./ThemesContext"; 
import { APIURL } from "../../url";

const Themes = () => {
  const apiUrl = APIURL;
  const { setSelectedTheme } = useThemes();

  const handleThemeChange = async (theme) => {
    const userid = localStorage.getItem('useridno');
    setSelectedTheme(theme);
    localStorage.removeItem("selectedusertheme");
    await axios.post(`http://${apiUrl}/updatethemename`, {
      userid: userid,
      theme: theme
    });
  };

  return (
    <div className="themes">
      <div className="theme-options-main">
        <h2 className="Theme-Title">Select Your Theme</h2>
        <div className="theme-options">
          <div
            className="theme-image"
            onClick={() => handleThemeChange("theme1")}
          >
            <img src="https://nastaf.com/themes/theme-1.jpg" alt="Theme 1" />
            <p>Beach Sunrise</p>
          </div>
          <div
            className="theme-image"
            onClick={() => handleThemeChange("theme2")}
          >
            <img src="https://nastaf.com/themes/theme-2.jpg" alt="Theme 2" />
            <p>Evening City </p>
          </div>
          <div
            className="theme-image"
            onClick={() => handleThemeChange("theme3")}
          >
            <img src="https://nastaf.com/themes/theme-3.jpg" alt="Theme 3" />
            <p>Afternoon City </p>
          </div>

          <div
            className="theme-image"
            onClick={() => handleThemeChange("theme4")}
          >
            <img src="https://nastaf.com/themes/theme-4.jpg" alt="Theme 4" />
            <p>Night City </p>
          </div>
        </div>
        <div className="theme-options">
          <div
            className="theme-image"
            onClick={() => handleThemeChange("theme5")}
          >
            <img src="https://nastaf.com/themes/theme-5.jpg" alt="Theme 5" />
            <p>Art</p>
          </div>
          <div
            className="theme-image"
            onClick={() => handleThemeChange("theme6")}
          >
            <img src="https://nastaf.com/themes/theme-6.jpg" alt="Theme 6" />
            <p>Robot City </p>
          </div>
          <div
            className="theme-image"
            onClick={() => handleThemeChange("theme7")}
          >
            <img src="https://nastaf.com/themes/theme-7.jpg" alt="Theme 7" />
            <p>Green grass</p>
          </div>

          <div
            className="theme-image"
            onClick={() => handleThemeChange("theme8")}
          >
            <img src="https://nastaf.com/themes/theme-8.jpg" alt="Theme 8" />
            <p>nature painting</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Themes;
