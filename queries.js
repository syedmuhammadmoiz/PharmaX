const sql = require("mssql")
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
}

// Search medicine in database

global.share.ipcMain.on("search", (event, arg) => {
  var conn = new sql.ConnectionPool(sqlConfig)
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn)
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
          console.log(err)
          conn.close()
        });
      console.log("connection is created");
    })
    .catch(function (err) {
      console.log(err)
    })
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
          )
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
    })
})

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
          conn.close()
        })
        .catch(function (err) {
          console.log(err)
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