import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useUser } from "../../../form/UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useLocation } from "react-router-dom";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import dayjs from "dayjs";
import { APIURL } from "../../../url.js";

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "bookingno", headerName: "Booking No", width: 130 },
  {
    field: "bookingdate",
    headerName: "Booking Date",
    width: 130,
    valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
  },
  { field: "bookingtime", headerName: "Booking Time", width: 130 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "tripid", headerName: "Trip ID", width: 130 },
  { field: "customer", headerName: "Customer", width: 90 },
  { field: "orderedby", headerName: "Ordered-By", width: 160 },
  { field: "mobileno", headerName: "Mobile No", width: 130 },
  { field: "guestname", headerName: "Guest-Name", width: 130 },
  { field: "guestmobileno", headerName: "Guest-Mobile-No", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "employeeno", headerName: "Employee No", width: 130 },
  { field: "address", headerName: "Address", width: 130 },
  { field: "report", headerName: "Report", width: 130 },
  { field: "vehicletype", headerName: "Vehicle Type", width: 130 },
  { field: "paymenttype", headerName: "Payment Type", width: 130 },
  { field: "usage", headerName: "Usage", width: 130 },
  { field: "username", headerName: "User Name", width: 130 },
  { field: "startdate", headerName: "Report Date", width: 130 },
  { field: "starttime", headerName: "Start Time", width: 130 },
  { field: "reporttime", headerName: "Report Time", width: 130 },
  { field: "duty", headerName: "Duty", width: 130 },
  { field: "pickup", headerName: "Pickup", width: 130 },
  { field: "customercode", headerName: "Cost Code", width: 130 },
  { field: "requestno", headerName: "Request No", width: 130 },
  { field: "flightno", headerName: "Flight No", width: 130 },
  { field: "orderbyemail", headerName: "Order By Email", width: 130 },
  { field: "remarks", headerName: "Remarks", width: 130 },
  { field: "servicestation", headerName: "Service Station", width: 130 },
  { field: "advance", headerName: "Advance", width: 130 },
  { field: "hiretype", headerName: "Hire Type", width: 130 },
  { field: "travelsname", headerName: "Travels Name", width: 130 },
  { field: "vehicleregisterno", headerName: "Vehicle Register No", width: 130 },
  { field: "vehiclemodle", headerName: "Vehicle Modle", width: 130 },
  { field: "drivername", headerName: "Driver Name", width: 130 },
  { field: "driverphone", headerName: "Driver Phone", width: 130 },
  { field: "travelsemail", headerName: "Travels Email", width: 130 },
];

