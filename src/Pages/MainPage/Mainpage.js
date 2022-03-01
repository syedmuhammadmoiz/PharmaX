import React from "react";
import { Link } from "react-router-dom";
import invoice_png from "../../../assets/img/invoice.png";
import bill_png from "../../../assets/img/bill.png";
import purchase_png from "../../../assets/img/purchase.png";
import commission_png from "../../../assets/img/commission.png";
import return_png from "../../../assets/img/return.png";
import trade_png from "../../../assets/img/trade.png";
import purre_png from "../../../assets/img/purre.png";
import purrev_png from "../../../assets/img/purrev.png";
import analytics_png from "../../../assets/img/analytics.png";
import report_png from "../../../assets/img/report.png";
import add_png from "../../../assets/img/add.png";
import distribution_png from "../../../assets/img/distribution.png";
import bank_png from "../../../assets/img/bank.png";
import expenses_png from "../../../assets/img/expenses.png";
import customer_png from "../../../assets/img/customer.png";
import packages_png from "../../../assets/img/packages.png";
import id_card_png from "../../../assets/img/id-card.png";
import sale_time_png from "../../../assets/img/sale-time.png";
import transaction_png from "../../../assets/img/transaction.png";
import balance_sheet_png from "../../../assets/img/balance-sheet.png";
import "./MainPage.css";

const Mainpage = () => {
  return (
    <div className="container">
      <div className="align">
        <div className="left">
          <div className="para">Main Section</div>
          <div className="cover">
            <div className="card">
              <img src={invoice_png} alt="invoice" />
              <Link to="/Invoice">
                <p>Invoice</p>
              </Link>
            </div>
            <div className="card">
              <img src={bill_png} alt="invoice" />
              <Link to="/InvoiceView">
                <p>Invoice View</p>
              </Link>
            </div>
            <div className="card">
              <img src={purchase_png} alt="invoice" />
              <Link to="/StockPurchase">
                <p>Stock Purchase</p>
              </Link>
            </div>
            <div className="card">
              <img src={commission_png} alt="invoice" />
              <Link to="/StockPurchaseView">
                <p>Purchase View</p>
              </Link>
            </div>
            <div className="card">
              <img src={return_png} alt="invoice" />
              <Link to="/InvoiceReturn">
                <p>Invoice Return</p>
              </Link>
            </div>
            <div className="card">
              <img src={trade_png} alt="invoice" />
              <Link to="/InvoiceReturnView">
                <p>Inv. Return View</p>
              </Link>
            </div>
            <div className="card">
              <img src={purre_png} alt="invoice" />
              <Link to="/StockPurchaseReturn">
                <p>Purchase Return</p>
              </Link>
            </div>
            <div className="card">
              <img src={purrev_png} alt="invoice" />
              <Link to="/StockPurchaseReturnView">
                <p>Pur. Return View</p>
              </Link>
            </div>
            <div className="card">
              <img src={analytics_png} alt="invoice" />
              <p>Stock Cards</p>
            </div>
            <div className="card">
              <img src={report_png} alt="invoice" />
              <p>Reports</p>
            </div>
          </div>
        </div>
        <div className="seperator" />
        <div className="right">
          <div className="para">Detailed Section</div>
          <div className="cover">
            <div className="card">
              <img src={add_png} alt="invoice" />
              <p>Adding</p>
            </div>
            <div className="card">
              <img src={distribution_png} alt="invoice" />
              <p>Distribution</p>
            </div>
            <div className="card">
              <img src={bank_png} alt="invoice" />
              <p>Banking</p>
            </div>
            <div className="card">
              <img src={expenses_png} alt="invoice" />
              <p>Expenses</p>
            </div>
            <div className="card">
              <img src={customer_png} alt="invoice" />
              <p>Customer Account</p>
            </div>
            <div className="card">
              <img src={packages_png} alt="invoice" />
              <p>Supplier Account</p>
            </div>
            <div className="card">
              <img src={id_card_png} alt="invoice" />
              <p>Staff</p>
            </div>
            <div className="card">
              <img src={sale_time_png} alt="invoice" />
              <p>Daily Sale</p>
            </div>
            <div className="card">
              <img src={transaction_png} alt="invoice" />
              <p>Cash Transcation</p>
            </div>
            <div className="card">
              <img src={balance_sheet_png} alt="invoice" />
              <p>Balance Sheet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;