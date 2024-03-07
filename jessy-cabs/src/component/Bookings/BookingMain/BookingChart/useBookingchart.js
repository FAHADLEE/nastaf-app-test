import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { VehicleModel } from "./BookingChart";
import { APIURL } from "../../../url.js";

const useBookingchart = () => {
  const apiUrl = APIURL;

  const user_id = localStorage.getItem("useridno");
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [successMessage] = useState({});
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
  }, [user_id,apiUrl]);

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
      // If user has read permission, check for other specific permissions
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
  const [vehicles, setVehicles] = useState(() => {
    const initialVehicles = VehicleModel.map((vehicle, index) => ({
      id: index + 1,
      registerno: index + 1,
      vehicleName: vehicle.carmodel,
      bookings: {},
    }));

    initialVehicles.forEach((vehicle) => {
      vehicle.length = vehicle.vehicleName.length;
    });
    return initialVehicles;
  });
  const showBookedStatusAll = useCallback(async (from, to) => {
    try {
      const response = await axios.get(`http://${apiUrl}/bookingchart`, {
        params: {
          fromDate: from.format("YYYY-MM-DD"),
          toDate: to.format("YYYY-MM-DD"),
        },
      });
      const bookingData = response.data;
      const bookingCounts = {};
      bookingData.forEach((booking) => {
        const vehicleName = booking.vehType;
        const formattedDate = dayjs(booking.bookingdate).format("YYYY-MM-DD");
        if (!bookingCounts[vehicleName]) {
          bookingCounts[vehicleName] = {};
        }
        bookingCounts[vehicleName][formattedDate] = {
          count: (bookingCounts[vehicleName][formattedDate]?.count || 0) + 1,
        };
      });
      setVehicles((prevVehicles) => {
        const updatedVehicles = prevVehicles.map((vehicle) => ({
          ...vehicle,
          bookings: {
            ...vehicle.bookings,
            ...bookingCounts[vehicle.vehicleName],
          },
        }));
        return updatedVehicles;
      });
    } catch {
      setErrorMessage("Check your Network Connection");
    }
  }, [apiUrl]);
  const generateColumns = () => {
    const columns = [
      { field: "id", headerName: "Sno", width: 70 },
      { field: "vehicleName", headerName: "Vehicle Name", width: 130 },
    ];
    let currentDate = dayjs(fromDate);
    const lastDate = dayjs(toDate);
    while (
      currentDate.isBefore(lastDate) ||
      currentDate.isSame(lastDate, "day")
    ) {
      const formattedDate = currentDate.format("YYYY-MM-DD");
      columns.push({
        field: formattedDate,
        headerName: formattedDate,
        width: 130,
        valueGetter: createValueGetter(formattedDate),
      });

      currentDate = currentDate.add(1, "day");
    }
    return columns;
  };
  const createValueGetter = (bookingDate) => (params) => {
    return params.row.bookings[bookingDate]?.count || 0;
  };
  const columns = generateColumns();

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
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    vehicles,
    columns,
    showBookedStatusAll,
  };
};

export default useBookingchart;
