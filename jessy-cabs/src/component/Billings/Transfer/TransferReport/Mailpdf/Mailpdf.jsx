import React from 'react';
import './Mailpdf.css';
import { Button } from '@material-ui/core';
import ReactDOMServer from 'react-dom/server';
const PrintableInvoice = ({ attachedImage }) => {

  return (
    <div className="invoice-wrapper">
      <article>
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
const Invoice = ({ attachedImage }) => {

  const handlePrint = () => {
    const invoiceContent = ReactDOMServer.renderToString(
      <PrintableInvoice attachedImage={attachedImage} />
    );
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
        <html>
          <head>
          <title>Mail Attached</title>
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
                        
          .invoice-wrapper article:after {
            clear: both;
            content: "";
            display: table;
          }
          
          /* table */
          .main-invoice-container {
            border: 1px solid #000;
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
      <PrintableInvoice attachedImage={attachedImage} />
      <Button variant="contained" onClick={handlePrint}>Print</Button>
    </div>
  );
};

export default Invoice;
