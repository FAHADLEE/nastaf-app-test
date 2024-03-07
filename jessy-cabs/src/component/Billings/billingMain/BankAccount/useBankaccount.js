import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { APIURL } from "../../../url";

const useBankaccount = () => {
    const apiUrl = APIURL;
    const user_id = localStorage.getItem('useridno');

    const [showAddBankForm, setShowAddBankForm] = useState(false);
    const [totalcapital, setTotalCapital] = useState(0);
    const [totalIn, setTotalIn] = useState(0);
    const [totalOut, setTotalOut] = useState(0);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [bankDetails, setBankDetails] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [infoMessage, setInfoMessage] = useState('');
    const [warningMessage] = useState('');
    const [info, setInfo] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [warning, setWarning] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // for page permission

    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'Payments';
                const response = await axios.get(`http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch {
            }
        };

        fetchPermissions();
    }, [user_id,apiUrl]);

    const checkPagePermission = () => {
        const currentPageName = 'Payments';
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

    const hidePopup = () => {
        setError(false);
        setWarning(false);
        setInfo(false);
        setSuccess(false);
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

    const handleAddBankClick = () => {
        setShowAddBankForm(true);
    };
    const [book, setBook] = useState({
        bankname: '',
        capital: '',
        AccountType: '',
        bankname2: '',
        netbalance: '',
        totalin: '',
        totalout: '',
    });

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            bankname: '',
            capital: '',
            AccountType: '',
        }));
    };

    const handleAddBank = () => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.new) {
            const bankname = book.bankname;
            const capital = book.capital;
            if (!bankname || !capital) {
                setError(true);
                setErrorMessage('Please fill in all required fields.');
                return;
            }
            const newBank = {
                bankname,
                bankname2: book.bankname,
                capital,
                netbalance: book.capital,
                totalin: book.capital,
                totalout: 0,
            };
            setBankDetails((prevBankDetails) => [...prevBankDetails, newBank]);
            fetchData();
            setEditingIndex(null);
        } else {
            // Display a warning or prevent the action
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };

    const handleSaveEdit = async (index, id) => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.read) {
            try {
                if (index >= 0 && index < bankDetails.length) {
                    const updatedBank = bankDetails[index];
                    const updateData = {
                        id: updatedBank.id,
                        bankname2: book.bankname2 || updatedBank.bankname2,
                        netbalance: book.netbalance || updatedBank.netbalance,
                        totalin: book.netbalance || updatedBank.totalin,
                        totalout: book.totalout || updatedBank.totalout,
                    };
                    await axios.put(`http://${apiUrl}/updatebankdetails/${updatedBank.id}`, updateData);
                    setSuccess(true);
                    setSuccessMessage('Successfully Updated');
                    setEditingIndex(null);
                } else {
                }
            } catch {
                setError(true);
                setErrorMessage('Error updating bank account. Please check your Network Connection.');
            }
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        const updatedBankDetails = [...bankDetails];
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));

        updatedBankDetails[index] = {
            ...updatedBankDetails[index],
            [name]: value,
        };
        setBankDetails(updatedBankDetails);
    };

    const handleAutocompleteChange = (event, newValue, name) => {
        const selectedOption = newValue ? newValue.label : '';
        setBook((prevBook) => ({
            ...prevBook,
            [name]: selectedOption,
        }));
    };

    const handleAdd = async () => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.new) {
            try {
                const newBank = {
                    bankname: book.bankname,
                    capital: book.capital,
                    AccountType: book.AccountType,
                    bankname2: book.bankname,
                    netbalance: book.capital,
                    totalin: book.capital,
                    totalout: 0,
                };
                await axios.post(`http://${apiUrl}/bankdetails`, newBank);
                handleAddBank();
                handleCancel();
            } catch {
                setError(true);
                setErrorMessage('Error adding bank account. Please check your Network Connection.');
            }
        } else {
            // Display a warning or prevent the action
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };

    const fetchData = useCallback(async () => {

        try {
            const response = await fetch(`http://${apiUrl}/getbankdetails`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setBankDetails(data);
                } else {
                    setBankDetails([]);
                    setError(true);
                    setErrorMessage("No data found");
                }
            } else {
            }
        } catch {
        }

    }, [apiUrl]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handlePopupClose = useCallback(() => {
        setPopupOpen(false);
    }, []);

    const handleDelete = (id) => {
        setPopupOpen(true);
        setEditingIndex(null);
        setDeleteId(id);
    };

    const handleDeleteBank = useCallback(async (id) => {

        if (!id) {
            return;
        }
        try {
            await axios.delete(`http://${apiUrl}/deletebankdetails/${id}`);
            fetchData();
            handlePopupClose();
        } catch (error) {
            setError(true);
            setErrorMessage('Error deleting bank account. Please check your Network Connection.');
        }

    }, [fetchData, handlePopupClose,apiUrl]); // Add dependencies as needed

    useEffect(() => {
        if (deleteId !== null) {
            handleDeleteBank(deleteId);
            setDeleteId(null); // Reset deleteId after the operation is complete
        }
    }, [deleteId, handleDeleteBank]);
    const handleEditBank = (index) => {
        setEditingIndex(index);
    };
    //calculate totalout amount
    useEffect(() => {
        const calculatedTotalOut = bankDetails.reduce((total, bankDetail) => total + (parseInt(bankDetail.totalout, 10) || parseInt(book.totalout, 10) || 0), 0);
        setTotalOut(calculatedTotalOut);
    }, [bankDetails, book]);
    //calculate totalin amount
    useEffect(() => {
        const calculatedTotalIn = bankDetails.reduce((total, bankDetail) => total + (parseInt(bankDetail.totalin, 10) || parseInt(book.totalin, 10) || 0), 0);
        setTotalIn(calculatedTotalIn);
    }, [bankDetails, book]);
    //calculate totalcapital amount
    useEffect(() => {
        // Make API request to fetch total capital amount
        axios.get(`http://${apiUrl}/totalCapital_from_billing`)
            .then(response => {
                setTotalCapital(response.data.totalAmount);
            })
            .catch(error => {
            });
    }, [apiUrl]);

    return {
        error,
        success,
        info,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        infoMessage,
        book,
        handleChange,
        isFieldReadOnly,
        handleAdd,
        hidePopup,
        totalcapital,
        totalIn,
        totalOut,
        handleAddBankClick,
        showAddBankForm,
        handleAutocompleteChange,
        setShowAddBankForm,
        bankDetails,
        editingIndex,
        handleSaveEdit,
        handleEditBank,
        handleDelete,
        popupOpen,
        handlePopupClose,
        handleDeleteBank,


    };
};

export default useBankaccount;