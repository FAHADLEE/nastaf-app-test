import { useState, useEffect } from 'react';
import { APIURL } from "../../../url";

// TABLE START
const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "driverName", headerName: "Driver Name", width: 130 },
    { field: "startdate", headerName: "Date", width: 130 },
    { field: "vehType", headerName: "Vehicle Type", width: 130 },
    { field: "apps", headerName: "Active", width: 130 },
    { field: "mobileNo", headerName: "Mobile", width: 130 },
];

// TABLE END

const useAppuserlist = () => {
    const apiUrl = APIURL;
    const [rows, setRows] = useState([]);
    const [apps, setApps] = useState('active');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage] = useState({});

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

    const handleListButtonClick = () => {
        fetch(`http://${apiUrl}/tripsheet_driver_details?apps=${encodeURIComponent(apps)}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setRows(data);
                    setSuccess(true);
                    setSuccessMessage("Successfully listed");
                } else {
                    setRows([]);
                    setError(true);
                    setErrorMessage("No data found");
                }
            })
            .catch();
    };

    const handleChangeStatus = (event) => {
        setApps(event.target.value);
    };

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
        hidePopup,
        apps,
        handleChangeStatus,
        handleListButtonClick,
        columns,
    };
};

export default useAppuserlist;