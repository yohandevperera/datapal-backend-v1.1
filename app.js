const express = require("express")
const mysql = require("mysql")
const path = require("path")
const hbs = require("express-handlebars")
const {dburl,port} = require("./config/config")
const deafultroutes = require("./routes/defaultroutes")



const app = express()

// config database 

 const connection = mysql.createConnection(dburl)

connection.connect((err)=>{
    if(err) throw err
    console.log('DB connected')
})

// configure epxress

app.use(express.json()) // using middleware
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

// View engine setup 

app.engine("handlebars",hbs({defaultLayout:'default'}))
app.set('view engine','handlebars')

// routes

app.use('/',deafultroutes)





app.listen(port,()=>{
    console.log(`The server is running on port ${port}`)
})