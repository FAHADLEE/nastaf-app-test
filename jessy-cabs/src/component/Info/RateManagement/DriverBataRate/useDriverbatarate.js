import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import { APIURL } from "../../../url";

// TABLE START
const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "VehicleType", headerName: "Vehicle Type", width: 130 },
    { field: "Duty", headerName: "Duty", width: 130 },
    { field: "ExtraPerDayPrice", headerName: "ExtraPerDayPrice", width: 130 },
    { field: "ExtraHours", headerName: "ExtraHours", width: 130 },
    { field: "ExtraDays", headerName: "ExtraDays", width: 130 },
    { field: "fromdate", headerName: "From_Date", width: 130, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "todate", headerName: "To_Date", width: 130, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "Bata", headerName: "Bata", width: 130 },
];
// TABLE END

const useDriverbatarate = () => {
    const apiUrl = APIURL;
    const user_id = localStorage.getItem('useridno');
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [formData] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage, setInfoMessage] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);

    // for page permission

    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'Rate Type';
                const response = await axios.get(`http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch {
            }
        };

        fetchPermissions();
    }, [user_id,apiUrl]);

    const checkPagePermission = () => {
        const currentPageName = 'Rate Type';
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
        Bata: '',
        ExtraPerDayPrice: '',
        ExtraPerHoursPrice: '',
        ExtraDays: '',
        ExtraHours: '',
        Duty: '',
        VehicleType: '',
        todate: '',
        fromdate: '',
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
        setSelectedCustomerData((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));
    };

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            Bata: '',
            ExtraPerDayPrice: '',
            ExtraPerHoursPrice: '',
            ExtraDays: '',
            ExtraHours: '',
            Duty: '',
            VehicleType: '',
            todate: '',
            fromdate: '',
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
            const VehicleType = book.VehicleType;
            if (!VehicleType) {
                setError(true);
                setErrorMessage("Check your Network Connection");
                return;
            }
            try {
                await axios.post(`http://${apiUrl}/driverbatarate`, book);
                handleCancel();
                setRows([]);
                setSuccess(true);
                setSuccessMessage("Successfully Added");
            } catch {
                setError(true);
                setErrorMessage("Check your Network Connection");
            }
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };

    const handleEdit = async () => {
        try {
            const permissions = checkPagePermission();

            if (permissions.read && permissions.modify) {
                const selectedCustomer = rows.find((row) => row.id === selectedCustomerData.id);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };

                updatedCustomer.fromdate = dayjs(updatedCustomer.fromdate).format('YYYY-MM-DD');
                updatedCustomer.todate = dayjs(updatedCustomer.todate).format('YYYY-MM-DD');

                await axios.put(`http://${apiUrl}/driverbatarate/${selectedCustomerData.id}`, updatedCustomer);
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
        const handlelist = async () => {
            if (permissions.read) {
                const response = await axios.get(`http://${apiUrl}/driverbatarate`);
                const data = response.data;
                setRows(data);
            }
        }
        handlelist();
    }, [permissions,apiUrl]);

    const handleClick = async (event, actionName, id) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const permissions = checkPagePermission();
                if (permissions.read && permissions.read) {
                    const response = await axios.get(`http://${apiUrl}/driverbatarate`);
                    const data = response.data;
                    if (data.length > 0) {
                        setRows(data);
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
                    await axios.delete(`http://${apiUrl}/driverbatarate/${selectedCustomerData.id}`);
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
                    const selectedCustomer = rows.find((row) => row.id === selectedCustomerData.id);
                    const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };

                    updatedCustomer.fromdate = dayjs(updatedCustomer.fromdate).format('YYYY-MM-DD');
                    updatedCustomer.todate = dayjs(updatedCustomer.todate).format('YYYY-MM-DD');

                    await axios.put(`http://${apiUrl}/driverbatarate/${selectedCustomerData.id}`, updatedCustomer);
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
        } catch (err) {
            setError(true);
            setErrorMessage("Check Network Connection");
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

export default useDriverbatarate;