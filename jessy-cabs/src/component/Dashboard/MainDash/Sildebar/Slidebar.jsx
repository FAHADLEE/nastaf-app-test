import React, { useState, useEffect } from "react";
import { useData } from "../../MainDash/Sildebar/DataContext2";
import axios from "axios";
import "./Sidebar.css";
import Avatar from "@mui/material/Avatar";
import { motion } from "framer-motion";
import { Sidebardata } from "./Sidebar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import { BiBuildings } from "@react-icons/all-files/bi/BiBuildings";

// ICONS
import { useUser } from "../../../form/UserContext";
import { BiHomeAlt } from "@react-icons/all-files/bi/BiHomeAlt";
import { BiNotepad } from "@react-icons/all-files/bi/BiNotepad";
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { AiOutlineBars } from "@react-icons/all-files/ai/AiOutlineBars";
import { HiOutlineUsers } from "@react-icons/all-files/hi/HiOutlineUsers";
import { FaUserAstronaut } from "@react-icons/all-files/fa/FaUserAstronaut";
import { BiBarChartSquare } from "@react-icons/all-files/bi/BiBarChartSquare";
import { AiOutlineSetting } from "@react-icons/all-files/ai/AiOutlineSetting";
import { AiOutlineInfoCircle } from "@react-icons/all-files/ai/AiOutlineInfoCircle";
import { APIURL } from "../../../url";

