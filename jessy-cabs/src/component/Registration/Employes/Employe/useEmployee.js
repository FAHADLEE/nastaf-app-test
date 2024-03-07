import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import { APIURL } from "../../../url";

const useEmployee = () => {
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
    const [searchText, setSearchText] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleButtonClick = (params) => {
        const { empid } = params.row;
        if (!empid) {
            setError(true);
            setErrorMessage("PLease Enter Booking No");
            return;
        }
        showPdf(empid);
    };

    // TABLE STRAT
    const columns = [
        { field: "id", headerName: "Sno", width: 50 },
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
                        <UploadFileIcon />
                        view
                    </Button>
                </Button>
            ),
        },
        { field: "empid", headerName: "Employe ID", width: 140 },
        { field: "empname", headerName: "Name", width: 130 },
        { field: "empemailid", headerName: "Email", width: 130 },
        { field: "empmobile", headerName: "Mobile", width: 130 },
        { field: "jobroll", headerName: "Job Roll", width: 130 },
        { field: "joiningdate", headerName: "Joining Date", width: 130 },
        { field: "gender", headerName: "Gender", width: 130 },
        { field: "bloodgroup", headerName: "Bloog Group", width: 130 },
        { field: "guardian", headerName: "Guardian", width: 130 },
        { field: "uanid", headerName: "UAN ID", width: 140 },
        { field: "esino", headerName: "ESI NO", width: 140 },
        { field: "fixedsalary", headerName: "Net Salary", width: 130 },
        { field: "licenceno", headerName: "Driving Licence No", width: 140 },
    ];
    // TABLE END

    // for page permission

    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'Employee PayRoll';
                const response = await axios.get(`http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch {
            }
        };

        fetchPermissions();
    }, [user_id,apiUrl]);

    const checkPagePermission = () => {
        const currentPageName = 'Employee PayRoll';
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
        const pdf = new jsPDF('landscape');
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Employee Details", 10, 10);

        const tableData = rows.map((row) => [
            row['id'],
            row['empid'],
            row['empname'],
            row['empemailid'],
            row['empmobile'],
            row['jobroll'],
            row['joiningdate'],
            row['gender'],
            row['bloodgroup'],
            row['address1'],
            row['aadharcard'],
            row['pancard'],
            row['address2'],
            row['guardian'],
            row['fixedsalary'],
            row['uanid'],
            row['esino'],
            row['uanid']
        ]);
        pdf.autoTable({
            head: [['Sno', 'Employe ID', 'Name', 'Email', 'Mobile', 'Job Roll', 'Joining Date', 'Gender', 'Blood Group', 'Guardian', 'UAN ID', 'ESI NO', 'Net Salary', 'Driving Licence No']],
            body: tableData,
            startY: 20,
            columnWidth: 'auto',
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
        empid: '',
        empname: '',
        empemailid: '',
        empmobile: '',
        jobroll: '',
        joiningdate: '',
        gender: '',
        bloodgroup: '',
        address1: '',
        aadharcard: '',
        pancard: '',
        address2: '',
        guardian: '',
        fixedsalary: '',
        uanid: '',
        esino: '',
        licenceno: '',
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
            empid: '',
            empname: '',
            empemailid: '',
            empmobile: '',
            jobroll: '',
            joiningdate: '',
            gender: '',
            bloodgroup: '',
            address1: '',
            aadharcard: '',
            pancard: '',
            address2: '',
            guardian: '',
            fixedsalary: '',
            uanid: '',
            esino: '',
            licenceno: '',
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

    //--------show pdf---------------
    const [allFile, setAllFile] = useState([]);

    const showPdf = (showID) => {
        axios.get(`http://${apiUrl}/employee-docView/${showID}`)
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

    ///--------------------------------------------

    const empid = selectedCustomerData?.empid || book.empid
    const [file, setFile] = useState(null);

    const addPdf = async () => {
        if (file !== null) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                await axios.post(`http://${apiUrl}/employee-pdf/${empid}`, formData)
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
    }

    //----------------------------------------------
    const handleAdd = async () => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.new) {
            const empname = book.empname;
            if (!empname) {
                setError(true);
                setErrorMessage("Check your Employee ID");
                return;
            }
            try {
                await axios.post(`http://${apiUrl}/employees`, book);
                handleCancel();
                addPdf();
                setRows([]);
                setSuccess(true);
                setSuccessMessage("Successfully Added");
            } catch {

            }
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };

    const handleEdit = async (userid) => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.modify) {
            const selectedCustomer = rows.find((row) => row.empid === empid);
            const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
            await axios.put(`http://${apiUrl}/employees/${book.empid || selectedCustomerData.empid}`, updatedCustomer);
            setSuccess(true);
            setSuccessMessage("Successfully updated");
            handleCancel();
            addPdf();
            setRows([]);
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };


    const handleClick = async (event, actionName, empid) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.read) {
                    const response = await axios.get(`http://${apiUrl}/employees`);
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
                    await axios.delete(`http://${apiUrl}/employees/${book.empid || selectedCustomerData.empid}`);
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
                    const selectedCustomer = rows.find((row) => row.empid === empid);
                    const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                    await axios.put(`http://${apiUrl}/employees/${book.empid || selectedCustomerData.empid}`, updatedCustomer);
                    setSuccess(true);
                    setSuccessMessage("Successfully updated");
                    handleCancel();
                    addPdf();
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
    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });

    const handleShowAll = async () => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.read) {
            try {
                const response = await fetch(`http://${apiUrl}/table-for-employee?searchText=${searchText}`);
                const data = await response.json();
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
                setError(true);
                setErrorMessage("sorry")
            }
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
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
        axios.delete(`http://${apiUrl}/image-delete/` + imagedata)
            .then(res => {
                console.log("deleted")
            })
            .catch(err => console.log(err))
        setDialogdeleteOpen(false);
        setDialogOpen(false);
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
        formData,
        handleDateChange,
        handleExcelDownload,
        handlePdfDownload,
        columns,
        searchText,
        setSearchText,
        handleShowAll,
        allFile,
        handleCloseDialog,
        dialogOpen,
        setFile,
        isEditMode,
        handleEdit,
        handleContextMenu,
        handleimagedelete,
        handleClosedeleteDialog,
        dialogdeleteOpen,
        setError,
        setErrorMessage,
    };
};

export default useEmployee;