import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { APIURL } from "../../../url";

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "tripid", headerName: "Trip Sheet No", width: 130 },
  {
    field: "startdate",
    headerName: "Trip Date",
    width: 130,
    valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
  },
  { field: "guestname", headerName: "User Name", width: 130 },
  { field: "customer", headerName: "Customer Name", width: 130 },
  { field: "startkm", headerName: "Start Km", width: 130 },
  { field: "closekm", headerName: "Close Km", width: 130 },
  { field: "totalkm1", headerName: "Total Km", width: 130 },
  { field: "starttime", headerName: "Start Time", width: 130 },
  { field: "closetime", headerName: "Close Time", width: 130 },
  { field: "totaltime", headerName: "Total Time", width: 130 },
  { field: "vehRegNo", headerName: "Vehicle No", width: 130 },
  { field: "driverName", headerName: "Driver", width: 130 },
  { field: "billingno", headerName: "Billing No", width: 130 },
];

const useClosed = () => {
  const apiUrl = APIURL;
  const user_id = localStorage.getItem("useridno");
  const [rows, setRows] = useState([]);
  const [department, setDepartment] = useState("");
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

  // download function
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
    saveAs(blob, "closed_Details.csv");
  };
  const handlePdfDownload = () => {
    const pdf = new jsPDF("landscape");
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text("Customer Details", 10, 10);

    const tableData = rows.map((row) => [
      row["id"],
      row["tripid"],
      row["startdate"],
      row["guestname"],
      row["customer"],
      row["startkm"],
      row["closekm"],
      row["totalkm1"],
      row["starttime"],
      row["closetime"],
      row["totaltime"],
      row["vehRegNo"],
      row["driverName"],
      row["status"],
      row["billingno"],
    ]);

    pdf.autoTable({
      head: [
        [
          "Sno",
          "Trip Sheet No",
          "Trip Date",
          "User Name",
          "Customer Name",
          "Start Km",
          "Close Km",
          "Total Km",
          "Start Time",
          "Close Time",
          "Total Time",
          "Vehicle No",
          "Driver",
          "Status",
          "Billing No",
        ],
      ],
      body: tableData,
      startY: 20,
      columnWidth: "auto",
    });
    const pdfBlob = pdf.output("blob");
    saveAs(pdfBlob, "Customer_Details.pdf");
  };

  // End

  const handleInputChange = (event, newValue) => {
    setDepartment(newValue ? newValue.label : "");
  };

  const reversedRows = [...rows].reverse();

  const handleShow = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://${apiUrl}/closed-tripsheet?department=${encodeURIComponent(
          department
        )}&fromDate=${encodeURIComponent(
          fromDate.toISOString()
        )}&toDate=${encodeURIComponent(toDate.toISOString())}`
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
  }, [department, fromDate, toDate,apiUrl]);

  const handleShowAll = useCallback(async () => {
    try {
      const response = await axios.get(`http://${apiUrl}/tripsheet`);
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
  }, [apiUrl]);

  const handleButtonClickTripsheet = (selectedRow) => {
    const bookingPageUrl = `/home/bookings/tripsheet?tripid=${
      selectedRow.tripid || ""
    }&bookingno=${selectedRow.bookingno || ""}&status=${
      selectedRow.status || ""
    }&billingno=${selectedRow.billingno || ""}&apps=${
      selectedRow.apps || ""
    }&customer=${selectedRow.customer || ""}&orderedby=${
      selectedRow.orderedby || ""
    }&mobile=${selectedRow.mobile || ""}&guestname=${
      selectedRow.guestname || ""
    }&guestmobileno=${selectedRow.guestmobileno || ""}&email=${
      selectedRow.email || ""
    }&employeeno=${selectedRow.employeeno || ""}&guestmobileno=${
      selectedRow.guestmobileno || ""
    }&email=${selectedRow.email || ""}&address1=${
      selectedRow.address1 || ""
    }&streetno=${selectedRow.streetno || ""}&city=${
      selectedRow.city || ""
    }&hireTypes=${selectedRow.hireTypes || ""}&department=${
      selectedRow.department || ""
    }&vehRegNo=${selectedRow.vehRegNo || ""}&vehType=${
      selectedRow.vehType || ""
    }&driverName=${selectedRow.driverName || ""}&mobileNo=${
      selectedRow.mobileNo || ""
    }&driversmsexbetta=${selectedRow.driversmsexbetta || ""}&gps=${
      selectedRow.gps || ""
    }&duty=${selectedRow.duty || ""}&pickup=${
      selectedRow.pickup || ""
    }&useage=${selectedRow.useage || ""}&request=${
      selectedRow.request || ""
    }&startdate=${selectedRow.startdate || ""}&closedate=${
      selectedRow.closedate || ""
    }&totaldays=${selectedRow.totaldays || ""}&employeeno=${
      selectedRow.employeeno || ""
    }&reporttime=${selectedRow.reporttime || ""}&shedkm=${
      selectedRow.shedkm || ""
    }&shedin=${selectedRow.shedin || ""}&shedout=${
      selectedRow.shedout || ""
    }&starttime=${selectedRow.starttime || ""}&closetime=${
      selectedRow.closetime || ""
    }&additionaltime=${selectedRow.additionaltime || ""}&advancepaidtovendor=${
      selectedRow.advancepaidtovendor || ""
    }&customercode=${selectedRow.customercode || ""}&startkm=${
      selectedRow.startkm || ""
    }&closekm=${selectedRow.closekm || ""}&permit=${
      selectedRow.permit || ""
    }&parking=${selectedRow.parking || ""}&toll=${
      selectedRow.toll || ""
    }&vpermettovendor=${selectedRow.vpermettovendor || ""}&vendortoll=${
      selectedRow.vendortoll || ""
    }&customeradvance=${selectedRow.customeradvance || ""}&email1=${
      selectedRow.email1 || ""
    }&remark=${selectedRow.remark || ""}&smsguest=${
      selectedRow.smsguest || ""
    }&documentnotes=${selectedRow.documentnotes || ""}&VendorTripNo=${
      selectedRow.VendorTripNo || ""
    }&vehicles=${selectedRow.vehicles || ""}&duty1=${
      selectedRow.duty1 || ""
    }&startdate1=${selectedRow.startdate1 || ""}&closedate1=${
      selectedRow.closedate1 || ""
    }&totaldays1=${selectedRow.totaldays1 || ""}&locks=${
      selectedRow.locks || ""
    }&starttime2=${selectedRow.starttime2 || ""}&closetime2=${
      selectedRow.closetime2 || ""
    }&totaltime=${selectedRow.totaltime || ""}&startkm1=${
      selectedRow.startkm1 || ""
    }&closekm1=${selectedRow.closekm1 || ""}&totalkm1=${
      selectedRow.totalkm1 || ""
    }&remark1=${selectedRow.remark1 || ""}&caramount=${
      selectedRow.caramount || ""
    }&minkm=${selectedRow.minkm || ""}&minhrs=${
      selectedRow.minhrs || ""
    }&package=${selectedRow.package || ""}&amount=${
      selectedRow.amount || ""
    }&exkm=${selectedRow.exkm || ""}&amount1=${
      selectedRow.amount1 || ""
    }&exHrs=${selectedRow.exHrs || ""}&amount2=${
      selectedRow.amount2 || ""
    }&night=${selectedRow.night || ""}&amount3=${
      selectedRow.amount3 || ""
    }&driverconvenience=${selectedRow.driverconvenience || ""}&amount4=${
      selectedRow.amount4 || ""
    }&netamount=${selectedRow.netamount || ""}&vehcommission=${
      selectedRow.vehcommission || ""
    }&caramount1=${selectedRow.caramount1 || ""}&manualbills=${
      selectedRow.manualbills || ""
    }&pack=${selectedRow.pack || ""}&amount5=${
      selectedRow.amount5 || ""
    }&exkm1=${selectedRow.exkm1 || ""}&amount6=${
      selectedRow.amount6 || ""
    }&exHrs1=${selectedRow.exHrs1 || ""}&amount7=${
      selectedRow.amount7 || ""
    }&night1=${selectedRow.night1 || ""}&amount8=${
      selectedRow.amount8 || ""
    }&driverconvenience1=${selectedRow.driverconvenience1 || ""}&amount9=${
      selectedRow.amount9 || ""
    }&rud=${selectedRow.rud || ""}&netamount1=${
      selectedRow.netamount1 || ""
    }&discount=${selectedRow.discount || ""}&ons=${
      selectedRow.ons || ""
    }&manualbills1=${selectedRow.manualbills1 || ""}&balance=${
      selectedRow.balance || ""
    }&fcdate=${selectedRow.fcdate || ""}&taxdate=${
      selectedRow.taxdate || ""
    }&insdate=${selectedRow.insdate || ""}&stpermit=${
      selectedRow.stpermit || ""
    }&maintenancetype=${selectedRow.maintenancetype || ""}&kilometer=${
      selectedRow.kilometer || ""
    }&selects=${selectedRow.selects || ""}&documenttype=${
      selectedRow.documenttype || ""
    }&on1=${selectedRow.on1 || ""}&smsgust=${
      selectedRow.smsgust || ""
    }&booker=${selectedRow.booker || ""}&emailcheck=${
      selectedRow.emailcheck || ""
    }&valueprint=${selectedRow.valueprint || ""}&manualbillss=${
      selectedRow.manualbillss || ""
    }&reload=${selectedRow.reload || ""}`;
    window.location.href = bookingPageUrl;
  };

  const handleButtonClick = () => {
    window.location.href = "/home/bookings/tripsheet";
  };

  return {
    fromDate,
    setFromDate,
    toDate,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    setToDate,
    handleShow,
    isFieldReadOnly,
    handleShowAll,
    department,
    hidePopup,
    handleInputChange,
    handleExcelDownload,
    handlePdfDownload,
    handleButtonClick,
    reversedRows,
    handleButtonClickTripsheet,
    columns,
  };
};

export default useClosed;