const useBooking = () => {
  const apiUrl = APIURL;
  const user_id = localStorage.getItem("useridno");
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState({});
  const [actionName] = useState("");
  const [rows, setRows] = useState([]);
  const [row, setRow] = useState([]);
  const [displayCopy, setDisplayCopy] = useState(false);
  const [toDate, setToDate] = useState(dayjs());
  const [fromDate, setFromDate] = useState(dayjs());
  const [triptime, setTripTime] = useState("");
  const [reporttime, setreporttime] = useState("");
  const [starttime, setStartTime] = useState("");
  const [bookingtime, setBookingTime] = useState("");
  const location = useLocation();
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage, setInfoMessage] = useState({});
  const [searchText, setSearchText] = useState("");
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupOpenmail, setpopupOpenmail] = useState(false);

  const handlePopupClose = () => {
    setPopupOpen(false);
    setpopupOpenmail(false);
  };

  // for page permission

  const [userPermissions, setUserPermissions] = useState({});

  // useEffect(() => {
  //   const fetchPermissions = async () => {
  //     try {
  //       const currentPageName = "Booking";
  //       const response = await axios.get(
  //         `http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`
  //       );
  //       setUserPermissions(response.data);
  //     } catch {}
  //   };

  //   fetchPermissions();
  // }, [user_id]);
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const currentPageName = "Booking";
        const response = await axios.get(
          `http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`
        );
        setUserPermissions(response.data);
      } catch {}
    };

    fetchPermissions();
  }, [user_id, apiUrl]); // Include apiUrl in the dependency array

  const checkPagePermission = () => {
    const currentPageName = "Booking";
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

  const [formValues, setFormValues] = useState({
    guestname: "",
    guestmobileno: "",
    email: "",
    useage: "",
    tripid: "",
    reporttime: "",
    startdate: "",
    address1: "",
    streetno: "",
    city: "",
  });

  const { user } = useUser();

  const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({
    customer: "",
  });

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusValue = params.get("status") || "pending";
    const stationValue = params.get("servicestation") || "Chennai";
    // const bookingsmsValue = params.get('guestsms') || 'guestsms';
    // const sendemailValue = params.get('sendemail') || 'sendemail';
    const payValue = params.get("paymenttype") || "BTC";
    const formData = {};

    const parameterKeys = [
      "bookingno",
      "bookingdate",
      "bookingtime",
      "status",
      "tripid",
      "customer",
      "orderedby",
      "mobile",
      "guestname",
      "guestmobileno",
      "email",
      "employeeno",
      "address1",
      "streetno",
      "city",
      "report",
      "vehType",
      "paymenttype",
      "startdate",
      "starttime",
      "reporttime",
      "duty",
      "pickup",
      "customercode",
      "registerno",
      "flightno",
      "orderbyemail",
      "remarks",
      "servicestation",
      "advance",
      "nameupdate",
      "address3",
      "address4",
      "cityupdate",
      "useage",
      "username",
      "tripdate",
      "triptime",
      "emaildoggle",
      "hireTypes",
      "travelsname",
      "vehRegNo",
      "vehType",
      "driverName",
      "mobileNo",
      "travelsemail",
    ];

    parameterKeys.forEach((key) => {
      const value = params.get(key);
      if (value !== null && value !== "null") {
        formData[key] = value;
      }
    });

    formData["status"] = statusValue;
    formData["servicestation"] = stationValue;
    // formData['guestsms'] = bookingsmsValue;
    // formData['sendemail'] = sendemailValue;
    formData["paymenttype"] = payValue;

    setBook(formData);
    setFormData(formData);
  }, [location]);

  useEffect(() => {
    window.history.replaceState(null, document.title, window.location.pathname);
    const initialFormData = {};
    setFormData(initialFormData);
  }, []);

  const [book, setBook] = useState({
    bookingno: "",
    bookingdate: dayjs(),
    bookingtime: "",
    status: "",
    tripid: "",
    customer: "",
    orderedby: "",
    mobile: "",
    guestname: "",
    guestmobileno: "",
    email: "",
    employeeno: "",
    address1: "",
    streetno: "",
    city: "",
    report: "",
    vehType: "",
    paymenttype: "",
    startdate: "",
    starttime: "",
    reporttime: "",
    duty: "",
    pickup: "",
    customercode: "",
    registerno: "",
    flightno: "",
    guestsms: "",
    sendemail: "",
    orderbyemail: "",
    remarks: "",
    servicestation: "",
    advance: "",
    nameupdate: "",
    address3: "",
    address4: "",
    cityupdate: "",
    useage: "",
    username: "",
    tripdate: "",
    triptime: "",
    emaildoggle: "",
    hireTypes: "",
    travelsname: "",
    vehRegNo: "",
    vehiclemodule: "",
    driverName: "",
    mobileNo: "",
    travelsemail: "",
  });

  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      bookingno: "",
      bookingdate: "",
      bookingtime: "",
      tripid: "",
      customer: "",
      orderedby: "",
      mobile: "",
      guestname: "",
      guestmobileno: "",
      email: "",
      employeeno: "",
      address1: "",
      streetno: "",
      city: "",
      report: "",
      vehType: "",
      paymenttype: "",
      startdate: "",
      starttime: "",
      reporttime: "",
      duty: "",
      pickup: "",
      customercode: "",
      registerno: "",
      flightno: "",
      orderbyemail: "",
      remarks: "",
      servicestation: "",
      advance: "",
      nameupdate: "",
      address3: "",
      address4: "",
      cityupdate: "",
      useage: "",
      username: "",
      tripdate: "",
      triptime: "",
      emaildoggle: "",
      hireTypes: "",
      travelsname: "",
      vehRegNo: "",
      vehiclemodule: "",
      driverName: "",
      mobileNo: "",
      travelsemail: "",
    }));
    setFormValues({});
    setSelectedCustomerData({});
    setSelectedCustomerDatas({});
    setFormData({});
    setIsEditMode(false);
  };
  const convertToCSV = (data) => {
    const header = columns.map((column) => column.headerName).join(",");
    const rows = data.map((row) =>
      columns.map((column) => row[column.field]).join(",")
    );
    return [header, ...rows].join("\n");
  };
  const handleExcelDownload = () => {
    const csvData = convertToCSV(rows);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "BookingStatement Reports.csv");
  };
  const handlePdfDownload = () => {
    const pdf = new jsPDF("Landscape");
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text("Booking Statement Reports", 10, 10);

    // Modify tableData to exclude the index number
    const tableData = rows.map((row) => [
      row["id"],
      row["status"],
      row["bookingno"],
      row["tripid"],
      row["bookingdate"],
      row["bookingtime"],
      row["guestname"],
      row["mobileno"],
      row["address1"],
      row["streetno"],
      row["customer"],
      row["vehRegNo"],
    ]);

    pdf.autoTable({
      head: [
        [
          "Sno",
          "Status",
          "Booking ID",
          "Tripsheet No",
          "Date",
          "Time",
          "Guest Name",
          "Mobile",
          "R.Address",
          "R.Address1",
          "R.Address2",
          "Company",
          "Register NO",
        ],
      ],
      body: tableData,
      startY: 20,
    });

    const pdfBlob = pdf.output("blob");
    saveAs(pdfBlob, "BookingStatement Reports.pdf");
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleChange = useCallback(
    (event) => {
      const { name, value, checked, type } = event.target;

      if (type === "checkbox") {
        setBook((prevBook) => ({
          ...prevBook,
          [name]: checked,
        }));
        setSelectedCustomerData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: checked,
        }));
      } else if (type === "radio") {
        setBook((prevBook) => ({
          ...prevBook,
          [name]: value,
        }));
        setSelectedCustomerData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      } else {
        const fieldValue = value;
        setBook((prevBook) => ({
          ...prevBook,
          [name]: fieldValue,
        }));
        setSelectedCustomerData((prevData) => ({
          ...prevData,
          [name]: fieldValue,
        }));
        setSelectedCustomerDatas((prevData) => ({
          ...prevData,
          [name]: fieldValue,
        }));
        setFormData((prevData) => ({
          ...prevData,
          [name]: fieldValue,
        }));
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: fieldValue,
        }));
      }
    },
    [
      setBook,
      setSelectedCustomerData,
      setFormData,
      setFormValues,
      setSelectedCustomerDatas,
    ]
  );

  const handleAutocompleteChange = (event, value, name) => {
    const selectedOption = value ? value.label : "";
    setBook((prevBook) => ({
      ...prevBook,
      [name]: selectedOption,
    }));
    setSelectedCustomerData((prevData) => ({
      ...prevData,
      [name]: selectedOption,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption,
    }));
  };

  const handleDateChange = (date, name) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const parsedDate = dayjs(formattedDate).format("YYYY-MM-DD");
    setBook((prevBook) => ({
      ...prevBook,
      [name]: parsedDate,
    }));
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: parsedDate,
    }));
    setSelectedCustomerData((prevValues) => ({
      ...prevValues,
      [name]: parsedDate,
    }));
  };

  // ------its for dialog--------------------
  const [dialogOpen, setDialogOpen] = useState(false);

  const booking_id =
    formData.bookingno || selectedCustomerData.bookingno || book.bookingno;
  const handleButtonClick = () => {
    const booking_no =
      formData.bookingno || selectedCustomerData.bookingno || book.bookingno;
    if (!booking_no) {
      setError(true);
      setErrorMessage("PLease Enter Booking No");
      return;
    }
    // setDialogOpen(true);
    showPdf();
  };

  // ------------------------------------------------------------
  const [allFile, setAllFile] = useState([]);

  const showPdf = () => {
    axios
      .get(`http://${apiUrl}/booking-docView/${booking_id}`)
      .then((res) => {
        if (res.data.length > 0) {
          setAllFile(res.data);
          setDialogOpen(true);
        } else {
          setError(true);
          setErrorMessage("No data found");
        }
      })
      .catch();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const [file, setFile] = useState(null);
  const addPdf = async () => {
    if (file !== null) {
      const formData = new FormData();

      formData.append("file", file);
      await axios
        .post(`http://${apiUrl}/bookingpdf/${booking_id}`, formData)
        .then((res) => {})
        .catch();
    } else {
      return;
    }
  };

  //--------------------------------------------------------------

  const [lastBookingNo, setLastBookingNo] = useState("");

  const handleAdd = async () => {
    const permissions = checkPagePermission();

    if (permissions.read && permissions.new) {
      const customer = book.customer;
      if (!customer) {
        setError(true);
        setErrorMessage("fill mantatory fields");
        return;
      }
      try {
        const selectedBookingDate =
          selectedCustomerData.bookingdate || formData.bookingdate || dayjs();

        const updatedBook = {
          ...book,
          ...formData,
          bookingtime: bookingtime || getCurrentTime(),
          starttime: starttime,
          reporttime: reporttime,
          triptime: triptime,
          username: storedUsername,
          bookingdate: selectedBookingDate,
          orderbyemail: selectedCustomerDatas.customeremail,
          orderedby: selectedCustomerDatas.name,
          mobile: selectedCustomerDatas.phoneno,
        };
        await axios.post(`http://${apiUrl}/booking`, updatedBook);
        const response = await axios.get(`http://${apiUrl}/last-booking-no`);
        const lastBookingNo = response.data.bookingno;
        setLastBookingNo(lastBookingNo);
        setPopupOpen(true);
        handleCancel();
        addPdf();
        setRow([]);
        setRows([]);
        setSuccess(true);
        setSuccessMessage("Successfully Added");
        handlecheck();
        handleSendSMS();
      } catch (error) {
        console.error("An error occurred:", error);
        setError(true);
        setErrorMessage("Check your Network Connection");
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
        const selectedCustomer = rows.find(
          (row) =>
            row.bookingno === selectedCustomerData.bookingno ||
            formData.bookingno
        );
        const updatedCustomer = {
          ...formData,
          ...selectedCustomer,
          ...selectedCustomerData,
          bookingtime: bookingtime || selectedCustomerData.bookingtime,
          starttime:
            starttime ||
            book.starttime ||
            selectedCustomerData.starttime ||
            formData.starttime,
          reporttime:
            reporttime ||
            book.reporttime ||
            selectedCustomerData.reporttime ||
            formData.reporttime,
          triptime:
            triptime ||
            book.triptime ||
            selectedCustomerData.triptime ||
            formData.triptime,
          username: storedUsername,
          bookingdate:
            selectedCustomerData.bookingdate || formData.bookingdate || dayjs(),
          orderbyemail: selectedCustomerDatas.customeremail,
          orderedby: selectedCustomerDatas.name,
          mobile: selectedCustomerDatas.phoneno,
        };
        await axios.put(
          `http://${apiUrl}/booking/${
            book.bookingno ||
            selectedCustomerData.bookingno ||
            formData.bookingno
          }`,
          updatedCustomer
        );
        handleCancel();
        addPdf();
        setRow([]);
        setRows([]);
        handlecheck();
        handleSendSMS();
        setSuccess(true);
        setSuccessMessage("Successfully Updated");
      } else {
        setInfo(true);
        setInfoMessage("You do not have permission.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  };

  const handleClick = async (event, actionName) => {
    event.preventDefault();
    try {
      if (actionName === "Email") {
      } else if (actionName === "Clear") {
        handleCancel();
        setRows([]);
        setRow([]);
      } else if (actionName === "Delete") {
        const permissions = checkPagePermission();
        if (permissions.read && permissions.delete) {
          await axios.delete(
            `http://${apiUrl}/booking/${
              book.bookingno || selectedCustomerData.bookingno
            }`
          );
          setSelectedCustomerData(null);
          setSuccess(true);
          setSuccessMessage("Successfully Deleted");
          setFormData(null);
          handleCancel();
          setRow([]);
          setRows([]);
          console.log();
        } else {
          setInfo(true);
          setInfoMessage("You do not have permission.");
        }
      } else if (actionName === "Modify") {
        const permissions = checkPagePermission();
        if (permissions.read && permissions.modify) {
          const selectedCustomer = rows.find(
            (row) =>
              row.bookingno === selectedCustomerData.bookingno ||
              formData.bookingno
          );
          const updatedCustomer = {
            ...formData,
            ...selectedCustomer,
            ...selectedCustomerData,
            bookingtime: bookingtime || selectedCustomerData.bookingtime,
            starttime:
              starttime ||
              book.starttime ||
              selectedCustomerData.starttime ||
              formData.starttime,
            reporttime:
              reporttime ||
              book.reporttime ||
              selectedCustomerData.reporttime ||
              formData.reporttime,
            triptime:
              triptime ||
              book.triptime ||
              selectedCustomerData.triptime ||
              formData.triptime,
            username: storedUsername,
            bookingdate:
              selectedCustomerData.bookingdate ||
              formData.bookingdate ||
              dayjs(),
            orderbyemail: selectedCustomerDatas.customeremail,
            orderedby: selectedCustomerDatas.name,
            mobile: selectedCustomerDatas.phoneno,
          };
          await axios.put(
            `http://${apiUrl}/booking/${
              book.bookingno ||
              selectedCustomerData.bookingno ||
              formData.bookingno
            }`,
            updatedCustomer
          );
          handleCancel();
          addPdf();
          setRow([]);
          setRows([]);
          handlecheck();
          handleSendSMS();
          setSuccess(true);
          setSuccessMessage("Successfully Updated");
        } else {
          setInfo(true);
          setInfoMessage("You do not have permission.");
        }
      } else if (actionName === "Copy This") {
        handleClickShow();
      } else if (actionName === "Add") {
        handleAdd();
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError(true);
      setErrorMessage("Check Network Connection");
    }
  };

  useEffect(() => {
    if (actionName === "List") {
      handleClick(null, "List");
    }
  });

  const handleClickShow = () => {
    setDisplayCopy(true);
  };

  const handleClickHide = () => {
    setDisplayCopy(false);
  };

  const actions = [
    { icon: <LocalPostOfficeIcon />, name: "Email" },
    { icon: <CancelPresentationIcon />, name: "Clear" },
    { icon: <DeleteIcon />, name: "Delete" },
    { icon: <ModeEditIcon />, name: "Modify" },
    { icon: <ContentCopyIcon />, name: "Copy This" },
    { icon: <BookmarkAddedIcon />, name: "Add" },
  ];

  const handleKeyDown = useCallback(async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        const response = await axios.get(
          `http://${apiUrl}/booking/${event.target.value}`
        );
        const bookingDetails = response.data;
        setSelectedCustomerData(bookingDetails);
        console.log(bookingDetails);
        // console.log(apiUrl);
        setSelectedCustomerId(bookingDetails.tripid);
        setIsEditMode(true);
      } catch {
        setError(true);
        setErrorMessage("Error retrieving booking details");
      }
    }
  }, [apiUrl]);

  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    const current = new Date().getFullYear();
    const pastYear = current - 1;
    const value = `JESSY CABS ${pastYear}-${current}`;
    setCurrentYear(value);
  }, []);

  const [enterPressCount, setEnterPressCount] = useState(0);

  const handleKeyEnter = useCallback(
    async (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (enterPressCount === 0) {
          try {
            const response = await axios.get(
              `http://${apiUrl}/name-customers/${event.target.value}`
            );
            const vehicleData = response.data;
            setRows([vehicleData]);
          } catch (error) {
            setError(true);
            setErrorMessage("Error retrieving vehicle details.");
          }
        } else if (enterPressCount === 1) {
          const selectedRow = rows[0];
          if (selectedRow) {
            setSelectedCustomerDatas(selectedRow);
            handleChange({
              target: { name: "customer", value: selectedRow.customer },
            });
          }
        }
        setEnterPressCount((prevCount) => prevCount + 1);
      }
      if (event.target.value === "") {
        setEnterPressCount(0);
      }
    },
    [handleChange, rows, enterPressCount,apiUrl]
  );

  const handleRowClick = useCallback(
    (params) => {
      setSelectedCustomerDatas(params);
      handleChange({ target: { name: "customer", value: params.customer } });
    },
    [handleChange]
  );

  const handletableClick = useCallback((params) => {
    const customerData = params.row;
    setSelectedCustomerData(customerData);
    setSelectedCustomerId(params.row.customerId);
    setIsEditMode(true);
  }, []);

  const [sendEmail, setSendEmail] = useState(false);
  const handlecheck = async () => {
    // if (sendEmail || formData.sendemail || book.sendemail) {
    if (sendEmail) {
      try {
        const dataToSend = {
          guestname:
            formValues.guestname ||
            selectedCustomerData.guestname ||
            book.guestname ||
            formData.guestname,
          guestmobileno:
            formValues.guestmobileno ||
            selectedCustomerData.guestmobileno ||
            book.guestmobileno ||
            formData.guestmobileno,
          email: formValues.email || selectedCustomerData.email || book.email,
          pickup:
            formValues.pickup ||
            selectedCustomerData.pickup ||
            book.pickup ||
            formData.pickup,
          useage:
            formValues.useage ||
            selectedCustomerData.useage ||
            book.useage ||
            formData.useage,
        };

        await axios.post(`http://${apiUrl}/send-email`, dataToSend);
        setSuccess(true);
        setSuccessMessage("Mail Sent Successfully");
      } catch (error) {
        setError(true);
        setErrorMessage("An error occured while sending mail", error);
      }
    } else {
      setError(true);
      setErrorMessage("Send mail checkbox is not checked. Email not sent.");
    }
  };

  const reversedRows = [...row].reverse();

  const handleShowAll = async () => {
    const permissions = checkPagePermission();

    if (permissions.read && permissions.read) {
      try {
        const response = await fetch(
          `http://${apiUrl}/table-for-booking?searchText=${searchText}&fromDate=${fromDate}&toDate=${toDate}`
        );
        const data = await response.json();
        if (data.length > 0) {
          const rowsWithUniqueId = data.map((row, index) => ({
            ...row,
            id: index + 1,
          }));
          setRow(rowsWithUniqueId);
          setSuccess(true);
          setSuccessMessage("successfully listed");
        } else {
          setRow([]);
          setError(true);
          setErrorMessage("no data found");
        }
      } catch {
        setError(true);
        setErrorMessage("sorry");
      }
    } else {
      setInfo(true);
      setInfoMessage("You do not have permission.");
    }
  };
  const handleenterSearch = async (e) => {
    const permissions = checkPagePermission();
    // e.preventDefault();
    if (e.key === "Enter") {
      if (permissions.read && permissions.read) {
        try {
          const response = await fetch(
            `http://${apiUrl}/table-for-booking?searchText=${searchText}&fromDate=${fromDate}&toDate=${toDate}`
          );
          const data = await response.json();
          if (data.length > 0) {
            const rowsWithUniqueId = data.map((row, index) => ({
              ...row,
              id: index + 1,
            }));
            setRow(rowsWithUniqueId);
            setSuccess(true);
            setSuccessMessage("successfully listed");
          } else {
            setRow([]);
            setError(true);
            setErrorMessage("no data found");
          }
        } catch {
          setError(true);
          setErrorMessage("sorry");
        }
      } else {
        setInfo(true);
        setInfoMessage("You do not have permission.");
      }
    }
  };
  useEffect(() => {
    if (user && user.username) {
      const username = user.username;
      localStorage.setItem("username", username);
    }
  }, [user]);
  const storedUsername = localStorage.getItem("username");

  const [guestsms, setGuestSms] = useState(false);

  const handleSendSMS = async () => {
    // if (guestsms || formData.guestsms || book.guestsms) {
    if (guestsms) {
      try {
        const dataToSend = {
          guestname:
            formValues.guestname ||
            selectedCustomerData.guestname ||
            book.guestname ||
            formData.guestname ||
            "",
          guestmobileno:
            formValues.guestmobileno ||
            selectedCustomerData.guestmobileno ||
            book.guestmobileno ||
            formData.guestmobileno ||
            "",
          email:
            formValues.email ||
            selectedCustomerData.email ||
            book.email ||
            formData.pickup ||
            "",
          pickup:
            formValues.pickup ||
            selectedCustomerData.pickup ||
            book.pickup ||
            formData.pickup ||
            "",
          useage:
            formValues.useage ||
            selectedCustomerData.useage ||
            book.useage ||
            formData.useage ||
            "",
          tripid:
            formValues.tripid ||
            formData.tripid ||
            selectedCustomerData.tripid ||
            book.tripid ||
            "",
          reporttime:
            formValues.reporttime ||
            formData.reporttime ||
            selectedCustomerData.reporttime ||
            book.reporttime ||
            "",
          startdate:
            formValues.startdate ||
            formData.startdate ||
            selectedCustomerData.startdate ||
            book.startdate ||
            "",
          address1:
            formValues.address1 ||
            formData.address1 ||
            selectedCustomerData.address1 ||
            book.address1 ||
            "",
          streetno:
            formValues.streetno ||
            formData.streetno ||
            selectedCustomerData.streetno ||
            book.streetno ||
            "",
          city:
            formValues.city ||
            formData.city ||
            selectedCustomerData.city ||
            book.city ||
            "",
        };

        const response = await fetch(`http://${apiUrl}/send-sms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          setSuccess(true);
          setSuccessMessage("SMS sent correctly");
        } else {
          setError(true);
          setErrorMessage("Failed to send SMS");
        }
      } catch {
        setError(true);
        setErrorMessage("Error sending SMS");
      }
    }
  };

  const [attachedImage, setAttachedImage] = useState("");

  const handleGetMail = useCallback(async () => {
    try {
      const bookingno = book.bookingno || selectedCustomerData.bookingno;
      if (!bookingno) {
        setError(true);
        setErrorMessage("Enter booking No");
        return;
      }
      const response = await fetch(
        `http://${apiUrl}/get-attachedmailimage/${bookingno}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAttachedImage(data.files);
      setpopupOpenmail(true);
    } catch {}
  }, [book.bookingno, selectedCustomerData.bookingno,apiUrl]);

  const [dialogdeleteOpen, setDialogdeleteOpen] = useState(false);

  const handleClosedeleteDialog = () => {
    setDialogdeleteOpen(false);
  };

  const [imagedata, setImagedata] = useState(null);

  const handleimagedelete = (imageName) => {
    setImagedata(imageName);
    setDialogdeleteOpen(true);
  };

  const handleContextMenu = () => {
    axios
      .delete(`http://${apiUrl}/booking_doc/` + imagedata)
      .then((res) => {})
      .catch((err) => console.log(err));
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
    attachedImage,
    isFieldReadOnly,
    handleRowClick,
    handleAdd,
    hidePopup,
    formData,
    handleKeyDown,
    handleGetMail,
    handleDateChange,
    getCurrentTime,
    setBook,
    setSelectedCustomerData,
    setBookingTime,
    selectedCustomerDatas,
    handleKeyEnter,
    formValues,
    handleAutocompleteChange,
    setFormData,
    setStartTime,
    guestsms,
    setGuestSms,
    popupOpenmail,
    sendEmail,
    setSendEmail,
    displayCopy,
    currentYear,
    setTripTime,
    handleClickHide,
    actions,
    searchText,
    setSearchText,
    lastBookingNo,
    setreporttime,
    storedUsername,
    fromDate,
    popupOpen,
    handlePopupClose,
    setFromDate,
    toDate,
    setToDate,
    handleShowAll,
    handleExcelDownload,
    handlePdfDownload,
    reversedRows,
    columns,
    handletableClick,
    setFile,
    dialogOpen,
    handleCloseDialog,
    allFile,
    handleButtonClick,
    isEditMode,
    handleEdit,
    handleContextMenu,
    handleimagedelete,
    handleClosedeleteDialog,
    dialogdeleteOpen,
    setErrorMessage,
    setError,
    handleenterSearch,
  };
};

export default useBooking;
