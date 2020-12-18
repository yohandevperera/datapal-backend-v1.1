const express = require('express')
const router =  express.Router()
const {isUserAuthenticated} = require("../config/customfunctions")
const receptionistController = require("../controllers/receptionistController")


router.all('/*',isUserAuthenticated,(req,res,next)=>{

      req.app.locals.layout = 'receptionist'
      next();
     
})

router.route('/')
      .get(receptionistController.index)   
      




module.exports = router
