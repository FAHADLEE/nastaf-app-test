import { useState, useEffect, useCallback } from 'react';
import jsPDF from 'jspdf';
import axios from "axios";
import dayjs from "dayjs";
import { saveAs } from 'file-saver';
import { APIURL } from "../../url";


// TABLE START
const columns = [
    { field: "id", headerName: "S.No", width: 60 },
    { field: "customerId", headerName: "Customer ID", width: 130 },
    { field: "customer", headerName: "Name", width: 160 },
    { field: "customeremail", headerName: "E-mail", width: 160 },
    { field: "address1", headerName: "Address", width: 130 },
    { field: "phoneno", headerName: "Phone", width: 160 },
    { field: "rateType", headerName: "Rate_Type", width: 130 },
    { field: "gstnumber", headerName: "GST_NO", width: 160 },
    { field: "state", headerName: "State", width: 160 },
    { field: "enableDriverApp", headerName: "Driver_App", width: 130 },
];
// TABLE END

const useCustomer = () => {
    const apiUrl = APIURL;
    const user_id = localStorage.getItem('useridno');
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [warning, setWarning] = useState(false);
    const [error, setError] = useState(false);
    const [info, setInfo] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage, setInfoMessage] = useState({});
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // for page permission
    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'Customer Master';
                const response = await axios.get(`http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch {
            }
        };

        fetchPermissions();
    }, [user_id,apiUrl]);

    const checkPagePermission = () => {
        const currentPageName = 'Customer Master';
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

    const handleButtonClick = () => {
        setIsInputVisible(!isInputVisible);
    };
    const convertToCSV = (data) => {
        const header = columns.map((column) => column.headerName).join(",");
        const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
        return [header, ...rows].join("\n");
    };
    const handleExcelDownload = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "customer_details.csv");
    };
    const handlePdfDownload = () => {
        const pdf = new jsPDF();
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Customer Details", 10, 10);

        const tableData = rows.map((row) => [
            row['id'],
            row['customerId'],
            row['customer'],
            row['address1'],
            row['phoneno'],
            row['Active'],
            row['active'],
            row['gstTax'],
            row['state'],
            row['enableDriverApp']
        ]);

        pdf.autoTable({
            head: [['Sno', 'Customer ID', 'Name', 'Address', 'Phone', 'Active', 'Rate_Type', 'GST_NO', 'State', 'Driver_App']],
            body: tableData,
            startY: 20,
        });
        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'Customer_Details.pdf');
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
        if (success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const [book, setBook] = useState({
        customerId: '',
        name: '',
        customer: '',
        customerType: '',
        servicestation: '',
        date: '',
        address1: '',
        address2: '',
        city: '',
        customeremail: '',
        rateType: '',
        opBalance: '',
        phoneno: '',
        underGroup: '',
        gstTax: '',
        acType: '',
        entity: '',
        printBill: '',
        userName: '',
        bookName: '',
        division: '',
        hourRoundedOff: '',
        selectOption: '',
        inclAddress: '',
        active: '',
        state: '',
        gstnumber: '',
        SalesPerson: '',
        salesPercentage: '',
        billingGroup: '',
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

    const handleAutocompleteChange = (event, newValue, name) => {
        const selectedOption = newValue ? newValue.label : '';

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
            customerId: '',
            name: '',
            customer: '',
            customerType: '',
            servicestation: '',
            date: '',
            address1: '',
            address2: '',
            city: '',
            customeremail: '',
            rateType: '',
            opBalance: '',
            phoneno: '',
            underGroup: '',
            gstTax: '',
            acType: '',
            printBill: '',
            userName: '',
            bookName: '',
            division: '',
            hourRoundedOff: '',
            selectOption: '',
            inclAddress: '',
            active: '',
            entity: '',
            state: '',
            gstnumber: '',
            SalesPerson: '',
            salesPercentage: '',
            billingGroup: '',
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
            const name = book.name;
            if (!name) {
                setError(true);
                setErrorMessage("fill mantatory fields");
                return;
            }

            try {
                await axios.post(`http://${apiUrl}/customers`, book);
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

    const handleEdit = async (customerId) => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.modify) {
            const selectedCustomer = rows.find((row) => row.customerId === customerId);
            const updatedCustomer = {
                ...selectedCustomer,
                ...selectedCustomerData,
                date: selectedCustomerData?.date ? dayjs(selectedCustomerData?.date) : null,
            };
            await axios.put(`http://${apiUrl}/customers/${book.customerId || selectedCustomerData.customerId}`, updatedCustomer);
            handleCancel();
            setRows([]);
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };

    useEffect(() => {
        const handleList = async () => {
            if (permissions.read && permissions.read) {
                try {
                    const response = await axios.get(`http://${apiUrl}/customers`);
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


    const handleClick = async (event, actionName, customerId) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.read) {
                    const response = await axios.get(`http://${apiUrl}/customers`);
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
                    await axios.delete(`http://${apiUrl}/customers/${book.customerId || selectedCustomerData.customerId}`);
                    setSelectedCustomerData(null);
                    handleCancel();
                    setRows([]);
                } else {
                    setInfo(true);
                    setInfoMessage("You do not have permission.");
                }
            } else if (actionName === 'Edit') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.modify) {
                    const selectedCustomer = rows.find((row) => row.customerId === customerId);
                    const updatedCustomer = {
                        ...selectedCustomer,
                        ...selectedCustomerData,
                        date: selectedCustomerData?.date ? dayjs(selectedCustomerData?.date) : null,
                    };
                    await axios.put(`http://${apiUrl}/customers/${book.customerId || selectedCustomerData.customerId}`, updatedCustomer);
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
            setErrorMessage("Check Network connection");
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
        handleDateChange,
        handleButtonClick,
        isInputVisible,
        handleExcelDownload,
        handlePdfDownload,
        rows,
        columns,
        isEditMode,
        handleEdit,
    };
};

export default useCustomer;