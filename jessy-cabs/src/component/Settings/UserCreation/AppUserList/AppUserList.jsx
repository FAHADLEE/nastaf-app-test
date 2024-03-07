import React, { useEffect } from 'react';
import "./AppUserList.css";
import Button from "@mui/material/Button";
import ClearIcon from '@mui/icons-material/Clear';
import { DataGrid } from "@mui/x-data-grid";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import DescriptionIcon from "@mui/icons-material/Description";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import useAppuserlist from './useAppuserlist';


const AppUserList = () => {

  const {
    rows,
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    handleClick,
    hidePopup,
    apps,
    handleChangeStatus,
    handleListButtonClick,
    columns,

    // ... (other state variables and functions)
  } = useAppuserlist();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  return (
    <div className="appuserlist-form">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-AppUserList">
              <div className="input-field">
                <div className="input radio">
                  <FormControl>
                    <FormLabel style={{ textAlign: 'center' }} id="demo-row-radio-buttons-group-label">
                      Active / Inactive
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="AppUserActive"
                      autoComplete="new-password"
                      value={apps}
                      onChange={handleChangeStatus}
                    >
                      <FormControlLabel
                        value="active"
                        control={<Radio />}
                        label="Active"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="inactive"
                        control={<Radio />}
                        label="Inactive"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="input" style={{ width: "130px" }}>
                  <Button variant="contained" onClick={handleListButtonClick}>List</Button>
                </div>
                <div className="input" style={{ width: "130px" }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<DescriptionIcon />}
                  >
                    Excel
                    <input
                      type="file"
                      style={{ display: "none" }}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error &&
          <div className='alert-popup Error' >
            <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{errorMessage}</p>
          </div>
        }
        {warning &&
          <div className='alert-popup Warning' >
            <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{warningMessage}</p>
          </div>
        }
        {success &&
          <div className='alert-popup Success' >
            <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{successMessage}</p>
          </div>
        }
        {info &&
          <div className='alert-popup Info' >
            <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{infoMessage}</p>
          </div>
        }
        <div className="table-bookingCopys">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default AppUserList