import React from 'react';
import './Reportinvoice.css';
import { Button } from '@material-ui/core';
import ReactDOMServer from 'react-dom/server';
const PrintableInvoice = ({ routeData, organizationdata, selectedImage, routedData, organizationaddress1, sumTotalAndRounded, roundedAmount, totalValue, organizationaddress2, organizationcity, organizationgstnumber }) => {


    return (
        <>
            <div className='Reportinvoice-invoice' >
                <div className="Reportinvoice-table-container">
                    <div className="page-title">
                        <div className="sheet-logo">
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
                                <dt>GSTIN</dt>
                                <dd><strong>: {organizationdata.gstnumber}</strong></dd>
                                <dt>Sac Code</dt>
                                <dd>: 996601</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="header-title">
                        <div className="left-title">
                            <dl className="dl-horizontal">
                                <dt>Organisation</dt>
                                <dd><strong>:{routeData[0]?.customer || ''}</strong><br />{organizationaddress1 || ''}{organizationaddress2 || ''}{organizationcity || ''}</dd>
                                <dt>GSTIN</dt>
                                <dd>: {organizationgstnumber || ''}</dd>
                            </dl>
                        </div>
                        <div className="right-title">
                            <dl className="dl-horizontal">
                                <dt>Invoice No</dt>
                                <dd><strong>:{routedData?.[0]?.invoiceno}</strong></dd>
                                <dt>Invoice Date</dt>
                                <dd>:{routedData?.[0]?.Billingdate}</dd>
                                <dt>Group Ref No</dt>
                                <dd>:</dd>
                            </dl>
                        </div>
                    </div>
                    <div className='Reportinvoice-description-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Trip_Date</th>
                                    <th>Trip_No</th>
                                    <th>Particulars</th>
                                    <th>Parking Permit</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(routeData) ? (
                                    routeData.map((trip, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{trip.startdate || ''}</td>
                                            <td>{trip.tripid || ''}</td>
                                            <td className='Reportinvoice-description-table-header'>
                                                <span>{trip.guestname || ''}</span><br />
                                                {trip.vehRegNo || ''}\{trip.duty || ''}\TKms:{trip.totalkm1 || ''}\Hrs:{trip.totaltime || ''}\{trip.vehType || ''} Vehicle Hire Charges For ({trip.package || ''})
                                                Night Bata: 1Night @ Rs.{trip.night || ''} <br />{trip.pickup || ''} </td>
                                            <td>{trip.parking || ''}<br />{trip.permit || ''}</td>
                                            <td>{trip.netamount || ''}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">Invalid data type for routeData</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="Reportinvoice-total-details">
                        <div className="Reportinvoice-amount">
                            <p></p>
                        </div>
                        <div className="Reportinvoice-Total-details">
                            <dl >
                                <dt>SUB Total</dt>
                                <dd>{totalValue || ''}</dd>
                                <dd>{roundedAmount || ''}</dd>
                                <dt>Total Amount</dt>
                                <dd>{sumTotalAndRounded || ''}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="Reportinvoice-details-report">
                        <div className="Reportinvoice-gst-details">
                            <p>GST is to be paid by Service Recepient Under RCM as per Notification 22/19 - Centraltax (Rate) dated 30-09-2019 <br /><span>E.& O.E In Words-Rupees</span></p>
                        </div>
                        <div className="Reportinvoice-signature">
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};
const Invoice = ({ routeData, organizationdata, selectedImage, routedData, totalValue, roundedAmount, sumTotalAndRounded, organizationaddress1, organizationaddress2, organizationcity, organizationgstnumber }) => {

    const handlePrint = () => {
        const invoiceContent = ReactDOMServer.renderToString(
            <PrintableInvoice
                routedData={routedData}
                selectedImage={selectedImage}
                organizationdata={organizationdata}
                routeData={routeData}
                roundedAmount={roundedAmount}
                sumTotalAndRounded={sumTotalAndRounded}
                totalValue={totalValue}
                organizationaddress1={organizationaddress1}
                organizationaddress2={organizationaddress2}
                organizationcity={organizationcity}
                organizationgstnumber={organizationgstnumber}
            />
        );
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`
        <html>
          <head>
          <title>TAX INVOICE</title>
          <style>
          .Reportinvoice-table-container {
            font-size: 13px;
            border: 1.5px solid #000;
        }
        
        .Reportinvoice-description-table {
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
        
        .Reportinvoice-description-table-header {
            width: 60%;
        }
        .Reportinvoice-description-table table{
            border-collapse: collapse;
        }
        .Reportinvoice-description-table th {
            padding: 10px;
        
        }
        
        .Reportinvoice-description-table thead {
            background: #b4b3b3 !important;
            border-bottom: 1.5px solid #000;
        }
        
        .Reportinvoice-description-table .Reportinvoice-description-table-header {
            /* text-align: left !important; */
            padding: 10px;
        }
        
        .Reportinvoice-description-table td {
            text-align: left !important;
            border: 1px solid #000;
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
            margin-left: 95px;
        }
        
        .Reportinvoice-total-details {
            padding: 0px 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            border-bottom: 1.5px solid #000;
        }

        .Reportinvoice-total-details .Reportinvoice-amount {
            width: 80%;

        }

        .Reportinvoice-total-details .Reportinvoice-Total-details {
            width: 40%;
        }

        .Reportinvoice-total-details .Reportinvoice-Total-details dl dt {
            float: left;
            overflow: hidden;
            clear: left;
            font-weight: 900;
            text-align: right;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .Reportinvoice-total-details .Reportinvoice-Total-details dl dd {
            margin-left: 190px;
        }

        .Reportinvoice-details-report {
            padding: 0px 10px;
            display: flex;
            align-items: center;
            position: relative;
            justify-content: space-between;
        }

        .Reportinvoice-details-report .Reportinvoice-gst-details p {
            width: 50%;
        }

        .Reportinvoice-details-report .Reportinvoice-gst-details p span {
            position: absolute;
            bottom: 0;
            left: 10px;
        }
        .Reportinvoice-details-report .Reportinvoice-signature .Reportinvoice-signature-title {
            display: flex;
            justify-content: center;
            font-weight: 600;
        }
        .Reportinvoice-details-report .Reportinvoice-signature {
            position: relative;
            width: 30%;
        }

        .Reportinvoice-details-report .Reportinvoice-signature img {
            width: 100px;
            display: flex;
            margin: 0px auto;
        }
        </style>
          </head>
          <body>
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
                routedData={routedData}
                selectedImage={selectedImage}
                routeData={routeData}
                organizationdata={organizationdata}
                roundedAmount={roundedAmount}
                sumTotalAndRounded={sumTotalAndRounded}
                totalValue={totalValue}
                organizationaddress1={organizationaddress1}
                organizationaddress2={organizationaddress2}
                organizationcity={organizationcity}
                organizationgstnumber={organizationgstnumber}
            />
            <Button variant="contained" onClick={handlePrint}>Print</Button>
        </div>
    );
};

export default Invoice;

