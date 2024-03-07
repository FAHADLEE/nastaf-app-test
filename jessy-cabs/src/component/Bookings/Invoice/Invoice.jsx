import React from 'react';
import './invoice.css';
import { Button } from '@material-ui/core';
import ReactDOMServer from 'react-dom/server';
const PrintableInvoice = ({ tripSheetData, organizationdata, selectedImage, book, GmapimageUrl, attachedImage, signimageUrl, routeData, selectedCustomerData, selectedCustomerDatas, formData }) => {

  return (
    <div className="invoice-wrapper">
      <article>
        <div className='invoice-container-header'>
          <div className="logo-image-invoice">
            <img src={Array.isArray(selectedImage) ? selectedImage[0] : selectedImage} alt={"Logo"} />
          </div>
          <div className="invoice-address">
            <address >
              <p className='invoice-address-detials'>{organizationdata.addressLine1}
                {organizationdata.addressLine2}
                {organizationdata.city}<br />
                {organizationdata.contactEmail}</p>
              <p className='invoice-contact-details'>Contact:-{organizationdata.contactPhoneNumber}</p>
            </address>
          </div>
        </div>
        <div className="main-invoice-container">
          <div className='first-table-invoice-container'>
            <table id='table-invoice' className="firstleftTable">
              <tr>
                <th id='table-header'><span>Client Name:</span></th>
                <td id='table-data'><span >{tripSheetData.customer || selectedCustomerData.customer || selectedCustomerDatas.customer || book.customer}</span></td>
              </tr>
              <tr>
                <th id='table-header'><span>Address:</span></th>
                <td id='table-data'><span >{tripSheetData.address1 || selectedCustomerData.address1 || selectedCustomerDatas.address1 || book.address1} {tripSheetData.streetno || selectedCustomerData.streetno || selectedCustomerDatas.streetno || book.streetno} {tripSheetData.city || selectedCustomerData.city || selectedCustomerDatas.city || book.city}</span></td>
              </tr>
              <tr>
                <th id='table-header'><span>Ordered By:</span></th>
                <td id='table-data'><span>{tripSheetData.orderedby || selectedCustomerData.orderedby || selectedCustomerDatas.orderedby || book.orderedby}</span></td>
              </tr>
              <tr>
                <th id='table-header'><span>Emp. No:</span></th>
                <td id='table-data'><span>{tripSheetData.empolyeeno || selectedCustomerData.empolyeeno || selectedCustomerDatas.empolyeeno || book.empolyeeno}</span></td>
              </tr>
              <tr>
                <th id='table-header'><span>CCode:</span></th>
                <td id='table-data'><span>{tripSheetData.customercode || selectedCustomerData.customercode || selectedCustomerDatas.customercode || book.customercode}</span></td>
              </tr>
              <tr>
                <th id='table-header'><span>Report To</span></th>
                <td id='table-data'><span>{tripSheetData.guestname || selectedCustomerData.guestname || selectedCustomerDatas.guestname || book.guestname}</span></td>
              </tr>
              <tr>
                <th id='table-header'><span >Reporting @</span></th>
                <td id='table-data'><span>{tripSheetData.customer || selectedCustomerData.customer || selectedCustomerDatas.customer || book.customer}</span></td>
              </tr>
              <tr>
                <th id='table-header'><span>Remarks:</span></th>
                <td id='table-data'><span>{tripSheetData.remark || selectedCustomerData.remark || selectedCustomerDatas.remark || book.remark}</span></td>
              </tr>
            </table>
            <table id='table-invoice' className="firstTable">
              <tr>
                <th id='table-header'>Log No:</th>
                <td id='table-data'>TS{tripSheetData.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || book.tripid}</td>
              </tr>
              <tr>
                <th id='table-header'>Date:</th>
                <td id='table-data'>{tripSheetData.startdate || selectedCustomerData.startdate || selectedCustomerDatas.startdate || book.startdate}</td>
              </tr>
              <tr>
                <th id='table-header'>Duty Type:</th>
                <td id='table-data'>{tripSheetData.duty || selectedCustomerData.duty || selectedCustomerDatas.duty || book.duty}</td>
              </tr>
              <tr>
                <th id='table-header'>Vehicle Type:</th>
                <td id='table-data'><span>{tripSheetData.vehType || selectedCustomerData.vehType || selectedCustomerDatas.vehType || book.vehType}</span></td>
              </tr>
              <tr>
                <th id='table-header'><span >Vehicle No:</span></th>
                <td id='table-data'><span>{tripSheetData.vehRegNo || selectedCustomerData.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo}</span></td>
              </tr>
              <tr>
                <th id='table-header'><span >Driver Name:</span></th>
                <td id='table-data'><span>{tripSheetData.driverName || selectedCustomerData.driverName || selectedCustomerDatas.driverName || book.driverName}</span></td>
              </tr>
              <tr>
                <th id='table-header'><span >Driver Mobile:</span></th>
                <td id='table-data'><span>{tripSheetData.mobileNo || selectedCustomerData.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo}</span></td>
              </tr>
            </table>
          </div>
          <div className="secondTable">
            <div className='vehicale-details-table'>
              <table id='table-invoice' >
                <thead>
                  <tr>
                    <th id='table-headers'><span ></span></th>
                    <th id='table-headers'><span >DATE</span></th>
                    <th id='table-headers'><span >HOURS</span></th>
                    <th id='table-headers'><span >KMS</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td id='table-datas'><span >Closing</span></td>
                    <td id='table-datas'><span >{tripSheetData.closedate || selectedCustomerData.closedate || selectedCustomerDatas.closedate || book.closedate}</span></td>
                    <td id='table-datas'><span >{tripSheetData.closetime || selectedCustomerData.closetime || selectedCustomerDatas.closetime || book.closetime}</span></td>
                    <td id='table-datas'><span >{tripSheetData.closekm || selectedCustomerData.closekm || selectedCustomerDatas.closekm || book.closekm}</span></td>
                  </tr>
                  <tr>
                    <td id='table-datas'><span >Starting</span></td>
                    <td id='table-datas'><span >{tripSheetData.startdate || selectedCustomerData.startdate || selectedCustomerDatas.startdate || book.startdate}</span></td>
                    <td id='table-datas'><span >{tripSheetData.starttime || selectedCustomerData.starttime || selectedCustomerDatas.starttime || book.starttime}</span></td>
                    <td id='table-datas'><span >{tripSheetData.startkm || selectedCustomerData.startkm || selectedCustomerDatas.startkm || book.startkm}</span></td>
                  </tr>
                  <tr>
                    <td id='table-datas'><span >Total</span></td>
                    <td id='table-datas'><span >{tripSheetData.totaldays || selectedCustomerData.totaldays || selectedCustomerDatas.totaldays || book.totaldays}</span>days</td>
                    <td id='table-datas'><span >{tripSheetData.totaltime || selectedCustomerData.totaltime || selectedCustomerDatas.totaltime || book.totaltime || formData.totaltime}</span></td>
                    <td id='table-datas'><span >{tripSheetData.totalkm1 || selectedCustomerData.totalkm1 || selectedCustomerDatas.totalkm1 || book.totalkm1}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="guest-signature-details">
              <div className="instruction">
                <h5>SPL INSTRUCTION</h5>
                <p id='line'>------------------</p>
                <p id='line'>------------------</p>
              </div>
              <div className="guest-sign">
                <img className='dialogboximg' src={signimageUrl} alt='Signature' />
                <p>Guest Signature</p>
              </div>
            </div>
          </div>
        </div>
        <div className='total-values'>
          <div id='Totals'><span id='title'>Total Parking  </span><span>{tripSheetData.parking || selectedCustomerData.parking || selectedCustomerDatas.parking || book.parking}</span></div>
          <div id='Totals'><span id='title'>Total Toll  </span><span>{tripSheetData.toll || selectedCustomerData.toll || selectedCustomerDatas.toll || book.toll}</span></div>
          <div id='Totals'><span id='title'>Total Permit  </span><span>{tripSheetData.permit || selectedCustomerData.permit || selectedCustomerDatas.permit || book.permit}</span></div>
        </div>
        <div className='tripsheet-location-img'>
          <img src={GmapimageUrl} alt='mapimage' />
        </div>
        <div className="tripsheet-RouteSummary">
          <h2>Route Summary</h2>
          <ol type="1">
            {routeData.length > 0 && routeData.map((data, index) => (
              <li><p key={index}><strong>{data.trip_type}</strong>: {data.place_name}</p></li>
            ))}
          </ol>
        </div>
        <div className='attached-toll'>
          <ol type="1">
            {Array.isArray(attachedImage) && attachedImage.map((image, index) => (
              <img key={index} src={image} alt={`image_${index}`} />
            ))}
          </ol>
        </div>
      </article>
    </div>
  );
};
const Invoice = ({ tripSheetData, organizationdata, selectedImage, selectedCustomerData, attachedImage, signimageUrl, routeData, GmapimageUrl, selectedCustomerDatas, book, formData }) => {

  const handlePrint = () => {
    const invoiceContent = ReactDOMServer.renderToString(
      <PrintableInvoice tripSheetData={tripSheetData} organizationdata={organizationdata} selectedImage={selectedImage} attachedImage={attachedImage} routeData={routeData} selectedCustomerData={selectedCustomerData} signimageUrl={signimageUrl} GmapimageUrl={GmapimageUrl} formData={formData} book={book} selectedCustomerDatas={selectedCustomerDatas} />
    );
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
        <html>
          <head>
          <title>LOG SHEET</title>
          <style>
          .invoice-wrapper {
            border: 0;
            box-sizing: content-box;
            color: inherit;
            font-family: inherit;
            font-size: inherit;
            font-style: inherit;
            font-weight: inherit;
            line-height: inherit;
            list-style: none;
            margin: 20;
            padding: 20;
            text-decoration: none;
            vertical-align: top;
          }
          
          .invoice-container-header {
            display: flex;
            align-content: center;
            justify-content: space-between;
          }
          
          .logo-image-invoice img {
            width: 100px;
            margin: 20px 10px;
          }
          
          .invoice-address {
            width: 230px;
          }
          
          .invoice-address .invoice-contact-details {
            font-weight: 600;
            font-size: 13px;
          }
          
          /* heading */
          
          .invoice-wrapper header {
            margin: 0 0 3em;
          }
          
          .invoice-wrapper h1 {
            font: bold 100% sans-serif;
            letter-spacing: 0.5em;
            text-align: center;
            text-transform: uppercase;
          }
          
          .invoice-wrapper header h1 {
            background: black;
            border-radius: 0.25em;
            color: white;
            margin: 0 0 1em;
            padding: 0.5em 0;
          }
          
          .invoice-wrapper header address {
            float: left;
          }
          
          .dialogboximg {
            height: 100px;
            width: 100px;
          }
                   
          .invoice-wrapper header span,
          header img {
            display: block;
            float: right;
          }
                    
          .invoice-wrapper header img {
            max-height: 50%;
            max-width: 50%;
          }
          
          .invoice-wrapper header:after {
            clear: both;
            content: "";
            display: table;
          }
          
          /* article */
          
          .invoice-wrapper article h1 {
            clip: rect(0 0 0 0);
            position: absolute;
          }
          
          /* .invoice-wrapper article address {
            float: left;
            font-size: 125%;
            font-weight: bold;
          } */
          
          .invoice-wrapper article:after {
            clear: both;
            content: "";
            display: table;
          }
          
          /* table */
          .main-invoice-container {
            border: 1px solid #000;
          
          }
          
          .first-table-invoice-container {
            display: flex;
          }
          
          .secondTable {
            display: flex;
            border-top: 1px solid #000;
          }
          
          .vehicale-details-table {
            width: 60%;
            border-right: 1px solid #000;
          }
          
          .vehicale-details-table #table-headers,
          #table-datas {
            padding: 6px;
            border-radius: 2px;
            border: 1px solid #ccc;
          }
          
          .guest-signature-details {
            display: flex;
            width: 40%;
            padding: 5px;
          
          }
          
          .guest-signature-details .instruction {
            width: 70%;
            position: relative;
          }
          
          .guest-signature-details .guest-sign {
            width: 40%;
            position: relative;
          }
          
          .guest-signature-details .guest-sign p {
            position: absolute;
            bottom: 0;
            font-size: 10px;
            font-weight: bold;
            text-decoration: underline;
          }
          
          .invoice-wrapper #table-invoice {
            font-size: 75%;
            table-layout: auto;
            width: 100%;
          }
          
          .invoice-wrapper #table-invoice {
            border-collapse: separate;
            border-spacing: 2px;
          }
          
          .invoice-wrapper #table-header,
          #table-data {
            border-width: 1px;
            padding: 6px;
            position: relative;
            text-align: left;
          }
          
          .invoice-wrapper #table-header {
            background: #EEE;
            padding: 6px;
            border: none;
          }
          
          .invoice-wrapper #table-data {
            float:left;
            padding: 6px;
            border: none;
            /* width: 100px; */
          }
          
          /* table firstTable */
          .invoice-wrapper #table-invoice.firstleftTable {
            float: left;
            width: 45%;
            height: 50%;
          }
          
          .invoice-wrapper #table-invoice.firstTable {
            float: right;
            width: 45%;
            height: 50%;
          }
          
          .invoice-wrapper #table-invoice.firstbottomTable {
            float: right;
            width: 100%;
            height: 50%;
          }
          
          .invoice-wrapper #table-invoice.firstTable:after {
            clear: both;
            content: "";
            display: table;
          }
          
          
          /* table firstTable */
          
          .invoice-wrapper #table-invoice.firstTable #table-header {
            width: 40%;
          }
          
          .invoice-wrapper #table-invoice.firstTable #table-data {
            width: 60%;
          }
          
          .total-values {
            display: flex;
          }
          
          .total-values #Totals {
            margin: 10px;
          }
          
          .total-values #Totals #title {
            font-weight: bold;
          }
          
          .invoice-wrapper form {
            font: 16px/1 'Open Sans', sans-serif;
            overflow: auto;
            padding: 0.5in;
          }
          
          .invoice-wrapper form {
            background: #999;
            cursor: default;
          }
          
          .invoice-wrapper form {
            box-sizing: border-box;
            height: 11in;
            margin: 0 auto;
            overflow: hidden;
            padding: 0.5in;
            width: 8.5in;
          }
          
          .invoice-wrapper form {
            background: #FFF;
            border-radius: 1px;
            box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
          }
          
          .invoice-wrapper aside h1#notes {
            border: none;
            border-width: 0 0 1px;
            margin: 0 0 1em;
          }
          
          .invoice-wrapper aside h1#notes {
            border-color: #999;
            border-bottom-style: solid;
            border-bottom-width: 10%;
            font: bold 100% sans-serif;
            letter-spacing: 0.5em;
            text-align: center;
            text-transform: uppercase;
          }
          .tripsheet-location-img{
            display: flex;
            align-items: center;
            justify-content: start;
          }
          .tripsheet-location-img img {
            width: 320px;
          }
          .tripsheet-RouteSummary{
            width: 80%;
            font-size: 13px;
          }
          .tripsheet-RouteSummary p{
            font-weight: 600;
          }
          .tripsheet-RouteSummary ol{
            font-size: 12px;
            font-weight: 500;
          }
          .attached-toll{
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 10px auto;
          }
          .attached-toll img {
            width: 500px;
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
      <PrintableInvoice tripSheetData={tripSheetData}
        organizationdata={organizationdata}
        selectedImage={selectedImage}
        attachedImage={attachedImage}
        routeData={routeData}
        book={book}
        signimageUrl={signimageUrl}
        GmapimageUrl={GmapimageUrl}
        selectedCustomerData={selectedCustomerData}
        selectedCustomerDatas={selectedCustomerDatas}
        formData={formData} />
      <Button variant="contained" onClick={handlePrint}>Print</Button>
    </div>
  );
};

export default Invoice;
