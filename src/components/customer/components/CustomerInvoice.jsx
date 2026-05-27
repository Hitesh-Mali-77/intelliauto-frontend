import React, { useEffect, useState } from "react";
import { _getInvoicesByCustomerEmail } from "../../../services/orderService";
import ReceiptIcon from "@mui/icons-material/Receipt";

const CustomerInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    _getInvoicesByCustomerEmail(currentUser.emailId).then((result) => {
      setInvoices(result.data);
    });
  }, []);

  const printInvoice = (invoice) => {
    const invoiceWindow = window.open("", "_blank");
    invoiceWindow.document.write(`
            <html>
            <head>
                <title>Invoice #${invoice.id}</title>
                <style>
                    body { font-family: Arial; padding: 30px; }
                    h2 { color: #1976d2; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                    th { background: #1976d2; color: white; }
                    .total { font-size: 18px; font-weight: bold; color: #1976d2; }
                    .footer { margin-top: 40px; text-align: center; color: gray; }
                </style>
            </head>
            <body>
                <h2>🚗 Automobiles — Invoice</h2>
                <hr/>
                <p><b>Invoice No:</b> #${invoice.id}</p>
                <p><b>Date:</b> ${new Date(invoice.createdAt).toLocaleDateString()}</p>
                <p><b>Customer Email:</b> ${invoice.customerEmail}</p>
                <hr/>
                <table>
                    <thead>
                        <tr>
                            <th>Accessory Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${invoice.accessoryName}</td>
                            <td>${invoice.quantity}</td>
                            <td>₹${invoice.price}</td>
                            <td>₹${invoice.totalAmount}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <p class="total">Total Amount: ₹${invoice.totalAmount}</p>
                <div class="footer">
                    <p>Thank you for your purchase! 🙏</p>
                </div>
            </body>
            </html>
        `);
    invoiceWindow.document.close();
    invoiceWindow.print();
  };

  return (
    <div className="container mt-4">
      <h4>My Invoices</h4>
      <hr />
      {invoices.length === 0 ? (
        <p style={{ color: "gray" }}>No invoice yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              {/* <th>Invoice No</th> */}
              <th>Accessory</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Amount</th>
              <th>Date</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                {/* <td>#{invoice.id}</td> */}
                <td>{invoice.accessoryName}</td>
                <td>{invoice.quantity}</td>
                <td>₹{invoice.price}</td>
                <td>₹{invoice.totalAmount}</td>
                <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => printInvoice(invoice)}
                  >
                    <ReceiptIcon fontSize="small" /> Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerInvoice;
