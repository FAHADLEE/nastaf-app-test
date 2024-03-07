import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import ReactDOMServer from 'react-dom/server';
import Coverpdf from './coverpdf/Coverpdf';
import { saveAs } from 'file-saver';
import { Organization } from '../../billingMain/PaymentDetail/PaymentDetailData';
import { APIURL } from "../../../url";

const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "billingno", headerName: "Bill No", width: 130 },
    { field: "billdate", headerName: "Bill Date", width: 130 },
    { field: "tripid", headerName: "Trip No", width: 150 },
    { field: "customer", headerName: "Customer", width: 130 },
    { field: "vehRegNo", headerName: "Vehcile No", width: 150 },
    { field: "vehType", headerName: "Vehcile Type", width: 150 },
    { field: "totalkm1", headerName: "KMS", width: 130 },
    { field: "totaltime", headerName: "Hours", width: 130 },
    { field: "totaldays", headerName: "Days", width: 130 },
    { field: "duty", headerName: "Duty", width: 130 },
    { field: "advancepaidtovendor", headerName: "Advance", width: 150 },
    { field: "gst", headerName: "GST%", width: 130 },
    { field: "permit", headerName: "Permit", width: 150 },
    { field: "toll", headerName: "Toll", width: 150 },
    { field: "parking", headerName: "Parking", width: 150 },
    { field: "netamount", headerName: "Net Amount", width: 130 },
    { field: "tripid", headerName: "Trip ID", width: 130 },
    { field: "guestname", headerName: "UserName", width: 150 },
];

const useGroupbilling = () => {
    const apiUrl = APIURL;
    const user_id = localStorage.getItem('useridno');
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(false);
    const [tripData, setTripData] = useState("");
    const [customer, setCustomer] = useState("");
    const [toDate, setToDate] = useState(dayjs());
    const [Billingdate] = useState(dayjs());
    const [success, setSuccess] = useState(false);
    const [invoiceno] = useState("");
    const [totalValue, setTotalValue] = useState("");
    const [fromDate, setFromDate] = useState(dayjs());
    const [bankOptions, setBankOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState({});
    const [roundedAmount, setRoundedAmount] = useState('');
    const [successMessage, setSuccessMessage] = useState({});
    const [servicestation, setServiceStation] = useState("");
    const [sumTotalAndRounded, setSumTotalAndRounded] = useState('');
    const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({});
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
        setBook((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));
        setSelectedCustomerDatas((prevValues) => ({
            ...prevValues,
            [name]: parsedDate,
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const [book, setBook] = useState({
        Billingdate: '',
        invoiceno: '',
        customer: '',
        fromdate: '',
        todate: '',
        station: '',
    });

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

    const calculateNetAmountSum = useCallback((data) => {
        return data.reduce((sum, item) => {
            const netAmountValue = parseFloat(item.netamount, 10);
            if (isNaN(netAmountValue) || !isFinite(netAmountValue)) {
                return sum;
            }
            return sum + netAmountValue;
        }, 0);
    }, []);

    const handleShow = useCallback(async () => {
        try {
            const customerValue = encodeURIComponent(customer || selectedCustomerDatas?.customer || (tripData.length > 0 ? tripData[0].customer : ''));
            const fromDateValue = (selectedCustomerDatas?.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate).format('YYYY-MM-DD');
            const toDateValue = (selectedCustomerDatas?.todate ? dayjs(selectedCustomerDatas.todate) : toDate).format('YYYY-MM-DD');
            const servicestationValue = servicestation || selectedCustomerDatas?.station || (tripData.length > 0 ? tripData[0].department : '');

            const response = await axios.get(`http://${apiUrl}/Group-Billing`, {
                params: {
                    customer: customerValue,
                    fromDate: fromDateValue,
                    toDate: toDateValue,
                    servicestation: servicestationValue
                },
            });
            const data = response.data;

            if (Array.isArray(data) && data.length > 0) {
                setRows(data);
                const netAmountSum = calculateNetAmountSum(data);
                setTotalValue(netAmountSum);

                const roundedGrossAmount = Math.ceil(netAmountSum);
                const roundOff = roundedGrossAmount - netAmountSum;
                const roundOffValue = roundOff.toFixed(2);
                setRoundedAmount(roundOffValue);

                const sumTotalAndRounded = netAmountSum + parseFloat(roundOffValue);
                setSumTotalAndRounded(sumTotalAndRounded);

                setTripData(data);
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
    }, [customer, fromDate, toDate, servicestation, selectedCustomerDatas, tripData, calculateNetAmountSum,apiUrl]);


    const convertToCSV = (data) => {
        const header = columns.map((column) => column.headerName).join(",");
        const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
        return [header, ...rows].join("\n");
    };
    const handleExcelDownload = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "Group Billing.csv");
    };

    const handleCoverPDFDownload = () => {
        if (rows.length === 0) {
            setError(true);
            setErrorMessage('No data available. Please fetch data');
            return;
        }
        const coverpdfComponent = <Coverpdf tripData={tripData} totalValue={totalValue} roundedAmount={roundedAmount} sumTotalAndRounded={sumTotalAndRounded} />;
        const coverpdfHtml = ReactDOMServer.renderToString(coverpdfComponent);
        return coverpdfHtml;
    };

    const handleKeyenter = useCallback(async (event) => {

        if (event.key === 'Enter') {
            try {
                const invoiceNumber = book.invoiceno || invoiceno || selectedCustomerDatas.invoiceno;
                const response = await axios.get(`http://${apiUrl}/billingdata/${invoiceNumber}`);
                if (response.status === 200) {
                    const billingDetails = response.data;
                    if (billingDetails) {
                        setSelectedCustomerDatas(billingDetails);
                        setSuccess(true);
                        setSuccessMessage("Successfully listed");
                    } else {
                        setRows([]);
                        setError(true);
                        setErrorMessage("No data found");
                    }
                } else {
                    setError(true);
                    setErrorMessage(`Failed to retrieve billing details. Status: ${response.status}`);
                }
            } catch (error) {
                setError(true);
                setErrorMessage('Error retrieving billings details.', error);
            }
        }

    }, [invoiceno, book, selectedCustomerDatas,apiUrl]);

    return {
        rows,
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        book,
        handleChange,
        isFieldReadOnly,
        hidePopup,
        invoiceno,
        selectedCustomerDatas,
        handleKeyenter,
        customer,
        tripData,
        bankOptions,
        setCustomer,
        Billingdate,
        fromDate,
        handleDateChange,
        setFromDate,
        toDate,
        setToDate,
        servicestation,
        handleserviceInputChange,
        handleShow,
        handleExcelDownload,
        handleCoverPDFDownload,
        columns
    };
};

export default useGroupbilling;