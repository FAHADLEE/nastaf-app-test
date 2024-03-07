import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { fetchBankOptions } from './BillingData';
import dayjs from "dayjs";
import { APIURL } from "../../../url.js";

const useBilling = () => {
    const apiUrl = APIURL;
    const user_id = localStorage.getItem('useridno');
    const [bankOptions, setBankOptions] = useState([]);
    const [formData, setFormData] = useState({});
    const location = useLocation();
    const [info, setInfo] = useState(false);
    const [actionName] = useState('');
    const [popupOpen, setPopupOpen] = useState(false);
    const [rows] = useState([]);
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage, setInfoMessage] = useState({});
    const [selectedBankAccount, setSelectedBankAccount] = useState('');
    const [selectedCustomerData, setSelectedCustomerData] = useState({
        totalkm1: ''
    });
    const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({});

    // for page permission

    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'CB Billing';
                const response = await axios.get(`http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch {
            }
        };

        fetchPermissions();
    }, [user_id,apiUrl]);

    const checkPagePermission = () => {
        const currentPageName = 'CB Billing';
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

    //for popup
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

    const handleEInvoiceClick = (row) => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.modify) {
            const tripid = book.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid;
            const customer = book.customer || selectedCustomerData.customer || selectedCustomerDatas.customer || formData.customer;

            if (!tripid) {
                setError(true);
                setErrorMessage("Please enter the Billing Data");
            } else {
                localStorage.setItem('selectedTripid', tripid);
                localStorage.setItem('selectedcustomerid', customer);
                setPopupOpen(true);
            }
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };

    const handlePopupClose = () => {
        setPopupOpen(false);
    };

    const [book, setBook] = useState({
        tripid: '',
        billingno: '',
        invoiceno: '',
        Billingdate: '',
        totalkm1: '',
        trips: '',
        totaltime: '',
        customer: '',
        supplier: '',
        startdate: '',
        totaldays: '',
        guestname: '',
        rateType: '',
        vehRegNo: '',
        vehType: '',
        duty: '',
        MinCharges: '',
        minchargeamount: '',
        ChargesForExtra: '',
        ChargesForExtraamount: '',
        cfeamount: '',
        ChargesForExtraHRS: '',
        ChargesForExtraHRSamount: '',
        cfehamount: '',
        NightHalt: '',
        NightHaltamount: '',
        nhamount: '',
        driverbata: '',
        driverbataamount: '',
        dbamount: '',
        OtherCharges: '',
        OtherChargesamount: '',
        permitothertax: '',
        parkingtollcharges: '',
        MinKilometers: '',
        MinHours: '',
        GrossAmount: '',
        AfterTaxAmount: '',
        DiscountAmount: '',
        DiscountAmount2: '',
        AdvanceReceived: '',
        RoundedOff: '',
        BalanceReceivable: '',
        NetAmount: '',
        Totalamount: '',
        paidamount: '',
        pendingamount: '',
        BankAccount: '',
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
            setSelectedCustomerDatas((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked,
            }));

        } else {
            setBook((prevBook) => ({
                ...prevBook,
                [name]: value,
            }));
            setSelectedCustomerData((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
            setSelectedCustomerDatas((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
            setFormData((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };

    const handleAutocompleteChange = (event, newValue, name) => {
        const selectedOption = newValue ? newValue.label : '';

        setBook((prevBook) => ({
            ...prevBook,
            [name]: selectedOption,
        }));
        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: selectedOption,
        }));
        setSelectedCustomerDatas((prevData) => ({
            ...prevData,
            [name]: selectedOption,
        }));
        setFormData((prevData) => ({
            ...prevData,
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
        setSelectedCustomerData((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));
        setSelectedCustomerDatas((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));
        setFormData((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));
    };

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            tripid: '',
            billingno: '',
            Billingdate: '',
            invoiceno: '',
            totalkm1: '',
            trips: '',
            totaltime: '',
            customer: '',
            supplier: '',
            startdate: '',
            totaldays: '',
            guestname: '',
            rateType: '',
            vehRegNo: '',
            vehType: '',
            duty: '',
            MinCharges: '',
            minchargeamount: '',
            ChargesForExtra: '',
            ChargesForExtraamount: '',
            cfeamount: '',
            ChargesForExtraHRS: '',
            ChargesForExtraHRSamount: '',
            cfehamount: '',
            NightHalt: '',
            NightHaltamount: '',
            nhamount: '',
            driverbata: '',
            driverbataamount: '',
            dbamount: '',
            OtherCharges: '',
            OtherChargesamount: '',
            permitothertax: '',
            parkingtollcharges: '',
            MinKilometers: '',
            MinHours: '',
            GrossAmount: '',
            AfterTaxAmount: '',
            DiscountAmount: '',
            DiscountAmount2: '',
            AdvanceReceived: '',
            RoundedOff: '',
            BalanceReceivable: '',
            NetAmount: '',
            Totalamount: '',
            paidamount: '',
            pendingamount: '',
            BankAccount: '',
        }));
        setSelectedCustomerData({});
        setSelectedCustomerDatas({});
        setSelectedBankAccount('');
        setSelectedCustomerDatas({});
    };

    const handleClick = async (event, actionName, tripid) => {
        const customer = formData.customer || selectedCustomerData.customer || selectedCustomerDatas.customer || book.customer
        event.preventDefault();
        try {
            if (actionName === 'Print') {
                handleEInvoiceClick();
            } else if (actionName === 'Cancel') {
                handleCancel();
            } else if (actionName === 'Delete') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.delete) {
                    await axios.delete(`http://${apiUrl}/billing/${book.tripid || selecting.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid}`);
                    setFormData(null);
                    setSelectedCustomerData(null);
                    setSuccess(true);
                    setSuccessMessage("Successfully Deleted");
                    handleCancel();
                } else {
                    setInfo(true);
                    setInfoMessage("You do not have permission.");
                }
            } else if (actionName === 'Edit') {
                const permissions = checkPagePermission();
                if (permissions.read && permissions.modify) {
                    const selectedCustomer = rows.find((row) => row.tripid === tripid);
                    const updatedCustomer = {
                        ...selectedCustomerDatas,
                        ...selectedCustomer,
                        ...selecting,
                        ...formData,
                        MinKilometers: selectedCustomerDatas.minkm || selectedCustomerData.minkm || '',
                        MinHours: selectedCustomerDatas.minhrs || selectedCustomerData.minhrs || '',
                        minchargeamount: selectedCustomerData.netamount || selectedCustomerDatas.minchargeamount || book.minchargeamount,
                        MinCharges: selectedCustomerData.package || selectedCustomerDatas.MinCharges || book.MinCharges,
                        cfeamount: calculateTotalAmount() || selectedCustomerData.cfeamount || selectedCustomerDatas.cfeamount || book.cfeamount,
                        cfehamount: calculateTotalAmount2() || selectedCustomerData.cfehamount || selectedCustomerDatas.cfehamount || book.cfehamount,
                        nhamount: calculateTotalAmount3() || selectedCustomerData.nhamount || selectedCustomerDatas.nhamount || book.nhamount,
                        dbamount: calculateTotalAmount4() || selectedCustomerData.dbamount || selectedCustomerDatas.dbamount || book.dbamount
                    };
                    await axios.put(`http://${apiUrl}/billing/${book.tripid || selecting.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid}`, updatedCustomer);
                    handleCancel();
                    setSuccess(true);
                    setSuccessMessage("Successfully Updated");
                } else {
                    setInfo(true);
                    setInfoMessage("You do not have permission.");
                }
            } else if (actionName === 'Add') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.new) {
                    if (!customer) {
                        setError(true);
                        setErrorMessage("Fill mandatory fields");
                        return;
                    }
                    const updatedBook = {
                        ...book,
                        ...selecting,
                        ...selectedCustomerDatas,
                        ...formData,
                        customer: formData.customer || selectedCustomerData.customer || selectedCustomerDatas.customer || book.customer,
                        Billingdate: selectedCustomerData.Billingdate ? dayjs(selectedCustomerData.Billingdate) : null || book.Billingdate ? dayjs(book.Billingdate) : dayjs(),
                        cfeamount: calculateTotalAmount() || selectedCustomerData.cfeamount || selectedCustomerDatas.cfeamount || book.cfeamount,
                        cfehamount: calculateTotalAmount2() || selectedCustomerData.cfehamount || selectedCustomerDatas.cfehamount || book.cfehamount,
                        nhamount: calculateTotalAmount3() || selectedCustomerData.nhamount || selectedCustomerDatas.nhamount || book.nhamount,
                        dbamount: calculateTotalAmount4() || selectedCustomerData.dbamount || selectedCustomerDatas.dbamount || book.dbamount
                    };
                    await axios.post(`http://${apiUrl}/billing`, updatedBook);
                    handleCancel();
                    setSuccess(true);
                    setSuccessMessage("Successfully Added");
                } else {
                    setInfo(true);
                    setInfoMessage("You do not have permission.");
                }
            }

        } catch (err) {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };
    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });

    const calculateTotalAmount = () => {
        const totalkm1 = parseFloat(formData?.ChargesForExtra || selectedCustomerData?.totalkm1 || selectedCustomerDatas?.ChargesForExtra || book?.ChargesForExtra || 0);
        const chargesForExtraamount = parseFloat(formData?.ChargesForExtraamount || selectedCustomerData?.ChargesForExtraamount || selectedCustomerDatas?.ChargesForExtraamount || book?.ChargesForExtraamount || 0);
        if (!isNaN(totalkm1) && !isNaN(chargesForExtraamount)) {
            const totalAmount = totalkm1 * chargesForExtraamount;
            return totalAmount.toFixed(2);
        }
        return '';
    };

    const calculateTotalAmount2 = () => {
        const totaltime = formData.ChargesForExtraHRS || selectedCustomerData.totaltime || selectedCustomerDatas.ChargesForExtraHRS || book.ChargesForExtraHRS;
        const ChargesForExtraHRSamount = formData.ChargesForExtraHRSamount || selectedCustomerData.ChargesForExtraHRSamount || selectedCustomerDatas.ChargesForExtraHRSamount || book.ChargesForExtraHRSamount;
        if (totaltime !== undefined && ChargesForExtraHRSamount !== undefined) {
            const [hours, minutes] = totaltime.split('h');
            const hoursInMinutes = parseFloat(hours) * 60 + parseFloat(minutes);
            const ratePerHour = parseFloat(ChargesForExtraHRSamount);
            const totalAmount = hoursInMinutes * (ratePerHour / 60);
            if (isNaN(totalAmount)) {
                return "";
            } else {
                return totalAmount.toFixed(2);
            }
        }
        return "";
    };

    const calculateTotalAmount3 = () => {
        const NightHalt = selectedCustomerData.night || selectedCustomerDatas.NightHalt || book.NightHalt;
        const NightHaltamount = selectedCustomerData.NightHaltamount || selectedCustomerDatas.NightHaltamount || book.NightHaltamount;
        if (NightHalt !== undefined && NightHaltamount !== undefined) {
            const totalnights = NightHalt * NightHaltamount;
            return totalnights.toFixed(2);
        }
        return '';
    };

    const calculateTotalAmount4 = () => {
        const driverbata = selectedCustomerData.driverbata || selectedCustomerDatas.driverbata || book.driverbata;
        const driverbataamount = selectedCustomerData.driverbataamount || selectedCustomerDatas.driverbataamount || book.driverbataamount;
        if (driverbata !== undefined && driverbataamount !== undefined) {
            const totaldriverbata = driverbata * driverbataamount;
            return totaldriverbata.toFixed(2);
        }
        return '';
    };

    const calculatePayableAmount = () => {
        const DiscountAmount = selectedCustomerData.DiscountAmount || selectedCustomerDatas.DiscountAmount || book.DiscountAmount;
        const AdvanceReceived = selectedCustomerData.AdvanceReceived || selectedCustomerDatas.AdvanceReceived || book.AdvanceReceived;
        if (DiscountAmount !== undefined && AdvanceReceived !== undefined) {
            const netAmount = calculateGrossAmount() - DiscountAmount - AdvanceReceived;
            return netAmount.toFixed(2);
        }
        return '';
    };

    const calculatePendingAmount = () => {
        const totalamount = calculateroundedPayableAmount() || book.Totalamount;
        const paidamount = selectedCustomerData.paidamount || selectedCustomerDatas.paidamount || book.paidamount;
        if (totalamount !== undefined && paidamount !== undefined) {
            const totalpending = totalamount - paidamount;
            return totalpending.toFixed(2);
        }
        return '';
    };

    const calculateRoundOff = () => {
        const balanceAmount =
            parseFloat(calculatePayableAmount()) ||
            parseFloat(book.BalanceReceivable) ||
            0;
        const roundedGrossAmount = Math.ceil(balanceAmount);
        if (balanceAmount !== undefined && roundedGrossAmount !== undefined) {
            const roundOff = roundedGrossAmount - balanceAmount;
            return roundOff.toFixed(2);
        }
        return '';
    };

    const calculateroundedPayableAmount = () => {
        const balanceAmount = parseFloat(calculatePayableAmount() || book.BalanceReceivable) || 0;
        const roundOff = parseFloat(calculateRoundOff() || book.RoundedOff) || 0;
        if (balanceAmount !== undefined && roundOff !== undefined) {
            const totalAmount = balanceAmount + roundOff;
            return totalAmount.toFixed(2);
        }
        return '';
    };

    const calculateGrossAmount = () => {
        const {
            minchargeamount,
            netamount,
            cfehamount,
            cfeamount,
            nhamount,
            dbamount,
            OtherChargesamount,
            permitothertax,
            parkingtollcharges,
        } = selectedCustomerData || selectedCustomerDatas || book;

        const parsedValues = [
            parseFloat(calculateTotalAmount()) || 0,
            parseFloat(calculateTotalAmount2() || book.cfehamount) || 0,
            parseFloat(calculateTotalAmount3() || book.nhamount) || 0,
            parseFloat(calculateTotalAmount4() || book.dbamount) || 0,
            parseFloat(minchargeamount || selectedCustomerDatas.minchargeamount) || 0,
            parseFloat(cfeamount) || 0,
            parseFloat(netamount) || 0,
            parseFloat(cfehamount) || 0,
            parseFloat(nhamount) || 0,
            parseFloat(dbamount) || 0,
            parseFloat(OtherChargesamount || selectedCustomerDatas.OtherChargesamount || selectedCustomerData.OtherChargesamount) || 0,
            parseFloat(permitothertax || selectedCustomerDatas.permitothertax || selectedCustomerData.permitothertax) || 0,
            parseFloat(parkingtollcharges || selectedCustomerDatas.parkingtollcharges || selectedCustomerData.parkingtollcharges) || 0,
        ];

        const gross = parsedValues.reduce((sum, value) => sum + value, 0);
        return gross.toFixed(2);
    };

    const handleKeyDown = useCallback(async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            try {
                const response = await axios.get(`http://${apiUrl}/tripsheet/${event.target.value}`);
                const bookingDetails = response.data;
                setSelectedCustomerData(bookingDetails);
            } catch (error) {
                setError(true);
                setErrorMessage('Error retrieving booking details.');
            }
        }
    }, [apiUrl]);

    const handleKeyenter = useCallback(async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            try {
                const response = await axios.get(`http://${apiUrl}/billingdata/${event.target.value}`);
                const billingDetails = response.data;
                setSuccess(true);
                setSuccessMessage("Successfully listed");
                setSelectedCustomerDatas(billingDetails);
            } catch (error) {
                setError(true);
                setErrorMessage('Error retrieving billings details.');
            }
        }
    }, [apiUrl]);

    const handleKeyenter2 = useCallback(async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            try {
                const response = await axios.get(`http://${apiUrl}/billing/${event.target.value}`);
                const billingDetails = response.data;
                setSuccess(true);
                setSuccessMessage("Successfully listed");
                setSelectedCustomerDatas(billingDetails);
            } catch (error) {
                setError(true);
                setErrorMessage('Error retrieving billings details.');
            }
        }
    }, [apiUrl]);

    const selecting = {
        tripid: selectedCustomerDatas.tripid || selectedCustomerData.tripid || '',
        billingno: selectedCustomerDatas.billingno || selectedCustomerData.billingno || '',
        totalkm1: selectedCustomerDatas.totalkm1 || selectedCustomerData.totalkm1 || '',
        totaltime: selectedCustomerDatas.totaltime || selectedCustomerData.totaltime || '',
        customer: selectedCustomerDatas.customer || selectedCustomerData.customer || '',
        supplier: selectedCustomerDatas.supplier || selectedCustomerData.supplier || '',
        startdate: selectedCustomerDatas.startdate || selectedCustomerData.startdate || '',
        totaldays: selectedCustomerDatas.totaldays || selectedCustomerData.totaldays || '',
        guestname: selectedCustomerDatas.guestname || selectedCustomerData.guestname || '',
        rateType: selectedCustomerDatas.rateType || selectedCustomerData.rateType || '',
        vehRegNo: selectedCustomerDatas.vehRegNo || selectedCustomerData.vehRegNo || '',
        vehType: selectedCustomerDatas.vehType || selectedCustomerData.vehType || '',
        duty: selectedCustomerDatas.duty || selectedCustomerData.duty || '',
        MinCharges: selectedCustomerDatas.package || selectedCustomerData.package || '',
        minchargeamount: selectedCustomerDatas.netamount || selectedCustomerData.netamount || '',
        ChargesForExtra: selectedCustomerDatas.totalkm1 || selectedCustomerData.totalkm1 || '',
        ChargesForExtraamount: selectedCustomerDatas.ChargesForExtraamount || selectedCustomerData.ChargesForExtraamount || '',
        cfeamount: selectedCustomerDatas.cfeamount || selectedCustomerData.cfeamount || calculateTotalAmount() || '',
        ChargesForExtraHRS: selectedCustomerDatas.totaltime || selectedCustomerData.totaltime || '',
        ChargesForExtraHRSamount: selectedCustomerDatas.ChargesForExtraHRSamount || selectedCustomerData.ChargesForExtraHRSamount || '',
        cfehamount: selectedCustomerDatas.cfehamount || selectedCustomerData.cfehamount || calculateTotalAmount2() || '',
        NightHalt: selectedCustomerDatas.night || selectedCustomerData.night || book.NightHalt || '',
        NightHaltamount: selectedCustomerDatas.NightHaltamount || selectedCustomerData.NightHaltamount || '',
        nhamount: selectedCustomerDatas.nhamount || selectedCustomerData.nhamount || calculateTotalAmount3() || '',
        driverbata: selectedCustomerDatas.driverbata || selectedCustomerData.driverbata || '',
        driverbataamount: selectedCustomerDatas.driverbataamount || selectedCustomerData.driverbataamount || '',
        dbamount: selectedCustomerDatas.dbamount || selectedCustomerData.dbamount || calculateTotalAmount4() || '',
        OtherCharges: selectedCustomerDatas.OtherCharges || selectedCustomerData.OtherCharges || '',
        OtherChargesamount: selectedCustomerDatas.OtherChargesamount || selectedCustomerData.OtherChargesamount || '',
        permitothertax: selectedCustomerDatas.permitothertax || selectedCustomerData.permitothertax || '',
        parkingtollcharges: selectedCustomerDatas.parkingtollcharges || selectedCustomerData.parkingtollcharges || '',
        MinKilometers: selectedCustomerDatas.minkm || selectedCustomerData.minkm || '',
        MinHours: selectedCustomerDatas.minhrs || selectedCustomerData.minhrs || '',
        GrossAmount: selectedCustomerDatas.GrossAmount || selectedCustomerData.GrossAmount || calculateGrossAmount() || '',
        AfterTaxAmount: selectedCustomerDatas.AfterTaxAmount || selectedCustomerData.AfterTaxAmount || '',
        DiscountAmount: selectedCustomerDatas.DiscountAmount || selectedCustomerData.DiscountAmount || '',
        DiscountAmount2: selectedCustomerDatas.DiscountAmount2 || selectedCustomerData.DiscountAmount2 || '',
        AdvanceReceived: selectedCustomerDatas.AdvanceReceived || selectedCustomerData.AdvanceReceived || '',
        RoundedOff: selectedCustomerDatas.RoundedOff || selectedCustomerData.RoundedOff || calculateRoundOff() || '',
        BalanceReceivable: selectedCustomerDatas.BalanceReceivable || selectedCustomerData.BalanceReceivable || calculatePayableAmount() || '',
        NetAmount: selectedCustomerDatas.NetAmount || selectedCustomerData.NetAmount || calculateroundedPayableAmount() || '',
        Totalamount: selectedCustomerDatas.Totalamount || selectedCustomerData.Totalamount || calculateroundedPayableAmount() || '',
        paidamount: formData.paidamount || selectedCustomerData.paidamount || selectedCustomerDatas.paidamount || book.paidamount || '',
        pendingamount: selectedCustomerDatas.pendingamount || selectedCustomerData.pendingamount || calculatePendingAmount() || '',
        BankAccount: selectedCustomerDatas.BankAccount || selectedCustomerData.BankAccount || selectedBankAccount || '',
    }

    useEffect(() => {
        fetchBankOptions()
            .then((data) => {
                if (data) {
                    setBankOptions(data);
                } else {
                }
            })
            .catch(() => {
            });
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const formData = {};

        const parameterKeys = [
            'tripid', 'billingno', 'Billingdate', 'totalkm1', 'totaltime', 'customer', 'supplier', 'startdate', 'totaldays', 'guestname', 'rateType', 'vehRegNo', 'vehType', 'duty', 'MinCharges', 'minchargeamount', 'ChargesForExtra', 'ChargesForExtraamount', 'cfeamount', 'ChargesForExtraHRS', 'ChargesForExtraHRSamount', 'cfehamount', 'NightHalt', 'NightHaltamount', 'nhamount', 'driverbata', 'driverbataamount', 'dbamount', 'OtherCharges', 'OtherChargesamount', 'permitothertax', 'parkingtollcharges', 'MinKilometers', 'MinHours', 'GrossAmount', 'AfterTaxAmount', 'DiscountAmount', 'DiscountAmount2', 'AdvanceReceived', 'RoundedOff', 'BalanceReceivable', 'NetAmount', 'Totalamount', 'paidamount', 'pendingamount', 'BankAccount'
        ];
        parameterKeys.forEach(key => {
            const value = params.get(key);
            if (value !== null && value !== "null") {
                formData[key] = value;
            }
        });
        setBook(formData);
        setFormData(formData);
    }, [location]);

    useEffect(() => {
        window.history.replaceState(null, document.title, window.location.pathname);
        const initialFormData = {};
        setFormData(initialFormData);
    }, []);

    const [tripSheetData] = useState({
        tripid: '',
        billingno: '',
        Billingdate: '',
        totalkm1: '',
        totaltime: '',
        customer: '',
        supplier: '',
        startdate: '',
        totaldays: '',
        guestname: '',
        rateType: '',
        vehRegNo: '',
        vehType: '',
        duty: '',
        MinCharges: '',
        minchargeamount: '',
        ChargesForExtra: '',
        ChargesForExtraamount: '',
        ChargesForExtraHRS: '',
        ChargesForExtraHRSamount: '',
        cfehamount: '',
        NightHalt: '',
        NightHaltamount: '',
        nhamount: '',
        driverbata: '',
        driverbataamount: '',
        dbamount: '',
        OtherCharges: '',
        OtherChargesamount: '',
        permitothertax: '',
        parkingtollcharges: '',
        MinKilometers: '',
        MinHours: '',
        GrossAmount: '',
        AfterTaxAmount: '',
        DiscountAmount: '',
        DiscountAmount2: '',
        AdvanceReceived: '',
        paidamount: '',
        BankAccount: '',
        RoundedOff: calculateRoundOff(),
    });

    //for invoice page

    const [routeData, setRouteData] = useState('');
    const [tripData, setTripData] = useState('');
    const [customerData, setCustomerData] = useState('');
    const [mapimageUrl, setMapImageUrl] = useState('');
    const [GmapimageUrl, setGMapImageUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const tripid = localStorage.getItem('selectedTripid');
            try {
                const response = await fetch(`http://${apiUrl}/routedata/${encodeURIComponent(tripid)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const routeData = await response.json();
                setRouteData(routeData);
            } catch (error) {
            }
        };

        fetchData();
    }, [apiUrl]);

    useEffect(() => {
        const fetchData = async () => {
            const tripid = localStorage.getItem('selectedTripid');
            try {
                const response = await fetch(`http://${apiUrl}/tripsheet/${tripid}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const tripData = await response.json();
                setTripData(tripData);
            } catch {

            }
        };

        fetchData();
    }, [apiUrl]);

    useEffect(() => {
        const fetchData = async () => {
            const customer = localStorage.getItem('selectedcustomerid');
            try {
                const response = await fetch(`http://${apiUrl}/customers/${encodeURIComponent(customer)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const customerData = await response.json();
                setCustomerData(customerData);
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
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const imageUrl = URL.createObjectURL(await response.blob());
                setMapImageUrl(imageUrl);
            } catch {
            }
        };

        fetchData();
        return () => { };
    }, [apiUrl]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tripid = localStorage.getItem('selectedTripid');

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

    const organizationaddress1 = customerData.address1;
    const organizationaddress2 = customerData.address2;
    const organizationcity = customerData.city;
    const organizationgstnumber = customerData.gstnumber;
    const tripdepartment = tripData.department;
    const tripcode = tripData.customercode;
    const triprequest = tripData.request;
    const tripShedkm = tripData.shedkm;
    const tripshedin = tripData.shedin;
    const tripshedout = tripData.shedout;
    const tripreporttime = tripData.reporttime;
    const tripshedintime = tripData.shedintime;
    const tripadditionaltime = tripData.additionaltime;
    const tripstartkm = tripData.startkm;
    const tripclosekm = tripData.closekm;
    const tripstarttime = tripData.starttime;
    const tripclosetime = tripData.closetime;
    const tripstartdate = tripData.startdate;
    const tripclosedate = tripData.closedate;
    const roundOffValue = calculateRoundOff();
    const BalanceValue = calculatePayableAmount();
    const TotalAmountValue = calculateroundedPayableAmount();
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

    return {
        selectedCustomerData,
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
        hidePopup,
        formData,
        selectedCustomerDatas,
        handleKeyDown,
        handleKeyenter,
        handleDateChange,
        calculateTotalAmount,
        selectedImage,
        calculateTotalAmount2,
        calculateTotalAmount3,
        calculateTotalAmount4,
        calculateGrossAmount,
        organizationdata,
        calculatePayableAmount,
        calculateRoundOff,
        calculateroundedPayableAmount,
        calculatePendingAmount,
        setSelectedBankAccount,
        handleAutocompleteChange,
        selectedBankAccount,
        bankOptions,
        popupOpen,
        handlePopupClose,
        tripSheetData,
        triprequest,
        tripcode,
        tripdepartment,
        routeData,
        BalanceValue,
        TotalAmountValue,
        roundOffValue,
        tripShedkm,
        tripshedin,
        tripshedout,
        tripreporttime,
        tripshedintime,
        tripadditionaltime,
        tripstartkm,
        tripclosekm,
        tripstarttime,
        handleKeyenter2,
        tripclosetime,
        tripstartdate,
        tripclosedate,
        organizationaddress1,
        organizationaddress2,
        organizationcity,
        organizationgstnumber,
        GmapimageUrl,
        mapimageUrl,
    };
};

export default useBilling;