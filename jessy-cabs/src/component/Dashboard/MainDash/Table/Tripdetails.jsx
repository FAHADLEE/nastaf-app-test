import React from 'react';
// import { useNavigate } from "react-router-dom";
import './Tripdetails.css'
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const makeStyle = (status) => {
    if (status === 'Waiting' || status === 'On_Going') {
        return {
            background: 'rgb(145 254 159 / 47%)',
            color: 'green',
            border: '2px solid rgb(145 254 159 / 47%)',
        }
    }
    else if (status === 'Closed') {
        return {
            background: '#ffadad8f',
            color: 'red',
            border: '2px solid #ffadad8f',
        }
    }
    else {
        return {
            background: '#59bfff',
            color: 'white',
            border: '2px solid #59bfff',
        }
    }
}

const TripDetails = ({ tripData }) => {
    const handleButtonClickTripsheet = (selectedRow) => {
        if (!selectedRow) {
            return;
        } else {
            const bookingPageUrl = `/home/bookings/tripsheet?` +
                `tripid=${encodeURIComponent(selectedRow.tripid || '')}` +
                `&bookingno=${encodeURIComponent(selectedRow.bookingno || '')}` +
                `&status=${encodeURIComponent(selectedRow.status || '')}` +
                `&billingno=${encodeURIComponent(selectedRow.billingno || '')}` +
                `&apps=${encodeURIComponent(selectedRow.apps || '')}` +
                `&customer=${encodeURIComponent(selectedRow.customer || '')}` +
                `&orderedby=${encodeURIComponent(selectedRow.orderedby || '')}` +
                `&mobile=${encodeURIComponent(selectedRow.mobile || '')}` +
                `&guestname=${encodeURIComponent(selectedRow.guestname || '')}` +
                `&guestmobileno=${encodeURIComponent(selectedRow.guestmobileno || '')}` +
                `&email=${encodeURIComponent(selectedRow.email || '')}` +
                `&employeeno=${encodeURIComponent(selectedRow.employeeno || '')}` +
                `&guestmobileno=${encodeURIComponent(selectedRow.guestmobileno || '')}` +
                `&email=${encodeURIComponent(selectedRow.email || '')}` +
                `&address1=${encodeURIComponent(selectedRow.address1 || '')}` +
                `&streetno=${encodeURIComponent(selectedRow.streetno || '')}` +
                `&city=${encodeURIComponent(selectedRow.city || '')}` +
                `&hireTypes=${encodeURIComponent(selectedRow.hireTypes || '')}` +
                `&department=${encodeURIComponent(selectedRow.department || '')}` +
                `&vehRegNo=${encodeURIComponent(selectedRow.vehRegNo || '')}` +
                `&vehType=${encodeURIComponent(selectedRow.vehType || '')}` +
                `&driverName=${encodeURIComponent(selectedRow.driverName || '')}` +
                `&mobileNo=${encodeURIComponent(selectedRow.mobileNo || '')}` +
                `&driversmsexbetta=${encodeURIComponent(selectedRow.driversmsexbetta || '')}` +
                `&gps=${encodeURIComponent(selectedRow.gps || '')}` +
                `&duty=${encodeURIComponent(selectedRow.duty || '')}` +
                `&pickup=${encodeURIComponent(selectedRow.pickup || '')}` +
                `&useage=${encodeURIComponent(selectedRow.useage || '')}` +
                `&request=${encodeURIComponent(selectedRow.request || '')}` +
                `&startdate=${encodeURIComponent(selectedRow.startdate || '')}` +
                `&closedate=${encodeURIComponent(selectedRow.closedate || '')}` +
                `&totaldays=${encodeURIComponent(selectedRow.totaldays || '')}` +
                `&employeeno=${encodeURIComponent(selectedRow.employeeno || '')}` +
                `&reporttime=${encodeURIComponent(selectedRow.reporttime || '')}` +
                `&shedkm=${encodeURIComponent(selectedRow.shedkm || '')}` +
                `&shedin=${encodeURIComponent(selectedRow.shedin || '')}` +
                `&shedout=${encodeURIComponent(selectedRow.shedout || '')}` +
                `&starttime=${encodeURIComponent(selectedRow.starttime || '')}` +
                `&closetime=${encodeURIComponent(selectedRow.closetime || '')}` +
                `&additionaltime=${encodeURIComponent(selectedRow.additionaltime || '')}` +
                `&advancepaidtovendor=${encodeURIComponent(selectedRow.advancepaidtovendor || '')}` +
                `&customercode=${encodeURIComponent(selectedRow.customercode || '')}` +
                `&startkm=${encodeURIComponent(selectedRow.startkm || '')}` +
                `&closekm=${encodeURIComponent(selectedRow.closekm || '')}` +
                `&permit=${encodeURIComponent(selectedRow.permit || '')}` +
                `&parking=${encodeURIComponent(selectedRow.parking || '')}` +
                `&toll=${encodeURIComponent(selectedRow.toll || '')}` +
                `&vpermettovendor=${encodeURIComponent(selectedRow.vpermettovendor || '')}` +
                `&vendortoll=${encodeURIComponent(selectedRow.vendortoll || '')}` +
                `&customeradvance=${encodeURIComponent(selectedRow.customeradvance || '')}` +
                `&email1=${encodeURIComponent(selectedRow.email1 || '')}` +
                `&remark=${encodeURIComponent(selectedRow.remark || '')}` +
                `&smsguest=${encodeURIComponent(selectedRow.smsguest || '')}` +
                `&documentnotes=${encodeURIComponent(selectedRow.documentnotes || '')}` +
                `&VendorTripNo=${encodeURIComponent(selectedRow.VendorTripNo || '')}` +
                `&vehicles=${encodeURIComponent(selectedRow.vehicles || '')}` +
                `&duty1=${encodeURIComponent(selectedRow.duty1 || '')}` +
                `&startdate1=${encodeURIComponent(selectedRow.startdate1 || '')}` +
                `&closedate1=${encodeURIComponent(selectedRow.closedate1 || '')}` +
                `&totaldays1=${encodeURIComponent(selectedRow.totaldays1 || '')}` +
                `&locks=${encodeURIComponent(selectedRow.locks || '')}` +
                `&starttime2=${encodeURIComponent(selectedRow.starttime2 || '')}` +
                `&closetime2=${encodeURIComponent(selectedRow.closetime2 || '')}` +
                `&totaltime=${encodeURIComponent(selectedRow.totaltime || '')}` +
                `&startkm1=${encodeURIComponent(selectedRow.startkm1 || '')}` +
                `&closekm1=${encodeURIComponent(selectedRow.closekm1 || '')}` +
                `&totalkm1=${encodeURIComponent(selectedRow.totalkm1 || '')}` +
                `&remark1=${encodeURIComponent(selectedRow.remark1 || '')}` +
                `&caramount=${encodeURIComponent(selectedRow.caramount || '')}` +
                `&minkm=${encodeURIComponent(selectedRow.minkm || '')}` +
                `&minhrs=${encodeURIComponent(selectedRow.minhrs || '')}` +
                `&package=${encodeURIComponent(selectedRow.package || '')}` +
                `&amount=${encodeURIComponent(selectedRow.amount || '')}` +
                `&exkm=${encodeURIComponent(selectedRow.exkm || '')}` +
                `&amount1=${encodeURIComponent(selectedRow.amount1 || '')}` +
                `&exHrs=${encodeURIComponent(selectedRow.exHrs || '')}` +
                `&amount2=${encodeURIComponent(selectedRow.amount2 || '')}` +
                `&night=${encodeURIComponent(selectedRow.night || '')}` +
                `&amount3=${encodeURIComponent(selectedRow.amount3 || '')}` +
                `&driverconvenience=${encodeURIComponent(selectedRow.driverconvenience || '')}` +
                `&amount4=${encodeURIComponent(selectedRow.amount4 || '')}` +
                `&netamount=${encodeURIComponent(selectedRow.netamount || '')}` +
                `&vehcommission=${encodeURIComponent(selectedRow.vehcommission || '')}` +
                `&caramount1=${encodeURIComponent(selectedRow.caramount1 || '')}` +
                `&manualbills=${encodeURIComponent(selectedRow.manualbills || '')}` +
                `&pack=${encodeURIComponent(selectedRow.pack || '')}` +
                `&amount5=${encodeURIComponent(selectedRow.amount5 || '')}` +
                `&exkm1=${encodeURIComponent(selectedRow.exkm1 || '')}` +
                `&amount6=${encodeURIComponent(selectedRow.amount6 || '')}` +
                `&exHrs1=${encodeURIComponent(selectedRow.exHrs1 || '')}` +
                `&amount7=${encodeURIComponent(selectedRow.amount7 || '')}` +
                `&night1=${encodeURIComponent(selectedRow.night1 || '')}` +
                `&amount8=${encodeURIComponent(selectedRow.amount8 || '')}` +
                `&driverconvenience1=${encodeURIComponent(selectedRow.driverconvenience1 || '')}` +
                `&amount9=${encodeURIComponent(selectedRow.amount9 || '')}` +
                `&rud=${encodeURIComponent(selectedRow.rud || '')}` +
                `&netamount1=${encodeURIComponent(selectedRow.netamount1 || '')}` +
                `&discount=${encodeURIComponent(selectedRow.discount || '')}` +
                `&ons=${encodeURIComponent(selectedRow.ons || '')}` +
                `&manualbills1=${encodeURIComponent(selectedRow.manualbills1 || '')}` +
                `&balance=${encodeURIComponent(selectedRow.balance || '')}` +
                `&fcdate=${encodeURIComponent(selectedRow.fcdate || '')}` +
                `&taxdate=${encodeURIComponent(selectedRow.taxdate || '')}` +
                `&insdate=${encodeURIComponent(selectedRow.insdate || '')}` +
                `&stpermit=${encodeURIComponent(selectedRow.stpermit || '')}` +
                `&maintenancetype=${encodeURIComponent(selectedRow.maintenancetype || '')}` +
                `&kilometer=${encodeURIComponent(selectedRow.kilometer || '')}` +
                `&selects=${encodeURIComponent(selectedRow.selects || '')}` +
                `&documenttype=${encodeURIComponent(selectedRow.documenttype || '')}` +
                `&on1=${encodeURIComponent(selectedRow.on1 || '')}` +
                `&smsgust=${encodeURIComponent(selectedRow.smsgust || '')}` +
                `&booker=${encodeURIComponent(selectedRow.booker || '')}` +
                `&emailcheck=${encodeURIComponent(selectedRow.emailcheck || '')}` +
                `&valueprint=${encodeURIComponent(selectedRow.valueprint || '')}` +
                `&manualbillss=${encodeURIComponent(selectedRow.manualbillss || '')}` +
                `&reload=${encodeURIComponent(selectedRow.reload || '')}`;
            window.location.href = bookingPageUrl;
            // navigate(bookingPageUrl);
        }
    }

    if (!tripData || !tripData.tripid || tripData.tripid === "" || !tripData.startdate || tripData.startdate === "" /* Add other properties as needed */) {
        // return <div>No trip data available</div>;
        return;
    }
    return (
        <div>
            <h1 className="trip-Title">View Duty</h1>
            <form className='TripDetails-container'>
                <div className="field-item">
                    <div className="input">
                        <label htmlFor="tripid">Trip No :</label>
                        <TextField size='small' id="tripid" name="tripid" value={tripData.tripid} readOnly />
                    </div>
                    <div className="input">
                        <label htmlFor="startdate">Trip Date :</label>
                        <TextField size='small' id="startdate" name="startdate" value={tripData.startdate} required />
                    </div>
                    <div className="input">
                        <label htmlFor="starttime">Start Time :</label>
                        <TextField size='small' id="starttime" name="starttime" value={tripData.starttime} required />
                    </div>
                </div>

                <div className='field-item'>
                    <div className="input">
                        <label htmlFor="startkm">Start Kilometers :</label>
                        <TextField size='small' id="startkm" name='startkm' value={tripData.startkm} required />
                    </div>
                    <div className="input">
                        <label htmlFor="closedate">Closing Date :</label>
                        <TextField size='small' id="closedate" name='closedate' value={tripData.closedate} required />
                    </div>
                    <div className="input">
                        <label htmlFor="closetime">Closing Time :</label>
                        <TextField size='small' id="closetime" name='closetime' value={tripData.closetime} required />
                    </div>
                </div>
                <div className='field-item'>
                    <div className="input">
                        <label htmlFor="closekm">Closing Kilometers :</label>
                        <TextField size='small' id="closekm" name='closekm' value={tripData.closekm} required />
                    </div>
                    <div className="input">
                        <label htmlFor="guestname">Guest Name :</label>
                        <TextField size='small' id="guestname" name="guestname" value={tripData.guestname} readOnly />
                    </div>
                    <div className="input">
                        <label htmlFor="guestmobileno">Contact Number :</label>
                        <TextField size='small' id="guestmobileno" name="guestmobileno" value={tripData.guestmobileno} readOnly />
                    </div>
                </div>
                <div className='field-item'>
                    <div className="input">
                        <label htmlFor="vehType">Vehicle Type :</label>
                        <TextField size='small' id="vehType" name="vehType" value={tripData.vehType} readOnly />
                    </div>
                    <div className="input">
                        <label htmlFor="customer">Company Name :</label>
                        <TextField size='small' id="customer" name="customer" value={tripData.customer} readOnly />
                    </div>
                    <div className="input">
                        <label htmlFor="advancepaidtovendor">Advance :</label>
                        <TextField size='small' id="advancepaidtovendor" name='advancepaidtovendor' value={tripData.advancepaidtovendor} required />
                    </div>
                </div>
                <div className='field-item'>
                    <div className="input">
                        <label htmlFor="toll">Toll :</label>
                        <TextField size='small' id="toll" name='toll' value={tripData.toll} required />
                    </div>
                    <div className="input">
                        <label htmlFor="parking">Parking :</label>
                        <TextField size='small' id="parking" name='parking' value={tripData.parking} required />
                    </div>
                    <div className="input">
                        <label htmlFor="address1">Address :</label>
                        <TextField size='small' id="address1" name='address1' value={tripData.address1} readOnly />
                    </div>
                </div>
                <div className='field-item'>
                    <div className="input">
                        <span style={makeStyle(tripData.apps)} className="dialog-status" >{tripData.apps}</span>
                    </div>
                    <div className="input">
                        <Button onClick={() => handleButtonClickTripsheet(tripData)}>Trip Sheet</Button>
                    </div>
                </div>
            </form>
        </div>
    );

};

export default TripDetails;
