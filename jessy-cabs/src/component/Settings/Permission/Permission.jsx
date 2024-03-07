import React, { useEffect } from "react";
import "./Permission.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import BadgeIcon from "@mui/icons-material/Badge";
import ClearIcon from "@mui/icons-material/Clear";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import usePermission from "./usePermission";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";

const Permission = () => {
  const {
    actionName,
    error,
    success,
    warning,
    successMessage,
    selectedCustomerDatas,
    errorMessage,
    warningMessage,
    handleRowClick,
    info,
    infoMessage,
    handleClick,
    handleChange,
    isFieldReadOnly,
    userData,
    hidePopup,
    userId,
    handleKeyDown,
    handleSavePermissions,
    handleCancel,
    permissionsData,
    handlePermissionChange,
  } = usePermission();

  useEffect(() => {
    if (actionName === "List") {
      handleClick(null, "List");
    }
  }, [actionName, handleClick]);

  return (
    <div className="permission-main">
      <div className="permission-form-container">
        <form>
          <span className="Title-Name">Permission</span>
          <div className="permission-header">
            <div className="input-field">
              <div className="input" style={{ width: "300px" }}>
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="id"
                  label="ID"
                  name="userid"
                  autoComplete="off"
                  autoFocus
                  value={userId.userid || selectedCustomerDatas.userid || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                />
              </div>
              <div className="input" style={{ width: "100px" }}>
                <Button
                  startIcon={<FontAwesomeIcon icon={faSave} size="lg" />}
                  variant="outlined"
                  onClick={handleSavePermissions}
                  disabled={isFieldReadOnly("new")}
                >
                  Save
                </Button>
              </div>
              <div className="input" style={{ width: "100px" }}>
                <Button
                  startIcon={<FontAwesomeIcon icon={faSave} size="lg" />}
                  variant="outlined"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
            <div className="permission-header-main">
              <div className="permission-header-update">
                <div
                  className="Scroll-Style"
                  style={{ overflow: "scroll", height: "220px" }}
                >
                  <table>
                    <thead >
                      <tr id="update-header">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Mail_ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData && userData.length > 0 ? (
                        userData.map((user) => (
                          <tr
                            key={user.id}
                            onClick={() => handleRowClick(user)}
                          >
                            <td>{user.userid}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="secondary-table">
            <span className="Title-Name">Permission Table</span>
            <div className="table-Permission">
              <div className="table-container Scroll-Style">
                <table className="responsive-table ">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Form Name</th>
                      <th>Read</th>
                      <th>New</th>
                      <th>Modify</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissionsData.map((permission) => (
                      <tr key={permission.id}>
                        <td>{permission.id}</td>
                        <td>{permission.name}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={Boolean(permission.read)}
                            onChange={() =>
                              handlePermissionChange(permission.id, "read")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={Boolean(permission.new)}
                            onChange={() =>
                              handlePermissionChange(permission.id, "new")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={Boolean(permission.modify)}
                            onChange={() =>
                              handlePermissionChange(permission.id, "modify")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={Boolean(permission.delete)}
                            onChange={() =>
                              handlePermissionChange(permission.id, "delete")
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
        </form>
      </div>
    </div>
  );
};

export default Permission;
