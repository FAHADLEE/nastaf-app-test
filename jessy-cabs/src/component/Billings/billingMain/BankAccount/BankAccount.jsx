import React, { useEffect } from 'react';
import "./BankAccount.css";
import Button from "@mui/material/Button";
import Dialog from '@material-ui/core/Dialog';
import { AccountType } from './BankAccountData';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { AiFillBank } from "@react-icons/all-files/ai/AiFillBank";
import { Autocomplete, IconButton, TextField } from "@mui/material";

// ICONS
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import ListAltIcon from "@mui/icons-material/ListAlt";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import useBankaccount from './useBankaccount';

const BankAccount = () => {

  const {
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
    isFieldReadOnly,
    handleAdd,
    hidePopup,
    totalcapital,
    totalIn,
    totalOut,
    handleAddBankClick,
    showAddBankForm,
    handleAutocompleteChange,
    setShowAddBankForm,
    bankDetails,
    editingIndex,
    handleSaveEdit,
    handleEditBank,
    handleDelete,
    popupOpen,
    handlePopupClose,
    handleDeleteBank,


    // ... (other state variables and functions)
  } = useBankaccount();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);


  return (
    <div className="BankAccount-form Scroll-Style-hide">
      <form className="BankAccount-main-container">
        <div className="total-account">
          <div className='amount-calculate'>
            <div className='total-inputs' >
              <label htmlFor="">Total Capital:</label>
              <input type="number" value={totalcapital} readOnly />
            </div>
            <div className='total-inputs' id={`bank-btn-amountIN`} >
              <label htmlFor="">Total-In:</label>
              <input type="number" value={totalIn} readOnly />
            </div>
            <div className='total-inputs' id={`bank-btn-amountOUT`} >
              <label htmlFor="">Total-Out:</label>
              <input type="number" value={totalOut} readOnly />
            </div>
          </div>
        </div>
        <div className="BankAccount-detail-container-main">
          <div className="BankAccount-first-container">
            <div className="input bankaddbtn">
              <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleAddBankClick} disabled={isFieldReadOnly("new")}>
                Add bank
              </Button>
            </div>
          </div>
          {showAddBankForm && (
            <div className="AddBankContainer-BankAccount">
              <div className="input-field">
                <div className="input">
                  <div className="icone">
                    <AiFillBank color="action" style={{ fontSize: "27px" }} />
                  </div>
                  <TextField
                    size="small"
                    label="Bank Name"
                    name="bankname"
                    autoFocus
                    value={book.bankname || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faSackDollar} size="xl" />
                  </div>
                  <TextField
                    type="number"
                    size="small"
                    label="Capital Amount"
                    name="capital"
                    value={book.capital || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <ListAltIcon color="action" style={{ fontSize: "27px" }} />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-AccountType"
                    freeSolo
                    sx={{ width: "20ch" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "AccountType")}
                    value={AccountType.find((option) => option.Option)?.label || book.AccountType || ''}
                    options={AccountType.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || book.AccountType || ''}
                    renderInput={(params) => {
                      return (
                        <TextField   {...params} label="Account Type" name="AccountType" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input" style={{ width: "100px" }}>
                  <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleAdd}>
                    Add
                  </Button>
                </div>
                <div className="input" style={{ width: "100px" }}>
                  <Button variant="contained" onClick={() => setShowAddBankForm(false)}>
                    <CancelIcon />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="BankDetails-mainContainer">
          {bankDetails.map((bankDetail, index) => (
            <div className="addedbanks-Details-BankAccount" key={index}>
              <div className="input-field">
                <div className="input">
                  <input type="hidden" name="id" value={bankDetails[index]?.id} />
                  <div className="icone">
                    <AiFillBank color="action" style={{ fontSize: "27px" }} />
                  </div>
                  <TextField
                    size="small"
                    label="Bank Name"
                    name="bankname2"
                    // value={bankDetails[index]?.bankname2 || book.bankname2 || ''}
                    value={editingIndex === index ? bankDetail.bankname2 : (bankDetail.bankname2 || book.bankname2 || '')}
                    onChange={(event) => handleChange(event, index)}
                    disabled={editingIndex !== index}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <AiFillBank color="action" style={{ fontSize: "27px" }} />
                  </div>
                  <TextField
                    size="small"
                    label="Net Balance"
                    name="netbalance"
                    type="number"
                    // value={bankDetails[index]?.netbalance || book.netbalance || ''}
                    value={editingIndex === index ? bankDetail.netbalance : (bankDetail.netbalance || book.netbalance || '')}
                    // onChange={handleChange}
                    onChange={(event) => handleChange(event, index)}
                    disabled={editingIndex !== index}
                  />
                </div>
                <div className="bank-btn-amount-main" id={`bank-btn-amountIN`}>
                  <label htmlFor={`totalin-${index}`}>Total-In</label>
                  <input
                    className="bank-amount-input"
                    name="totalin"
                    type="number"
                    id={`totalin-${index}`}
                    // value={bankDetails[index]?.totalin || book.netbalance || ''}
                    value={editingIndex === index ? bankDetail.totalin : (bankDetail.totalin || book.netbalance || '')}
                    // onChange={handleChange}
                    onChange={(event) => handleChange(event, index)}
                    disabled={editingIndex !== index}
                  />
                </div>
                <div className="bank-btn-amount-main" id={`bank-btn-amountOUT`}>
                  <label htmlFor={`totalout-${index}`}>Total-Out</label>
                  <input
                    className="bank-amount-input"
                    name="totalout"
                    type="number"
                    id={`totalout-${index}`}
                    // value={bankDetails[index]?.totalout || book.totalout || ''}
                    value={editingIndex === index ? bankDetail.totalout : (bankDetail.totalout || book.totalout || '')}
                    onChange={(event) => handleChange(event, index)}
                    disabled={editingIndex !== index}
                  />
                </div>
                <div className="button-container-bankAccount">
                  <div className="input" style={{ width: "80px" }}>
                    {editingIndex === index ? (
                      <IconButton color="primary" variant="contained" onClick={() => handleSaveEdit(index)}>
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton color="primary" variant="contained" onClick={() => handleEditBank(index)}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </div>
                  <div className="input" style={{ width: "80px" }}>
                    <IconButton color="error" variant="contained" onClick={handleDelete}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <Dialog open={popupOpen} onClose={handlePopupClose}>
                    <DialogContent>
                      Are you sure you want to Delete this
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => handleDeleteBank(bankDetail.id)} variant="contained" color="primary">
                        Yes
                      </Button>
                      <Button onClick={handlePopupClose} variant="contained" color="primary">
                        No
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
        {error && (
          <div className='alert-popup Error' >
            <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{errorMessage}</p>
          </div>
        )
        }
        {warning && (
          <div className='alert-popup Warning' >
            <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{warningMessage}</p>
          </div>
        )
        }
        {info && (
          <div className='alert-popup Info' >
            <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{infoMessage}</p>
          </div>
        )
        }
        {success && (
          <div className='alert-popup Success' >
            <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{successMessage}</p>
          </div>
        )
        }
      </form>
    </div>
  )
}

export default BankAccount;
