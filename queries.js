const { dialog } = require("electron");
const sql = require("mssql");
const sqlConfig = {
  user: "sa",
  password: "1234567890",
  database: "Versale",
  server: "localhost",
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

// Search medicine in database

global.share.ipcMain.on("search", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig);
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(
          `select * from Stock where Name like '${arg}%' or Code like '${arg}'`
        )
        .then(function (recordset) {
          global.share.mainWindow.webContents.send(
            "search",
            recordset.recordset
          );
          conn.close();
        })
        .catch(function (err) {
          console.log(err);
          conn.close();
        });
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});

//Get salesman info

global.share.ipcMain.on("salesman", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig);
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(`select * from Salesman where Salesman.Name = 'General'`)
        .then(function (recordset) {
          global.share.mainWindow.webContents.send(
            "salesman",
            recordset.recordset
          );
          conn.close();
        })
        .catch(function (err) {
          console.log(err);
          conn.close();
        });
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});

//Get invoice no.

global.share.ipcMain.on("invno", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig);
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(`select MAX(InvNo) as InvNo from InvM`)
        .then(function (recordset) {
          global.share.mainWindow.webContents.send(
            "invno",
            recordset.recordset
          );
          conn.close();
        })
        .catch(function (err) {
          console.log(err);
          conn.close();
        });
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});

// Customer records
global.share.ipcMain.on("customer", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig);
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(
          `select Name,Address,Contact from Customer where Name like '${arg}%' `
        )
        .then(function (recordset) {
          global.share.mainWindow.webContents.send(
            "customer",
            recordset.recordset
          );
          conn.close();
        })
        .catch(function (err) {
          console.log(err);
          conn.close();
        });
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});

// Search invoice by invoice no.

global.share.ipcMain.on("searchinvno", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig);
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(
          `SELECT  InvM.RNDT,InvM.InvNo,Invoice.SNO, Invoice.Code, Invoice.Name, Invoice.Batch, Invoice.STP, Invoice.Bon, Invoice.Stax, Invoice.Qty, Invoice.Disc,InvM.InvTime, InvM.Dat 
from Invoice
INNER JOIN InvM
ON InvM.InvNo =  ${arg} and Invoice.Invno = ${arg};`
        )
        .then(function (recordset) {
          global.share.mainWindow.webContents.send(
            "searchinvno",
            recordset.recordset
          );
          conn.close();
        })
        .catch(function (err) {
          console.log(err);
          conn.close();
        });
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});

// Save Medicine into database