const MenuItem = ({
  label,
  to,
  value,
  alt,
  menuItemKey,
  name,
  isActive,
  handleMenuItemClick,
  icon: Icon,
}) => {
  return (
    <Link
      className={isActive(value) ? "menuItem active" : "menuItem"}
      to={to}
      onClick={() => handleMenuItemClick(menuItemKey, name, alt)}
    >
      <Icon />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const apiUrl = APIURL;

  const location = useLocation();
  const { user } = useUser();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [expanded, setExpanded] = useState(true);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {},
    "@keyframes ripple": {},
  }));

  const user_id = localStorage.getItem("useridno");
  const [permissions, setPermissions] = useState({});

  //--------------------------to show logo

  const { sharedData } = useData();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedprofileImage, setSelectedprofileImage] = useState(null);

  useEffect(() => {
    const handleImageView = async () => {
      const organizationname = localStorage.getItem("usercompany");
      await axios
        .get(`http://${apiUrl}/log-imageview/${organizationname}`)
        .then((res) => {
          if (res.status === 200) {
            setSelectedImage(res.data[0]?.fileName);
            localStorage.setItem("selectedlogo", selectedImage);
            if (selectedImage === null) {
              const storedImage = localStorage.getItem("selectedlogo");
              if (storedImage) {
                setSelectedImage(storedImage);
              }
            } else {
              const timer = setTimeout(handleImageView, 100);
              return () => clearTimeout(timer);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching image data:", error);
        });
    };
    handleImageView();
  }, [sharedData, selectedImage,apiUrl]);

  //------------------------------------------

  const [info, setInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState({});

  const hidePopup = () => {
    setSuccess(false);
    setInfo(false);
    setInfoMessage("");
  };

  useEffect(() => {
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [info]);
  //end

  useEffect(() => {
    if (!localStorage.getItem("auth")) navigate("/");
  }, [navigate]);

  const isActive = (itemKey) => {
    return currentPath.includes(itemKey);
  };

  const handleMenuItemClick = async (menuItemKey, name, alt) => {
    const currentPageName = name;
    localStorage.setItem("selectedMenuItem", menuItemKey);

    try {
      const response = await axios.get(
        `http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`
      );
      const permissions = response.data;
      setPermissions(permissions);

      if (permissions.read_permission === 1) {
        navigate(alt);
      } else {
        setInfo(true);
        setInfoMessage("You do not have permission to access this page.");
      }
    } catch {}
  };

  useEffect(() => {
    const selectedMenuItem = localStorage.getItem("selectedMenuItem");
    const selectedItemIndex = Sidebardata.findIndex(
      (item) => item.key === selectedMenuItem
    );
    if (selectedItemIndex !== -1) {
      navigate(selectedMenuItem);
    }
  }, [navigate]);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organizationname = localStorage.getItem("usercompany");

        if (!organizationname) {
          return;
        }

        const response = await fetch(
          `http://${apiUrl}/get-companyimage/${organizationname}`
        );

        if (response.status === 200) {
          const data = await response.json();
          const attachedImageUrls = data.imagePaths.map(
            (path) => `http://${apiUrl}/images/${path}`
          );

          localStorage.setItem(
            "selectedImage",
            JSON.stringify(attachedImageUrls)
          );
        } else {
          const timer = setTimeout(fetchData, 2000);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const handleImageView = () => {
      const userid = localStorage.getItem("useridno");
      axios
        .get(`http://${apiUrl}/userprofileview/${userid}`)
        .then((res) => {
          if (res.status === 200) {
            setSelectedprofileImage(res.data[0]?.filename); // Assuming res.data.prof contains the image data
          } else {
            const timer = setTimeout(handleImageView, 100);
            return () => clearTimeout(timer);
          }
        });
    };
    handleImageView();
  }, [sharedData, selectedprofileImage,apiUrl]);

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <AiOutlineBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        <div className="logo">
          {selectedImage !== null ? (
            <>
              {!isImageLoaded && (
                <div style={{ fontSize: "55px" }}>
                  <BiBuildings />
                </div>
              )}
              <img
                src={`http://${apiUrl}/images/${selectedImage}`}
                alt=""
                onLoad={() => setIsImageLoaded(true)}
                style={{ display: isImageLoaded ? "block" : "none" }}
              />
            </>
          ) : (
            <div style={{ fontSize: "55px" }}>
              <BiBuildings />
            </div>
          )}
        </div>
        <div className="menu">
          <MenuItem
            label="Dashboard"
            to="/home/dashboard"
            value="/home/dashboard"
            alt="/home/dashboard"
            name="Dashboard page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={BiHomeAlt}
          />
          <MenuItem
            label="Booking"
            to={permissions.read && "/home/bookings/booking"}
            alt="/home/bookings/booking"
            value="/home/bookings"
            menuItemKey="/home/bookings"
            name="Booking page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={HiOutlineUsers}
          />
          <MenuItem
            label="Billing"
            to={permissions.read && "/home/billing/billing"}
            alt="/home/billing/billing"
            value="/home/billing"
            menuItemKey="/home/billing"
            name="Billing page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={BiBarChartSquare}
          />
          <MenuItem
            label="Register"
            to={permissions.read && "/home/registration/customer"}
            alt="/home/registration/customer"
            value="/home/registration"
            menuItemKey="/home/registration"
            name="Register page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={BiNotepad}
          />
          <MenuItem
            label="Settings"
            to={permissions.read && "/home/settings/usercreation"}
            alt="/home/settings/usercreation"
            value="/home/settings"
            menuItemKey="/home/settings"
            name="Settings page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={AiOutlineSetting}
          />
          <MenuItem
            label="Info"
            to={permissions.read && "/home/info/ratetype"}
            alt="/home/info/ratetype"
            value="/home/info"
            menuItemKey="/home/info"
            name="Info page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={AiOutlineInfoCircle}
          />
          <MenuItem
            label="User"
            to="/home/usersettings/usersetting"
            alt="/home/usersettings/usersetting"
            value="/home/usersettings"
            menuItemKey="/home/usersettings"
            name="User page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={FaUserAstronaut}
          />
          <div className="header-user-mobile">
            <div className="logout-item">
              <FiLogOut className="logout-icon" />
            </div>
            <div className="user-name-item">
              <div>
                {storedUsername ? (
                  <div>
                    <p onClick={navigateToUserSettings}>{storedUsername}</p>
                    {success && (
                      <div className="alert-popup Success">
                        <div className="popup-icon">
                          {" "}
                          <FileDownloadDoneIcon
                            style={{ color: "#fff" }}
                          />{" "}
                        </div>
                        <span className="cancel-btn" onClick={hidePopup}>
                          <ClearIcon
                            color="action"
                            style={{ fontSize: "14px" }}
                          />{" "}
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
            </div>
            <div className="avatar-item">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt="userimage"
                  src={`http://${apiUrl}/images/${selectedprofileImage}`}
                />
              </StyledBadge>
            </div>
          </div>
        </div>
        {info && (
          <div className="alert-popup Info">
            <div className="popup-icon">
              {" "}
              <BsInfo style={{ color: "#fff" }} />{" "}
            </div>
            <span className="cancel-btn" onClick={hidePopup}>
              <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
            </span>
            <p>{infoMessage}</p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Sidebar;
