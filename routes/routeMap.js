const express = require('express')
const { route } = require('./defaultroutes')
const router = express.Router()
const {isUserAuthenticated} = require("../config/customfunctions")


router.all('/*',isUserAuthenticated,(req,res,next)=>{

  let userRole = req.user.UserRole
  let status = req.user.status
 
  if(userRole === 1 && status === 1){
      
    res.redirect('/admin') 

  } else if (userRole === 2 && status === 1) {

     res.redirect('/tech')

  } else if (userRole === 3 && status === 1) {

    res.redirect('/recpt')

  }
    next();
})

module.exports = router