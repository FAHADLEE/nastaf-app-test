import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { APIURL } from "../../../url";

// TABLE START
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "bookingno", headerName: "Booking ID", width: 130 },
  { field: "bookingdate", headerName: "Date", width: 130 },
  { field: "bookingtime", headerName: "Time", width: 90 },
  { field: "guestname", headerName: "Guest Name", width: 160 },
  { field: "mobileno", headerName: "Mobile", width: 130 },
  { field: "address1", headerName: "R.Address", width: 130 },
  { field: "address2", headerName: "R.Address1", width: 130 },
  { field: "city", headerName: "R.Address2", width: 130 },
  { field: "customer", headerName: "Company", width: 130 },
  { field: "tripid", headerName: "BookingID", width: 130 },
];
// TABLE END

const useBookingcopy = () => {
  const apiUrl = APIURL;
  const user_id = localStorage.getItem("useridno");
  const [rows, setRows] = useState([]);
  const [bookingno, setBookingNo] = useState("");
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});

  // for page permission

  const [userPermissions, setUserPermissions] = useState({});

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
  }, [user_id, apiUrl]);

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

  const handleInputChange = (event) => {
    setBookingNo(event.target.value);
  };

  const handleShow = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://${apiUrl}/booking?bookingno=${bookingno}&fromDate=${fromDate.format(
          "YYYY-MM-DD"
        )}&toDate=${toDate.format("YYYY-MM-DD")}`
      );
      const data = response.data;
      if (data.length > 0) {
        const rowsWithUniqueId = data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setRows(rowsWithUniqueId);
        setSuccess(true);
        setSuccessMessage("successfully listed");
      } else {
        setRows([]);
        setError(true);
        setErrorMessage("no data found");
      }
    } catch {
      setRows([]);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  }, [bookingno, fromDate, toDate, apiUrl]);

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
    bookingno,
    handleInputChange,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleShow,
    columns,
  };
};

export default useBookingcopy;
