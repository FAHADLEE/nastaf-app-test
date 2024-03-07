import { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import jsPDF from 'jspdf';
import dayjs from "dayjs";
import { saveAs } from 'file-saver';
import { APIURL } from "../../../url";

const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "tripid", headerName: "Trip No", width: 130 },
    { field: "invoiceno", headerName: "Bill No", width: 130 },
    { field: "Billingdate", headerName: "Trip Date", width: 130, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "customer", headerName: "Customer Name", width: 130 },
    { field: "guestname", headerName: "User Name", width: 130 },
    { field: "trips", headerName: "Trips", width: 130 },
    { field: "Totalamount", headerName: "Payable", width: 130 },
];

const useBilled = () => {
    const apiUrl = APIURL;
    const [fromDate, setFromDate] = useState(dayjs());
    const [toDate, setToDate] = useState(dayjs());
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [warning, setWarning] = useState(false);
    const [warningMessage] = useState({});
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [rows, setRows] = useState([]);

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

    const [servicestation, setServiceStation] = useState("");

    const convertToCSV = (data) => {
        const header = columns.map((column) => column.headerName).join(",");
        const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
        return [header, ...rows].join("\n");
    };
    const handleExcelDownload = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "Billing_details.csv");
    };
    const handlePdfDownload = () => {
        const pdf = new jsPDF();
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Customer Details", 10, 10);
        const tableData = rows.map((row) => [
            row['id'],
            row['tripid'],
            row['invoiceno'],
            row['Billingdate'],
            row['customer'],
            row['guestname'],
            row['trips'],
            row['Totalamount']
        ]);
        pdf.autoTable({
            head: [['Sno', 'Trip No', 'Bill No', 'Trip Date', 'Customer Name', 'User Name', 'Trips', 'Totalamount']],
            body: tableData,
            startY: 20,
        });
        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'Billing_Details.pdf');
    };

    const handleButtonClick = () => {
        window.location.href = '/home/customers/tripsheet';
    };

    const handleShow = useCallback(async () => {

        try {
            const response = await axios.get(`http://${apiUrl}/payment-detail`, {
                params: {

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

    }, [fromDate, toDate, servicestation,apiUrl]);

    const handleShowAll = useCallback(async () => {

        try {
            const response = await axios.get(
                `http://${apiUrl}/billing`
            );
            const data = response.data;
            if (data.length > 0) {
                const rowsWithUniqueId = data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                setRows(rowsWithUniqueId);
                setSuccess(true);
                setSuccessMessage("successfully listed")
            } else {
                setRows([]);
                setError(true);
                setErrorMessage("no data found")
            }
        } catch {
            setRows([]);
            setError(true);
            setErrorMessage("Check your Network Connection");
        }

    }, [apiUrl]);

    const handleserviceInputChange = (event, newValue) => {
        setServiceStation(newValue ? decodeURIComponent(newValue.label) : '');
    };

    return {
        rows,
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        hidePopup,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        servicestation,
        handleserviceInputChange,
        handleShow,
        handleExcelDownload,
        handlePdfDownload,
        columns,
        handleButtonClick,
        handleShowAll,
    };
};

export default useBilled;