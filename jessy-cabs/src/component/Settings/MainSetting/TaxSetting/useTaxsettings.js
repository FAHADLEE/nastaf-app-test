import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import { APIURL } from "../../../url";


// TABLE START
const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "DateTaxFrom", headerName: "From_Date", width: 130 },
    { field: "DateTaxTo", headerName: "To_Date", width: 130 },
    { field: "STax", headerName: "STax", width: 160 },
    { field: "SBCess", headerName: "SBCess", width: 130 },
    { field: "KKCess", headerName: "KK_Cess", width: 130 },
    { field: "STax_Des", headerName: "StaxDes", width: 130 },
    { field: "SBCess_Des", headerName: "SBCessDes", width: 130 },
    { field: "KKCess_Des", headerName: "KKCessDes", width: 130 },
    { field: "taxtype", headerName: "TAX", width: 130 },
];

const useTaxsettings = () => {
    const apiUrl = APIURL;
    const user_id = localStorage.getItem('useridno');
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [formData] = useState({});
    const [actionName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage, setInfoMessage] = useState({});

    // for page permission
    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'Tax settings';
                const response = await axios.get(`http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch {
            }
        };

        fetchPermissions();
    }, [user_id,apiUrl]);

    const checkPagePermission = () => {
        const currentPageName = 'Tax settings';
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

    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setInfo(false);
        setWarning(false);
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

    const [book, setBook] = useState({
        DateTaxFrom: '',
        DateTaxTo: '',
        STax: '',
        SBCess: '',
        KKCess: '',
        STax_Des: '',
        SBCess_Des: '',
        KKCess_Des: '',
        taxtype: '',
    });
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

    const handleDateChange = (date, name) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
        setBook((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));
        setSelectedCustomerData((prevValues) => ({
            ...prevValues,
            [name]: parsedDate,
        }));
    };

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            DateTaxFrom: '',
            DateTaxTo: '',
            STax: '',
            SBCess: '',
            KKCess: '',
            STax_Des: '',
            SBCess_Des: '',
            KKCess_Des: '',
            taxtype: '',
        }));
        setSelectedCustomerData({});
        setIsEditMode(false);
    };

    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
        setIsEditMode(true);
    }, []);

    const handleAdd = async () => {
        const permissions = checkPagePermission();
        if (permissions.read && permissions.new) {
            try {
                await axios.post(`http://${apiUrl}/taxsetting`, book);
                handleCancel();
                setRows([]);
                setSuccess(true);
                setSuccessMessage("Successfully Added");
            } catch {
                setError(true);
                setErrorMessage("Check your Network Connection");
            }
        } else {
            // Display a warning or prevent the action
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };

    const handleEdit = async (STax) => {
        try {
            const permissions = checkPagePermission();

            if (permissions.read && permissions.modify) {
                const selectedCustomer = rows.find((row) => row.STax === STax);
                const updatedCustomer = {
                    ...selectedCustomer,
                    ...selectedCustomerData,
                };
                await axios.put(`http://${apiUrl}/taxsetting/${book.STax || selectedCustomerData.STax}`, updatedCustomer);
                handleCancel();
                setRows([]);
                setSuccess(true);
                setSuccessMessage("Successfully updated");
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
        const handlelist = async () => {
            if (permissions.read) {
                const response = await axios.get(`http://${apiUrl}/taxsetting`);
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

    const handleClick = async (event, actionName, STax) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const permissions = checkPagePermission();
                if (permissions.read && permissions.read) {
                    const response = await axios.get(`http://${apiUrl}/taxsetting`);
                    const data = response.data;
                    const rowsWithUniqueId = data.map((row, index) => ({
                        ...row,
                        id: index + 1,
                    }));
                    setRows(rowsWithUniqueId);
                    setSuccess(true);
                    setSuccessMessage("Successfully listed");
                } else {
                    setInfo(true);
                    setInfoMessage("You do not have permission.");
                }
            } else if (actionName === 'Cancel') {
                handleCancel();
            } else if (actionName === 'Delete') {
                const permissions = checkPagePermission();
                if (permissions.read && permissions.delete) {
                    await axios.delete(`http://${apiUrl}/taxsetting/${selectedCustomerData?.STax || book.STax}`);
                    setSelectedCustomerData(null);
                    setSuccess(true);
                    setSuccessMessage("Successfully Deleted");
                    handleCancel();
                } else {
                    setInfo(true);
                    setInfoMessage("You do not have permission.");
                }
            } else if (actionName === 'Edit') {
                const permissions = checkPagePermission();
                if (permissions.read && permissions.modify) {
                    const selectedCustomer = rows.find((row) => row.STax === STax);
                    const updatedCustomer = {
                        ...selectedCustomer,
                        ...selectedCustomerData,
                    };
                    await axios.put(`http://${apiUrl}/taxsetting/${book.STax || selectedCustomerData.STax}`, updatedCustomer);
                    handleCancel();
                    setRows([]);
                    setSuccess(true);
                    setSuccessMessage("Successfully updated");
                } else {
                    setInfo(true);
                    setInfoMessage("You do not have permission.");
                }
            }
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };
    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });

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
        formData,
        handleDateChange,
        handleAutocompleteChange,
        columns,
        isEditMode,
        handleEdit,
    };
};

export default useTaxsettings;