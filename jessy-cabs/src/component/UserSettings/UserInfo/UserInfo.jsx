import React, { useEffect } from "react";
import "./UserInfo.css";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import InputLabel from "@mui/material/InputLabel";
import { TextField, FormControl } from "@mui/material";

// ICONS
import ClearIcon from "@mui/icons-material/Clear";
import BadgeIcon from "@mui/icons-material/Badge";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsPhoneIcon from "@mui/icons-material/SettingsPhone";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import useUserinfo from "./useUserinfo";

// REACT ICONS
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";

// FONTAWESOME
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { APIURL } from "../../url";

const UserSetting = () => {
  const apiUrl = APIURL;

  const {
    selectedCustomerData,
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    book,
    handleClick,
    handleChange,
    hidePopup,
    selectedImage,
    editMode,
    toggleEditMode,
    showPasswords,
    handleClickShowPasswords,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleUpload,
    handleMouseDownPasswords,
    showPassword,
    handleUpdate,
  } = useUserinfo();

  useEffect(() => {
    if (actionName === "List") {
      handleClick(null, "List");
    }
  }, [actionName, handleClick]);

  return (
    <div className="userinfo-form Scroll-Style-hide">
      <form>
        <div className="detail-container-main-userinfo">
          <div className="container-userinfo">
            <div className="container-userinfo-main">
              <div className="container-userinfo-left">
                <div className="input-field">
                  <div className="input">
                    <Avatar
                      sx={{ width: "12ch", height: "12ch" }}
                      alt="userimage"
                      src={`http://${apiUrl}/images/${selectedImage}`}
                    />
                  </div>
                </div>
                <div className="input-field">
                  <div className="input">
                    <div className="input-field">
                      <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        onClick={handleUpload}
                        component="label"
                      >
                        {" "}
                        update
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-userinfo-right">
                <div className="input-field">
                  <div className="input" style={{ width: "300px" }}>
                    <div className="icone">
                      <BadgeIcon color="action" />
                    </div>
                    <TextField
                      margin="normal"
                      size="small"
                      id="id"
                      label="Employee Id"
                      name="userid"
                      value={selectedCustomerData?.userid || book.userid || ""}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                  <div className="input" style={{ width: "300px" }}>
                    <div className="icone">
                      <WorkspacePremiumIcon color="action" />
                    </div>
                    <TextField
                      size="small"
                      id="role"
                      label="Role"
                      name="designation"
                      autoComplete="new-password"
                      value={
                        selectedCustomerData?.designation || book.designation
                      }
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                </div>
                <div className="input-field">
                  <div className="input">
                    <div className="icone">
                      <AccountCircleIcon color="action" />
                    </div>
                    <TextField
                      size="small"
                      id="UserName"
                      label="UserName"
                      name="username"
                      autoComplete="new-password"
                      value={selectedCustomerData?.username || book.username}
                      onChange={handleChange}
                      autoFocus
                      disabled={!editMode}
                    />
                  </div>
                  <div className="input" style={{ width: "200px" }}>
                    <div className="icone">
                      <BadgeIcon color="action" />
                    </div>
                    <TextField
                      size="small"
                      id="first-name"
                      label="First Name"
                      name="ufirstname"
                      autoComplete="new-password"
                      value={
                        selectedCustomerData?.ufirstname || book.ufirstname
                      }
                      onChange={handleChange}
                      autoFocus
                      disabled={!editMode}
                    />
                  </div>
                  <div className="input">
                    <TextField
                      size="small"
                      id="last-name"
                      label="Last Name"
                      name="ulastname"
                      autoComplete="new-password"
                      value={selectedCustomerData?.ulastname || book.ulastname}
                      onChange={handleChange}
                      autoFocus
                      disabled={!editMode}
                    />
                  </div>
                </div>
                <div className="input-field">
                  <div className="input">
                    <div className="icone">
                      <SettingsPhoneIcon color="action" />
                    </div>
                    <TextField
                      type="number"
                      size="small"
                      id="mobile"
                      label="Mobile"
                      name="mobileno"
                      autoComplete="new-password"
                      value={selectedCustomerData?.mobileno || book.mobileno}
                      onChange={handleChange}
                      autoFocus
                      disabled={!editMode}
                    />
                  </div>
                  <div className="input" style={{ width: "415px" }}>
                    <div className="icone">
                      <AttachEmailIcon color="action" />
                    </div>
                    <TextField
                      sx={{ width: "193ch" }}
                      size="small"
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="new-password"
                      value={selectedCustomerData?.email || book.email}
                      onChange={handleChange}
                      autoFocus
                      disabled={!editMode}
                    />
                  </div>
                </div>
                <div className="input-field">
                  <div className="input" style={{ width: "309px" }}>
                    <div className="icone">
                      <FontAwesomeIcon icon={faUnlockKeyhole} size="lg" />
                    </div>
                    <FormControl
                      sx={{ m: 1, width: "35ch" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input
                        name="userpassword"
                        value={
                          selectedCustomerData?.userpassword ||
                          book.userpassword
                        }
                        onChange={handleChange}
                        id="password"
                        type={showPasswords ? "text" : "password"}
                        disabled={!editMode}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswords}
                              onMouseDown={handleMouseDownPasswords}
                              disabled={!editMode}
                            >
                              {showPasswords ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                  <div className="input" style={{ width: "309px" }}>
                    <div className="icone">
                      <FontAwesomeIcon icon={faLock} size="lg" />
                    </div>
                    <FormControl
                      sx={{ m: 1, width: "35ch" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="confirm-password">
                        Confirm Password
                      </InputLabel>
                      <Input
                        name="userconfirmpassword"
                        value={
                          selectedCustomerData?.userconfirmpassword ||
                          book.userconfirmpassword
                        }
                        onChange={handleChange}
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        disabled={!editMode}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="confirm-password"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              disabled={!editMode}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                </div>
                {editMode ? (
                  <div className="input-field">
                    <div className="input" style={{ width: "150px" }}>
                      <Button variant="outlined" onClick={toggleEditMode}>
                        Cancel
                      </Button>
                    </div>
                    <div className="input" style={{ width: "150px" }}>
                      <Button variant="contained" onClick={handleUpdate}>
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="user-photo-edit">
                    <IconButton
                      color="primary"
                      onClick={toggleEditMode}
                      size="small"
                      variant="outlined"
                      component="label"
                    >
                      <ModeEditIcon />
                    </IconButton>
                  </div>
                )}
                {error && (
                  <div className="alert-popup Error">
                    <div className="popup-icon">
                      {" "}
                      <ClearIcon style={{ color: "#fff" }} />{" "}
                    </div>
                    <span className="cancel-btn" onClick={hidePopup}>
                      <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
                    </span>
                    <p>{errorMessage}</p>
                  </div>
                )}
                {warning && (
                  <div className="alert-popup Warning">
                    <div className="popup-icon">
                      {" "}
                      <ErrorOutlineIcon style={{ color: "#fff" }} />{" "}
                    </div>
                    <span className="cancel-btn" onClick={hidePopup}>
                      <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
                    </span>
                    <p>{warningMessage}</p>
                  </div>
                )}
                {success && (
                  <div className="alert-popup Success">
                    <div className="popup-icon">
                      {" "}
                      <FileDownloadDoneIcon style={{ color: "#fff" }} />{" "}
                    </div>
                    <span className="cancel-btn" onClick={hidePopup}>
                      <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
                    </span>
                    <p>{successMessage}</p>
                  </div>
                )}
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
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserSetting;
