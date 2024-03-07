import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { Organization } from '../../billingMain/PaymentDetail/PaymentDetailData';
import { APIURL } from "../../../url";

const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "invoiceno", headerName: "Invoice No", width: 130 },
    { field: "Billingdate", headerName: "Date", width: 130, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "customer", headerName: "Customer", width: 130 },
    { field: "fromdate", headerName: "From Date", width: 130, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "todate", headerName: "To Date", width: 150, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "guestname", headerName: "UserName", width: 150 },
    { field: "trips", headerName: "Trips", width: 150 },
    { field: "Totalamount", headerName: "Amount", width: 130 },
];

const useCoversubmit = () => {
    const apiUrl = APIURL;
    const user_id = localStorage.getItem('useridno');
    const [tripData] = useState('');
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [fromDate, setFromDate] = useState(dayjs());
    const [toDate, setToDate] = useState(dayjs());
    const [customer, setCustomer] = useState("");
    const [success, setSuccess] = useState(false);
    const [bankOptions, setBankOptions] = useState([]);
    const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({});
    const [servicestation, setServiceStation] = useState("");
    const [successMessage, setSuccessMessage] = useState({});
    const [warning, setWarning] = useState(false);
    const [warningMessage] = useState({});

    // for page permission

    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'CB Billing';
                const response = await axios.get(`http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch {
            }
        };

        fetchPermissions();
    }, [user_id,apiUrl]);

    const checkPagePermission = () => {
        const currentPageName = 'CB Billing';
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

    // Function to determine if a field should be read-only based on permissions
    const isFieldReadOnly = (fieldName) => {
        if (permissions.read) {
            // If user has read permission, check for other specific permissions
            if (fieldName === "delete" && !permissions.delete) {
                return true;
            }
            return false;
        }
        return true;
    };

    const convertToCSV = (data) => {
        const header = columns.map((column) => column.headerName).join(",");
        const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
        return [header, ...rows].join("\n");
    };
    const handleExcelDownload = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "Cover.csv");
    };
    const handlePdfDownload = () => {
        const pdf = new jsPDF();
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Cover Submit", 10, 10);
        const tableData = rows.map((row) => [
            row['id'],
            row['status'],
            row['invoiceno'],
            row['Billingdate'],
            row['customer'],
            row['fromdate'],
            row['todate'],
            row['guestname'],
            row['trips'],
            row['Totalamount']
        ]);
        pdf.autoTable({
            head: [['Sno', 'Status', 'Invoice No', 'Date', 'Customer', 'From Date', 'To Date', 'UserName', 'Trips', 'Amount']],
            body: tableData,
            startY: 20,
        });
        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'Cover.pdf');
    };

    const hidePopup = () => {
        setError(false);
        setSuccess(false);
        setWarning(false);
    };
    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [warning]);
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

    const handleserviceInputChange = (event, newValue) => {
        setServiceStation(newValue ? decodeURIComponent(newValue.label) : '');
    };

    const handleDateChange = (date, name) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');

        setSelectedCustomerDatas((prevValues) => ({
            ...prevValues,
            [name]: parsedDate,
        }));
    };

    useEffect(() => {
        Organization()
            .then((data) => {
                if (data) {
                    setBankOptions(data);
                } else {
                }
            })
            .catch(() => {
            });
    }, []);

    const handleShow = useCallback(async () => {

        try {
            const response = await axios.get(`http://${apiUrl}/payment-detail`, {
                params: {
                    customer: encodeURIComponent(customer),
                    fromDate: fromDate.format('YYYY-MM-DD'),
                    toDate: toDate.format('YYYY-MM-DD'),
                    servicestation: encodeURIComponent(servicestation),
                },
            });

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
        } catch {
            setRows([]);
            setError(true);
            setErrorMessage("Check your Network Connection");
        }

    }, [customer, fromDate, toDate, servicestation,apiUrl]);

    return {
        rows,
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        isFieldReadOnly,
        hidePopup,
        customer,
        tripData,
        bankOptions,
        setCustomer,
        selectedCustomerDatas,
        fromDate,
        handleDateChange,
        setFromDate,
        toDate,
        setToDate,
        servicestation,
        handleserviceInputChange,
        handleShow,
        handleExcelDownload,
        handlePdfDownload,
        columns,
    };
};

export default useCoversubmit;