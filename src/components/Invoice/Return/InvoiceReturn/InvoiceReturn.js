import React, { useState, useEffect, useRef, useMemo } from "react";
import Table from "../../../Common/TableEdit/Table";
import return_png from "../../../../../assets/img/return.png";
import SideNavBar from "../../../Common/SideNavBar/SideNavBar";
import TopNavBar from "../../../Common/TopNavBar/TopNavBar";
import ModalLoad from "../.././../Common/ModalLoad/ModalReturn";
import { Link, NavLink } from "react-router-dom";
import "./invoiceReturn.css";
import { ipcRenderer } from "electron";
const InvoiceReturn = () => {
  const [customers, setcustomers] = useState({});
  const [customer, setCustomer] = useState("");
  const [salesman, setSalesman] = useState({});
  const [date, setDate] = useState("");
  const [invoice, setInvoice] = useState("");
  const [time, setTime] = useState("");
  const [netTotal, setNetTotal] = useState(0.0);
  const [tableSelect, setTableSelect] = useState();
  const [sideBar, setSideBar] = useState(true);
  const [dis, setdis] = useState(true);
  const [saveinvoice, setsaveinvoice] = useState({
    invNo: "",
    invoiceEdit: [],
    newInvoice: [],
    totalMedicine: 0,
    RandomNo: "",
  });
  const [loadinvoice, setloadinvoice] = useState({});
  const [loadinvoicen, setloadinvoicen] = useState(0);

  const [show, setShow] = useState(false); //show model

  const modalToggle = () => setShow(!show);
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear();

  useMemo(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);
  const clickToUnSelectTableRow = (e) => {
    if (e.target.element !== "select_table") {
      setTableSelect(null);
    }
  };
  ipcRenderer.on("loadinvoice", (event, data) => {
    console.log(data);
    setloadinvoice(data);
  });
  const getinvoices = () => {
    setShow(!show);
    setloadinvoice({});
    setloadinvoicen(0);
    ipcRenderer.send("loadinvoice");
  };
  const clearinvoice = useRef();
  const clearcurrent = useRef();
  ipcRenderer.on("searchinvno", (event, arg) => {
    if (arg.length > 0) {
      console.log(arg);
      setSalesman({
        SMID: arg[0].SMID,
      });
      setcustomers({
        SName: arg[0].SName,
        CName: arg[0].CName,
        CID: arg[0].CID,
        Address: arg[0].Address,
        Contact: arg[0].Contact,
        SMID: arg[0].SMID,
        Balance: arg[0].Balance,
      });
    }
  });

  ipcRenderer.on("searchinvno", (event, arg) => {
    setCustomer({
      CID: arg.CID,
      CName: arg.CName,
      Address: arg.Address,
      Contact: arg.Contact,
      SMID: arg.SMID,
      SName: arg.SName,
      Balance: arg.Balance,
    });
  });

  ipcRenderer.on("invno", (event, arg) => {
    setInvoice(arg[0].InvNo + 1);
  });

  //save to database
  const savetodatabase = (e) => {
    e.preventDefault();
    if (customer.length === 0) {
      ipcRenderer.send("error", "Please select customer");
    } else if (saveinvoice.length === 0) {
      ipcRenderer.send("error", "Please select the Medicine");
    }
  };

  function callfunction() {}

  const sideBarToggle = () => setSideBar(!sideBar);
  useEffect(() => {
    if (show == false && loadinvoicen != 0) {
      ipcRenderer.send("loadinvoicebyno", loadinvoicen);
    }
  }, [show]);

  return (
    <>
      <TopNavBar />
      {show ? (
        <ModalLoad
          modalToggle={modalToggle}
          loadinvoice={loadinvoice}
          setloadinvoicen={setloadinvoicen}
          setShow={setShow}
        />
      ) : null}
      <div className="back_cover">
        <SideNavBar sideBar={sideBar} sideBarToggle={sideBarToggle} />
        <div className="cover_margin">
          <div onClick={clickToUnSelectTableRow}>
            <div className="Invoice">
              <img src={return_png} alt="invoice" className="office_img" />
              <div className="Invoice-heading">Invoice Return</div>
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
                      style={{ textAlign: "center" }}
                      value={salesman.SMID || customers.SMID}
                    />
                    <input
                      className="lastinput cus-input"
                      type="text"
                      name="name"
                      value={customers.SName || salesman.Name}
                      style={{ textAlign: "center" }}
                      onChange={(e) => setDate(e.target.value)}
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
                    value={datetime}
                    style={{ textAlign: "center" }}
                  />
                  <input
                    disabled
                    type="text"
                    name="name"
                    value={time}
                    style={{ textAlign: "center" }}
                  />
                  <input
                    className="lastinput"
                    disabled
                    type="text"
                    name="name"
                    value={invoice}
                    style={{ textAlign: "center" }}
                  />
                </div>
              </div>
            </form>
            <hr className="dotted" />
          </div>
          <Table
            clearinvoice={clearinvoice}
            clearcurrent={clearcurrent}
            callfunction={callfunction}
            tableSelect={tableSelect}
            setTableSelect={setTableSelect}
            setNetTotal={setNetTotal}
            clickToUnSelectTableRow={clickToUnSelectTableRow}
            setsaveinvoice={setsaveinvoice}
            dis={dis}
          />
          <div onClick={clickToUnSelectTableRow}>
            <hr className="dotted" />
            <div className="table_buttons">
              <div className="buttons">
                <button
                  className="button_main"
                  onClick={(e) => {
                    savetodatabase(e);
                  }}
                >
                  Save
                </button>
                <button
                  className="button_border "
                  onClick={(e) => {
                    clearinvoice.current();
                  }}
                >
                  Clear
                </button>
                <button className="button_border" onClick={() => getinvoices()}>
                  Load Inv.
                </button>
                <Link to="/">
                  <button className="button_border">Exit</button>
                </Link>
              </div>
              <div className="total">
                <div className="col">
                  <div className="final_total">Total</div>
                  <div className="amount">Amount:</div>
                </div>
                <div className="col">
                  <div className="final_total">
                    {parseFloat(netTotal.toFixed(2))}
                  </div>
                  <div>
                    <input
                      type="text"
                      className="bal_input"
                      style={{ textAlign: "center" }}
                    />
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

export default InvoiceReturn;
