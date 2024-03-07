import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { APIURL } from "../../../url";

const useEmplyeecreation = () => {
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
    const [isEditMode, setIsEditMode] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warning, setWarning] = useState(false);
    const [warningMessage] = useState({});
    const [infoMessage, setInfoMessage] = useState({});

    // for page permission

    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'User Creation';
                const response = await axios.get(`http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch {
            }
        };
        fetchPermissions();
    }, [user_id,apiUrl]);

    const checkPagePermission = () => {
        const currentPageName = 'User Creation';
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
        { field: "username", headerName: "User_Name", width: 130 },
        { field: "userpassword", headerName: "Password", width: 130 },
        { field: "active", headerName: "Active", width: 160 },
        { field: "stationname", headerName: "Station", width: 130 },
        { field: "viewfor", headerName: "Access", width: 130 },
        { field: "designation", headerName: "Designation", width: 130 },
        { field: "organizationname", headerName: "Organization", width: 130 },
    ];

    const [book, setBook] = useState({
        userid: '',
        username: '',
        stationname: '',
        designation: '',
        organizationname: '',
        userpassword: '',
        userconfirmpassword: '',
        active: '',
        viewfor: '',
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
            organizationname: '',
            userpassword: '',
            userconfirmpassword: '',
            active: '',
            viewfor: '',
        }));
        setSelectedCustomerData({});
        setIsEditMode(false);
    };

    const handleAdd = async () => {
        const permissions = checkPagePermission();
        if (permissions.read && permissions.new) {
            const stationname = book.userid;
            if (password === confirmPassword) {
                if (!stationname) {
                    setError(true);
                    setErrorMessage("Fill mandatory fields");
                    return;
                }
                try {
                    await axios.post(`http://${apiUrl}/usercreation`, book);
                    handleCancel();
                    setRows([]);
                    validatePasswordMatch();
                    setSuccess(true);
                    setSuccessMessage("Successfully Added");
                } catch (error) {
                    setError(true);
                    setErrorMessage("Check your Network Connection");
                }

            } else {
                setPasswordsMatch(true);
            }
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };

    const handleEdit = async (userid) => {
        try {
            const permissions = checkPagePermission();
            if (permissions.read && permissions.modify) {
                const selectedCustomer = rows.find((row) => row.userid === userid);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                await axios.put(`http://${apiUrl}/usercreation/${book.userid || selectedCustomerData?.userid}`, updatedCustomer);
                setSuccess(true);
                setSuccessMessage("Successfully updated");
                handleCancel();
                setRows([]);
            } else {
                setInfo(true);
                setInfoMessage("You do not have permission.");
            }
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };

    useEffect(() => {
        const handleList = async () => {
            if (permissions.read && permissions.read) {
                try {
                    const response = await axios.get(`http://${apiUrl}/usercreation`);
                    const data = response.data;
                    const rowsWithUniqueId = data.map((row, index) => ({
                        ...row,
                        id: index + 1,
                    }));
                    setRows(rowsWithUniqueId);
                } catch {
                }
            }
        }
        handleList();
    }, [permissions,apiUrl]);

    const handleClick = async (event, actionName, userid) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.read) {
                    const response = await axios.get(`http://${apiUrl}/usercreation`);
                    const data = response.data;
                    if (data.length > 0) {
                        const rowsWithUniqueId = data.map((row, index) => ({
                            ...row,
                            id: index + 1,
                        }));
                        setRows(rowsWithUniqueId);
                        setSuccess(true);
                        setSuccessMessage("Successfully listed");
                    } else {
                        setRows([]);
                        setError(true);
                        setErrorMessage("No data found");
                    }
                } else {
                    setInfo(true);
                    setInfoMessage("You do not have permission.");
                }
            } else if (actionName === 'Cancel') {
                handleCancel();
                setRows([]);
            } else if (actionName === 'Delete') {
                const permissions = checkPagePermission();
                if (permissions.read && permissions.delete) {
                    await axios.delete(`http://${apiUrl}/usercreation/${book.userid || selectedCustomerData?.userid}`);
                    setSelectedCustomerData(null);
                    setSuccess(true);
                    setSuccessMessage("Successfully Deleted");
                    handleCancel();
                    setRows([]);
                } else {
                    setInfo(true);
                    setInfoMessage("You do not have permission.");
                }
            } else if (actionName === 'Edit') {
                const permissions = checkPagePermission();
                if (permissions.read && permissions.modify) {
                    const selectedCustomer = rows.find((row) => row.userid === userid);
                    const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                    await axios.put(`http://${apiUrl}/usercreation/${book.userid || selectedCustomerData?.userid}`, updatedCustomer);
                    setSuccess(true);
                    setSuccessMessage("Successfully updated");
                    handleCancel();
                    setRows([]);
                } else {
                    setInfo(true);
                    setInfoMessage("You do not have permission.");
                }
            } else if (actionName === 'Add') {
                handleAdd();
            }
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
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
        handleMouseDownPassword,
        showPassword,
        handleClickShowPassword,
        passwordsMatch,
        columns,
        isEditMode,
        handleEdit,
    };
};

export default useEmplyeecreation;