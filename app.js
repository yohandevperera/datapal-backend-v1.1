const express = require("express")
const mysql = require("mysql")
const path = require("path")
const hbs = require("express-handlebars")
const {dburl,port,globalVariables} = require("./config/config")
const deafultroutes = require("./routes/defaultroutes")
const adminroutes = require("./routes/adminroute")
const flash = require('connect-flash')
const session = require('express-session')


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        


const app = express()

// config database 

 const connection = mysql.createConnection(dburl)

connection.connect((err)=>{
    if(err) throw err
    console.log('DB connected')
})
var bodyParser = require('body-parser');
const passport = require("passport")
app.use(bodyParser.json());


// configure epxress
//app.use(express.bodyParser())
app.use(express.json()) // using middleware
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))


app.use(session({
    secret : 'anysecret',
    saveUninitialized: true,
    resave: true
}))

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())



app.use(globalVariables)

// View engine setup 

app.engine("handlebars",hbs({defaultLayout:'default'}))
app.set('view engine','handlebars')

// routes

app.use('/',deafultroutes)
app.use('/admin',adminroutes)













app.listen(port,()=>{
    console.log(`The server is running on port ${port}`)
})