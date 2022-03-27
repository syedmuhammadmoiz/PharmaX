import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Invoice/Modal/Modal";
import Table from "../Invoice/Table/Table";
import bill_png from "../../../../../assets/img/bill.png";
import SideNavBar from "../../../Common/SideNavBar/SideNavBar";
import TopNavBar from "../../../Common/TopNavBar/TopNavBar";
import "./invoiceView.css";
const InvoiceView = () => {
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
  const [tableSelect, setTableSelect] = useState();
  const [sideBar, setSideBar] = useState(true);

  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear();
  const modalToggle = () => setModal(!modal);

  const clickToUnSelectTableRow = (e) => {
    if (e.target.element !== "select_table") {
      setTableSelect(null);
    }
  };

  const sideBarToggle = () => setSideBar(!sideBar);

  return (
    <>
      <TopNavBar />
      <div className="back_cover">
        <SideNavBar sideBar={sideBar} sideBarToggle={sideBarToggle} />
        <div className="cover_margin">
          {/* <div className="back">
            <Link to="/">Back</Link>
          </div> */}
          <div onClick={clickToUnSelectTableRow}>
            <div className="Invoice">
              <img src={bill_png} alt="invoice" className="office_img" />
              <div className="Invoice-heading">Invoice View</div>
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
                </div>
              </div>
              <div className="flex_basis flex_end">
                <div className="form_col lable_col">
                  <label> Invoice number: </label>
                  <label> PO number: </label>

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
                </div>
              </div>
            </form>

            <hr className="dotted" />
          </div>
          {modal ? (
            <Modal modalToggle={modalToggle} setModal={setModal} />
          ) : null}
          <Table
            modalToggle={modalToggle}
            tableSelect={tableSelect}
            setTableSelect={setTableSelect}
            clickToUnSelectTableRow={clickToUnSelectTableRow}
          />
          <div onClick={clickToUnSelectTableRow}>
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
                  <div className="final_total">Total</div>
                </div>
                <div className="col">
                  <div className="final_total">0.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceView;
