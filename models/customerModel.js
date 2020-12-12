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

    viewCustomer(callback){
        this.con.connect((err)=>{
            if(err) throw err
           // console.log('Connected')
            const selectQuery = "SELECT * FROM `customers_tbl`"
            this.con.query(selectQuery,(err,result,feilds)=>{
                if(err) throw err
               // console.log(result)
                return callback(result)
            })
        })
    }

    getcustomerid(callback){
        this.con.connect((err)=>{
            if(err) throw err
           // console.log('Connected')
            const selectQuery = "SELECT CustomerID FROM `customers_tbl`"
            this.con.query(selectQuery,(err,result,feilds)=>{
                if(err) throw err
            //    / console.log(result)
                return callback(result)
            })
        })
    }

    getDatabyid(id,callback){
        this.con.connect((err)=>{
            if(err) throw err
           // console.log('Connected')
            const selectQuery = "SELECT * FROM `customers_tbl` WHERE CustomerID = '"+id+"'"
            this.con.query(selectQuery,(err,result,feilds)=>{
                if(err) throw err
               // console.log(result)
                return callback(result)
            })
        })
    }

    

     

    updateCustomer(){

    }

}

module.exports = customerModel
