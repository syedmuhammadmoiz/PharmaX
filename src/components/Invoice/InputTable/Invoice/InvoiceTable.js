import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal";
import Table from "./Table/Table";
import SideNavBar from "../../../Common/SideNavBar/SideNavBar";
import TopNavBar from "../../../Common/TopNavBar/TopNavBar";
import "./InvoiceTable.css";

const InvoiceTable = () => {
  const [address, setAddress] = useState("");
  const [customer, setCustomer] = useState("");
  const [salesman, setSalesman] = useState("");
  const [date, setDate] = useState("");
  const [invoice, setInvoice] = useState("");
  const [time, setTime] = useState("");
  const [payment, setPayment] = useState("");
  const [noteNumber, setNoteNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [modal, setModal] = useState(false);

  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear();
  const modalToggle = () => setModal(!modal);

  return (
    <>
      <TopNavBar />
      <div className="back_cover">
        <SideNavBar />
        <div className="cover_margin">
          {/* <div className="back">
          <Link to="/">Back</Link>
        </div> */}
          <div className="Invoice">
            <div className="Invoice-heading">Create New Invoice</div>
            <div className="buttons_Invoice">
              <button className="button_border">Print</button>
              <div className="vertical margin_side"></div>
              <button className=" button_border margin_side">Download</button>
            </div>
          </div>

          <hr />

          <form className="form_row">
            <div className="flex_basis">
              <div className="form_col lable_col">
                <label> Bill from: </label>
                <label> Bill to: </label>
                <label> Invoice date: </label>
                <label> Payment due date: </label>
                <label className="last_lable"> Bill from: </label>
              </div>

              <div className="form_col">
                <input
                  type="text"
                  name="name"
                  value={salesman}
                  onChange={(e) => setSalesman(e.target.value)}
                />

                <input
                  type="text"
                  name="name"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                />

                <input
                  disabled
                  type="text"
                  name="name"
                  value={datetime}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ textAlign: "center" }}
                />

                <input
                  type="text"
                  name="name"
                  value={invoice}
                  onChange={(e) => setInvoice(e.target.value)}
                />

                <input
                  className="lastinput"
                  type="text"
                  name="name"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex_basis flex_end">
              <div className="form_col lable_col">
                <label> Invoice number: </label>
                <label> PO number: </label>
                <label> Currency: </label>
                <label> Delivery note number: </label>
                <label className="last_lable"> Delivery note number: </label>
              </div>

              <div className="form_col">
                <input
                  type="text"
                  name="name"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />

                <input
                  type="text"
                  name="name"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                />

                <input
                  type="text"
                  name="name"
                  value={noteNumber}
                  onChange={(e) => setNoteNumber(e.target.value)}
                />

                <input
                  type="text"
                  name="name"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                />

                <input
                  className="lastinput"
                  type="text"
                  name="name"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                />
              </div>
            </div>
          </form>

          <hr className="dotted" />
          {modal ? (
            <Modal modalToggle={modalToggle} setModal={setModal} />
          ) : null}
          <Table modalToggle={modalToggle} />
          <hr className="dotted" />
          <div className="table_buttons">
            <div className="buttons">
              <button className="button_main">Save</button>
              <button className="button_border ">Clear</button>
              <button className="button_border">Edit</button>
              <button className="button_border">Exit</button>
            </div>

            <div className="total">
              <div className="col">
                <div> Net total</div>
                <div> Disc</div>
                <div className="final_total">Total</div>
              </div>
              <div className="col">
                <div> 0.00</div>
                <div> 0.00</div>
                <div className="final_total">0.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceTable;
