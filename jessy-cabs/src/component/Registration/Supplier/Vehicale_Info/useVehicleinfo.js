import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import Button from "@mui/material/Button";
import { APIURL } from "../../../url";

const useVehicleinfo = () => {
    const apiUrl = APIURL;
    const user_id = localStorage.getItem('useridno');
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [actionName] = useState('');
    const [rows, setRows] = useState([]);
    const [info, setInfo] = useState(false);
    const [toDate, setToDate] = useState(dayjs());
    const [fromDate, setFromDate] = useState(dayjs());
    const [searchText, setSearchText] = useState('');
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage, setInfoMessage] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);

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
        { field: "vehicleId", headerName: "Vehicle ID", width: 130 },
        { field: "doadate", headerName: "Atteched Date", width: 130 },
        { field: "vehRegNo", headerName: "Vehicle Reg No", width: 130 },
        { field: "costCenter", headerName: "Cost Center Location", width: 170 },
        { field: "vehType", headerName: "Vehicle Type", width: 130 },
        { field: "owner", headerName: "Owner", width: 90 },
        { field: "mobileNo", headerName: "Mobile No", width: 130 },
        { field: "email", headerName: "Email", width: 130 },
        { field: "yearModel", headerName: "Year Model", width: 130 },
        { field: "insuranceno", headerName: "Insurance No", width: 130 },
        { field: "insduedate", headerName: "Insurance Due Date", width: 150 },
        { field: "licenseno", headerName: "License No", width: 130 },
        { field: "licensebatchno", headerName: "License Batch No", width: 140 },
        { field: "licduedate", headerName: "License Due Date", width: 140 },
        { field: "nationalpermito", headerName: "Notional Permit No", width: 150 },
        { field: "npdate", headerName: "Notional Permit Date", width: 150 },
        { field: "statepermito", headerName: "State Permit No", width: 130 },
        { field: "spdate", headerName: "State Permit Date", width: 130 },
        { field: "rcbookno", headerName: "RC Book No", width: 130 },
        { field: "fcdate", headerName: "FC Date", width: 130 },
        { field: "avgmileage", headerName: "AVG Mileage", width: 130 },
        { field: "driverName", headerName: "Driver Name", width: 130 },
        { field: "tankCap", headerName: "Tank Cap", width: 130 },
        { field: "routeno", headerName: "Route No", width: 130 },
        { field: "remarks", headerName: "Remarks", width: 130 },
        { field: "OwnerType", headerName: "Owner Type", width: 130 },
    ];
    //to see pdf
    const [allFile, setAllFile] = useState([]);
    const showPdf = (showID) => {
        axios.get(`http://${apiUrl}/vehicle-docView/${showID}`)
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

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleButtonClick = (params) => {
        const { vehicleId } = params.row;
        if (!vehicleId) {
            setError(true);
            setErrorMessage("PLease Enter Booking No");
            return;
        }

        showPdf(vehicleId);
    };

    // for page permission

    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'Supplier Master';
                const response = await axios.get(`http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch {
            }
        };

        fetchPermissions();
    }, [user_id,apiUrl]);

    const checkPagePermission = () => {
        const currentPageName = 'Supplier Master';
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
    }
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);
    useEffect(() => {
        if (info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [info]);
    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [warning]);
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const [book, setBook] = useState({
        vehicleId: '',
        doadate: '',
        vehRegNo: '',
        costCenter: '',
        vehType: '',
        owner: '',
        mobileNo: '',
        email: '',
        yearModel: '',
        insuranceno: '',
        insduedate: '',
        licenseno: '',
        licensebatchno: '',
        licduedate: '',
        nationalpermito: '',
        npdate: '',
        avgmileage: '',
        statepermito: '',
        spdate: '',
        financer: '',
        rcbookno: '',
        fcdate: '',
        driverName: '',
        tankCap: '',
        routeno: '',
        remarks: '',
        OwnerType: '',
        active: '',
    });

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            vehicleId: '',
            doadate: '',
            vehRegNo: '',
            costCenter: '',
            vehType: '',
            owner: '',
            mobileNo: '',
            email: '',
            yearModel: '',
            insuranceno: '',
            insduedate: '',
            licenseno: '',
            licensebatchno: '',
            licduedate: '',
            nationalpermito: '',
            npdate: '',
            avgmileage: '',
            statepermito: '',
            spdate: '',
            financer: '',
            rcbookno: '',
            fcdate: '',
            driverName: '',
            tankCap: '',
            routeno: '',
            remarks: '',
            OwnerType: '',
            active: '',
        }));
        setSelectedCustomerData({});
        setIsEditMode(false);
    };

    const handleChange = (event) => {
        const { name, value, checked } = event.target;

        if (event.target.type === 'checkbox') {
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

    const vehicleID = selectedCustomerData.vehicleId || book.vehicleId;

    // insurence copy-1
    const [insurance, setInsurance] = useState(null);
    const addInsurence_copy = async () => {
        if (insurance !== null) {
            const formData = new FormData();
            formData.append("file", insurance);
            try {
                await axios.post(`http://${apiUrl}/insurance-pdf/${vehicleID}`, formData)
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
    };

    // licence copyy---2
    const [licence, setLicence] = useState(null);
    const addLicence_copy = async () => {
        if (licence !== null) {

            const formData = new FormData();
            formData.append("file", licence);
            try {
                await axios.post(`http://${apiUrl}/licence-pdf/${vehicleID}`, formData)
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
    };

    // nationalPermit copyy---3
    const [nationalPermit, setNationalPermit] = useState(null);
    const addNationalPermit_copy = async () => {
        if (nationalPermit !== null) {

            const formData = new FormData();
            formData.append("file", nationalPermit);
            try {
                await axios.post(`http://${apiUrl}/nationalPermit-pdf/${vehicleID}`, formData)
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
    };

    // statePermit copyy---4
    const [statePermit, setStatePermit] = useState(null);
    const addStatePermit_copy = async () => {
        if (statePermit !== null) {
            const formData = new FormData();
            formData.append("file", statePermit);
            try {
                await axios.post(`http://${apiUrl}/statePermit-pdf/${vehicleID}`, formData)
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
    };

    // rcBook copyy---5
    const [rcBook, setRcbook] = useState(null);
    const addRcBook_copy = async () => {
        if (rcBook !== null) {
            const formData = new FormData();
            formData.append("file", rcBook);
            try {
                await axios.post(`http://${apiUrl}/rcBook-pdf/${vehicleID}`, formData)
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
    };

    // FcCopy copyy---6
    const [fcCopy, setFcCopy] = useState(null);
    const addFcCopy_copy = async () => {
        if (fcCopy !== null) {
            const formData = new FormData();
            formData.append("file", fcCopy);
            try {
                await axios.post(`http://${apiUrl}/fcCopy-pdf/${vehicleID}`, formData)
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
    };

    const handleAdd = async () => {
        const permissions = checkPagePermission();

        const vehicleId = book.vehicleId;
        if (!vehicleId) {
            setError(true);
            setErrorMessage("Fill mandatory fields");
            return;
        }

        if (permissions.read && permissions.new) {
            try {
                await axios.post(`http://${apiUrl}/vehicleinfo`, book);
                handleCancel();

                addFcCopy_copy();
                addRcBook_copy();
                addStatePermit_copy();
                addNationalPermit_copy();
                addLicence_copy();
                addInsurence_copy();

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

    const handleEdit = async (vehicleId) => {
        try {
            const permissions = checkPagePermission();

            if (permissions.read && permissions.modify) {
                const selectedCustomer = rows.find((row) => row.vehicleId === vehicleId);
                const updatedCustomer = {
                    ...selectedCustomer,
                    ...selectedCustomerData,
                };
                await axios.put(`http://${apiUrl}/vehicleinfo/${selectedCustomerData.vehicleId || book.vehicleId}`, updatedCustomer);
                handleCancel();

                addFcCopy_copy();
                addRcBook_copy();
                addStatePermit_copy();
                addNationalPermit_copy();
                addLicence_copy();
                addInsurence_copy();

                setRows([]);
                setSuccess(true);
                setSuccessMessage("Successfully Updated");
            } else {
                setInfo(true);
                setInfoMessage("You do not have permission.");
            }
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };

    const handleClick = async (event, actionName, vehicleId) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
            } else if (actionName === 'Cancel') {
                handleCancel();
                setRows([]);
                setSuccess(true);
                setSuccessMessage("Successfully listed");
            } else if (actionName === 'Delete') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.delete) {
                    await axios.delete(`http://${apiUrl}/vehicleinfo/${selectedCustomerData.vehicleId || book.vehicleId}`);
                    setSelectedCustomerData(null);
                    handleCancel();
                    setRows([]);
                    setSuccess(true);
                    setSuccessMessage("Successfully Deleted");
                } else {
                    setInfo(true);
                    setInfoMessage("You do not have permission.");
                }
            } else if (actionName === 'Edit') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.modify) {
                    const selectedCustomer = rows.find((row) => row.vehicleId === vehicleId);
                    const updatedCustomer = {
                        ...selectedCustomer,
                        ...selectedCustomerData,
                    };
                    await axios.put(`http://${apiUrl}/vehicleinfo/${selectedCustomerData.vehicleId || book.vehicleId}`, updatedCustomer);
                    handleCancel();
                    //
                    addFcCopy_copy();
                    addRcBook_copy();
                    addStatePermit_copy();
                    addNationalPermit_copy();
                    addLicence_copy();
                    addInsurence_copy();
                    //
                    setRows([]);
                    setSuccess(true);
                    setSuccessMessage("Successfully Updated");
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

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });

    //search funtion
    const handleSearch = async () => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.read) {
            try {
                const response = await fetch(`http://${apiUrl}/searchvehicleinfo?searchText=${searchText}&fromDate=${fromDate}&toDate=${toDate}`);
                const data = await response.json();
                if (data.length > 0) {
                    const rowsWithUniqueId = data.map((row, index) => ({
                        ...row,
                        id: index + 1,
                    }));
                    setRows(rowsWithUniqueId);
                    setSuccess(true);
                    setSuccessMessage("Successfully listed")
                } else {
                    setRows([]);
                    setError(true);
                    setErrorMessage("No data found")
                }
            } catch {
                setError(true);
                setErrorMessage("No data found")
            }
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };

    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
        setIsEditMode(true);
    }, []);


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
        try{
        axios.delete(`http://${apiUrl}/vehicle_documents/` + imagedata)
        setDialogdeleteOpen(false);
        setDialogOpen(false);
        }catch{
            
        }
    };


    return {
        selectedCustomerData,
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
        selectedCustomerId,
        handleRowClick,
        isFieldReadOnly,
        handleAdd,
        hidePopup,
        handleDateChange,
        searchText,
        setSearchText,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        handleSearch,
        handleExcelDownload,
        handlePdfDownload,
        columns,
        setInsurance,
        setLicence,
        setNationalPermit,
        setStatePermit,
        setRcbook,
        setFcCopy,
        allFile,
        handleCloseDialog,
        dialogOpen,
        isEditMode,
        handleEdit,
        handleContextMenu, handleimagedelete, handleClosedeleteDialog, dialogdeleteOpen, setError, setErrorMessage
    };
};

export default useVehicleinfo;