global.share.ipcMain.on("saveintodatabase", (event, arg) => {
  dialog
    .showMessageBox({
      type: "question",
      buttons: ["Yes", "No"],
      title: "Save Invoice",
      message: "Do you want to save this invoice?",
    })
    .then((box) => {
      if (box.response == 0) {
        //  const inth = parseInt(arg.InvNo);
        var conn = new sql.ConnectionPool(sqlConfig);
        conn
          .connect()
          .then(function () {
            var request = new sql.Request(conn);
            request
              .query(
                `
          DECLARE @f NVARCHAR(MAX) = N'${JSON.stringify(arg.newInvoice)}'
          DECLARE @i NVARCHAR(MAX) = N'${JSON.stringify(arg.invoiceEdit)}';
          EXECUTE Generate_invoice @files=@f, @insert = @i,@total = ${
            arg.totalMedicine
          }, @RNDT = '${arg.RandomNo}', @Inv = ${arg.InvNo};
          `
              )
              .then(function (recordset) {
                global.share.mainWindow.webContents.send(
                  "searchinvno",
                  recordset.recordset
                );
                conn.close();
              })
              .catch(function (err) {
                console.log(err);
                conn.close();
              });
            console.log("connection is created");
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        global.share.mainWindow.webContents.send("setfalse");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get salesman info

global.share.ipcMain.on("selectsupplier", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig);
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(`select * from Supplier where SID = ${arg}`)
        .then(function (recordset) {
          console.log(recordset);
          global.share.mainWindow.webContents.send(
            "getsupplier",
            recordset.recordset
          );
          conn.close();
        })
        .catch(function (err) {
          console.log(err);
          conn.close();
        });
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});

// Save Stock into database

global.share.ipcMain.on("stockintodatabase", (event, arg) => {
  dialog
    .showMessageBox({
      type: "question",
      buttons: ["Yes", "No"],
      title: "Save Invoice",
      message: "Do you want to save this Stock?",
    })
    .then((box) => {
      if (box.response == 0) {
        var conn = new sql.ConnectionPool(sqlConfig);
        conn
          .connect()
          .then(function () {
            console.log('here')
            console.log(arg);
            console.log("yes try to save into databse");
            var request = new sql.Request(conn);
            request
              .query(
                `
          DECLARE @f NVARCHAR(MAX) = N'${JSON.stringify(arg.newInvoice)}'
          DECLARE @i NVARCHAR(MAX) = N'${JSON.stringify(arg.invoiceEdit)}';
          EXECUTE Generate_Purchase_invoice @files=@f, @insert = @i,@Builty = ${
            arg.builtyno
          }, @RNDT = '${arg.RandomNo}', @card = ${arg.CRD} , @SID = ${
                  arg.customer.SID
                },@Transport = ${arg.transport};
          `
              )
              .then(function (recordset) {
                console.log(recordset.recordset)
                conn.close()
              })
              .catch(function (err) {
                console.log(err)
                conn.close()
              });
            console.log("connection is created")
          })
          .catch(function (err) {
            console.log(err)
          });
      } else {
        global.share.mainWindow.webContents.send("setfalse")
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

//Get Card Number

global.share.ipcMain.on("cardno", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig)
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(`select max(CRD) as CRD from PurchM`)
        .then(function (recordset) {
          global.share.mainWindow.webContents.send(
            "cardno",
            recordset.recordset
          );
          conn.close()
        })
        .catch(function (err) {
          console.log(err)
          conn.close()
        })
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});

// Search invoice by invoice no.

global.share.ipcMain.on("searchstockno", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig);
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(`SELECT  PurchM.RNDT,PurchM.CRD, PurchM.Builty, Stock.Batch, Supplier.Name as Supplier_Name, Supplier.Address,  PurchM.SID, PurchM.Transport,Purchase.SNO, Purchase.Code, Purchase.Name,  Purchase.Retail, Purchase.CDisc, Purchase.TP, Purchase.Qty, Purchase.Bon, Purchase.Stax,  Purchase.STP, Purchase.Disc,PurchM.Dat 
                from Purchase
                INNER JOIN PurchM
                ON PurchM.CRD =  ${arg} and Purchase.Crd = ${arg}
                inner join Supplier
                on Supplier.SID = PurchM.SID
                inner join Stock 
                on Stock.Name = Purchase.Name `)
        .then(function (recordset) {
          global.share.mainWindow.webContents.send(
            "searchstockno",
            recordset.recordset
          );
          conn.close();
        })
        .catch(function (err) {
          console.log(err);
          conn.close();
        });
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});

//Get Typereturn

global.share.ipcMain.on("typereturn", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig)
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(`select * from ReturnType`)
        .then(function (recordset) {
          global.share.mainWindow.webContents.send(
            "typereturn",
            recordset.recordset
          );
          conn.close()
        })
        .catch(function (err) {
          console.log(err)
          conn.close()
        })
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});


//Get Card Number

global.share.ipcMain.on("prno", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig)
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(`select max(CRD) as CRD from PRetM`)
        .then(function (recordset) {
          global.share.mainWindow.webContents.send(
            "prno",
            recordset.recordset
          );
          conn.close()
        })
        .catch(function (err) {
          console.log(err)
          conn.close()
        })
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});


// Save purchase return into database

global.share.ipcMain.on("purchasereturndata", (event, arg) => {
  dialog
    .showMessageBox({
      type: "question",
      buttons: ["Yes", "No"],
      title: "Save Invoice",
      message: "Do you want to save this Stock?",
    })
    .then((box) => {
      if (box.response == 0) {
        console.log(arg)
        var conn = new sql.ConnectionPool(sqlConfig);
        conn
          .connect()
          .then(function () {
            console.log(arg);
            var request = new sql.Request(conn);
            request
              .query(
                `
          DECLARE @f NVARCHAR(MAX) = N'${JSON.stringify(arg.newInvoice)}'
          DECLARE @i NVARCHAR(MAX) = N'${JSON.stringify(arg.invoiceEdit)}';
          EXECUTE Generate_Purchase_Return
          @files = @f, 
          @insert = @i, 
          @RNDT = ${arg.RandomNo}, 
          @card = ${arg.card},
          @SID  = ${arg.SID}, 
          @type  = ${arg.type}, 
          @usr = 'moiz'
          `
              )
              .then(function (recordset) {
                console.log(recordset.recordset)
                conn.close()
              })
              .catch(function (err) {
                console.log(err)
                conn.close()
              });
            console.log("connection is created")
          })
          .catch(function (err) {
            console.log(err)
          });
      } else {
        global.share.mainWindow.webContents.send("setfalse")
      }
    })
    .catch((err) => {
      console.log(err)
    })
})


// Search invoice by CRd no.

global.share.ipcMain.on("searchcrdno", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig);
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(`SELECT  PRetM.RNDT,PRetM.Crd, PRetM.Dat,Supplier.Address ,PRetM.SID, PRetM.SuppName, PRetM.TypID,PReturn.SNO, PReturn.Code, PReturn.Name,  PReturn.Retail, PReturn.CDisc, PReturn.TP, PReturn.Qty, PReturn.Bon,   PReturn.STP, PReturn.Disc
              from PReturn
              INNER JOIN PRetM
              ON PRetM.Crd = ${arg} and PReturn.Crd = ${arg}
              INNER Join Supplier
              on Supplier.Name = PRetM.SuppName
          `)
        .then(function (recordset) {
          global.share.mainWindow.webContents.send(
            "searchcrdno",
            recordset.recordset
          );
          conn.close();
        })
        .catch(function (err) {
          console.log(err);
          conn.close();
        });
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err);
    });
});
