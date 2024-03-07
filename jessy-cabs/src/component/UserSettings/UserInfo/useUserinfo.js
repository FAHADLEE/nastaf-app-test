import { useState, useEffect } from 'react';
import axios from 'axios';
import { useData } from '../../Dashboard/Maindashboard/DataContext';
import { APIURL } from "../../url";

const useUserinfo = () => {
    const apiUrl = APIURL;
    const { sharedData, setSharedData } = useData(); // -->  its for context for image
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [rows] = useState([]);
    const [showPasswords, setShowPasswords] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage] = useState({});

    const storeUserId = localStorage.getItem('useridno'); //for getting userid 

    const [book, setBook] = useState({
        userid: '',
        username: '',
        ufirstname: '',
        ulastname: '',
        mobileno: '',
        email: '',
        designation: '',
        userpassword: '',
        userconfirmpassword: '',
    });

    const handleUpdate = async (userid) => {
        try {
            const selectedCustomer = rows.find((row) => row.userid === userid);
            const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
            await axios.put(`http://${apiUrl}/usercreation/${selectedCustomerData?.userid || book.userid}`, updatedCustomer);
            setSuccess(true);
            setSuccessMessage("Successfully updated");
            setEditMode((prevEditMode) => !prevEditMode);
        }
        catch {
            setError(true);
            setErrorMessage("Something went wrong");
        }
    };

    const handleChange = (event) => {
        event.preventDefault();
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

    const handleClickShowPasswords = () => {
        setShowPasswords((show) => !show);
    };

    const handleMouseDownPasswords = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // profile image upload--------------------------------------

    const handleUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf, .jpg, .jpeg, .png';
        input.onchange = handleFileChange;
        input.click();
    };

    const handleFileChange = (event) => {
        const userid = selectedCustomerData[0]?.userid || book.userid || storeUserId;
        const file = event.target.files[0];
        if (!file) return;
        setSharedData(file.name);
        setSelectedImage(file)
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            axios.put(`http://${apiUrl}/userprofileupload/${userid}`, formData)
        }
    };

    useEffect(() => {
        const handleImageView = () => {
            const userid = localStorage.getItem('useridno');
            axios.get(`http://${apiUrl}/userprofileview/${userid}`)
                .then(res => {
                    if (res.status === 200) {
                        setSelectedImage(res.data[0]?.filename);
                    } else {
                        const timer = setTimeout(handleImageView, 100);
                        return () => clearTimeout(timer);
                    }
                })
        };
        handleImageView();
    }, [selectedImage,apiUrl]);

    useEffect(() => {
        const fetchData = async () => {
            const userid = localStorage.getItem('useridno');
            try {
                const response = await fetch(`http://${apiUrl}/userdataforuserinfo/${userid}`);
                if (response.status === 200) {

                    const userDataArray = await response.json();
                    if (userDataArray.length > 0) {
                        setSelectedCustomerData(userDataArray[0]);
                    } else {
                        setErrorMessage('User data not found.');
                        setError(true);
                    }
                } else {
                    const timer = setTimeout(fetchData, 50);
                    return () => clearTimeout(timer);
                }
            } catch {
                setErrorMessage('Something Went Wrong');
                setError(true);
            }
        };
        fetchData();
    }, [selectedCustomerData,apiUrl]);

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

    const toggleEditMode = () => {
        setEditMode((prevEditMode) => !prevEditMode);
    };

    return {
        selectedCustomerData,
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
        hidePopup,
        selectedImage,
        editMode,
        handleFileChange,
        toggleEditMode,
        showPasswords,
        handleClickShowPasswords,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleUpload,
        handleMouseDownPasswords,
        showPassword,
        handleUpdate,
    };
};

export default useUserinfo;