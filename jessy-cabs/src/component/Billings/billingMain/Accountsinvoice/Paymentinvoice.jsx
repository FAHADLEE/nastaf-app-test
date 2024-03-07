import React from 'react';
import './Paymentinvoice.css';
import { Button } from '@material-ui/core';
import ReactDOMServer from 'react-dom/server';
// import Logo from "../../../Dashboard/MainDash/Sildebar/Logo-Img/logo.png";
const PrintableInvoice = ({ tripSheetData, organizationdata, selectedImage, book, tripshedin, tripshedout, tripreporttime, tripshedintime, selectedCustomerData, GmapimageUrl, mapimageUrl, organizationaddress1, organizationaddress2, organizationcity, organizationgstnumber, tripShedkm, tripadditionaltime, tripstartkm, tripclosekm, tripstarttime, tripclosetime, tripstartdate, tripclosedate, triprequest, routeData, tripcode, tripdepartment, BalanceValue, TotalAmountValue, roundOff, selectedCustomerDatas, formData }) => {

    return (
        <>
            <div className='Individual-invoice' >
                <div className="Individual-table-container">
                    <div className="page-title">
                        <div className="sheet-logo">
                            {/* <img src={selectedImage} alt="logo" /> */}
                            <img src={Array.isArray(selectedImage) ? selectedImage[0] : selectedImage} alt={"Logo"} />
                        </div>
                        <div className="sheet-type">
                            <h1>Tax Invoice</h1>
                        </div>
                    </div>
                    <div className="header-title">
                        <div className="left-title">
                            <h3>{organizationdata.organizationname}</h3>
                            <p>{organizationdata.addressLine1}
                                {organizationdata.addressLine2}
                                {organizationdata.city}<br />
                                {organizationdata.contactEmail}
                                <span>Contact:-{organizationdata.contactPhoneNumber}</span>
                            </p>
                        </div>
                        <div className="right-title">
                            <dl className="dl-horizontal">
                                <dt>OUR GSTIN</dt>
                                <dd><strong>: {organizationdata.gstnumber}</strong></dd>
                                <dt>State</dt>
                                <dd>: {organizationdata.location}</dd>
                                <dt>Pan No</dt>
                                <dd>: {organizationdata.pannumber}</dd>
                                <dt>Sac Code</dt>
                                <dd>: 996601</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="header-title">
                        <div className="left-title">
                            <dl className="dl-horizontal">
                                <dt>Organisation</dt>
                                <dd><strong>: {tripSheetData?.customer || book?.customer || selectedCustomerData?.customer || selectedCustomerDatas?.customer || formData?.customer || ''}</strong><br />
                                    {organizationaddress1}{organizationaddress2}{organizationcity}
                                </dd>
                                <dt>GSTIN</dt>
                                <dd>: {organizationgstnumber},</dd>
                                <dt>Code</dt>
                                <dd>: {tripcode}</dd>
                                <dt>Guest Name</dt>
                                <dd>: {tripSheetData?.guestname || book?.guestname || selectedCustomerData?.guestname || selectedCustomerDatas?.guestname || formData?.guestname || ''}</dd>
                            </dl>
                        </div>
                        <div className="right-title">
                            <dl className="dl-horizontal">
                                <dt>Service City</dt>
                                <dd><strong>: {tripdepartment}</strong></dd>
                                <dt>Trip Date</dt>
                                <dd>: {tripSheetData?.startdate || book?.startdate || selectedCustomerData?.startdate || selectedCustomerDatas?.startdate || formData?.startdate || ''}</dd>
                                <dt>Trip No</dt>
                                <dd>: {tripSheetData?.tripid || book?.tripid || selectedCustomerData?.tripid || selectedCustomerDatas?.tripid || formData?.tripid || ''}</dd>
                                <dt>Vehicle Type</dt>
                                <dd>: {tripSheetData?.vehType || book?.vehType || selectedCustomerData?.vehType || selectedCustomerDatas?.vehType || formData?.vehType || ''}</dd>
                                <dt>Vehicle No</dt>
                                <dd>: {tripSheetData?.vehRegNo || book?.vehRegNo || selectedCustomerData?.vehRegNo || selectedCustomerDatas?.vehRegNo || formData?.vehRegNo || ''}</dd>
                                <dt>Request ID</dt>
                                <dd>: {triprequest}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className='Individual-description-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>QTY</th>
                                    <th>Rate</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='Individual-description-table-header'>
                                        {tripSheetData?.totalkm1 || book?.totalkm1 || selectedCustomerData?.totalkm1 || selectedCustomerDatas?.totalkm1 || formData?.totalkm1 || ''} KMs + FGR
                                        {tripShedkm}
                                        KMs = Total {tripSheetData?.totalkm1 || book?.totalkm1 || selectedCustomerData?.totalkm1 || selectedCustomerDatas?.totalkm1 || formData?.totalkm1 || ''} KMs : {tripSheetData?.totaltime || book?.totaltime || selectedCustomerData?.totaltime || selectedCustomerDatas?.totaltime || formData?.totaltime || ''} + FGR
                                        {tripadditionaltime}
                                        Hrs = Total {tripSheetData?.totaltime || book?.totaltime || selectedCustomerData?.totaltime || selectedCustomerDatas?.totaltime || formData?.totaltime || ''} ({tripSheetData?.MinCharges || book?.MinCharges || selectedCustomerData?.package || selectedCustomerDatas?.MinCharges || formData?.MinCharges || ''})</td>
                                    <td>1</td>
                                    <td>{tripSheetData?.minchargeamount || book?.minchargeamount || selectedCustomerData?.netamount || selectedCustomerDatas?.minchargeamount || formData?.minchargeamount || ''}</td>
                                    <td>{BalanceValue || ''}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="Individual-amountanddetails">
                        <div className="Individual-details-data">
                            <p>All Cheques / Draft to be drawn in favour of <strong>JESSY CABS</strong>
                                <br />
                                1 Duty slip / Statement of usage enclosed in Original
                                <br />
                                2 In Case of any disputes the same must be brought into our
                                notice in writing within 7-days of date of service</p>
                            <strong>GST to be paid by Service Recepient Under RCM as per
                                <br />
                                Notification 22/2019 - Central tax -Rate dated 30-09-2019</strong>
                        </div>
                        <div className="Individual-amount-data">
                            <div className="Individual-lebel">
                                <dl className="dl-horizontal">
                                    <dt>Total Amount</dt>
                                    <dd>{BalanceValue || ''}</dd>
                                    <dd>0.00</dd>
                                    <dt>Rounded Off</dt>
                                    <dd>{roundOff || ''}</dd>
                                    <dd>
                                        <hr />
                                    </dd>
                                    <dt>Net payble</dt>
                                    <dd>{TotalAmountValue || ''}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="Individual-location-details">
                    <div className="location-img">
                        <img src={GmapimageUrl} alt="location-img" />
                    </div>
                    <div className="Individual-total-details">
                        <table>
                            <thead>
                                <tr>
                                    <th>Starting</th>
                                    <th>Closing</th>
                                    <th>Shed In</th>
                                    <th>Shed Out</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{tripstartdate}</td>
                                    <td>{tripclosedate}</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td><strong>
                                        {tripSheetData?.totaldays || book?.totaldays || selectedCustomerData?.totaldays || selectedCustomerDatas?.totaldays || formData?.totaldays || ''}
                                    </strong></td>
                                </tr>
                                <tr>
                                    <td>{tripstarttime}</td>
                                    <td>{tripclosetime}</td>
                                    <td>{tripreporttime}</td>
                                    <td>{tripshedintime}</td>
                                    <td><strong>
                                        {tripSheetData?.totaltime || book?.totaltime || selectedCustomerData?.totaltime || selectedCustomerDatas?.totaltime || formData?.totaltime || ''}
                                    </strong></td>
                                </tr>
                                <tr>
                                    <td>{tripstartkm}</td>
                                    <td>{tripclosekm}</td>
                                    <td>{tripshedout}</td>
                                    <td>{tripshedin}</td>
                                    <td><strong>
                                        {tripSheetData?.totalkm1 || book?.totalkm1 || selectedCustomerData?.totalkm1 || selectedCustomerDatas?.totalkm1 || formData?.totalkm1 || ''}
                                    </strong></td>

                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
                <div className="Individual-RouteSummary">
                    <div className='Individual-RouteSummary-container'>
                        <h2>Route Summary</h2>
                        <ol type="1">
                            {routeData.length > 0 && routeData.map((data, index) => (
                                <li><p key={index}><strong>{data.trip_type}</strong>: {data.place_name}</p></li>
                            ))}
                        </ol>
                    </div>
                    <div className="Individual-signature">
                        <img src={mapimageUrl} alt="Guest Signature" />
                        <span className="Individual-signature-title">Guest Signature</span>
                    </div>
                </div>
            </div>
        </>
    );
};
const Invoice = ({ tripSheetData, selectedImage, organizationdata, tripcode, tripshedin, tripshedout, tripreporttime, tripshedintime, organizationaddress1, GmapimageUrl, mapimageUrl, organizationaddress2, organizationcity, organizationgstnumber, selectedCustomerData, tripShedkm, tripadditionaltime, tripstartkm, tripclosekm, tripstarttime, tripclosetime, tripstartdate, tripclosedate, triprequest, tripdepartment, TotalAmountValue, BalanceValue, tripData, selectedCustomerDatas, customerData, routeData, book, roundOff, formData }) => {

    const handlePrint = async () => {
        const invoiceContent = ReactDOMServer.renderToString(
            <PrintableInvoice
                tripSheetData={tripSheetData}
                organizationdata={organizationdata}
                BalanceValue={BalanceValue}
                selectedImage={selectedImage}
                TotalAmountValue={TotalAmountValue}
                roundOff={roundOff}
                tripdepartment={tripdepartment}
                book={book}
                selectedCustomerData={selectedCustomerData}
                selectedCustomerDatas={selectedCustomerDatas}
                formData={formData}
                mapimageUrl={mapimageUrl}
                GmapimageUrl={GmapimageUrl}
                tripData={tripData}
                customerData={customerData}
                triprequest={triprequest}
                routeData={routeData}
                tripcode={tripcode}
                tripShedkm={tripShedkm}
                tripshedin={tripshedin}
                tripshedout={tripshedout}
                tripreporttime={tripreporttime}
                tripshedintime={tripshedintime}
                tripadditionaltime={tripadditionaltime}
                tripstartkm={tripstartkm}
                tripclosekm={tripclosekm}
                tripstarttime={tripstarttime}
                tripclosetime={tripclosetime}
                tripstartdate={tripstartdate}
                tripclosedate={tripclosedate}
                organizationaddress1={organizationaddress1}
                organizationaddress2={organizationaddress2}
                organizationcity={organizationcity}
                organizationgstnumber={organizationgstnumber}
            />
        );
        const printWindow = window.open();
        printWindow.document.open();
        printWindow.document.write(`
        <html>
          <head>
             <title>TAX INVOICE</title>
                <style>
                    .Individual-table-container {
                        font-size: 13px;
                        border: 1.5px solid #000;
                    }
                    .Individual-description-table {
                        border-bottom: 1.5px solid #000;
                    }
                    .page-title {
                        width: 40%;
                        padding: 10px 0px;
                        display: flex;
                        align-items: center;
                        /* justify-content: start; */
                    }
                    .page-title .sheet-logo img {
                        width: 80px;
                    }
                    .page-title .sheet-type {
                        width: 53%;
                        display: flex;
                        justify-content: flex-end;
                    }
                    .Individual-description-table-header {
                        width: 60%;
                    }
                    .Individual-description-table table{
                        border-collapse: collapse;
                    }
                    .Individual-description-table thead{
                        background: #b4b3b3 ;
                        padding: 10px;
                        border-collapse: collapse;
                        margin:0px;
                        border-bottom: 1.5px solid #000;
                    }
                    .Individual-description-table  .Individual-description-table-header {
                        text-align: left !important;
                        padding: 0px 10px;
                    }
                    .Individual-description-table  td {
                        text-align: center;
                        font-size: 12px;
                        padding: 20px 10px;
                    }
                    .page-title {
                        text-align: center;
                        width: 100%;
                        border-bottom: 1.5px solid #000;
                    
                    }
                    .header-title {
                        padding: 0px 10px;
                        display: flex;
                        /* align-items: center; */
                        justify-content: space-between;
                        border-bottom: 1.5px solid #000;
                    }
                    .left-title {
                        width: 55%;
                    }
                    .left-title p {
                        width: 80%;
                    }
                    .left-title p span {
                        font-weight: 800;
                        display: block;
                    }        
                    .right-title {
                        float: right;
                        width: 35%;
                    }
                    .dl-horizontal dt {
                        float: left;
                        overflow: hidden;
                        clear: left;
                        font-weight: 900;
                        text-align: right;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .dl-horizontal dd {
                        margin-left: 90px;
                    }
                    .Individual-amountanddetails {
                        display: flex;
                        justify-content: space-around;
                        padding: 0px 10px;
                    }
                    .Individual-details-data p {
                        width: 80%;
                        font-size: 12px;
                        text-align: left;
                    }
                    .Individual-amount-data {
                        border-left: 1.5px solid #000;
                    }
                    .Individual-location-details {
                        display: flex;
                        padding: 10px 0px;
                        justify-content: space-between;
                    }
                    .Individual-location-details .location-img {
                        width: 90%;
                    }
                    .Individual-location-details .location-img img {
                        width: 300px;
                        height: 150px;
                    }
                    .Individual-location-details .Individual-total-details table {
                        border-collapse: collapse;
                        width: 30%;
                    }
                    .Individual-location-details .Individual-total-details table tr {
                        border: 1px solid #000;
                    }
                    .Individual-location-details .Individual-total-details table th,
                    td {
                        padding: 10px 5px;
                        font-size: 13px;
                    }
                    .Individual-RouteSummary .Individual-signature .Individual-signature-title {
                        display: flex;
                        justify-content: center;
                        font-weight: 600;
                    }
                    .Individual-RouteSummary .Individual-signature {
                        position: relative;
                        width: 30%;
                    }
                    .Individual-RouteSummary .Individual-signature img {
                        width: 100px;
                        display: flex;
                        margin: 0px auto;
                    }
                    .Individual-RouteSummary {
                        display: flex;
                        align-items: flex-end;
                    }
                    .Individual-RouteSummary .Individual-RouteSummary-container {
                        width: 70%;
                        font-size: 13px;
                    }
                    .Individual-RouteSummary .Individual-RouteSummary-container p {
                        font-weight: 600;
                    }
                    .Individual-RouteSummary .Individual-RouteSummary-container ol {
                        font-size: 12px;
                        font-weight: 500;
                    }
                </style>
          </head>
          ${invoiceContent}
          </body>
        </html>
      `);
        printWindow.document.close();

        printWindow.onload = () => {
            printWindow.print();
            printWindow.close();
        };
    };

    return (
        <div className="invoice-wrapper">
            <PrintableInvoice
                tripSheetData={tripSheetData}
                BalanceValue={BalanceValue}
                TotalAmountValue={TotalAmountValue}
                organizationdata={organizationdata}
                roundOff={roundOff}
                book={book}
                tripdepartment={tripdepartment}
                selectedImage={selectedImage}
                selectedCustomerData={selectedCustomerData}
                selectedCustomerDatas={selectedCustomerDatas}
                formData={formData}
                mapimageUrl={mapimageUrl}
                GmapimageUrl={GmapimageUrl}
                tripData={tripData}
                tripcode={tripcode}
                tripshedin={tripshedin}
                tripshedout={tripshedout}
                tripreporttime={tripreporttime}
                tripshedintime={tripshedintime}
                triprequest={triprequest}
                customerData={customerData}
                tripShedkm={tripShedkm}
                tripadditionaltime={tripadditionaltime}
                tripstartkm={tripstartkm}
                tripclosekm={tripclosekm}
                tripstarttime={tripstarttime}
                tripclosetime={tripclosetime}
                tripstartdate={tripstartdate}
                tripclosedate={tripclosedate}
                organizationaddress1={organizationaddress1}
                organizationaddress2={organizationaddress2}
                organizationcity={organizationcity}
                organizationgstnumber={organizationgstnumber}
                routeData={routeData} />
            <Button variant="contained" onClick={handlePrint}>Print</Button>
        </div>
    );
};
export default Invoice;

