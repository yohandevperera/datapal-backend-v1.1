const mysql = require("mysql")
const {dburl} = require("../config/config")

class customerModel {

    con = mysql.createConnection(dburl) 

    constructor(){
        //console.log('User model is called')
    }

    addUser(data,callback){

            const insertQuery = "INSERT INTO `users_tbl` (`UserID`, `Username`, `Email`, `Password`, `backupPassword`, `UserRole`, `status`)" + 
                                "VALUES ('"+data.UserID+"', '"+data.Username+"', '"+data.Email+"', '"+data.Password+"', '"+data.backupPassword+"', '"+data.UserRole+"' , '"+data.status+"');"
            this.con.query(insertQuery,(err,result)=>{
                if(err) throw err
                console.log(result.affectedRows)
                return callback(result.affectedRows)
        })  
    }

    viewUsers(callback){
        this.con.connect((err)=>{
            if(err) throw err
           // console.log('Connected')
            const selectQuery = "SELECT * FROM `users_tbl`"
            this.con.query(selectQuery,(err,result,feilds)=>{
                if(err) throw err
               // console.log(result)
                return callback(result)
            })
        })
    }

    getUserid(callback){
        
        this.con.connect((err)=>{
            if(err) throw err
            const selectQuery = "SELECT UserID FROM `users_tbl` ORDER BY UserID DESC LIMIT 1"
            this.con.query(selectQuery,(err,result,feilds)=>{
                if(err) throw err  
                if(result.length == 0){
                    
                    return callback('U001')

                } else{
                   let id = result[0].UserID
                  // console.log(id)
                   let seperateid = id.substring(1)
                   let generateid = parseInt(seperateid)
                   let increment = 0
                   if(generateid>=0 && generateid <=9){
                       
                       increment = generateid + 1
                       return callback('U00'+ increment)

                }else if(generateid >= 9 && generateid <= 99){

                    increment = generateid + 1
                    return callback("U0" + increment) 
                   
                } else if (generateid >=99) {
                
                    increment = generateid + 1
                    return callback("U" + increment)
                   
                } else {
                    
                    return callback ('U001')

                  }
                }
            })
        })
    }

    getDatabyid(id,callback){
        this.con.connect((err)=>{
            if(err) throw err
           // console.log('Connected')
            const selectQuery = "SELECT * FROM `users_tbl` WHERE UserID  = '"+id+"'"
            this.con.query(selectQuery,(err,result,feilds)=>{
                if(err) throw err
               // console.log(result)
                return callback(result)
            })
        })
    }

    checkUser(email,callback){
        this.con.connect((err)=>{
            if(err) throw err
           // console.log('Connected')
            const selectQuery = "SELECT COUNT(*) as count FROM users_tbl WHERE Email= '"+email+"'"
            this.con.query(selectQuery,(err,result,feilds)=>{
                if(err) throw err
                return callback(result)
            })
        })
    }

    updateUser(id,data,callback){
        
            const updateQuery = "UPDATE users_tbl SET " +
                      "Username = '"+data.username+"', " + 
                      "Email = '"+data.email+"', " +
                      "Password = '"+data.password+"', " + 
                      "UserRole = "+data.userRole+", " + 
                      "status = "+data.status+" "  + 
                      "WHERE UserID = '"+id+"' ";

           // console.log(updateQuery)

           this.con.query(updateQuery, function (err, result) {
              if (err) throw err;
              console.log(result.affectedRows + " record(s) updated");
              callback(result.affectedRows)
            });     
    }

    authenticateUser(email,callback){
        const authenticateQuery = "SELECT * FROM `users_tbl` WHERE Email  = '"+email+"'"  
        this.con.query(authenticateQuery,function(err,result){
            if(err) throw err;
            console.log(result)
            callback(result)
        })
    }

    findUser(id,callback){
        const authenticateQuery = "SELECT * FROM `users_tbl` WHERE UserID  = '"+id+"'"  
        //console.log(authenticateQuery)
        // console.log(authenticateQuery)
        this.con.query(authenticateQuery,function(err,result){
            if(err) throw err;
            callback(result)
        })
    }


}

module.exports = customerModel
