import React from 'react';
import ReactDOMServer from 'react-dom/server';
import numberToWords from 'number-to-words';
import Logo from "../../../../Dashboard/MainDash/Sildebar/Logo-Img/logo.png";

const PrintableInvoice = ({ tripData, totalValue, roundedAmount, sumTotalAndRounded }) => {

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
                            <dl className="dl-horizontal">
                                <dt>Customer</dt>
                                <dd>HCL Technologies</dd>
                                <dd>unit no: 204 & 205,2nd Floor,<br />Embassy Square, #148 Indantry Road</dd>
                                <dt>GSTIN</dt>
                                <dd>29AAACK1544J1zI</dd>
                            </dl>
                        </div>
                    </div>
                    <div className='Mapinvoice-description-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Bill No</th>
                                    <th>Bill Date</th>
                                    <th>Ordered By</th>
                                    <th>Reported To</th>
                                    <th>Amount</th>
                                    <th>CGST</th>
                                    <th>SGST</th>
                                    <th>Bill Amt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(tripData) ? (
                                    tripData.map((trip, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{trip.tripid}</td>
                                            <td>{trip.startdate}</td>
                                            <td>{trip.customer}</td>
                                            <td>{trip.guestname}</td>
                                            <td>{trip.amount}</td>
                                            <td>{trip.netamount}</td>
                                            <td>{trip.netamount}</td>
                                            <td>{trip.netamount}</td>
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
                    <div className="Mapinvoice-amountanddetails">
                        <div className="Mapinvoice-details-data">
                            <p>
                                {isNaN(sumTotalAndRounded) || !isFinite(sumTotalAndRounded)
                                    ? "Invalid amount"
                                    : numberToWords.toWords(sumTotalAndRounded)}
                            </p>
                            {/* <p>Rs: Two Thousand Rupees.</p> */}
                        </div>
                        <div className="Mapinvoice-amount-data">
                            <div className="Mapinvoice-lebel">
                                <dl className="dl-horizontal">
                                    <dt>SUB Total</dt>
                                    <dd>{totalValue}</dd>
                                    <dd>{roundedAmount}</dd>
                                    <dt>Total Amount</dt>
                                    <dd>{sumTotalAndRounded}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
const Coverpdf = ({ tripData, totalValue, sumTotalAndRounded, roundedAmount }) => {

    const invoiceContent = ReactDOMServer.renderToString(
        <PrintableInvoice tripData={tripData} totalValue={totalValue} roundedAmount={roundedAmount} sumTotalAndRounded={sumTotalAndRounded} />
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
    return (
        <div className="invoice-wrapper">
            <PrintableInvoice tripData={tripData} totalValue={totalValue} sumTotalAndRounded={sumTotalAndRounded} roundedAmount={roundedAmount} />
        </div>
    );
};

export default Coverpdf;