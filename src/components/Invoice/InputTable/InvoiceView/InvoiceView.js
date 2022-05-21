import React, { useState, useEffect } from "react";
import TableView from "../../../Common/TableView/TableView";
import bill_png from "../../../../../assets/img/bill.png";
import SideNavBar from "../../../Common/SideNavBar/SideNavBar";
import TopNavBar from "../../../Common/TopNavBar/TopNavBar";
import { Link } from "react-router-dom";
import "./invoiceView.css";
import { ipcRenderer } from "electron";
import { useNavigate } from "react-router-dom";

const InvoiceView = () => {
  const [customers, setcustomers] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tableSelect, setTableSelect] = useState();
  const [sideBar, setSideBar] = useState(true);
  const [invoiceno, setinvoiceno] = useState("");
  const [invoicev, setinvoicev] = useState([]);
  const [total, settotal] = useState(0.0);
  const nevigate = useNavigate();
  const clickToUnSelectTableRow = (e) => {
    if (e.target.element !== "select_table") {
      setTableSelect(null);
    }
  };
  ipcRenderer.on("searchinvno", (event, arg) => {
    if (arg.length > 0) {
      console.log(arg);
      setcustomers({
        SName: arg[0].SName,
        CName: arg[0].CName,
        CID: arg[0].CID,
        Address: arg[0].Address,
        Contact: arg[0].Contact,
        SMID: arg[0].SMID,
        Balance: arg[0].Balance,
      });
      setinvoicev(arg);
      let InvDate = new Date(arg[0].Dat);
      setDate(InvDate.toLocaleDateString());
      setTime(arg[0].InvTime);
      settotal(arg.reduce((total, item) => total + item.STP * item.Qty, 0));
    } else {
    }
  });

  const invoicekeydown = (e) => {
    if (e.key === "Enter") {
      if (invoiceno.length === 0) {
        ipcRenderer.send("error", "Please Enter the Invoice No");
      } else {
        ipcRenderer.send("loadinvoicebyno", invoiceno);
      }
    }
  };
  //clear current data from table
  const cleardata = () => {
    setcustomers({
      SName: "",
      CName: "",
      CID: "",
      Address: "",
      Contact: "",
      SMID: "",
      Balance: "",
    });
    setinvoicev([]);
    setinvoiceno("");
    setDate("");
    setTime("");
  };
  //save to database
  const savetodatabase = (e) => {
    e.preventDefault();
    if (invoicev.length == 0) {
      console.log("here");
      ipcRenderer.send("error", "Please select the Invoice to Edit");
    } else {
      nevigate(`/invoice/${invoiceno}`);
    }
  };
  function callfunction() {}
  const sideBarToggle = () => setSideBar(!sideBar);

  useEffect(() => {
    console.log(customers);
  }, [customers]);

  return (
    <>
      <TopNavBar />
      <div className="back_cover">
        <SideNavBar sideBar={sideBar} sideBarToggle={sideBarToggle} />
        <div className="cover_margin">
          <div onClick={clickToUnSelectTableRow}>
            <div className="Invoice">
              <img src={bill_png} alt="invoice" className="office_img" />
              <div className="Invoice-heading">View Invoice</div>
              <div className="buttons_Invoice">
               
                <div className="vertical margin_side"></div>
               
              </div>
            </div>
            <hr />
            <form className="form_row">
              <div className="flex_basis">
                <div className="form_col lable_col">
                  <label> Customer: </label>
                  <label> Address: </label>
                  <label> Contact: </label>
                  <label className="last_lable"> Salesman:</label>
                </div>
                <div className="form_col">
                  <div className="input-flex">
                    <input
                      type="text"
                      className="Id-input"
                      value={customers.CID}
                      style={{ textAlign: "center" }}
                    />
                    <input
                      className="cus-input imp"
                      type="text"
                      name="name"
                      value={customers.CName}
                      style={{ textAlign: "center" }}
                    />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={customers.Address}
                    style={{ textAlign: "center" }}
                  />
                  <input
                    type="text"
                    name="name"
                    value={customers.Contact}
                    style={{ textAlign: "center" }}
                  />
                  <div className="input-flex">
                    <input
                      type="text"
                      className="Id-input"
                      value={customers.SMID}
                      style={{ textAlign: "center" }}
                    />
                    <input
                      className="lastinput cus-input"
                      type="text"
                      name="name"
                      value={customers.SName}
                      style={{ textAlign: "center" }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex_basis flex_end">
                <div className="form_col lable_col">
                  <label>Prev Bal:</label>
                  <label>Date:</label>
                  <label>Time:</label>
                  <label className="last_lable">Invoice number:</label>
                </div>
                <div className="form_col">
                  <input
                    type="text"
                    name="name"
                    value={customers.Balance}
                    style={{ textAlign: "center" }}
                  />
                  <input
                    disabled
                    type="text"
                    name="name"
                    value={date}
                    readOnly
                    style={{ textAlign: "center" }}
                  />
                  <input
                    disabled
                    type="text"
                    name="name"
                    readOnly
                    value={time}
                    style={{ textAlign: "center" }}
                  />
                  <input
                    className="lastinput"
                    type="text"
                    name="name"
                    value={invoiceno}
                    onChange={(e) => setinvoiceno(e.target.value)}
                    onKeyDown={(e) => {
                      invoicekeydown(e);
                    }}
                    style={{ textAlign: "center" }}
                  />
                </div>
              </div>
            </form>
            <hr className="dotted" />
          </div>
          <TableView
            callfunction={callfunction}
            tableSelect={tableSelect}
            setTableSelect={setTableSelect}
            clickToUnSelectTableRow={clickToUnSelectTableRow}
            invoicev={invoicev}
          />
          <div onClick={clickToUnSelectTableRow}>
            <hr className="dotted" />
            <div className="table_buttons">
              <div className="buttons_view">
                <button
                  className="button_main"
                  onClick={(e) => {
                    savetodatabase(e);
                  }}
                >
                  Edit
                </button>

                <button
                  className="button_border "
                  onClick={(e) => {
                    cleardata(e);
                  }}
                >
                  Clear
                </button>
                <Link to="/">
                  <button className="button_border">Exit</button>
                </Link>
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
                  <div className="final_total">
                    {parseFloat(total.toFixed(2))}
                  </div>
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
