import React, { useState, useRef, useEffect } from "react";
import "./modalReturn.css";
import Close from "../../../../assets/img/close.png";
import { ipcRenderer } from "electron";
import moment from "moment";

const ModalReturn = ({
  modalToggle,
  setShow,
  senddatatoinvoice,
  data,
  loadinvoice,
  setdata,
  setloadinvoicen
}) => {
  const [search, setsearch] = useState("");
  const [modalRow, setModalRow] = useState(0);
  const ref = useRef();
  const [check, setCheck] = useState();
  //Selecting Table Index
  const tableSelectModalToggle = (index) => {
    setModalRow(index);
    ref.current?.focus();
  };

  //Nagivating UP and down in table by press up and down arrow keys using table index
  const handleKeyDown = (e, item) => {
    if (e.keyCode === 38) {
      if (modalRow + 1 > 1) {
        tableSelectModalToggle(modalRow - 1);
      }
    } else if (e.keyCode === 40) {
      if (modalRow + 1 < data.length) {
        tableSelectModalToggle(modalRow + 1);
      }
    } else if (e.keyCode === 13) {
      senddatatoinvoice(data[modalRow]);
    }
  };

  //search medicine into database
  const searchdata = (e) => {
    e.preventDefault();
    setsearch(e.target.value);
    if (e.target.value.length > 0) {
      ipcRenderer.send("search", e.target.value);
    } else {
      setdata([]);
    }
  };

  //Control data from database
  ipcRenderer.on("search", (event, arg) => {
    setdata(arg);
  });

  const closeModalIfClickedOutside = (e) => {
    if (e.target.className === "modal_cover") {
      setShow(false);
    }
  };
  useEffect(() => {
    ref.current?.focus();
  }, []);

  const options = [
    { label: "General", label1: "2/12/2022", value: 1 },
    { label: "General", label1: "2/12/2022", value: 2 },
    { label: "General", label1: "2/12/2022", value: 3 },
    { label: "General", label1: "2/12/2022", value: 4 },
    { label: "General", label1: "2/12/2022", value: 5 },
    { label: "General", label1: "2/12/2022", value: 6 },
    { label: "General", label1: "2/12/2022", value: 7 },
    { label: "General", label1: "2/12/2022", value: 8 },
    { label: "General", label1: "2/12/2022", value: 9 },
    { label: "General", label1: "2/12/2022", value: 10 },
    { label: "General", label1: "2/12/2022", value: 11 },
    { label: "General", label1: "2/12/2022", value: 12 },
  ];

  const onChangeAttribute = (value) => {
    setloadinvoicen(value);
    setCheck(value);
  
  };


  return (
    <div className="modal_cover" onClick={closeModalIfClickedOutside}>
      <div className="modal modal-return">
        <div className="return_modal_body">
          <div className="modal_header">
            <h2>Select Invoice</h2>
            <img
              src={Close}
              onClick={modalToggle}
              style={{
                width: "1.25rem",
                height: "1.25rem",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="table-scroll scroll-height">
            <div className="checkbox-modal">
              {(loadinvoice.length >0) ? loadinvoice.map((item) => (
                <label for={item.InvNo}>
                  <input
                    type="checkbox"
                    id={item.InvNo}
                    name={item.InvNo}
                    value={item.InvNo}
                    checked={check === item.InvNo}
                    className="return_modal_input"
                    onChange={(e) => onChangeAttribute(item.InvNo)}
                  />
                  {item.InvNo}
                  <span className="space">{item.Name}</span>{" "}
                  <span className="space">{moment(item.Dat).format('YYYY MM DD')}</span>
                </label>
              )):""}
            </div>
          </div>
          <div className="return_modal_buttons">
            <button className="return_button" onClick={()=>{  setShow(false)}}>OK</button>
            <button className="return_button" onClick={modalToggle}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalReturn;
