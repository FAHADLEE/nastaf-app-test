import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import dayjs from "dayjs";
import { saveAs } from 'file-saver';
import { APIURL } from "../../../url";

const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "tripno", headerName: "Trip No", width: 130 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "ac", headerName: "A/C", width: 120 },
    { field: "vendorname", headerName: "Vendor Name", width: 130 },
    { field: "vehicle", headerName: "Vehicle", width: 90 },
    { field: "duty", headerName: "Duty", width: 160 },
    { field: "startkms", headerName: "Start-kMS", width: 130 },
    { field: "closekms", headerName: "Close-kMS", width: 130 },
    { field: "totalkms", headerName: "Total-kMS", width: 130 },
    { field: "starttime", headerName: "Start-Time", width: 130 },
    { field: "closetime", headerName: "Close-Time", width: 130 },
    { field: "totaldays", headerName: "Total-Days", width: 130 },
    { field: "runhours", headerName: "Run-Hours", width: 130 },
    { field: "vehicletoll", headerName: "Vehicle-Toll", width: 130 },
    { field: "totalamount", headerName: "Total Amount", width: 130 },
    { field: "driveradvance", headerName: "Driver Advance", width: 130 },
    { field: "bunkadvance", headerName: "Bunk Advance", width: 130 },
    { field: "balance", headerName: "Balance", width: 130 },
    { field: "bata", headerName: "Bata", width: 130 },
];

