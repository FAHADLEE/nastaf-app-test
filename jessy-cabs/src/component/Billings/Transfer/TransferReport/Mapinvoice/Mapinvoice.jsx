import React from 'react';
import './Mapinvoice.css';
import { Button } from '@material-ui/core';
import ReactDOMServer from 'react-dom/server';
import Logo from "../../../../Dashboard/MainDash/Sildebar/Logo-Img/logo.png";
import Locationimg from "../../../billingMain/Accountsinvoice/location.png";
import Signature from "../../../billingMain/Accountsinvoice/signature-1692258849846.png";

const PrintableInvoice = ({ tripSheetData, book, roundOff, TotalAmountValue, BalanceValue, selectedCustomerData, selectedCustomerDatas, formData }) => {

    return (
        <>
            <div className='Mapinvoice-invoice' >
                <div className="Mapinvoice-table-container">
                    <div className="page-title">
                        <div className="sheet-logo">
                            <img src={Logo} alt="logo" />
                        </div>
                        <div className="sheet-type">
                            <h1>Tax Invoice</h1>
                        </div>
                    </div>
                    <div className="header-title">
                        <div className="left-title">
                            <h3>JESSYCABS</h3>
                            <p>Flat No 2, II Floor, Swathi Complex, (Venkatnarayana Road)
                                Nandanam, Chennai - 600017
                                booking@jessycabs.in
                                <span>Tel:044-24354247,Mob:9841505689</span>
                            </p>
                        </div>
                        <div className="right-title">
                            <dl className="dl-horizontal">
                                <dt>OUR GSTIN</dt>
                                <dd><strong>: 33AVNPM9362R1ZK</strong></dd>
                                <dt>State</dt>
                                <dd>: Tamilnadu,Code : 33 </dd>
                                <dt>Pan No</dt>
                                <dd>: AVNPM9362R</dd>
                                <dt>Sac Code</dt>
                                <dd>: 996601</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="header-title">
                        <div className="left-title">
                            <dl class="dl-horizontal">
                                <dt>Organisation</dt>
                                <dd><strong>:HCL CAPITAL PRIVATE LIMITED</strong><br />06, Siddhartha, Plot 96, Nehru Place,
                                    South East Delhi,</dd>
                                <dt>GSTIN</dt>
                                <dd>: 07AAACM9201G1ZR,</dd>
                                <dt>Code</dt>
                                <dd>: 07</dd>
                                <dt>State</dt>
                                <dd>: Delhi</dd>
                                <dt>Guest Name</dt>
                                <dd>: MRS.ROSHNI NADAR</dd>
                            </dl>
                        </div>
                        <div className="right-title">
                            <dl class="dl-horizontal">
                                <dt>Service City</dt>
                                <dd><strong>: Chennai</strong></dd>
                                <dt>Trip Date</dt>
                                <dd>: 31/07/2023</dd>
                                <dt>Trip No</dt>
                                <dd>: 73701</dd>
                                <dt>Vehicle Type</dt>
                                <dd>: BENZ S CLASS</dd>
                                <dt>Vehicle No</dt>
                                <dd>: PY-05-D-7755</dd>
                                <dt>Request ID</dt>
                                <dd>: </dd>
                            </dl>
                        </div>
                    </div>
                    <div className='Mapinvoice-description-table'>
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
                                    <td className='Mapinvoice-description-table-header'>38 Kms + FGR 0 Kms = Total 38 Kms : 03:00 Hrs +
                                        FGR 00:00 Hrs = Total 03:00 Hrs (8 HRS & 80 KMS)</td>
                                    <td>2</td>
                                    <td>30</td>
                                    <td>30000.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="Mapinvoice-amountanddetails">
                        <div className="Mapinvoice-details-data">
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
                        <div className="Mapinvoice-amount-data">
                            <div className="Mapinvoice-lebel">
                                <dl class="dl-horizontal">
                                    <dt>Total Amount</dt>
                                    <dd>30075.00</dd>
                                    <dd>0.00</dd>
                                    <dt>Rounded Off</dt>
                                    <dd>00.00</dd>
                                    <dd>
                                        <hr />
                                    </dd>
                                    <dt>Net payble</dt>
                                    <dd>3075.00</dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="Mapinvoice-location-details">
                    <div className="location-img">
                        <img src={Locationimg} alt="location-img" />
                    </div>
                    <div className="Mapinvoice-total-details">
                        <table>
                            <thead>

                                <tr>
                                    <th>Starting</th>
                                    <th>Closing</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>15:00</td>
                                    <td>18:00</td>
                                    <td><strong>
                                        18:00hrs
                                    </strong></td>
                                </tr>
                                <tr>
                                    <td>31/07/2023</td>
                                    <td>31/07/2023</td>
                                    <td><strong>
                                        0
                                    </strong></td>
                                </tr>
                                <tr>
                                    <td>67802</td>
                                    <td>67840</td>
                                    <td><strong>
                                        38:00Kms
                                    </strong></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
                <div className="Mapinvoice-RouteSummary">
                    <div className='Mapinvoice-RouteSummary-container'>
                        <h2>Route Summary</h2>
                        <p><strong>Start</strong>.487, Anna Salai, Lotus Colony, CIT Nagar, Chennai, Tamil Nadu 600035, India</p>
                        <ol type="1">
                            <li>X5M7+2HV, Airport Departures Terminal Link, Meenambakkam, Chennai, Tamil Nadu 600016, India</li>
                            <li>No.63, ITC Grand Chola, Near Alexander Square, Anna Salai, Little Mount, Guindy, Chennai, Tamil Nadu 600032, India</li>
                            <li>E-1, Pasumpon Muthuramalinga Thevar Rd, Lotus Colony, Nandanam, Chennai, Tamil Nadu 600035, India</li>
                        </ol>
                    </div>
                    <div className="Mapinvoice-signature">
                        <img src={Signature} alt="Guest Signature" />
                        <span className="Mapinvoice-signature-title">Guest Signature</span>
                    </div>
                </div>
            </div>
        </>
    );
};
const Invoice = ({ tripSheetData, selectedCustomerData, TotalAmountValue, BalanceValue, selectedCustomerDatas, book, roundOff, formData }) => {

    const handlePrint = () => {
        const invoiceContent = ReactDOMServer.renderToString(
            <PrintableInvoice tripSheetData={tripSheetData} BalanceValue={BalanceValue} TotalAmountValue={TotalAmountValue} roundOff={roundOff} selectedCustomerData={selectedCustomerData} formData={formData} book={book} selectedCustomerDatas={selectedCustomerDatas} />
        );
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`
        <html>
          <head>
          <title>TAX INVOICE</title>
          <style>
                .Mapinvoice-table-container {
                    font-size: 13px;
                    border: 1.5px solid #000;
                }
                .Mapinvoice-description-table {
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
                .Mapinvoice-description-table-header {
                    width: 60%;
                }
                .Mapinvoice-description-table table{
                    border-collapse: collapse;
                }
                .Mapinvoice-description-table thead{
                    background: #b4b3b3 ;
                    padding: 10px;
                    border-collapse: collapse;
                    margin:0px;
                    border-bottom: 1.5px solid #000;
                }
                .Mapinvoice-description-table  .Mapinvoice-description-table-header {
                    text-align: left !important;
                    padding: 0px 10px;
                }
                .Mapinvoice-description-table  td {
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
                .Mapinvoice-amountanddetails {
                    display: flex;
                    justify-content: space-around;
                    padding: 0px 10px;
                }
                .Mapinvoice-details-data p {
                    width: 80%;
                    font-size: 12px;
                    text-align: left;
                }
                .Mapinvoice-amount-data {
                    border-left: 1.5px solid #000;
                }
                .Mapinvoice-location-details {
                    display: flex;
                    padding: 10px 0px;
                    justify-content: space-between;
                }
                .Mapinvoice-location-details .location-img {
                    width: 90%;
                }
                .Mapinvoice-location-details .location-img img {
                    width: 300px;
                    height: 150px;
                }
                .Mapinvoice-location-details .Mapinvoice-total-details table {
                    border-collapse: collapse;
                    width: 30%;
                }
                .Mapinvoice-location-details .Mapinvoice-total-details table tr {
                    border: 1px solid #000;
                }
                .Mapinvoice-location-details .Mapinvoice-total-details table th,
                td {
                    padding: 10px 5px;
                    font-size: 13px;
                }
                .Mapinvoice-RouteSummary .Mapinvoice-signature .Mapinvoice-signature-title {
                    display: flex;
                    justify-content: center;
                    font-weight: 600;
                }
                .Mapinvoice-RouteSummary .Mapinvoice-signature {
                    position: relative;
                    width: 30%;
                }
                .Mapinvoice-RouteSummary .Mapinvoice-signature img {
                    width: 100px;
                    display: flex;
                    margin: 0px auto;
                }
                .Mapinvoice-RouteSummary {
                    display: flex;
                    align-items: flex-end;
                }
                .Mapinvoice-RouteSummary .Mapinvoice-RouteSummary-container {
                    width: 70%;
                    font-size: 13px;
                }
                .Mapinvoice-RouteSummary .Mapinvoice-RouteSummary-container p {
                    font-weight: 600;
                }
                .Mapinvoice-RouteSummary .Mapinvoice-RouteSummary-container ol {
                    font-size: 12px;
                    font-weight: 500;
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
            <PrintableInvoice tripSheetData={tripSheetData} BalanceValue={BalanceValue} TotalAmountValue={TotalAmountValue} roundOff={roundOff} book={book} selectedCustomerData={selectedCustomerData} selectedCustomerDatas={selectedCustomerDatas} formData={formData} />
            <Button variant="contained" onClick={handlePrint}>Print</Button>
        </div>
    );
};

export default Invoice;

