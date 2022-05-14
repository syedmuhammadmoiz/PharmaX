import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Table from "./TableEdit/Table";
import purchase_png from "../../../../../assets/img/purchase.png";
import SideNavBar from "../../../Common/SideNavBar/SideNavBar";
import TopNavBar from "../../../Common/TopNavBar/TopNavBar";
import { Link, NavLink } from "react-router-dom";
import "./stockPurchase.css";
import { ipcRenderer } from "electron";
import { useNavigate } from "react-router-dom";

const StockPurchase = () => {
  const [customer, setCustomer] = useState("");
  const [invoice, setInvoice] = useState("");
  const [netTotal, setNetTotal] = useState(0.0);
  const [tableSelect, setTableSelect] = useState();
  const [sideBar, setSideBar] = useState(true);
  const [disables, setDisables] = useState(false);
  const [builtyno, setbuiltyno] = useState(0);
  const [transport, settransport] = useState("");
  const [saveinvoice, setsaveinvoice] = useState({
    invNo: "",
    invoiceEdit: [],
    newInvoice: [],
    totalMedicine: 0,
    RandomNo: "",
  });

  const [notdelete, setnotelete] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear();

  const clickToUnSelectTableRow = (e) => {
    if (e.target.element !== "select_table") {
      setTableSelect(null);
    }
  };

  const clearinvoice = useRef();
  const clearcurrent = useRef();

  ipcRenderer.on("searchstockno", (event, arg) => {
    setCustomer({
      Name: arg[0].Supplier_Name,
      Address: arg[0].Address,
      SID: arg[0].SID,
    });
    setbuiltyno(arg[0].Builty);
    settransport(arg[0].Transport);
  });

  const randomString = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < 20; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  ipcRenderer.on("cardno", (event, arg) => {
    setInvoice(arg[0].CRD + 1);
    setsaveinvoice((saveinvoice) => ({
      ...saveinvoice,
      invNo: arg[0].CRD + 1,
      RandomNo: randomString(),
    }));
  });
  ipcRenderer.on("getsupplier", (event, arg) => {
    if (arg.length > 0) {
      setCustomer(arg[0]);
    }
  });

  const customerdropdown = (e) => {
    setCustomer(e.target.value);
    ipcRenderer.send("selectsupplier", e.target.value);
  };
  //save to database
  const savetodatabase = (e) => {
    e.preventDefault();
    if (
      saveinvoice.invoiceEdit.length > 0 ||
      saveinvoice.newInvoice.length > 0
    ) {
      if (customer.length === 0) {
        ipcRenderer.send("error", "Please select Supplier");
      } else if (saveinvoice.length === 0) {
        ipcRenderer.send("error", "Please select the Medicine");
      } else if (builtyno == 0) {
        ipcRenderer.send("error", "Please Enter the Builty No");
      } else if (transport.length <= 0) {
        ipcRenderer.send("error", "Please Enter the Transport");
      } else {
        const builtyn = builtyno.toString();
        let data = {
          builtyno: builtyn,
          customer,
          transport,
          CRD: parseInt(saveinvoice.invNo),
          invoiceEdit: saveinvoice.invoiceEdit,
          newInvoice: saveinvoice.newInvoice,
          RandomNo: saveinvoice.RandomNo,
        };
        ipcRenderer.send("stockintodatabase", data);
        setDisables(true);
      }
    } else {
      ipcRenderer.send("error", "Please Enter the Medicine into the Table");
    }
  };

  ipcRenderer.on("setfalse", (event) => {
    setDisables(false);
  });
  function callfunction() {}

  const sideBarToggle = () => setSideBar(!sideBar);
  useEffect(() => {
    if (id !== undefined && id !== null && id !== "" && id !== "0") {
      ipcRenderer.send("searchstockno", id);
      setsaveinvoice((saveinvoice) => ({
        ...saveinvoice,
        invNo: id,
      }));
      setInvoice(id);
      setnotelete(true);
    } else {
      ipcRenderer.send("cardno");
    }
  }, []);

  return (
    <>
      <TopNavBar />
      <div className="back_cover">
        <SideNavBar sideBar={sideBar} sideBarToggle={sideBarToggle} />
        <div className="cover_margin">
          <div onClick={clickToUnSelectTableRow}>
            <div className="Invoice">
              <img src={purchase_png} alt="invoice" className="office_img" />
              <div className="Invoice-heading">Stock Purchase</div>
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
                  <label> Supplier: </label>
                  <label> Address: </label>
                  <label className="last_lable"> Transport:</label>
                </div>
                <div className="form_col">
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => {
                      customerdropdown(e);
                    }}
                    value={customer.Name}
                    style={{ textAlign: "center" }}
                  />
                  <input
                    type="text"
                    name="name"
                    value={customer.Address}
                    style={{ textAlign: "center" }}
                    onChange={(e) => setCustomer(e.target.value)}
                  />
                  <input
                    className="lastinput"
                    type="text"
                    name="name"
                    value={transport}
                    onChange={(e) => {
                      settransport(e.target.value);
                    }}
                    style={{ textAlign: "center" }}
                  />
                </div>
              </div>
              <div className="flex_basis flex_end">
                <div className="form_col lable_col">
                  <label>Builty No:</label>
                  <label>Date:</label>
                  <label className="last_lable">Card number:</label>
                </div>
                <div className="form_col">
                  <input
                    type="text"
                    name="name"
                    value={builtyno}
                    style={{ textAlign: "center" }}
                    onChange={(e) => setbuiltyno(e.target.value)}
                  />
                  <input
                    disabled
                    type="text"
                    name="name"
                    value={datetime}
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
            saveinvoice={saveinvoice}
            Invoice={invoice}
          />
          <div onClick={clickToUnSelectTableRow}>
            <hr className="dotted" />
            <div className="table_buttons">
              <div className="buttons">
                <button
                  disabled={disables}
                  className="button_main"
                  onClick={(e) => {
                    savetodatabase(e);
                  }}
                >
                  Save
                </button>
                <button
                  className="button_main"
                  onClick={(e) => {
                    console.log("here");
                    navigate(0);
                  }}
                >
                  Edit
                </button>
                <button
                  className="button_border "
                  onClick={(e) => {
                    clearinvoice.current();
                  }}
                >
                  Clear
                </button>
                <button
                  disabled={notdelete}
                  className="button_border"
                  onClick={(e) => {
                    clearcurrent.current();
                  }}
                >
                  Delete
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
                    {parseFloat(netTotal.toFixed(2))}
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

export default StockPurchase;
