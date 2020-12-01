const mysql = require("mysql")
const {dburl} = require("../config/config")

class customerModel {

    
    con = mysql.createConnection(dburl)
     

    constructor(){
        console.log('Customer Model is called')
    }

    addCustomer(data,callback){

      this.con.connect((err)=>{
            if(err) throw err
            console.log('Connected')
            const insertQuery = "INSERT INTO `customers_tbl` (`CustomerID`, `CustomerName`, `Telephone`, `Address`, `Email`)" +
                                "VALUES ('"+data.CustomerID+"', '"+data.CustomerName+"', "+data.Telephone+", '"+data.Address+"', '"+data.Email+"')"
            this.con.query(insertQuery,(err,result)=>{
                if(err) throw err
                console.log(result.affectedRows)
                return callback(result.affectedRows)
            })
        })
    }

}

module.exports = customerModel