const useVehiclestatement = () => {
    const apiUrl = APIURL;
    const user_id = localStorage.getItem('useridno');
    const [rows, setRows] = useState([]);
    const [servicestation, setServiceStation] = useState("");
    const [fromDate, setFromDate] = useState(dayjs());
    const [toDate, setToDate] = useState(dayjs());
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage] = useState({});

    // for page permission

    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'Booking';
                const response = await axios.get(`http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch (error) {
                console.error('Error fetching user permissions:', error);
            }
        };

        fetchPermissions();
    }, [user_id,apiUrl]);

    const checkPagePermission = () => {
        const currentPageName = 'Booking';
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

    const convertToCSV = (data) => {
        const header = columns.map((column) => column.headerName).join(",");
        const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
        return [header, ...rows].join("\n");
    };
    const handleExcelDownload = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "VehicleStatement Reports.csv");
    };
    const handlePdfDownload = () => {
        const pdf = new jsPDF('Landscape');
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text("VehicleStatement Reports", 10, 10);

        const tableData = rows.map((row) => [
            row['id'],
            row['status'],
            row['bookingno'],
            row['tripid'],
            row['bookingdate'],
            row['bookingtime'],
            row['guestname'],
            row['mobileno'],
            row['address1'],
            row['address2'],
            row['customer'],
            row['vehRegNo'],
        ]);

        pdf.autoTable({
            head: [['Sno', 'Status', 'Booking ID', 'Tripsheet No', 'Date', 'Time', 'Guest Name', 'Mobile', 'R.Address', 'R.Address1', 'R.Address2', 'Company', 'Register NO']],
            body: tableData,
            startY: 20,
        });

        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'VehicleStatement Reports.pdf');
    };

    const handleInputChange = (event, newValue) => {
        setServiceStation(newValue ? newValue.label : ''); 
    };

    const handleShow = useCallback(async () => {

        try {
            const response = await axios.get(
                `http://${apiUrl}/VehicleStatement-bookings?servicestation=${encodeURIComponent(
                    servicestation
                )}&fromDate=${encodeURIComponent(fromDate.toISOString())}&toDate=${encodeURIComponent(
                    toDate.toISOString()
                )}`
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
            setErrorMessage("Check your Network Connection");
        }

    }, [servicestation, fromDate, toDate,apiUrl]);

    const handleShowAll = useCallback(async () => {

        try {
            const response = await axios.get(
                `http://${apiUrl}/booking`
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
            setErrorMessage("Check your Network Connection");
        }

    }, [apiUrl]);

    const handleButtonClick = (row) => {
        setSelectedRow(row);
        setPopupOpen(true);
    };
    const handlePopupClose = () => {
        setSelectedRow(null);
        setPopupOpen(false);
    };
    const handleBookingClick = () => {
        const bookingPageUrl = `/home/customers/bookings?bookingno=${selectedRow.bookingno}&bookingdate=${selectedRow.bookingdate}&bookingtime=${selectedRow.bookingtime}&status=${selectedRow.status}&tripid=${selectedRow.tripid}&customer=${selectedRow.customer}&orderedby=${selectedRow.orderedby}&mobileno=${selectedRow.mobileno}&guestname=${selectedRow.guestname}&guestmobileno=${selectedRow.guestmobileno}&email=${selectedRow.email}&employeeno=${selectedRow.employeeno}&address1=${selectedRow.address1}&address2=${selectedRow.address2}&city=${selectedRow.city}&report=${selectedRow.report}&vehType=${selectedRow.vehType}&paymenttype=${selectedRow.paymenttype}&startdate=${selectedRow.startdate}&starttime=${selectedRow.starttime}&registertime=${selectedRow.registertime}&duty=${selectedRow.duty}&pickup=${selectedRow.pickup}&costcode=${selectedRow.costcode}&registerno=${selectedRow.registerno}&flightno=${selectedRow.flightno}&orderbyemail=${selectedRow.orderbyemail}&remarks=${selectedRow.remarks}&servicestation=${selectedRow.servicestation}&advance=${selectedRow.advance}&nameupdate=${selectedRow.nameupdate}&address3=${selectedRow.address3}&address4=${selectedRow.address4}&cityupdate=${selectedRow.cityupdate}&useage=${selectedRow.useage}&username=${selectedRow.username}&tripdate=${selectedRow.tripdate}&triptime=${selectedRow.triptime}&emaildoggle=${selectedRow.emaildoggle}&hiretypes=${selectedRow.hiretypes}&travelsname=${selectedRow.travelsname}&vehRegNo=${selectedRow.vehRegNo}&vehiclemodule=${selectedRow.vehiclemodule}&driverName=${selectedRow.driverName}&driverphone=${selectedRow.driverphone}&travelsemail=${selectedRow.travelsemail}`;
        window.location.href = bookingPageUrl;
    };

    const handleTripsheetClick = () => {
        const bookingPageUrl = `/home/customers/tripsheet?bookingno=${selectedRow.bookingno}&bookingdate=${selectedRow.bookingdate}&bookingtime=${selectedRow.bookingtime}&tripid=${selectedRow.tripid}&customer=${selectedRow.customer}&orderedby=${selectedRow.orderedby}&mobileno=${selectedRow.mobileno}&guestname=${selectedRow.guestname}&guestmobileno=${selectedRow.guestmobileno}&email=${selectedRow.email}&employeeno=${selectedRow.employeeno}&address1=${selectedRow.address1}&address2=${selectedRow.address2}&city=${selectedRow.report}&vehType=${selectedRow.vehType}&paymenttype=${selectedRow.paymenttype}&startdate=${selectedRow.startdate}&starttime=${selectedRow.starttime}&registertime=${selectedRow.registertime}&duty=${selectedRow.duty}&pickup=${selectedRow.pickup}&costcode=${selectedRow.costcode}&registerno=${selectedRow.registerno}&flightno=${selectedRow.flightno}&orderbyemail=${selectedRow.orderbyemail}&remarks=${selectedRow.remarks}&servicestation=${selectedRow.servicestation}&advance=${selectedRow.advance}&nameupdate=${selectedRow.nameupdate}&address3=${selectedRow.address3}&address4=${selectedRow.address4}&cityupdate=${selectedRow.cityupdate}&useage=${selectedRow.useage}&username=${selectedRow.username}&tripdate=${selectedRow.tripdate}&triptime=${selectedRow.triptime}&emaildoggle=${selectedRow.emaildoggle}&hiretypes=${selectedRow.hiretypes}&travelsname=${selectedRow.travelsname}&vehRegNo=${selectedRow.vehRegNo}&vehiclemodule=${selectedRow.vehiclemodule}&driverName=${selectedRow.driverName}&driverphone=${selectedRow.driverphone}&travelsemail=${selectedRow.travelsemail}`;
        window.location.href = bookingPageUrl;
    };

    return {
        rows,
        error,
        success,
        info,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        infoMessage,
        isFieldReadOnly,
        hidePopup,
        servicestation,
        handleInputChange,
        fromDate,
        setFromDate,
        toDate,
        handleShow,
        handleShowAll,
        handleExcelDownload,
        handlePdfDownload,
        handleButtonClick,
        popupOpen,
        handlePopupClose,
        selectedRow,
        handleBookingClick,
        handleTripsheetClick,
        setToDate,
        columns
    };
};

export default useVehiclestatement;