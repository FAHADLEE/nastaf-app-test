import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Button from "@mui/material/Button";
import { APIURL } from "../../../url";

const useDrivercreation = () => {
    const apiUrl = APIURL;
    const user_id = localStorage.getItem('useridno');
    const [showPasswords, setShowPasswords] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage, setInfoMessage] = useState({});
    const [userPermissions, setUserPermissions] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'Driver Master';
                const response = await axios.get(`http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch {
            }
        };

        fetchPermissions();
    }, [user_id,apiUrl]);

    const checkPagePermission = () => {
        const currentPageName = 'Driver Master';
        const permissions = userPermissions || {};
        if (permissions.page_name === currentPageName) {
            return {
                read: permissions.read_permission === 1,
                new: permissions.new_permission === 1,
                modify: permissions.modify_permission === 1,
                delete: permissions.delete_permission === 1,
            };
        }
        return {
            read: false,
            new: false,
            modify: false,
            delete: false,
        };
    };

    const permissions = checkPagePermission();

    const isFieldReadOnly = (fieldName) => {
        if (permissions.read) {
            if (fieldName === "delete" && !permissions.delete) {
                return true;
            }
            return false;
        }
        return true;
    };

    // TABLE START
    const columns = [
        { field: "id", headerName: "Sno", width: 70 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 130,
            renderCell: (params) => (
                <Button
                    onClick={() => handleButtonClick(params)}
                    aria-label="open-dialog"
                >
                    <Button variant="contained" color="primary">
                        view
                    </Button>

                </Button>
            ),
        },
        { field: "username", headerName: "User_Name", width: 130 },
        { field: "userpassword", headerName: "Password", width: 130 },
        { field: "viewfor", headerName: "Access", width: 130 },
        { field: "designation", headerName: "Designation", width: 130 },
        { field: "stationname", headerName: "Station", width: 130 },
        { field: "licenseno", headerName: "License No", width: 130 },
        { field: "badgeno", headerName: "Badge No", width: 130 },
        { field: "aadharno", headerName: "Aadhar Card No", width: 130 },
        { field: "licenseexpdate", headerName: "License Exp Date", width: 130 },
        { field: "badgeexpdate", headerName: "Badge Exp Date", width: 130 },
        { field: "active", headerName: "Active", width: 160 },
    ];

    const [book, setBook] = useState({
        userid: '',
        username: '',
        stationname: '',
        designation: '',
        userpassword: '',
        userconfirmpassword: '',
        active: '',
        viewfor: '',
        address1: '',
        licenseno: '',
        basicsalary: '',
        licenseexpdate: '',
        streetno: '',
        esino: '',
        badgeno: '',
        badgeexpdate: '',
        city: '',
        pfno: '',
        durationofyears: '',
        aadharno: '',
    });

    // TABLE END

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        if (type === 'checkbox') {
            setBook((prevBook) => ({
                ...prevBook,
                [name]: checked,
            }));
            setSelectedCustomerData((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
        } else {
            setBook((prevBook) => ({
                ...prevBook,
                [name]: value,
            }));
            setSelectedCustomerData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
            if (name === 'userpassword') {
                setPassword(value);
            } else if (name === 'userconfirmpassword') {
                setConfirmPassword(value);
            }
        }
    };

    const handleAutocompleteChange = (event, value, name) => {
        const selectedOption = value ? value.label : '';
        setBook((prevBook) => ({
            ...prevBook,
            [name]: selectedOption,
        }));
        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: selectedOption,
        }));
    };
    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            userid: '',
            username: '',
            stationname: '',
            designation: '',
            userpassword: '',
            userconfirmpassword: '',
            active: '',
            viewfor: '',
            address1: '',
            licenseno: '',
            basicsalary: '',
            licenseexpdate: '',
            streetno: '',
            esino: '',
            badgeno: '',
            badgeexpdate: '',
            city: '',
            pfno: '',
            durationofyears: '',
            aadharno: '',
        }));
        setSelectedCustomerData({});
        setIsEditMode(false);
    };

    const user__id = selectedCustomerData?.userid || book.userid;
    const [file, setFile] = useState(null);

    const addPdf = async () => {
        if (file !== null) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                await axios.post(`http://${apiUrl}/driver-pdf/${user__id}`, formData);
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
    }

    const [licencepdf, setLicencepdf] = useState(null)

    const licenceSubmit = async () => {
        if (licencepdf !== null) {
            const formData = new FormData();
            formData.append("file", licencepdf);
            try {
                await axios.post(`http://${apiUrl}/driver-licencepdf/${user__id}`, formData);
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
    };

    const [allFile, setAllFile] = useState([]);

    const showPdf = (showID) => {
        axios.get(`http://${apiUrl}/pdf-view/${showID}`)
            .then(res => {
                if (res.data.length > 0) {
                    setAllFile(res.data);
                    setDialogOpen(true);
                } else {
                    setError(true);
                    setErrorMessage('No data found');
                }
            })
            .catch()
    }

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleButtonClick = (params) => {
        const { userid } = params.row;
        if (!userid) {
            setError(true);
            setErrorMessage("PLease Enter Booking No");
            return;
        }
        showPdf(userid);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleAdd = async () => {
        const stationname = book.stationname;
        if (password === confirmPassword) {
            setPasswordsMatch(false);
            if (!stationname) {
                setError(true);
                setErrorMessage("Check your Network Connection");
                return;
            }
            const permissions = checkPagePermission();

            if (permissions.read && permissions.new) {
                try {
                    await axios.post(`http://${apiUrl}/drivercreation`, book);
                    handleCancel();
                    addPdf();
                    licenceSubmit();
                    setRows([]);
                    validatePasswordMatch();
                    setSuccess(true);
                    setSuccessMessage("Successfully Added");
                } catch (error) {
                    setError(true)
                    setErrorMessage("Check your Network Connection");
                }
            } else {
                setInfo(true);
                setInfoMessage("You do not have permission.");
            }
        } else {
            setPasswordsMatch(true);
        }
    };

    useEffect(() => {
        const handlelist = async () => {
            if (permissions.read) {
                const response = await axios.get(`http://${apiUrl}/drivercreation`);
                const data = response.data;

                if (data.length > 0) {
                    const rowsWithUniqueId = data.map((row, index) => ({
                        ...row,
                        id: index + 1,
                    }));
                    setRows(rowsWithUniqueId);
                } else {
                    setRows([]);
                }
            }
        }

        handlelist();
    }, [permissions,apiUrl]);

    const handleEdit = async (userid) => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.modify) {
            const selectedCustomer = rows.find((row) => row.userid === userid);
            const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
            await axios.put(`http://${apiUrl}/drivercreation/${selectedCustomerData?.userid || userid}`, updatedCustomer);
            setSuccess(true);
            setSuccessMessage('Successfully updated');
            handleCancel();
            addPdf();
            licenceSubmit();
            setRows([]);
        } else {
            setInfo(true);
            setInfoMessage('You do not have permission.');
        }
    };

    const handleClick = async (event, actionName, userid) => {
        event.preventDefault();

        try {
            const permissions = checkPagePermission();

            if (actionName === 'List') {
                if (permissions.read) {
                    const response = await axios.get(`http://${apiUrl}/drivercreation`);
                    const data = response.data;

                    if (data.length > 0) {
                        const rowsWithUniqueId = data.map((row, index) => ({
                            ...row,
                            id: index + 1,
                        }));
                        setRows(rowsWithUniqueId);
                        setSuccess(true);
                        setSuccessMessage('Successfully listed');
                    } else {
                        setRows([]);
                        setError(true);
                        setErrorMessage('No data found');
                    }
                } else {
                    setInfo(true);
                    setInfoMessage('You do not have permission.');
                }
            } else if (actionName === 'Cancel') {
                handleCancel();
                setRows([]);
            } else if (actionName === 'Delete') {
                if (permissions.read && permissions.delete) {
                    await axios.delete(`http://${apiUrl}/drivercreation/${selectedCustomerData?.userid || userid}`);
                    setSelectedCustomerData(null);
                    setSuccess(true);
                    setSuccessMessage('Successfully Deleted');
                    handleCancel();
                    setRows([]);
                } else {
                    setInfo(true);
                    setInfoMessage('You do not have permission.');
                }
            } else if (actionName === 'Edit') {
                if (permissions.read && permissions.modify) {
                    const selectedCustomer = rows.find((row) => row.userid === userid);
                    const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                    await axios.put(`http://${apiUrl}/drivercreation/${selectedCustomerData?.userid || userid}`, updatedCustomer);
                    setSuccess(true);
                    setSuccessMessage('Successfully updated');
                    handleCancel();
                    addPdf();
                    licenceSubmit();
                    setRows([]);
                } else {
                    setInfo(true);
                    setInfoMessage('You do not have permission.');
                }
            } else if (actionName === 'Add') {
                handleAdd();
            }
        } catch (error) {
            setError(true);
            setErrorMessage('Check your Network Connection');
        }
    };
    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setInfo(false);
        setWarning(false);
        setPasswordsMatch(false);
    };
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);
    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [warning]);
    useEffect(() => {
        if (info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [info]);
    useEffect(() => {
        if (passwordsMatch) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [passwordsMatch]);
    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });
    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
        setIsEditMode(true);
    }, []);

    const handleClickShowPasswords = () => {
        setShowPasswords((show) => !show);
    };

    const handleMouseDownPasswords = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validatePasswordMatch = () => {
        const password = selectedCustomerData?.userpassword || book.userpassword;
        const confirmPassword = selectedCustomerData?.userconfirmpassword || book.userconfirmpassword;
        setPasswordsMatch(password !== confirmPassword);
    };

    const [dialogdeleteOpen, setDialogdeleteOpen] = useState(false);

    const handleClosedeleteDialog = () => {
        setDialogdeleteOpen(false);
    };

    const [imagedata, setImagedata] = useState(null);

    const handleimagedelete = (imageName) => {
        setImagedata(imageName)
        setDialogdeleteOpen(true);
    };

    const handleContextMenu = () => {
        try {
            axios.delete(`http://${apiUrl}/driver_proof/` + imagedata)
            setDialogdeleteOpen(false);
            setDialogOpen(false);
        } catch {

        }
    };

    return {
        selectedCustomerData,
        selectedCustomerId,
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
        book,
        handleClick,
        handleChange,
        isFieldReadOnly,
        handleRowClick,
        handleAdd,
        hidePopup,
        handleAutocompleteChange,
        showPasswords,
        handleClickShowPasswords,
        handleMouseDownPasswords,
        passwordsMatch,
        columns,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleCloseDialog,
        dialogOpen,
        allFile,
        setFile,
        setLicencepdf,
        isEditMode,
        handleEdit,
        handleContextMenu,
        handleimagedelete,
        handleClosedeleteDialog,
        dialogdeleteOpen,
        setError,
        setErrorMessage
    };
};

export default useDrivercreation;