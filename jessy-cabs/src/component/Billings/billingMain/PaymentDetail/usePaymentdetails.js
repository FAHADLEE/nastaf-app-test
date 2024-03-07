import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { Organization } from "./PaymentDetailData";
import { APIURL } from "../../../url";

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "tripid", headerName: "TripSheet No", width: 130 },
  { field: "customer", headerName: "Organization", width: 130 },
  { field: "Billingdate", headerName: "Bill Date", width: 130 },
  { field: "Totalamount", headerName: "Total Amount", width: 130 },
  { field: "paidamount", headerName: "Paid", width: 130 },
  { field: "pendingamount", headerName: "Pending", width: 130 },
  { field: "BankAccount", headerName: "Bank Account", width: 150 },
];

const usePaymentdetails = () => {
  const apiUrl = APIURL;
  const user_id = localStorage.getItem("useridno");

  // const [tableData, setTableData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [customer, setCustomer] = useState("");
  const [billingno, setBillingNo] = useState("");
  const [rows, setRows] = useState([]);
  const [toDate, setToDate] = useState(dayjs());
  const [fromDate, setFromDate] = useState(dayjs());
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [info, setInfo] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [bankOptions, setBankOptions] = useState([]);
  const [infoMessage] = useState({});

  // for page permission

  const [userPermissions, setUserPermissions] = useState({});

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const currentPageName = "Payments";
        const response = await axios.get(
          `http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`
        );
        setUserPermissions(response.data);
      } catch {}
    };

    fetchPermissions();
  }, [user_id,apiUrl]);

  const checkPagePermission = () => {
    const currentPageName = "Payments";
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
    const rows = data.map((row) =>
      columns.map((column) => row[column.field]).join(",")
    );
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
    pdf.setFont("helvetica", "normal");
    pdf.text("Customer Details", 10, 10);
    const tableData = rows.map((row) => [
      row["id"],
      row["voucherno"],
      row["printName"],
      row["Billname"],
      row["date"],
      row["PaymentCategory"],
      row["amount"],
    ]);
    pdf.autoTable({
      head: [
        [
          "Sno",
          "VoucherNo",
          "Payment Date",
          "Bill Name",
          "Payment Category",
          "Amount",
        ],
      ],
      body: tableData,
      startY: 20,
    });
    const pdfBlob = pdf.output("blob");
    saveAs(pdfBlob, "Customer_Details.pdf");
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

  const handleInputChange = (event) => {
    if (event.target.name === "customer") {
      setCustomer(event.target.value);
    } else if (event.target.name === "billingno") {
      setBillingNo(event.target.value);
    }
  };
  const handleShow = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://${apiUrl}/payment-details?billingno=${billingno}&customer=${encodeURIComponent(
          customer
        )}&fromDate=${fromDate.format("YYYY-MM-DD")}&toDate=${toDate.format(
          "YYYY-MM-DD"
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
  }, [billingno, customer, fromDate, toDate,apiUrl]);

  useEffect(() => {
    Organization()
      .then((data) => {
        if (data) {
          setBankOptions(data);
        } else {
          setError(true);
          setErrorMessage("Failed to fetch organization options.");
        }
      })
      .catch(() => {
        setError(true);
        setErrorMessage("Failed to fetch organization options.");
      });
  }, []);

  //calculate total amount in column
  useEffect(() => {
    const calculatedTotalAmount = rows.reduce(
      (total, row) => total + parseFloat(row.Totalamount || 0),
      0
    );
    if (!isNaN(calculatedTotalAmount)) {
      setTotalAmount(calculatedTotalAmount.toFixed(2));
    } else {
      setTotalAmount("0");
    }
  }, [rows]);

  //calculate paid amount in column
  useEffect(() => {
    const calculatedPaidAmount = rows.reduce(
      (total, row) => total + parseFloat(row.paidamount || 0),
      0
    );
    if (!isNaN(calculatedPaidAmount)) {
      setPaidAmount(calculatedPaidAmount.toFixed(2));
    } else {
      setPaidAmount("0");
    }
  }, [rows]);

  //calculate pending amount in column
  useEffect(() => {
    const calculatedPendingAmount = rows.reduce(
      (total, row) => total + parseFloat(row.pendingamount || 0),
      0
    );
    if (!isNaN(calculatedPendingAmount)) {
      setPendingAmount(calculatedPendingAmount.toFixed(2));
    } else {
      setPendingAmount("0");
    }
  }, [rows]);

  const handleButtonClickTripsheet = (selectedRow) => {
    const billingPageUrl = `/home/billing/billing?tripid=${
      selectedRow.tripid || ""
    }&billingno=${selectedRow.billingno || ""}&Billingdate=${
      selectedRow.Billingdate || ""
    }&totalkm1=${selectedRow.totalkm1 || ""}&totaltime=${
      selectedRow.totaltime || ""
    }&customer=${selectedRow.customer || ""}&supplier=${
      selectedRow.supplier || ""
    }&startdate=${selectedRow.startdate || ""}&totaldays=${
      selectedRow.totaldays || ""
    }&guestname=${selectedRow.guestname || ""}&rateType=${
      selectedRow.rateType || ""
    }&vehRegNo=${selectedRow.vehRegNo || ""}&vehType=${
      selectedRow.vehType || ""
    }&duty=${selectedRow.duty || ""}&MinCharges=${
      selectedRow.MinCharges || ""
    }&minchargeamount=${selectedRow.minchargeamount || ""}&ChargesForExtra=${
      selectedRow.ChargesForExtra || ""
    }&ChargesForExtraamount=${
      selectedRow.ChargesForExtraamount || ""
    }&cfeamount=${selectedRow.cfeamount || ""}&ChargesForExtraHRS=${
      selectedRow.ChargesForExtraHRS || ""
    }&ChargesForExtraHRSamount=${
      selectedRow.ChargesForExtraHRSamount || ""
    }&cfehamount=${selectedRow.cfehamount || ""}&NightHalt=${
      selectedRow.NightHalt || ""
    }&NightHaltamount=${selectedRow.NightHaltamount || ""}&nhamount=${
      selectedRow.nhamount || ""
    }&driverbata=${selectedRow.driverbata || ""}&driverbataamount=${
      selectedRow.driverbataamount || ""
    }&dbamount=${selectedRow.dbamount || ""}&OtherCharges=${
      selectedRow.OtherCharges || ""
    }&OtherChargesamount=${
      selectedRow.OtherChargesamount || ""
    }&permitothertax=${selectedRow.permitothertax || ""}&parkingtollcharges=${
      selectedRow.parkingtollcharges || ""
    }&MinKilometers=${selectedRow.MinKilometers || ""}&MinHours=${
      selectedRow.MinHours || ""
    }&GrossAmount=${selectedRow.GrossAmount || ""}&AfterTaxAmount=${
      selectedRow.AfterTaxAmount || ""
    }&DiscountAmount=${selectedRow.DiscountAmount || ""}&DiscountAmount2=${
      selectedRow.DiscountAmount2 || ""
    }&AdvanceReceived=${selectedRow.AdvanceReceived || ""}&RoundedOff=${
      selectedRow.RoundedOff || ""
    }&BalanceReceivable=${selectedRow.BalanceReceivable || ""}&NetAmount=${
      selectedRow.NetAmount || ""
    }&Totalamount=${selectedRow.Totalamount || ""}&paidamount=${
      selectedRow.paidamount || ""
    }&pendingamount=${selectedRow.pendingamount || ""}&BankAccount=${
      selectedRow.BankAccount || ""
    }`;
    window.location.href = billingPageUrl;
  };

  const reversedRows = [...rows].reverse();

  return {
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
    billingno,
    handleInputChange,
    customer,
    bankOptions,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleShow,
    handleExcelDownload,
    handlePdfDownload,
    totalAmount,
    paidAmount,
    pendingAmount,
    reversedRows,
    handleButtonClickTripsheet,
    columns,
  };
};

export default usePaymentdetails;
