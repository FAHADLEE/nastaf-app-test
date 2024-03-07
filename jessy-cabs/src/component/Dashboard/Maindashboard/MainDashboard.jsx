import React, { useState, useEffect, useCallback } from "react";
import "./MainDashboard.css";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Sidebar from "../MainDash/Sildebar/Slidebar";
import { useNavigate, Outlet } from "react-router-dom";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import { useThemes } from "../../UserSettings/Themes/ThemesContext";
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { ThemesProvider } from "../../UserSettings/Themes/ThemesContext";
import { useUser } from "../../form/UserContext";
import Button from "@mui/material/Button";
import { useData } from "./DataContext"; //- data contaxt
import axios from "axios";

//dialog box
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { APIURL } from "../../url";

const MainDashboard = () => {
  const apiUrl = APIURL;
  const { sharedData } = useData();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const { selectedTheme } = useThemes();
  const { setSelectedTheme } = useThemes();
  const { user } = useUser();
  const [success, setSuccess] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const IDLE_TIMEOUT_DURATION = 5 * 60 * 1000;

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {},
    "@keyframes ripple": {},
  }));

  const handleLogout = useCallback(() => {
    setPopupOpen(true);
  }, []);

  const handleLogoutdialog = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
      }
      localStorage.removeItem("auth");
      localStorage.removeItem("username");
      localStorage.removeItem("useridno");
      localStorage.removeItem("selectedImage");
      localStorage.removeItem("selectedprofileImage");
      localStorage.removeItem("usercompany");
      localStorage.removeItem("selectedMenuItem");
      setExpanded(true);
      navigate("/");
    },
    [navigate]
  );

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/");
    } else {
      let timeout;

      const resetIdleTimeout = () => {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          handleLogout();
        }, IDLE_TIMEOUT_DURATION);
      };

      const handleUserActivity = () => {
        resetIdleTimeout();
      };

      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("keydown", handleUserActivity);

      resetIdleTimeout();

      return () => {
        window.removeEventListener("mousemove", handleUserActivity);
        window.removeEventListener("keydown", handleUserActivity);
        clearTimeout(timeout);
      };
    }
  }, [navigate, handleLogout, IDLE_TIMEOUT_DURATION]);

  const hidePopup = () => {
    setSuccess(false);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (user && user.username) {
      const username = user.username;
      localStorage.setItem("username", username);
      const successMessagepopup = `Login successful ${user.username}`;
      setSuccess(successMessagepopup);
    }
  }, [user]);

  const storedUsername = localStorage.getItem("username");

  const navigateToUserSettings = () => {
    if (window.location.pathname !== "/home/usersettings/usersetting") {
      navigate("/home/usersettings/usersetting");
    }
  };

  const [routeData, setRouteData] = useState("");

  const storeUsername = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      const username = storeUsername;
      try {
        const response = await fetch(
          `http://${apiUrl}/userdata/${encodeURIComponent(username)}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const routeData = await response.json();
        const usertheme = routeData[0]?.theme;
        setSelectedTheme(usertheme);
        localStorage.setItem("selectedusertheme", JSON.stringify(usertheme));
        setRouteData(routeData);
      } catch (error) {}
    };
    fetchData();
  }, [storeUsername, setSelectedTheme, apiUrl]);
  const storedusertheme = JSON.parse(localStorage.getItem("selectedusertheme"));

  const useridno = routeData[0]?.userid;
  const usercompany = routeData[0]?.organizationname;

  localStorage.setItem("useridno", useridno);

  localStorage.setItem("usercompany", usercompany);

  // to show icon image
  useEffect(() => {
    const handleImageView = () => {
      const userid = localStorage.getItem("useridno");
      axios.get(`http://${apiUrl}/userprofileview/${userid}`).then((res) => {
        if (res.status === 200) {
          setSelectedImage(res.data[0]?.filename); // Assuming res.data.prof contains the image data
        } else {
          const timer = setTimeout(handleImageView, 100);
          return () => clearTimeout(timer);
        }
      });
    };
    handleImageView();
  }, [sharedData, selectedImage, apiUrl]);

  return (
    <section
      className={`dash-board ${
        storedusertheme ? storedusertheme : selectedTheme
      }`}
    >
      <div className="glass">
        <Sidebar expanded={expanded} />
        <div className="header-user">
          <div className="avatar-item">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt="userimage"
                src={`http://${apiUrl}/images/${selectedImage}`}
              />
            </StyledBadge>
          </div>
          <div className="user-name-item">
            {storedUsername ? (
              <div>
                <p onClick={navigateToUserSettings}>{storedUsername}</p>
                {success && (
                  <div className="alert-popup Success">
                    <div className="popup-icon">
                      {" "}
                      <FileDownloadDoneIcon style={{ color: "#fff" }} />{" "}
                    </div>
                    <span className="cancel-btn" onClick={hidePopup}>
                      <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
                    </span>
                    <p>{success}</p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p>User not logged in</p>
              </div>
            )}
          </div>
          <div className="logout-item">
            <FiLogOut className="logout-icon" onClick={handleLogout} />
          </div>
        </div>
        <Outlet />
      </div>
      <Dialog open={popupOpen} onClose={handlePopupClose}>
        <DialogContent>
          <p>Do you want to logout</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleLogoutdialog}
            variant="contained"
            color="primary"
          >
            Yes
          </Button>
          <Button
            onClick={handlePopupClose}
            variant="contained"
            color="primary"
          >
            NO
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

const WrappedMainDashboard = () => {
  return (
    <ThemesProvider>
      <MainDashboard />
    </ThemesProvider>
  );
};

export default WrappedMainDashboard;
