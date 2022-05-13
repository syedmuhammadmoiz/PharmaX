import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Table from "./TableEdit/Table";
import purre_png from "../../../../../assets/img/purre.png";
import SideNavBar from "../../../Common/SideNavBar/SideNavBar";
import TopNavBar from "../../../Common/TopNavBar/TopNavBar";
import { Link, NavLink } from "react-router-dom";
import "./stockPurchaseReturn.css";
import { ipcRenderer } from "electron";
import { useNavigate } from "react-router-dom";

const StockPurchaseReturn = () => {
  const [customer, setCustomer] = useState("");
  const [invoice, setInvoice] = useState("")
  const [netTotal, setNetTotal] = useState(0.0);
  const [tableSelect, setTableSelect] = useState();
  const [sideBar, setSideBar] = useState(true);
  const [disables, setDisables] = useState(false);
  const [returntype, setReturntype] = useState({})
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

   ipcRenderer.on("prno", (event, arg) => {
    setInvoice(arg[0].CRD + 1);
    setsaveinvoice((saveinvoice) => ({
      ...saveinvoice,
      invNo: arg[0].CRD + 1,
      RandomNo: randomString(),
    }));
  });

  ipcRenderer.on("typereturn", (event, arg) => {
    setReturntype(arg[0])
  });
  const randomString = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < 20; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };


  const customerdropdown = (e) => {
    setCustomer(e.target.value);
    ipcRenderer.send("selectsupplier", e.target.value);
  };
  //save to database
  const savetodatabase = (e) => {
    e.preventDefault();
    if (customer.length === 0) {
      ipcRenderer.send("error", "Please select Supplier");
    } else if (saveinvoice.length === 0) {
      ipcRenderer.send("error", "Please select the Medicine");
    } else {
      let data = {
        card: saveinvoice.invNo,
        SID:customer.SID, 
        type: returntype.TypID,
        invoiceEdit: saveinvoice.invoiceEdit,
        newInvoice: saveinvoice.newInvoice,
        RandomNo: saveinvoice.RandomNo,
      };
      ipcRenderer.send("purchasereturndata", data);
      setDisables(true);
    }
  };
   ipcRenderer.on( "searchcrdno", (event, arg) => {
    setCustomer({
      Name:arg[0].SuppName,
      Address:arg[0].Address,
      SID:arg[0].SID,
    })
  })

  ipcRenderer.on("setfalse", (event) => {
    setDisables(false);
  });
  ipcRenderer.on("getsupplier", (event, arg) => {
    if (arg.length > 0) {
      setCustomer(arg[0]);
    }
  });
  function callfunction() {}

  const sideBarToggle = () => setSideBar(!sideBar);
  useEffect(() => {
    ipcRenderer.send("typereturn")
  
    if (id !== undefined && id !== null && id !== "" && id !== "0") {
      ipcRenderer.send("searchcrdno", id);
      setsaveinvoice((saveinvoice) => ({
        ...saveinvoice,
        invNo: id,
      }));
      setInvoice(id);
      setnotelete(true);
    } else {
       ipcRenderer.send("prno");
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
              <img src={purre_png} alt="invoice" className="office_img" />
              <div className="Invoice-heading">Purchase Return</div>
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
                  <label> Supplier ID: </label>
                  <label> Supp. Name: </label>
                  <label className="last_lable"> Address: </label>
                </div>
                <div className="form_col">
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => {
                      customerdropdown(e);
                    }}
                    value={customer.SID}
                    style={{ textAlign: "center" }}
                  />
                  <input
                    type="text"
                    name="name"
                    value={customer.Name}
                    style={{ textAlign: "center" }}
                    onChange={(e) => setCustomer(e.target.value)}
                  />

                  <input
                    className="lastinput"
                    type="text"
                    name="name"
                    value={customer.Address}
                    style={{ textAlign: "center" }}
                  />
                </div>
              </div>
              <div className="flex_basis flex_end">
                <div className="form_col lable_col">
                  <label>Type:</label>
                  <label>Date:</label>
                  <label className="last_lable">Card number:</label>
                </div>
                <div className="form_col">
                  <input
                    type="text"
                    name="name"
                    value={returntype.TypeName}
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

export default StockPurchaseReturn;
