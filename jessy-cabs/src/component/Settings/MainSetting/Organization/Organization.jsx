import React, { useEffect } from 'react';
import "./Organization.css";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { TextField } from "@mui/material";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import useOrganization from './useOrganization';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
// REACT ICONS
import { BiBuildings } from "@react-icons/all-files/bi/BiBuildings";
import { APIURL } from "../../../url";

const Organization = () => {
    const apiUrl = APIURL;

    const {
        selectedCustomerData,
        actionName,
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        book,
        info,
        infoMessage,
        handleClick,
        handleChange,
        isFieldReadOnly,
        handleAdd,
        hidePopup,
        selectedImage,
        editMode,
        handleUpload,
        toggleEditMode,
        handleKeyDown,
        handleUpdate,
    } = useOrganization();

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    }, [actionName, handleClick]);

    return (
        <div className="organisation-form Scroll-Style-hide">
            <form>
                <div className="detail-container-main-organisation">
                    <div className="container-organisation">
                        <div className="container-organisation-main">
                            <div className='container-organisation-left'>
                                <div className="input-field">
                                    <div className="input">
                                        <Avatar
                                            sx={{ width: "12ch", height: "12ch" }}
                                            alt="userimage"
                                            src={`http://${apiUrl}/images/${selectedImage}`}
                                        >
                                            {selectedImage ? null : (
                                                <div style={{ 'fontSize': "55px" }}>
                                                    <BiBuildings />
                                                </div>
                                            )}
                                        </Avatar>
                                    </div>
                                </div>
                                <div className="input-field">
                                    <div className="input-field">
                                        <div className='input'>
                                            <div className='input-field'>
                                                <Button color="primary" size='small' variant="contained" onClick={handleUpload} component="label" > update</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='container-organisation-right'>
                                <div className="input-field">
                                    <div className="input" style={{ width: "310px" }}>
                                        <div className="icone">
                                            <BadgeIcon color="action" />
                                        </div>
                                        <TextField
                                            margin="normal"
                                            size="small"
                                            id="id"
                                            label="Organization Name"
                                            name="organizationname"
                                            sx={{ width: "280px" }}
                                            value={selectedCustomerData?.organizationname || book.organizationname}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="input" style={{ width: "310px" }}>
                                        <div className="icone">
                                            <WorkspacePremiumIcon color="action" />
                                        </div>
                                        <TextField
                                            size="small"
                                            id="role"
                                            label="Organization Type"
                                            name="organizationtype"
                                            sx={{ width: "280px" }}
                                            autoComplete="new-password"
                                            value={selectedCustomerData?.organizationtype || book.organizationtype}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                        />
                                    </div>
                                </div>
                                <div className="input-field">
                                    <div className="input" style={{ width: "310px" }}>
                                        <div className="icone">
                                            <SettingsPhoneIcon color="action" />
                                        </div>
                                        <TextField
                                            type='number'
                                            size="small"
                                            id="mobile"
                                            label="Mobile"
                                            name="contactPhoneNumber"
                                            sx={{ width: "280px" }}
                                            autoComplete="new-password"
                                            value={selectedCustomerData?.contactPhoneNumber || book.contactPhoneNumber}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="input" style={{ width: "310px" }}>
                                        <div className="icone">
                                            <AttachEmailIcon color="action" />
                                        </div>
                                        <TextField
                                            sx={{ width: "280ch" }}
                                            size="small"
                                            id="email"
                                            label="Email"
                                            name="contactEmail"
                                            autoComplete="new-password"
                                            value={selectedCustomerData?.contactEmail || book.contactEmail}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                        />
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
                                            <Button variant="contained"
                                                onClick={handleUpdate}
                                            >
                                                Update
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="user-photo-edit">
                                        <IconButton color="primary" onClick={toggleEditMode} disabled={isFieldReadOnly("modify")} size='small' variant="outlined" component="label">
                                            <ModeEditIcon />
                                        </IconButton>
                                    </div>
                                )}
                                {error &&
                                    <div className='alert-popup Error' >
                                        <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                                        <p>{errorMessage}</p>
                                    </div>
                                }
                                {success &&
                                    <div className='alert-popup Success' >
                                        <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
                                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                                        <p>{successMessage}</p>
                                    </div>
                                }
                                {warning &&
                                    <div className='alert-popup Warning' >
                                        <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
                                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                                        <p>{warningMessage}</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="organisation-details">
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Organization Name</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "250ch" }}
                                size="small"
                                id="organizationName"
                                name="organizationname"
                                value={selectedCustomerData?.organizationname || book.organizationname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input" style={{ width: "160px" }}>
                            <p className='input-title'>Type of Organization</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="organizationType"
                                name="organizationtype"
                                value={selectedCustomerData?.organizationtype || book.organizationtype}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Office Address</p>
                        </div>
                        <div className='address-block'>
                            <div className="input" style={{ width: "250px" }}>
                                <TextField
                                    sx={{ width: "230ch" }}
                                    size="small"
                                    id="addressLine1"
                                    name="addressLine1"
                                    value={selectedCustomerData?.addressLine1 || book.addressLine1}
                                    onChange={handleChange}
                                    label="Address"
                                    variant="standard"
                                />
                            </div>
                            <div className="input" style={{ width: "250px" }}>
                                <TextField
                                    sx={{ width: "230ch" }}
                                    size="small"
                                    id="addressLine2"
                                    name="addressLine2"
                                    value={selectedCustomerData?.addressLine2 || book.addressLine2}
                                    onChange={handleChange}
                                    variant="standard"
                                />
                            </div>
                            <div className="input" style={{ width: "250px" }}>
                                <TextField
                                    sx={{ width: "230ch" }}
                                    size="small"
                                    id="city"
                                    name="city"
                                    value={selectedCustomerData?.city || book.city}
                                    onChange={handleChange}
                                    variant="standard"
                                />
                            </div>
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Contact Information</p>
                        </div>
                        <div className='address-block'>
                            <div className="input" style={{ width: "250px" }}>
                                <TextField
                                    sx={{ width: "230ch" }}
                                    size="small"
                                    id="contactPhoneNumber"
                                    name="contactPhoneNumber"
                                    value={selectedCustomerData?.contactPhoneNumber || book.contactPhoneNumber}
                                    onChange={handleChange}
                                    label="Phone Number"
                                />
                            </div>
                            <div className="input" style={{ width: "250px" }}>
                                <TextField
                                    sx={{ width: "230ch" }}
                                    size="small"
                                    id="contactEmail"
                                    name="contactEmail"
                                    value={selectedCustomerData?.contactEmail || book.contactEmail}
                                    onChange={handleChange}
                                    label="Email Address"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Location</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="location"
                                name="location"
                                value={selectedCustomerData?.location || book.location}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Website</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="website"
                                name="website"
                                value={selectedCustomerData?.website || book.website}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Ownership and Leadership</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="ownershipLeadership"
                                name="ownershipLeadership"
                                value={selectedCustomerData?.ownershipLeadership || book.ownershipLeadership}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Products/Services</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="productsServices"
                                name="productsServices"
                                value={selectedCustomerData?.productsServices || book.productsServices}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Market Presence</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="marketPresence"
                                name="marketPresence"
                                value={selectedCustomerData?.marketPresence || book.marketPresence}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Employees</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="employees"
                                name="employees"
                                value={selectedCustomerData?.employees || book.employees}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Legal Structure</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="legalStructure"
                                name="legalStructure"
                                value={selectedCustomerData?.legalStructure || book.legalStructure}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Customer Base</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="customerBase"
                                name="customerBase"
                                value={selectedCustomerData?.customerBase || book.customerBase}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Partnerships and Alliances</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="partnershipsAlliances"
                                name="partnershipsAlliances"
                                value={selectedCustomerData?.partnershipsAlliances || book.partnershipsAlliances}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Recent News and Developments</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="recentNewsDevelopments"
                                name="recentNewsDevelopments"
                                value={selectedCustomerData?.recentNewsDevelopments || book.recentNewsDevelopments}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Organization PAN Number</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="taxIDNumber"
                                name="pannumber"
                                value={selectedCustomerData?.pannumber || book.pannumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>GST Number</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="taxIDNumber"
                                name="gstnumber"
                                value={selectedCustomerData?.gstnumber || book.gstnumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Social Media Presence</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="socialMediaPresence"
                                name="socialMediaPresence"
                                value={selectedCustomerData?.socialMediaPresence || book.socialMediaPresence}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Sustainability and CSR</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="sustainabilityCSR"
                                name="sustainabilityCSR"
                                value={selectedCustomerData?.sustainabilityCSR || book.sustainabilityCSR}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Customer Reviews and Feedback</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="customerReviewsFeedback"
                                name="customerReviewsFeedback"
                                value={selectedCustomerData?.customerReviewsFeedback || book.customerReviewsFeedback}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Industry-Specific Details</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="industrySpecificDetails"
                                name="industrySpecificDetails"
                                value={selectedCustomerData?.industrySpecificDetails || book.industrySpecificDetails}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <Button variant="contained" onClick={handleAdd} disabled={isFieldReadOnly("new")}>
                                Save
                            </Button>

                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <Button variant="outlined" onClick={handleUpdate} disabled={isFieldReadOnly("modify")} >
                                Update
                            </Button>
                        </div>
                    </div>
                    {info &&
                        <div className='alert-popup Info' >
                            <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                            <p>{infoMessage}</p>
                        </div>
                    }
                </div>
            </form>
        </div>
    )
}

export default Organization