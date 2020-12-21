const mysql = require("mysql")
const {dburl} = require("../config/config")

class customerModel {

    
    con = mysql.createConnection(dburl)
     

    constructor(){
        // console.log('Customer Model is called')
    }

    
    getCustomerid(callback){
        
        this.con.connect((err)=>{
            if(err) throw err
            const selectQuery = "SELECT CustomerID FROM `customers_tbl` ORDER BY CustomerID DESC LIMIT 1"
            this.con.query(selectQuery,(err,result,feilds)=>{
                if(err) throw err  
                if(result.length == 0){
                    
                    return callback('CUS001')

                } else{
                   let id = result[0].CustomerID
                  // console.log(id)
                   let seperateid = id.substring(3)
                   let generateid = parseInt(seperateid)
                   let increment = 0
                   if(generateid>=0 && generateid <=9){
                       
                       increment = generateid + 1
                       return callback('CUS00'+ increment)

                }else if(generateid >= 9 && generateid <= 99){

                    increment = generateid + 1
                    return callback("CUS0" + increment) 
                   
                } else if (generateid >=99) {
                
                    increment = generateid + 1
                    return callback("CUS" + increment)
                   
                } else {
                    
                    return callback ('CUS001')

                  }
                }
            })
        })
    }

    addCustomer(data,callback){

        const insertQuery = "INSERT INTO `customers_tbl` (`CustomerID`, `CustomerName`, `Telephone`, `Address`, `Email`,`status`)" +
                                "VALUES ('"+data.body.customerid+"', '"+data.body.customername+"', "+data.body.telephone+", '"+data.body.address+"', '"+data.body.email+"',"+data.status+")"
            this.con.query(insertQuery,(err,result)=>{
                if(err) throw err
                console.log(result.affectedRows)
                return callback(result.affectedRows)
        })
    }

    viewAllCustomers(callback){
            const selectQuery = "SELECT * FROM `customers_tbl`"
            this.con.query(selectQuery,(err,result,feilds)=>{
                if(err) throw err
                //console.log(result)
                 return callback(result)
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

    updateCustomer(id,data,callback){
 
        const updateQuery = "UPDATE customers_tbl SET " +
        "CustomerName = '"+data.body.customername+"', " +
        "Telephone = '"+data.body.telephone+"', " + 
        "Address = '"+data.body.address+"', " + 
        "Email = '"+data.body.email+"', "  + 
        "status = "+data.status+" "  + 
        "WHERE CustomerID = '"+id+"' ";

       this.con.query(updateQuery, function (err, result) {
       if (err) throw err;
       console.log(result.affectedRows + " record(s) updated");
       callback(result.affectedRows)

       }); 
    }
}

module.exports = customerModel
