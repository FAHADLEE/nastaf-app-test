import React, { useState } from 'react';
import './FuelRate.css'
import axios from 'axios';
import { TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { StationName } from "./FuelRateData";
import Autocomplete from "@mui/material/Autocomplete";

// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";

const FuelRate = () => {
    // API start
    const [selectedState, setSelectedState] = useState(StationName[0].optionvalue);
    const [fuelData, setFuelData] = useState({});
    const currentDate = new Date().toLocaleDateString();

    const handleStateChange = (event) => {
        const state = event.target.value;
        setSelectedState(state);
        if (state) {
            fetchFuelPrices(state);
        } else {
            setFuelData({});
        }
    };

    const fetchFuelPrices = (state) => {
        const options = {
            method: 'GET',
            url: `https://daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com/v1/fuel-prices/today/india/${state}`,
            headers: {
                'X-RapidAPI-Key': '35105408abmsh28530e641922d31p15534djsnae867e807eb8',
                'X-RapidAPI-Host': 'daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com'
            }
        };

        axios.request(options)
            .then(response => {
                const fuelData = response.data.fuel;
                const { petrol, diesel } = fuelData;
                setFuelData({ petrol, diesel });
            })
            .catch();
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // API END
    // Table Start
    const columns = [
        { field: "id", headerName: "Sno", width: 70 },
        { field: "Fuel_Type", headerName: "Fuel_Type", width: 130 },
        { field: "Date", headerName: "Date", width: 130 },
        { field: "State_Name", headerName: "State_Name", width: 160 },
        { field: "Price", headerName: "Price (INR)", width: 130 },
    ];

    const rows = Object.keys(fuelData).map((fuelType, index) => ({
        id: index + 1,
        Fuel_Type: capitalizeFirstLetter(fuelType),
        Date: currentDate,
        State_Name: selectedState === '' ? '' : StationName.find(station => station.optionvalue === selectedState)?.Option || '',
        Price: fuelData[fuelType]?.retailPrice ? fuelData[fuelType].retailPrice.toFixed(2) : 'N/A',
    }));

    // Table End
    return (
        <div className="FuelRate-form">
            <form action="">
                <div className="FuelRate-header">
                    <div className="input-field">
                        <div className="input" style={{ width: "570px" }}>
                            <div className="icone" style={{ paddingBottom: "15px" }} >
                                <FontAwesomeIcon icon={faGasPump} size="xl" />
                            </div>
                            <Autocomplete
                                fullWidth
                                size="small"
                                id="free-solo-demo"
                                freeSolo
                                value={selectedState}
                                options={StationName}
                                getOptionLabel={(option) => option.Option || ""}
                                onChange={(event, newValue) => {
                                    const state = newValue ? newValue.optionvalue : "";
                                    handleStateChange({ target: { value: state } });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        sx={{ m: 1, width: "50ch" }}
                                        label="Select State"
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="FuelRate-table-container">
                    <div className="table-FuelRate">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FuelRate