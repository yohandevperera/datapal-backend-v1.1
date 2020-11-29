const mysql = require('mysql')
const {dburl} = require("./config/config")

const con = mysql.createConnection(dburl)

function addCustomer(data){

    // VALUES ('', '', '', '', '')

    con.connect((err)=>{
        if(err) throw err
        console.log('Connected')
        const insertQuery = "INSERT INTO `customers_tbl` (`CustomerID`, `CustomerName`, `Telephone`, `Address`, `Email`)" +
                            "VALUES ('"+data.CustomerID+"', '"+data.CustomerName+"', "+data.Telephone+", '"+data.Address+"', "+data.Email+")"
        con.query(insertQuery,(err,result)=>{
            if(err) throw err
            console.log('Data Added')
        })
    })
}

module.exports = {
    Post : addCustomer()
}
