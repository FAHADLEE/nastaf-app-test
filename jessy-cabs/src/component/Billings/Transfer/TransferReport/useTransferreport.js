import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { Organization } from "../../billingMain/PaymentDetail/PaymentDetailData";
import { APIURL } from "../../../url";

const useTransferreport = () => {
  const apiUrl = APIURL;
  const user_id = localStorage.getItem("useridno");
  const [pbpopupOpen, setpbPopupOpen] = useState(false);
  const [npopupOpen, setnPopupOpen] = useState(false);
  const [lxpopupOpen, setlxPopupOpen] = useState(false);
  const [servicestation, setServiceStation] = useState("");
  const [customer, setCustomer] = useState("");
  const [date] = useState(dayjs());
  const [info, setInfo] = useState(false);
  const [bankOptions, setBankOptions] = useState([]);
  const [tripData, setTripData] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [warning, setWarning] = useState(false);
  const [warningMessage] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);

  // for page permission

  const [userPermissions, setUserPermissions] = useState({});

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const currentPageName = "CB Billing";
        const response = await axios.get(
          `http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`
        );
        setUserPermissions(response.data);
      } catch (error) {}
    };

    fetchPermissions();
  }, [user_id, apiUrl]);

  const checkPagePermission = () => {
    const currentPageName = "CB Billing";
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

  useEffect(() => {
    window.history.replaceState(null, document.title, window.location.pathname);
  }, []);

  const tableData = rows.map((row) => [
    row["id"],
    row["tripid"],
    row["vcode"],
    row["guestname"],
  ]);
  const handleExcelDownload = () => {
    const header = ["Sno", "Tripsheet No", "VCode", "Guest Name"];
    const csvData = [
      header,
      ...tableData.map((row) => row.map((value) => `"${value}"`)),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "customer_details.csv");
  };
  const handlePdfDownload = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text("Customer Details", 10, 10);
    pdf.autoTable({
      head: [["Sno", "Tripsheet No", "VCode", "Guest Name"]],
      body: tableData,
      startY: 20,
    });
    const pdfBlob = pdf.output("blob");
    saveAs(pdfBlob, "Transfer Report.pdf");
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

  const handleEInvoiceClick = (row) => {
    if (rows.length === 0) {
      setError(true);
      setErrorMessage("No data available. Please fetch data");
      return;
    }
    setpbPopupOpen(true);
  };
  const handleMapInvoiceClick = (row) => {
    if (rows.length === 0) {
      setError(true);
      setErrorMessage("No data available. Please fetch data");
      return;
    }
    setnPopupOpen(true);
  };

  const handleLuxuryInvoiceClick = (row) => {
    if (rows.length === 0) {
      setError(true);
      setErrorMessage("No data available. Please fetch data");
      return;
    }
    setlxPopupOpen(true);
  };

  const handleETripsheetClick = () => {
    if (rows.length === 0) {
      setError(true);
      setErrorMessage("No data available. Please fetch data");
      return;
    }
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setpbPopupOpen(false);
    setnPopupOpen(false);
    setlxPopupOpen(false);
  };

  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripid = localStorage.getItem("selectedtripsheetid");
        const encoded = localStorage.getItem("selectedcustomerdata");
        localStorage.setItem("selectedcustomer", encoded);
        const storedCustomer = localStorage.getItem("selectedcustomer");
        const customer = decodeURIComponent(storedCustomer);
        const response = await fetch(
          `http://${apiUrl}/tripsheetcustomertripid/${encodeURIComponent(
            customer
          )}/${tripid}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tripData = await response.json();
        if (Array.isArray(tripData)) {
          setTripData(tripData);
          const tripsheetNumbers = tripData.map((row, index) => ({
            id: index + 1,
            guestname: row.guestname,
            tripid: row.tripid,
          }));
          if (tripsheetNumbers.length > 0) {
            const rowsWithUniqueId = tripsheetNumbers.map((row, index) => ({
              ...row,
              id: index + 1,
            }));
            setRows(rowsWithUniqueId);
            // setSuccess(true);
            setSuccessMessage("successfully listed");
          } else {
            setRows([]);
            setError(true);
            setErrorMessage("no data found");
          }
        } else if (typeof tripData === "object") {
          const tripsheetNumbers = [
            { id: 1, guestname: tripData.guestname, tripid: tripData.tripid },
          ];
          setRows(tripsheetNumbers);
        } else {
        }
      } catch {}
    };
    fetchData();
  }, [apiUrl]);

  const customerName = localStorage.getItem("selectedcustomerdata");
  localStorage.setItem("selectedcustomer", customerName);

  const handleserviceInputChange = (event, newValue) => {
    setServiceStation(newValue ? decodeURIComponent(newValue.label) : "");
  };

  //tripsheet data get for normal invoice
  const [routeData, setRouteData] = useState("");
  const [customerData, setCustomerData] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [roundedAmount, setRoundedAmount] = useState("");
  const [sumTotalAndRounded, setSumTotalAndRounded] = useState("");

  const calculateNetAmountSum = (data) => {
    return data.reduce((sum, item) => {
      const netAmountValue = parseFloat(item.netamount, 10);
      return sum + netAmountValue;
    }, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const tripid = localStorage.getItem("selectedtripsheetid");
      const customer = localStorage.getItem("selectedcustomer");
      if (customer) {
        try {
          const response = await fetch(
            `http://${apiUrl}/tripsheetcustomertripid/${customer}/${tripid}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const responseData = await response.json();
          if (Array.isArray(responseData)) {
            setRouteData(responseData);
            const netAmountSum = calculateNetAmountSum(responseData);
            setTotalValue(netAmountSum);

            const calculateRoundOff = () => {
              const balanceAmount = parseFloat(totalValue);
              const roundedGrossAmount = Math.ceil(balanceAmount);
              const roundOff = roundedGrossAmount - balanceAmount;
              return roundOff.toFixed(2);
            };

            const roundOffValue = calculateRoundOff();
            setRoundedAmount(roundOffValue);

            const sumTotalAndRounded =
              parseFloat(netAmountSum) + parseFloat(roundOffValue);
            setSumTotalAndRounded(sumTotalAndRounded);
          } else {
          }
        } catch {}
      }
    };
    fetchData();
  }, [totalValue, roundedAmount, apiUrl]);

  useEffect(() => {
    //this is for getting organization details
    const fetchData = async () => {
      const customer = localStorage.getItem("selectedcustomerdata");
      try {
        const response = await fetch(
          `http://${apiUrl}/customers/${encodeURIComponent(customer)}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const customerData = await response.json();
        setCustomerData(customerData);
      } catch {}
    };
    fetchData();
  }, [apiUrl]);

  const organizationaddress1 = customerData.address1;
  const organizationaddress2 = customerData.address2;
  const organizationcity = customerData.city;
  const organizationgstnumber = customerData.gstnumber;
  const ratetypeforpage = customerData.rateType;

  useEffect(() => {
    Organization()
      .then((data) => {
        if (data) {
          setBankOptions(data);
        } else {
        }
      })
      .catch(() => {});
  }, []);

  const [routedData, setRoutedData] = useState("");

  useEffect(() => {
    const fetchData4 = async () => {
      try {
        const fromdate = localStorage.getItem("fromDate");
        const todate = localStorage.getItem("toDate");
        const customerValue =
          encodeURIComponent(customer) ||
          (tripData.length > 0 ? tripData[0].customer : "");
        const fromDateValue = fromdate;
        const toDateValue = todate;
        const servicestationValue =
          servicestation || (tripData.length > 0 ? tripData[0].department : "");
        if (
          customerValue.trim() !== "" ||
          fromDateValue.trim() !== "" ||
          toDateValue.trim() !== "" ||
          servicestationValue.trim() !== ""
        ) {
          const response = await fetch(`http://${apiUrl}/Get-Billing`, {
            params: {
              customer: customerValue,
              fromDate: fromDateValue,
              toDate: toDateValue,
              servicestation: servicestationValue,
            },
          });

          const routedData = await response.json();
          setRoutedData(routedData);
        }
      } catch {}
    };

    fetchData4();
  }, [customer, servicestation, tripData, apiUrl]);

  const [attachedImage, setAttachedImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripid = localStorage.getItem("selectedtripsheetid");
        if (!tripid) {
          return;
        }
        const response = await fetch(
          `http://${apiUrl}/get-attachedmailimage/${tripid}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const attachedImageUrls = data.imagePaths.map(
          (path) => `http://${apiUrl}/images/${path}`
        );
        setAttachedImage(attachedImageUrls);
      } catch {}
    };
    fetchData();
  }, [apiUrl]);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organizationname = localStorage.getItem("usercompany");
        if (!organizationname) {
          return;
        }
        const response = await fetch(
          `http://${apiUrl}/get-companyimage/${organizationname}`
        );
        if (response.status === 200) {
          const data = await response.json();
          const attachedImageUrls = data.imagePaths.map(
            (path) => `http://${apiUrl}/images/${path}`
          );
          localStorage.setItem(
            "selectedImage",
            JSON.stringify(attachedImageUrls)
          );
          setSelectedImage(attachedImageUrls);
        } else {
          const timer = setTimeout(fetchData, 2000);
          return () => clearTimeout(timer);
        }
      } catch {}
    };
    fetchData();
  }, [apiUrl]);

  const [organizationdata, setorganizationData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const encoded = localStorage.getItem("usercompany");
      localStorage.setItem("usercompanyname", encoded);
      const storedcomanyname = localStorage.getItem("usercompanyname");
      const organizationname = decodeURIComponent(storedcomanyname);
      try {
        const response = await fetch(
          `http://${apiUrl}/organizationdata/${organizationname}`
        );
        if (response.status === 200) {
          const userDataArray = await response.json();
          if (userDataArray.length > 0) {
            setorganizationData(userDataArray[0]);
          }
        } else {
          const timer = setTimeout(fetchData, 2000);
          return () => clearTimeout(timer);
        }
      } catch {}
    };

    fetchData();
  }, [apiUrl]);

  return {
    rows,
    error,
    success,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    isFieldReadOnly,
    organizationdata,
    hidePopup,
    routedData,
    date,
    customer,
    tripData,
    bankOptions,
    ratetypeforpage,
    attachedImage,
    setCustomer,
    servicestation,
    selectedImage,
    handleserviceInputChange,
    handleEInvoiceClick,
    handleMapInvoiceClick,
    handleLuxuryInvoiceClick,
    popupOpen,
    pbpopupOpen,
    handlePopupClose,
    npopupOpen,
    lxpopupOpen,
    handleExcelDownload,
    handlePdfDownload,
    handleETripsheetClick,
    routeData,
    roundedAmount,
    sumTotalAndRounded,
    totalValue,
    organizationaddress1,
    organizationaddress2,
    organizationcity,
    organizationgstnumber,
  };
};

export default useTransferreport;
