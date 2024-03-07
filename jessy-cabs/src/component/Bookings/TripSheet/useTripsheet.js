import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import {
    VehicleRate,
} from "./TripSheetdata";
import { APIURL } from "../../url";

const useTripsheet = () => {
    const apiUrl = APIURL;

    const user_id = localStorage.getItem('useridno');
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({
        vehType: '',
        driverName: '',
        vehRegNo: '',
        mobileNo: '',
    });
    const [selectedCustomerId, setSelectedCustomerId] = useState({});
    const [rows, setRows] = useState([]);
    const [row, setRow] = useState([]);
    const [starttime, setStartTime] = useState('');
    const [closetime, setCloseTime] = useState('');
    const [reporttime, setreporttime] = useState('');
    const [shedintime, setshedintime] = useState('');
    const [starttime2, setStartTime2] = useState('');
    const [closetime2, setCloseTime2] = useState('');
    const [formData, setFormData] = useState({});
    const location = useLocation();
    const [error, setError] = useState(false);
    const [shedKilometers, setShedKilometers] = useState('');
    const [additionalTime, setAdditionalTime] = useState('');
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [imgpopupOpen, setimgPopupOpen] = useState(false);
    const [mapimgpopupOpen, setMapimgPopupOpen] = useState(false);
    const [maplogimgpopupOpen, setMaplogimgPopupOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage, setInfoMessage] = useState({});
    const [link, setLink] = useState('');
    const [isSignatureSubmitted] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // for page permission

    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'Trip Sheet';
                const response = await axios.get(`http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch {
            }
        };

        fetchPermissions();
    }, [user_id ,apiUrl]);

    const checkPagePermission = () => {
        const currentPageName = 'Trip Sheet';
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

    const [packageData, setPackageData] = useState({
        customer: '',
        vehType: '',
        duty: '',
        totalkm1: '',
        totaltime: '',
    });
    const [packageDetails, setPackageDetails] = useState({
        KMS: '',
        Hours: '',
        duty: '',
    });

    const handleButtonClick = () => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.read) {
            const tripid = book.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid;

            if (!tripid) {
                setError(true);
                setErrorMessage("Please enter the tripid");
            } else {
                localStorage.setItem('selectedTripid', tripid);
                const newTab = window.open('/navigationmap', '_blank', 'noopener,noreferrer');
                if (newTab) {
                    newTab.focus();
                } else {
                }
            }
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };

    //generate link

    const generateLink = async () => {

        try {
            const tripidNO = book.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid;
            if (!tripidNO) {
                setError(true);
                setErrorMessage("Please enter the tripid");
                return;
            }
            const tripid = selectedCustomerData.tripid || formData.tripid || book.tripid;
            const response = await axios.post(`http://${apiUrl}/generate-link/${tripid}`)
            setLink(response.data.link);
        } catch {
        }
    };

    const handlePopupClose = () => {
        setPopupOpen(false);
    };

    const [mapimageUrls, setMapImageUrls] = useState([]);

    const handleTripmapClick = async () => {
        try {
            const tripid = selectedRow?.tripid || book?.tripid || selectedCustomerData?.tripid || formData?.tripid;
            if (!tripid) {
                return;
            }
            const response = await fetch(`http://${apiUrl}/getmapimages/${tripid}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.blob();
            // Assuming you want to display the image directly
            const imageUrl = URL.createObjectURL(responseData);
            setMapImageUrls(imageUrl);
            setMapimgPopupOpen(true);
        } catch {
        }
    };

    const handleTripmaplogClick = async () => {
        try {
            const tripid = selectedRow?.tripid || book?.tripid || selectedCustomerData?.tripid || formData?.tripid;
            if (!tripid) {
                setError(true);
                setErrorMessage("Please enter the tripid");
            } else {
                const response = await axios.get(`http://${apiUrl}/get-gmapdata/${tripid}`);
                const data = response.data;
                setRow(data);
                setMaplogimgPopupOpen(true);
            }
        } catch {
        }
    };

    //refresh button function
    const handleRefresh = async () => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.read) {
            const tripid = book.tripid || selectedCustomerData.tripid || formData.tripid;
            try {
                if (!tripid) {
                    setError(true);
                    setErrorMessage("Please enter the tripid");
                } else {
                    const response = await axios.get(`http://${apiUrl}/tripuploadcollect/${tripid}`);
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
                }
            } catch {
            }
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };
    //list data in row
    const [imageUrl, setImageUrl] = useState('');
    const handleTripRowClick = (params) => {
        setSelectedRow(params.row);
        const encodedPath = encodeURIComponent(params.row.path);
        setimgPopupOpen(true);
        setImageUrl(`http://${apiUrl}/get-image/${encodedPath}`);
    };
    const handleimgPopupClose = () => {
        setimgPopupOpen(false);
        setMapimgPopupOpen(false);
        setMaplogimgPopupOpen(false);
    };
    const [formValues, setFormValues] = useState({
        guestname: '',
        guestmobileno: '',
        email: '',
        pickup: '',
        useage: '',
        hireTypes: '',
        department: '',
        vehType: '',
        vehRegNo: '',
        driverName: '',
        mobileNo: '',
        reporttime: '',
        startdate: '',
    });
    const [sendEmail, setSendEmail] = useState(false);

    const handlecheck = async () => {
        if (sendEmail) {
            try {
                const dataToSend = {
                    guestname: formValues.guestname || selectedCustomerData.guestname || book.guestname || formData.guestname,
                    guestmobileno: formValues.guestmobileno || selectedCustomerData.guestmobileno || book.guestmobileno || formData.guestmobileno,
                    email: formValues.email || selectedCustomerData.email || book.email || formData.email,
                    pickup: formValues.pickup || selectedCustomerData.pickup || book.pickup || formData.pickup,
                    useage: formValues.useage || selectedCustomerData.useage || book.useage || formData.useage,
                    hireTypes: formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || formData.hireTypes,
                    department: formValues.department || selectedCustomerData.department || book.department || formData.department,
                    vehRegNo: formValues.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || formData.vehRegNo,
                    vehType: formValues.vehType || selectedCustomerData.vehType || book.vehType || formData.vehType,
                    driverName: formValues.driverName || selectedCustomerData.driverName || book.driverName || formData.driverName,
                    mobileNo: formValues.mobileNo || selectedCustomerData.mobileNo || book.mobileNo || formData.mobileNo
                };
                await axios.post(`http://${apiUrl}/send-tripsheet-email`, dataToSend);
                setSuccess(true);
            } catch {
                alert('An error occurred while sending the email');
            }
        } else {
        }
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

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const statusValue = params.get('status') || 'Opened';
        // const bookingsmsValue = params.get('smsguest') || 'smsguest';
        // const sendemailValue = params.get('booker') || 'booker';
        // const emailcheckValue = params.get('emailcheck') || 'emailcheck';
        // const DriverSMSValue = params.get('DriverSMS') || 'DriverSMS';
        // const gpsValue = params.get('gps') || 'gps';
        const appsValue = params.get('apps') || 'Waiting';
        const formData = {};

        const parameterKeys = [
            'tripid', 'bookingno', 'billingno', 'apps', 'customer', 'orderedby', 'mobile', 'guestname', 'guestmobileno', 'email', 'address1', 'streetno', 'city', 'hireTypes', 'department', 'vehRegNo', 'vehType', 'driverName', 'mobileNo', 'driversmsexbetta', 'gps', 'duty', 'pickup', 'useage', 'request', 'startdate', 'closedate', 'totaldays', 'employeeno', 'reporttime', 'starttime', 'closetime', 'shedintime', 'additionaltime', 'advancepaidtovendor', 'customercode', 'startkm', 'closekm', 'shedkm', 'shedin', 'shedout', 'permit', 'parking', 'toll', 'vpermettovendor', 'vendortoll', 'customeradvance', 'email1', 'remark', 'smsguest', 'documentnotes', 'VendorTripNo', 'vehicles', 'duty1', 'startdate1', 'closedate1', 'totaldays1', 'locks', 'starttime2', 'closetime2', 'totaltime', 'startkm1', 'closekm1', 'totalkm1', 'remark1', 'caramount', 'minkm', 'minhrs', 'package', 'amount', 'exkm', 'amount1', 'exHrs', 'amount2', 'night', 'amount3', 'driverconvenience', 'amount4', 'exkmTkm', 'exHrsTHrs', 'nightThrs', 'dtc', 'dtc2', 'nightThrs2', 'exkmTkm2', 'exHrsTHrs2', 'netamount', 'vehcommission', 'caramount1', 'manualbills', 'pack', 'amount5', 'exkm1', 'amount6', 'exHrs1', 'amount7', 'night1', 'amount8', 'driverconvenience1', 'amount9', 'rud', 'netamount1', 'discount', 'ons', 'manualbills1', 'balance', 'fcdate', 'taxdate', 'insdate', 'stpermit', 'maintenancetype', 'kilometer', 'selects', 'documenttype', 'on1', 'smsgust', 'booker', 'emailcheck', 'manualbillss', 'reload'
        ];
        parameterKeys.forEach(key => {
            const value = params.get(key);
            if (value !== null && value !== "null") {
                formData[key] = value;
            }
        });
        formData['status'] = statusValue;
        // formData['smsguest'] = bookingsmsValue;
        // formData['booker'] = sendemailValue;
        // formData['emailcheck'] = emailcheckValue;
        // formData['DriverSMS'] = DriverSMSValue;
        // formData['gps'] = gpsValue;
        formData['apps'] = appsValue;
        setTripSheetData(formData);
        setBook(formData);
        setFormData(formData);
    }, [location]);

    useEffect(() => {
        window.history.replaceState(null, document.title, window.location.pathname);
        const initialFormData = {};
        setFormData(initialFormData);
    }, []);

    const [book, setBook] = useState({
        tripid: '',
        bookingno: '',
        status: '',
        tripsheetdate: '',
        billingno: '',
        apps: '',
        customer: '',
        orderedby: '',
        mobile: '',
        guestname: '',
        guestmobileno: '',
        email: '',
        address1: '',
        streetno: '',
        city: '',
        hireTypes: '',
        department: '',
        vehRegNo: '',
        vehType: '',
        driverName: '',
        mobileNo: '',
        driversmsexbetta: '',
        gps: '',
        duty: '',
        pickup: '',
        useage: '',
        request: '',
        startdate: '',
        closedate: '',
        employeeno: '',
        reporttime: '',
        starttime: '',
        closetime: '',
        shedintime: '',
        advancepaidtovendor: '',
        customercode: '',
        shedkm: '',
        shedin: '',
        shedout: '',
        startkm: '',
        closekm: '',
        permit: '',
        parking: '',
        toll: '',
        emailcheck: '',
        vpermettovendor: '',
        vendortoll: '',
        customeradvance: '',
        email1: '',
        documentnotes: '',
        VendorTripNo: '',
        vehicles: '',
        duty1: '',
        startdate1: '',
        closedate1: '',
        totaldays: '',
        starttime2: '',
        closetime2: '',
        totaltime: '',
        startkm1: '',
        closekm1: '',
        totalkm1: '',
        remark: '',
        caramount: '',
        minkm: '',
        minhrs: '',
        package: '',
        amount: '',
        exkm: '',
        amount1: '',
        exHrs: '',
        amount2: '',
        night: '',
        amount3: '',
        driverconvenience: '',
        amount4: '',
        netamount: '',
        vehcommission: '',
        manualbills: '',
        pack: '',
        amount5: '',
        exkm1: '',
        amount6: '',
        exHrs1: '',
        amount7: '',
        night1: '',
        amount8: '',
        driverconvenience1: '',
        amount9: '',
        rud: '',
        netamount1: '',
        discount: '',
        ons: '',
        balance: '',
        fcdate: '',
        taxdate: '',
        insdate: '',
        stpermit: '',
        maintenancetype: '',
        kilometer: '',
        selects: '',
        documenttype: '',
        on1: '',
        smsguest: '',
        booker: '',
        DriverSMS: '',
        manualbillss: '',
        reload: '',
        locks: '',
    });

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            tripid: '',
            bookingno: '',
            tripsheetdate: '',
            status: '',
            billingno: '',
            apps: '',
            customer: '',
            orderedby: '',
            mobile: '',
            guestname: '',
            guestmobileno: '',
            email: '',
            address1: '',
            streetno: '',
            city: '',
            hireTypes: '',
            department: '',
            vehRegNo: '',
            vehType: '',
            driverName: '',
            mobileNo: '',
            driversmsexbetta: '',
            gps: '',
            duty: '',
            pickup: '',
            useage: '',
            request: '',
            startdate: '',
            closedate: '',
            employeeno: '',
            reporttime: '',
            starttime: '',
            closetime: '',
            shedintime: '',
            advancepaidtovendor: '',
            customercode: '',
            shedin: '',
            shedout: '',
            shedkm: '',
            startkm: '',
            closekm: '',
            permit: '',
            parking: '',
            toll: '',
            vpermettovendor: '',
            vendortoll: '',
            customeradvance: '',
            email1: '',
            documentnotes: '',
            VendorTripNo: '',
            vehicles: '',
            duty1: '',
            startdate1: '',
            closedate1: '',
            totaldays: '',
            starttime2: '',
            closetime2: '',
            totaltime: '',
            startkm1: '',
            closekm1: '',
            totalkm1: '',
            remark: '',
            caramount: '',
            minkm: '',
            minhrs: '',
            package: '',
            amount: '',
            exkm: '',
            amount1: '',
            exHrs: '',
            amount2: '',
            night: '',
            amount3: '',
            driverconvenience: '',
            amount4: '',
            netamount: '',
            vehcommission: '',
            manualbills: '',
            pack: '',
            amount5: '',
            exkm1: '',
            amount6: '',
            exHrs1: '',
            amount7: '',
            night1: '',
            amount8: '',
            driverconvenience1: '',
            amount9: '',
            rud: '',
            netamount1: '',
            discount: '',
            ons: '',
            balance: '',
            fcdate: '',
            taxdate: '',
            insdate: '',
            stpermit: '',
            maintenancetype: '',
            kilometer: '',
            selects: '',
            documenttype: '',
            on1: '',
            smsguest: '',
            booker: '',
            emailcheck: '',
            manualbillss: '',
            reload: '',
            locks: '',
        }));
        setSelectedCustomerDatas({});
        setSelectedCustomerData({});
        setFormData({});
        setFormValues({});
        setPackageData({});
        setPackageDetails({});
        setIsEditMode(false);
    };

    const handleETripsheetClick = (row) => {
        const tripid = book.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid;
        if (!tripid) {
            setError(true);
            setErrorMessage("please enter the tripid");
        }
        else {
            localStorage.setItem('selectedTripid', tripid);
            setPopupOpen(true);
        }
    };

    const handleDelete = async () => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.delete) {
            if (!selectedCustomerData.tripid) {
                return;
            }
            try {
                await axios.delete(`http://${apiUrl}/tripsheet/${selectedCustomerData.tripid}`);
                setFormData({});
                setSelectedCustomerData({});
                handleCancel();
                setSuccess(true);
                setSuccessMessage("Successfully Deleted");
            } catch {
                setError(true);
                setErrorMessage("Check your Network Connection");
            }
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };

    const vehilcedetails = {
        vehRegNo: selectedCustomerDatas.vehRegNo || '',
        vehType: selectedCustomerDatas.vehType || '',
        driverName: selectedCustomerDatas.driverName || '',
        mobileNo: selectedCustomerDatas.mobileNo || '',
    }

    const handleEdit = async () => {
        try {

            const permissions = checkPagePermission();

            if (permissions.read && permissions.modify) {

                try {
                    const selectedCustomer = rows.find((row) => row.tripid === selectedCustomerData.tripid || formData.tripid || book.tripid);
                    const selectedBookingDate = selectedCustomerData.tripsheetdate || formData.tripsheetdate || dayjs();
                    const updatedCustomer = {
                        ...book,
                        ...selectedCustomer,
                        ...vehilcedetails,
                        ...selectedCustomerData,
                        ...formData,
                        starttime: starttime || book.starttime || formData.startTime || selectedCustomerData.startTime,
                        closetime: closetime || book.closetime || formData.closetime || selectedCustomerData.closetime,
                        reporttime: reporttime || book.reporttime || selectedCustomerData.reporttime || formData.reporttime,
                        shedintime: shedintime || book.shedintime || selectedCustomerData.shedintime || formData.shedintime,
                        starttime2: starttime2 || book.starttime2 || formData.startTime2 || selectedCustomerData.starttime2,
                        closetime2: closetime2 || book.closetime2 || formData.closetime2 || selectedCustomerData.closetime2,
                        additionaltime: additionalTime.additionaltime,
                        tripsheetdate: selectedBookingDate,
                        vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo || '',
                        vehType: VehicleRate.find((option) => option.optionvalue)?.label || formData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType || '',
                        driverName: formData.driverName || selectedCustomerData.driverName || formValues.driverName || selectedCustomerDatas.driverName || book.driverName || '',
                        mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo || '',
                        shedkm: shedKilometers.shedkm,
                        totaldays: calculateTotalDays(),
                        totalkm1: calculateTotalKilometers(),
                        totaltime: calculateTotalTime(),
                        netamount: calculateTotalAmount(),
                        exkm: packageDetails[0]?.extraKMS,
                        exHrs: packageDetails[0]?.extraHours,
                        night: packageDetails[0]?.NHalt,
                        amount: packageDetails[0]?.Rate,
                        exkm1: packageDetails[0]?.extraKMS,
                        exHrs1: packageDetails[0]?.extraHours,
                        night1: packageDetails[0]?.NHalt,
                        amount5: packageDetails[0]?.Rate,
                        amount1: calculateExkmAmount(),
                        amount2: calculateExHrsAmount(),
                        amount3: calculateNightAmount(),
                        amount4: calculatedriverconvienceAmount(),
                        package: packageDetails[0]?.package,
                        pack: packageDetails[0]?.package,
                        minhrs: packageDetails[0]?.Hours,
                        minkm: packageDetails[0]?.KMS,
                    };
                    for (const key in updatedCustomer) {
                        if (key === '0') {
                            delete updatedCustomer[key];
                        }
                    }
                    await axios.put(`http://${apiUrl}/tripsheet/${selectedCustomerData.tripid || book.tripid || formData.tripid || packageDetails.tripid}`, updatedCustomer);
                    handleCancel();
                    setRow([]);
                    setRows([]);
                    handleDriverSendSMS();
                    handleSendSMS();
                    handlecheck();
                    setSuccess(true);
                    setSuccessMessage("Successfully updated");
                } catch {
                    setError(true);
                    setErrorMessage("Check your Network Connection");
                }
            } else {
                setInfo(true);
                setInfoMessage("You do not have permission.");
            }
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };

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
                const selectedBookingDate = selectedCustomerData.tripsheetdate || formData.tripsheetdate || dayjs();

                const updatedBook = {
                    ...book,
                    starttime: starttime || book.starttime || formData.startTime || selectedCustomerData.startTime,
                    closetime: closetime || book.closetime || formData.closetime || selectedCustomerData.closetime,
                    reporttime: reporttime || book.reporttime || formData.reporttime || selectedCustomerData.reporttime,
                    shedintime: shedintime || book.shedintime || formData.shedintime || selectedCustomerData.shedintime,
                    starttime2: starttime2 || book.starttime2 || formData.startTime2 || selectedCustomerData.starttime2,
                    closetime2: closetime2 || book.closetime2 || formData.closetime2 || selectedCustomerData.closetime2,
                    additionaltime: additionalTime.additionaltime,
                    tripsheetdate: selectedBookingDate,
                    shedkm: shedKilometers.shedkm,
                    totaldays: calculateTotalDays(),
                    totalkm1: calculateTotalKilometers(),
                    totaltime: calculateTotalTime(),
                    netamount: calculateTotalAmount(),
                    exkm: packageDetails[0]?.extraKMS,
                    exHrs: packageDetails[0]?.extraHours,
                    night: packageDetails[0]?.NHalt,
                    amount: packageDetails[0]?.Rate,
                    exkm1: packageDetails[0]?.extraKMS,
                    exHrs1: packageDetails[0]?.extraHours,
                    night1: packageDetails[0]?.NHalt,
                    amount5: packageDetails[0]?.Rate,
                    amount1: calculateExkmAmount(),
                    amount2: calculateExHrsAmount(),
                    amount3: calculateNightAmount(),
                    amount4: calculatedriverconvienceAmount(),
                    package: packageDetails[0]?.package,
                    pack: packageDetails[0]?.package,
                    minhrs: packageDetails[0]?.Hours,
                    minkm: packageDetails[0]?.KMS,
                };
                await axios.post(`http://${apiUrl}/tripsheet`, updatedBook);
                handleCancel();
                setRow([]);
                setRows([]);
                setSuccess(true);
                handleSendSMS();
                handleDriverSendSMS();
                handlecheck();
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

    const handleAutocompleteChange = (event, value, name) => {
        const selectedOption = value ? value.label : '';
        setBook((prevBook) => ({
            ...prevBook,
            [name]: selectedOption,
        }));
        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: selectedOption,
        }));
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: selectedOption,
        }));
        setTripSheetData((prevValues) => ({
            ...prevValues,
            [name]: selectedOption,
        }));
    };

    const handleDateChange = (date, name) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
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
        setTripSheetData((prevValues) => ({
            ...prevValues,
            [name]: parsedDate,
        }));
    };

    const handleClick = async (event, actionName) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
            } else if (actionName === 'Cancel') {
                handleCancel();
                setRow([]);
                setRows([]);
            } else if (actionName === 'Delete') {
                handleDelete();
                handleCancel();
                setRow([]);
                setRows([]);
            } else if (actionName === 'Edit') {
                handleEdit();
            } else if (actionName === 'Add') {
                handleAdd();
            }
        } catch {
            setError(true);
            setErrorMessage("Check Network Connection")
        }
    };

    const handleUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf, .jpg, .jpeg, .png';
        input.onchange = handleFileChange;
        input.click();
    };

    const handleFileChange = (event) => {
        const tripid = book.tripid || selectedCustomerData.tripid || formData.tripid;
        const file = event.target.files[0];
        if (!file) return;
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            axios.put(`http://${apiUrl}/tripsheet_uploads/${tripid}`, formData)
        }
    };

    const calculateTotalTime = useCallback(() => {
        const startTime = formData.starttime || selectedCustomerData.starttime || book.starttime;
        const closeTime = formData.closetime || selectedCustomerData.closetime || book.closetime;
        if (startTime && closeTime) {
            const startTimeObj = dayjs(startTime, 'HH:mm');
            const closeTimeObj = dayjs(closeTime, 'HH:mm');
            let totalTimeMinutes = closeTimeObj.diff(startTimeObj, 'minutes');
            const additionalTimeValue = parseInt(additionalTime.additionaltime) || parseInt(formData.additionaltime) || parseInt(selectedCustomerData.additionaltime) || parseInt(book.additionaltime);
            if (!isNaN(additionalTimeValue)) {
                totalTimeMinutes += additionalTimeValue * 60;
            }
            const hours = Math.floor(totalTimeMinutes / 60);
            const minutes = totalTimeMinutes % 60;
            return `${hours}h ${minutes}m`;
        }
        return '';
    }, [formData, selectedCustomerData, book, additionalTime]);

    const calculateExkmAmount = () => {
        const exkm = formData.exkm || selectedCustomerData.exkm || book.exkm || packageDetails[0]?.extraKMS;
        const exkmTkm = formData.exkmTkm || selectedCustomerData.exkmTkm || book.exkmTkm;
        if (exkm !== undefined && exkmTkm !== undefined) {
            const totalexKm = exkm * exkmTkm;
            return totalexKm;
        }
        return '';
    };

    const calculateExHrsAmount = () => {
        const exHrs = formData.exHrs || selectedCustomerData.exHrs || book.exHrs || packageDetails[0]?.extraHours;
        const exHrsTHrs = formData.exHrsTHrs || selectedCustomerData.exHrsTHrs || book.exHrsTHrs;
        if (exHrs !== undefined && exHrsTHrs !== undefined) {
            const totalexhrs = exHrs * exHrsTHrs;
            return totalexhrs;
        }
        return '';
    };

    const calculateNightAmount = () => {
        const night = formData.night || selectedCustomerData.night || book.night || packageDetails[0]?.NHalt;
        const nightThrs = formData.nightThrs || selectedCustomerData.nightThrs || book.nightThrs;
        if (night !== undefined && nightThrs !== undefined) {
            const totalnight = night * nightThrs;
            return totalnight;
        }
        return '';
    };

    const calculatedriverconvienceAmount = () => {
        const driverconvenience = formData.driverconvenience || selectedCustomerData.driverconvenience || book.driverconvenience;
        const dtc = formData.dtc || selectedCustomerData.dtc || book.dtc;
        if (driverconvenience !== undefined && dtc !== undefined) {
            const totaldriverconvience = driverconvenience * dtc;
            return totaldriverconvience;
        }
        return '';
    };


    const calculateExkmAmount2 = () => {
        const exkm1 = formData.exkm1 || selectedCustomerData.exkm1 || book.exkm1 || packageDetails[0]?.extraKMS;
        const exkmTkm2 = formData.exkmTkm2 || selectedCustomerData.exkmTkm2 || book.exkmTkm2;
        if (exkm1 !== undefined && exkmTkm2 !== undefined) {
            const totalexKm = exkm1 * exkmTkm2;
            return totalexKm;
        }
        return '';
    };

    const calculateExHrsAmount2 = () => {
        const exHrs1 = formData.exHrs1 || selectedCustomerData.exHrs1 || book.exHrs1 || packageDetails[0]?.extraHours;
        const exHrsTHrs2 = formData.exHrsTHrs2 || selectedCustomerData.exHrsTHrs2 || book.exHrsTHrs2;
        if (exHrs1 !== undefined && exHrsTHrs2 !== undefined) {
            const totalexhrs = exHrs1 * exHrsTHrs2;
            return totalexhrs;
        }
        return '';
    };

    const calculateNightAmount2 = () => {
        const night1 = formData.night || selectedCustomerData.night1 || book.night1 || packageDetails[0]?.NHalt;
        const nightThrs2 = formData.nightThrs2 || selectedCustomerData.nightThrs2 || book.nightThrs2;
        if (night1 !== undefined && nightThrs2 !== undefined) {
            const totalnight = night1 * nightThrs2;
            return totalnight;
        }
        return '';
    };

    const calculatedriverconvienceAmount2 = () => {
        const driverconvenience1 = formData.driverconvenience1 || selectedCustomerData.driverconvenience1 || book.driverconvenience1;
        const dtc2 = formData.dtc2 || selectedCustomerData.dtc2 || book.dtc2;
        if (driverconvenience1 !== undefined && dtc2 !== undefined) {
            const totaldriverconvience = driverconvenience1 * dtc2;
            return totaldriverconvience;
        }
        return '';
    };

    const calculateTotalDays = () => {
        const startDate = formData.startdate || selectedCustomerData.startdate || book.startdate;
        const closeDate = formData.closedate || selectedCustomerData.closedate || book.closedate;

        if (startDate && closeDate) {
            const startDateObj = dayjs(startDate);
            const closeDateObj = dayjs(closeDate);
            const totalDays = closeDateObj.diff(startDateObj, 'days') + 1;
            return totalDays;
        }

        return '';
    };

    const calculateTotalKilometers = () => {
        const startKm = formData.shedout || book.shedout || selectedCustomerData.shedout || '';
        const closeKm = formData.shedin || book.shedin || selectedCustomerData.shedin || '';

        if (startKm !== undefined && closeKm !== undefined) {
            let totalKm = closeKm - startKm;
            const shedKmValue = parseInt(shedKilometers.shedkm) || parseInt(formData.shedkm) || parseInt(selectedCustomerData.shedkm) || parseInt(book.shedkm);
            if (!isNaN(shedKmValue)) {
                totalKm += shedKmValue;
            }
            return totalKm;
        }
        return '';
    };

    function calculateTotalAmount() {
        const amount = parseFloat(formData.amount || selectedCustomerData.amount || book.amount || packageDetails[0]?.Rate) || 0;
        const amount1 = parseFloat(formData.amount1 || selectedCustomerData.amount1 || book.amount1) || calculateExkmAmount() || 0;
        const amount2 = parseFloat(formData.amount2 || selectedCustomerData.amount2 || book.amount2) || calculateExHrsAmount() || 0;
        const amount3 = parseFloat(formData.amount3 || selectedCustomerData.amount3 || book.amount3) || calculateNightAmount() || 0;
        const amount4 = parseFloat(formData.amount4 || selectedCustomerData.amount4 || book.amount4) || calculatedriverconvienceAmount() || 0;

        const totalAmount = amount + amount1 + amount2 + amount3 + amount4;
        return totalAmount;
    }

    function calculateTotalAmount2() {
        const amount5 = parseFloat(formData.amount5 || selectedCustomerData.amount5 || book.amount5 || packageDetails[0]?.Rate);
        const amount6 = parseFloat(formData.amount6 || selectedCustomerData.amount6 || book.amount6) || calculateExkmAmount2();
        const amount7 = parseFloat(formData.amount7 || selectedCustomerData.amount7 || book.amount7) || calculateExHrsAmount2();
        const amount8 = parseFloat(formData.amount8 || selectedCustomerData.amount8 || book.amount8) || calculateNightAmount2();
        const amount9 = parseFloat(formData.amount9 || selectedCustomerData.amount9 || book.amount9) || calculatedriverconvienceAmount2();

        const totalAmount = amount5 + amount6 + amount7 + amount8 + amount9;
        return totalAmount;
    }

    const [tripSheetData, setTripSheetData] = useState({
        customer: '',
        address1: '',
        orderedby: '',
        employeeno: '',
        customercode: '',
        guestname: '',
        tripid: '',
        startdate: '',
        duty: '',
        vehType: '',
        vehRegNo: '',
        driverName: '',
        mobileNo: '',
        closedate: '',
        starttime: '',
        startkm: '',
        closetime: '',
        closekm: '',
        totalkm1: '',
        totaltime: '',
        totalDays: '',
        remark: '',
        parking: '',
        permit: '',
    });

    const handleChange = useCallback((event) => {
        const { name, value, checked } = event.target;

        setPackageData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setPackageDetails((prevData) => ({
            ...prevData,
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
        setTripSheetData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (event.target.type === 'checkbox') {
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
            setTripSheetData((prevValues) => ({
                ...prevValues,
                [name]: checked,
            }));
        } else {
            if (name === 'starttime') {
                const formattedTime = value;
                setBook((prevBook) => ({
                    ...prevBook,
                    [name]: formattedTime,
                }));
                setSelectedCustomerData((prevData) => ({
                    ...prevData,
                    [name]: formattedTime,
                }));
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: formattedTime,
                }));
                setTripSheetData((prevData) => ({
                    ...prevData,
                    [name]: formattedTime,
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
                setSelectedCustomerDatas((prevData) => ({
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
                setTripSheetData((prevValues) => ({
                    ...prevValues,
                    [name]: value,
                }));
                setShedKilometers((prevValues) => ({
                    ...prevValues,
                    [name]: value,
                }));
                setAdditionalTime((prevValues) => ({
                    ...prevValues,
                    [name]: value,
                }));
            }
        }
    }, [setSelectedCustomerData, setFormData, setTripSheetData, setPackageDetails]);

    const handleKeyDown = useCallback(async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            try {
                const response = await axios.get(`http://${apiUrl}/tripsheet/${event.target.value}`);
                const bookingDetails = response.data;
                if (response.status === 200 && bookingDetails) {
                    setSelectedCustomerData(bookingDetails);
                    setSelectedCustomerId(bookingDetails.tripid);
                    setSuccess(true);
                    setSuccessMessage("Successfully listed");
                    setIsEditMode(true);
                } else {
                    setError(true);
                    setErrorMessage("No data found");
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError(true);
                    setErrorMessage("Tripsheet not found");
                } else {
                    setError(true);
                    setErrorMessage("Failed to fetch data");
                }
            }
        }
    }, [apiUrl]);

    const [enterPressCount, setEnterPressCount] = useState(0);

    const handleKeyEnter = useCallback(async (event) => {

        if (event.key === 'Enter') {
            event.preventDefault();
            if (enterPressCount === 0) {
                try {
                    const response = await axios.get(`http://${apiUrl}/vehicleinfo/${event.target.value}`);
                    const vehicleData = response.data;
                    setRows([vehicleData]);
                } catch {
                }
            } else if (enterPressCount === 1) {
                const selectedRow = rows[0];
                if (selectedRow) {
                    setSelectedCustomerDatas(selectedRow);
                    handleChange({ target: { name: "vehRegNo", value: selectedRow.vehRegNo } });
                    handleChange({ target: { name: "vehType", value: selectedRow.vehType } });
                    handleChange({ target: { name: "driverName", value: selectedRow.driverName } });
                    handleChange({ target: { name: "mobileNo", value: selectedRow.mobileNo } });
                }
            }
            setEnterPressCount((prevCount) => prevCount + 1);
        }
        if (event.target.value === '') {
            setEnterPressCount(0);
        }

    }, [handleChange, rows, enterPressCount,apiUrl]);

    const handleRowClick = useCallback((params) => {
        setSelectedCustomerDatas(params);
        handleChange({ target: { name: "vehRegNo", value: params.vehRegNo } });
    }, [handleChange]);

    const totalKilometers = packageData.totalkm1 || selectedCustomerData.totalkm1 || selectedCustomerDatas.totalkm1 || book.totalkm1 || formData.totalkm1 || calculateTotalKilometers();
    const totalTime = packageData.totaltime || selectedCustomerData.totaltime || selectedCustomerDatas.totaltime || book.totaltime || formData.totaltime || calculateTotalTime();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://${apiUrl}/getPackageDetails`, {
                    params: {
                        totalkm1: totalKilometers,
                        totaltime: totalTime,
                        vehType: packageData.vehType || selectedCustomerData.vehType || selectedCustomerDatas.vehType || book.vehType || formData.vehType,
                        customer: packageData.customer || selectedCustomerData.customer || selectedCustomerDatas.customer || book.customer || formData.customer,
                        duty: packageData.duty || selectedCustomerData.duty || selectedCustomerDatas.duty || book.duty || formData.duty,
                    },
                });
                const packagedet = response.data;
                setPackageDetails(packagedet);
            } catch {
            }
        }
        fetchData();
    }, [
        book.duty, book.vehType, book.customer,
        formData.duty, formData.vehType, formData.customer,
        packageData.duty, packageData.vehType, packageData.customer,
        selectedCustomerData.customer, selectedCustomerData.duty, selectedCustomerData.vehType,
        selectedCustomerDatas.customer, selectedCustomerDatas.duty, selectedCustomerDatas.vehType,
        totalKilometers, totalTime,apiUrl
    ]);

    const [smsguest, setSmsGuest] = useState(false);

    const handleSendSMS = async () => {
        if (smsguest || formData.smsguest || book.smsguest) {
            try {
                const dataToSend = {
                    guestname: formValues.guestname || selectedCustomerData.guestname || book.guestname || formData.guestname || '',
                    guestmobileno: formValues.guestmobileno || selectedCustomerData.guestmobileno || book.guestmobileno || formData.guestmobileno || '',
                    vehRegNo: formValues.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || formData.vehRegNo,
                    vehType: formValues.vehType || selectedCustomerData.vehType || book.vehType || formData.vehType,
                    driverName: formValues.driverName || selectedCustomerData.driverName || book.driverName || formData.driverName,
                    mobileNo: formValues.mobileNo || selectedCustomerData.mobileNo || book.mobileNo || formData.mobileNo,
                    reporttime: formValues.reporttime || formData.reporttime || selectedCustomerData.reporttime || book.reporttime || '',
                    startdate: formValues.startdate || formData.startdate || selectedCustomerData.startdate || book.startdate || '',
                    ofclanno: '044-49105959',
                };

                const response = await fetch(`http://${apiUrl}/tripguest-send-sms`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
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
            }
        }
    };
    //send sms from tripsheet to driver
    const [DriverSMS, setDriverSMS] = useState(false);

    const handleDriverSendSMS = async () => {
        if (DriverSMS || formData.DriverSMS || book.DriverSMS) {
            try {
                const dataSend = {
                    guestname: formValues.guestname || selectedCustomerData.guestname || book.guestname || formData.guestname || '',
                    guestmobileno: formValues.guestmobileno || selectedCustomerData.guestmobileno || book.guestmobileno || formData.guestmobileno || '',
                    vehRegNo: formValues.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || formData.vehRegNo,
                    vehType: formValues.vehType || selectedCustomerData.vehType || book.vehType || formData.vehType,
                    driverName: formValues.driverName || selectedCustomerData.driverName || book.driverName || formData.driverName,
                    mobileNo: formValues.mobileNo || selectedCustomerData.mobileNo || book.mobileNo || formData.mobileNo,
                    reporttime: formValues.reporttime || formData.reporttime || selectedCustomerData.reporttime || book.reporttime || '',
                    startdate: formValues.startdate || formData.startdate || selectedCustomerData.startdate || book.startdate || '',
                    ofclanno: '044-49105959',
                };

                const response = await fetch(`http://${apiUrl}/tripdriver-send-sms`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataSend),
                });

                if (response.ok) {
                    setSuccess(true);
                    setSuccessMessage("SMS sent correctly");
                } else {
                    setError(true);
                    setErrorMessage("Failed to send SMS");
                }
            } catch {
            }
        }
    };
    // for invoice page
    const [signimageUrl, setSignImageUrl] = useState('');
    const [attachedImage, setAttachedImage] = useState('');
    const [GmapimageUrl, setGMapImageUrl] = useState('');
    const [routeData, setRouteData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const tripid = localStorage.getItem('selectedTripid');
            try {
                const response = await fetch(`http://${apiUrl}/routedata/${encodeURIComponent(tripid)}`);

                if (response.status === 200) {
                    const routeData = await response.json();
                    setRouteData(routeData);
                } else {
                    const timer = setTimeout(fetchData, 2000);
                    return () => clearTimeout(timer);
                }
            } catch {
            }
        };

        fetchData();
    }, [apiUrl]);

    useEffect(() => {
        const fetchData = async () => {
            const tripid = localStorage.getItem('selectedTripid');

            try {
                const response = await fetch(`http://${apiUrl}/get-signimage/${tripid}`);
                if (response.status === 200) {
                    const imageUrl = URL.createObjectURL(await response.blob());
                    setSignImageUrl(imageUrl);
                }
            } catch {
            }
        };
        fetchData();
        return () => {
        };
    }, [apiUrl]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tripid = localStorage.getItem('selectedTripid');
                if (!tripid) {
                    return;
                }

                const response = await fetch(`http://${apiUrl}/getmapimages/${tripid}`);
                if (response.status === 200) {
                    const responseData = await response.blob();
                    const imageUrl = URL.createObjectURL(responseData);
                    setGMapImageUrl(imageUrl);
                } else {
                    const timer = setTimeout(fetchData, 2000);
                    return () => clearTimeout(timer);
                }
            } catch {
            }
        };
        fetchData();
    }, [apiUrl]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tripid = localStorage.getItem('selectedTripid');
                if (!tripid) {
                    return;
                }
                const response = await fetch(`http://${apiUrl}/get-attachedimage/${tripid}`);
                if (response.status === 200) {
                    const data = await response.json();
                    const attachedImageUrls = data.imagePaths.map(path => `http://${apiUrl}/images/${path}`);
                    setAttachedImage(attachedImageUrls);
                } else {
                    const timer = setTimeout(fetchData, 2000);
                    return () => clearTimeout(timer);
                }
            } catch {
            }
        };
        fetchData();
    }, [apiUrl]);

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const organizationname = localStorage.getItem('usercompany');

                if (!organizationname) {
                    return;
                }

                const response = await fetch(`http://${apiUrl}/get-companyimage/${organizationname}`);

                if (response.status === 200) {
                    const data = await response.json();
                    const attachedImageUrls = data.imagePaths.map(path => `http://${apiUrl}/images/${path}`);
                    localStorage.setItem('selectedImage', JSON.stringify(attachedImageUrls));
                    setSelectedImage(attachedImageUrls);
                } else {
                    const timer = setTimeout(fetchData, 2000);
                    return () => clearTimeout(timer);
                }
            } catch {
            }
        };

        fetchData();
    }, [apiUrl]);


    const [organizationdata, setorganizationData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const encoded = localStorage.getItem('usercompany');
            localStorage.setItem('usercompanyname', encoded);
            const storedcomanyname = localStorage.getItem('usercompanyname');
            const organizationname = decodeURIComponent(storedcomanyname);
            try {
                const response = await fetch(`http://${apiUrl}/organizationdata/${organizationname}`);
                if (response.status === 200) {

                    const userDataArray = await response.json();
                    if (userDataArray.length > 0) {
                        setorganizationData(userDataArray[0]);
                    }
                } else {
                    const timer = setTimeout(fetchData, 2000);
                    return () => clearTimeout(timer);
                }
            } catch {
            }
        };

        fetchData();
    }, [apiUrl]);


    return {
        selectedCustomerData,
        selectedCustomerId,
        rows,
        error,
        success,
        info,
        warning,
        selectedImage,
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
        handleKeyDown,
        handleDateChange,
        handleAutocompleteChange,
        packageData,
        smsguest,
        sendEmail,
        setSendEmail,
        formValues,
        selectedCustomerDatas,
        setDriverSMS,
        DriverSMS,
        organizationdata,
        calculateTotalDays,
        setStartTime,
        setBook,
        setFormData,
        setSelectedCustomerData,
        setCloseTime,
        calculateTotalTime,
        popupOpen,
        setSmsGuest,
        handleKeyEnter,
        setSelectedCustomerDatas,
        setreporttime,
        setshedintime,
        shedKilometers,
        calculateTotalKilometers,
        additionalTime,
        handleETripsheetClick,
        handlePopupClose,
        tripSheetData,
        attachedImage,
        routeData,
        signimageUrl,
        GmapimageUrl,
        setCloseTime2,
        setStartTime2,
        packageDetails,
        calculateExkmAmount,
        calculateExHrsAmount,
        calculateNightAmount,
        calculateTotalAmount,
        calculatedriverconvienceAmount,
        calculateExkmAmount2,
        calculateExHrsAmount2,
        calculateNightAmount2,
        calculatedriverconvienceAmount2,
        calculateTotalAmount2,
        handleTripmapClick,
        mapimgpopupOpen,
        handleimgPopupClose,
        mapimageUrls,
        handleTripmaplogClick,
        maplogimgpopupOpen,
        row,
        handleUpload,
        handleRefresh,
        handleButtonClick,
        handleTripRowClick,
        imgpopupOpen,
        generateLink,
        selectedRow,
        imageUrl,
        link,
        isSignatureSubmitted,
        isEditMode,
        handleEdit,
    };
};

export default useTripsheet;