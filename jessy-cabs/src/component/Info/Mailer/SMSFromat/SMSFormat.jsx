import React from 'react';
import './SMSFormat.css';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const SMSFormat = () => {
    return (
        <div className="SMSFormat-form">
            <form action="">
                <div className="SMSFormat-header">
                    <div className="input-field">
                        <div className="inputs" style={{ width: "490px" }}>
                            <span className="Title-Name">Booking Confirmtion SMS</span>
                            <TextField
                                className='sms-box'
                                id="outlined-multiline-static"
                                multiline
                                sx={{ mt: 2, width: "53ch" }}
                                rows={4}
                                defaultValue="Greetings from JESSY CABS Booking confirmation for <GN>  Vehicle Type <VT> on <RD> @<RP>. by <RT> Booking No <BN> For Asst. Ph no.044 49105959"
                            />
                        </div>
                        <div className="inputs" style={{ width: "80%" }}>
                            <span className="Title-Name">Booking Vehicle Cofirm</span>
                            <TextField
                                className='sms-box'
                                id="outlined-multiline-static"
                                multiline
                                sx={{ mt: 2, width: "53ch" }}
                                rows={4}
                                defaultValue="Reporting to <GN> Vehicle Details - <VT> Vehicle Number - <VR>, Driver Name-<DR> Mobile No <DM> Trip Date <RD> Reporting Time <RT> from JESSY CABS 044 49105959"
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="inputs" style={{ width: "490px" }}>
                            <span className="Title-Name">Booking Canacelled</span>
                            <TextField
                                className='sms-box'
                                id="outlined-multiline-static"
                                multiline
                                sx={{ mt: 2, width: "53ch" }}
                                rows={4}
                                defaultValue=""
                            />
                        </div>
                        <div className="inputs" style={{ width: "490px" }}>
                            <span className="Title-Name">Trip Sheet SMS</span>
                            <TextField
                                className='sms-box'
                                id="outlined-multiline-static"
                                multiline
                                sx={{ mt: 2, width: "53ch" }}
                                rows={4}
                                defaultValue="Reporting to <GN> Vehicle Details - <VT> Vehicle Number - <VR>, Driver Name-<DR> Mobile No <DM> Trip Date <RD> Reporting Time <RT> from JESSY CABS 044 49105959"
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="inputs" style={{ width: "490px" }}>
                            <span className="Title-Name">Trip Sheet Driver</span>
                            <TextField
                                className='sms-box'
                                id="outlined-multiline-static"
                                multiline
                                sx={{ mt: 2, width: "53ch" }}
                                rows={4}
                                defaultValue="Trip details from JESSY CABS Guest Name <GN> contact no <GM> T.S no <TN> Reporting Date:<RD>  Reporting Time <RT> Reporting Address <RA>"
                            />
                        </div>
                        <div className="inputs" style={{ width: "490px" }}>
                            <span className="Title-Name">URL Trip Closing</span>
                            <TextField
                                className='sms-box'
                                id="outlined-multiline-static"
                                multiline
                                sx={{ mt: 2, width: "53ch" }}
                                rows={4}
                                defaultValue="Please Click the linke to close E-Tripsheet"
                            />
                        </div>
                    </div>
                    <div className="input-field" style={{ marginTop: '-20px', marginLeft: '-25px' }}>
                        <div className="input" style={{ marginTop: '40px' }}>
                            <Button startIcon={<FontAwesomeIcon icon={faUpload} size="lg" />} variant="contained">
                                Update
                            </Button>
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="inputs" style={{
                            width: "1430px", display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <span className="Title-Name">Key-Words</span>
                            <TextField
                                className='sms-box'
                                fullWidth
                                id="outlined-multiline-static"
                                multiline
                                sx={{ mt: 5, width: "110ch" }}
                                rows={4}
                                defaultValue="<VR>-VEHICLE REGNO, <VN>-VEHICLE NO, <DC>-DRIVER CELL, <CN>-COMPANY NAME, <CL>-COMAPNY CELL, <GN>-GUEST NAME,<VT>-VEHICLE, <DM>-DRIVER MOBILE, <DN>-DRIVER NAME, <GN>-GUST NAME, <CM>-COMPANY MOBILE,<BN>-BOOKING NO, <RD>-REPORT DATE, <RT>-REPORT TIME, <RP>-REPORTING PLACE"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SMSFormat