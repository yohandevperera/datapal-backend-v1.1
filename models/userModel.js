const mysql = require('mysql')
const {dburl} = require("./config/config")

const con = mysql.createConnection(dburl)

function addUser(data){

    con.connect((err)=>{
        if(err) throw err
        console.log('Connected')
        const insertQuery = "INSERT INTO `users_tbl` (`UserID`, `Username`, `Email`, `Password`, `UserRole`)" +
                            "VALUES ('"+data.UserID+"', '"+data.Username+"', '"+data.Email+"', '"+data.Password+"', "+data.UserRole+")"
        con.query(insertQuery,(err,result)=>{
            if(err) throw err
            console.log('Data Added')
        })
    })
}

module.exports = {
    Post : addUser()
}


