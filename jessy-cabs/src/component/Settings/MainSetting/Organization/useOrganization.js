import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useData } from '../../../Dashboard/MainDash/Sildebar/DataContext2';
import { APIURL } from "../../../url";

const useOrganization = () => {
    const apiUrl = APIURL;
    const user_id = localStorage.getItem('useridno');
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [rows] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [warning, setWarning] = useState(false);
    const [warningMessage] = useState({});
    const [info, setInfo] = useState(false);
    const [infoMessage, setInfoMessage] = useState({});
    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'User Creation';
                const response = await axios.get(`http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch {
            }
        };
        fetchPermissions();
    }, [user_id,apiUrl]);

    const { setSharedData } = useData();

    const checkPagePermission = () => {
        const currentPageName = 'User Creation';
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

    const [book, setBook] = useState({
        organizationname: '',
        organizationtype: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        contactPhoneNumber: '',
        contactEmail: '',
        location: '',
        website: '',
        ownershipLeadership: '',
        productsServices: '',
        marketPresence: '',
        employees: '',
        legalStructure: '',
        customerBase: '',
        partnershipsAlliances: '',
        recentNewsDevelopments: '',
        pannumber: '',
        gstnumber: '',
        socialMediaPresence: '',
        sustainabilityCSR: '',
        customerReviewsFeedback: '',
        industrySpecificDetails: '',
    });

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

    const handleKeyDown = useCallback(async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            try {
                const filterValue = event.target.value;
                const response = await axios.get(`http://${apiUrl}/usercreation?filter=${filterValue}`);
                const bookingDetails = response.data;
                if (Array.isArray(bookingDetails) && bookingDetails.length > 0) {
                    setBook(bookingDetails[0]);
                    setSelectedCustomerData(bookingDetails[0]);
                } else {
                }
            } catch {
            }
        }
    }, [apiUrl]);

    const handleAdd = async () => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.new) {
            const name = selectedCustomerData?.organizationname || book.organizationname;
            if (!name) {
                setError(true);
                setErrorMessage("fill mantatory fields");
                return;
            }
            try {
                await axios.post(`http://${apiUrl}/addcompany`, book);
                setSuccess(true);
                setSuccessMessage("Organization Added Successfully");
            } catch {
                setError(true);
                setErrorMessage("Something went wrong");
            }
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };

    const handleUpdate = async (organizationname) => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.modify) {
            try {
                const selectedCustomer = rows.find((row) => row.organizationname === organizationname);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                const companyname = encodeURIComponent(selectedCustomerData?.organizationname) || encodeURIComponent(book.organizationname);
                const encode = companyname;
                const decode = decodeURIComponent(encode);
                await axios.put(`http://${apiUrl}/companyupdate/${decode}`, updatedCustomer);
                setSuccess(true);
                setSuccessMessage("Successfully updated");
                setEditMode((prevEditMode) => !prevEditMode);
            }
            catch {
                setError(true);
                setErrorMessage("Something went wrong");
            }
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            const encoded = localStorage.getItem('usercompany');
            localStorage.setItem('usercompanyname', encoded);
            const storedcomanyname = localStorage.getItem('usercompanyname');
            const organizationname = decodeURIComponent(storedcomanyname);
            try {
                const response = await fetch(`http://${apiUrl}/organizationdata/${organizationname}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const userDataArray = await response.json();
                if (userDataArray.length > 0) {
                    setSelectedCustomerData(userDataArray[0]);
                } else {

                }
            } catch {

            }
        };
        fetchData();
    }, [apiUrl]);


    const hidePopup = () => {
        setSuccess(false);
        setWarning(false);
        setInfo(false);
        setError(false);
        setErrorMessage('');
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

    const toggleEditMode = () => {
        setEditMode((prevEditMode) => !prevEditMode);
    };

    // logo image upload--------------------------------------

    const handleUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf, .jpg, .jpeg, .png';
        input.onchange = handleFileChange;
        input.click();
    };

    const organizationname = localStorage.getItem('usercompany');
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSharedData(file.name);
        setSelectedImage(file)

        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            axios.put(`http://${apiUrl}/logo-upload/${organizationname}`, formData)
        }
    };

    useEffect(() => {
        const handleImageView = () => {

            axios.get(`http://${apiUrl}/logo-view/${organizationname}`)
                .then(res => {
                    if (res.status === 200) {
                        setSelectedImage(res.data[0]?.fileName);
                    } else {
                        const timer = setTimeout(handleImageView, 100);
                        return () => clearTimeout(timer);
                    }
                })
        };
        handleImageView();
    }, [organizationname, selectedImage,apiUrl]);

    return {
        selectedCustomerData,
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        book,
        handleChange,
        isFieldReadOnly,
        handleAdd,
        hidePopup,
        selectedImage,
        info,
        infoMessage,
        editMode,
        handleFileChange,
        handleUpload,
        toggleEditMode,
        handleKeyDown,
        handleUpdate
    };
};

export default useOrganization;