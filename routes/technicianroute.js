const express = require('express')
const router =  express.Router()
const {isUserAuthenticated} = require("../config/customfunctions")
const technicianController = require("../controllers/technicianController")


router.all('/*',isUserAuthenticated,(req,res,next)=>{

      next();
     
})

router.route('/')
      .get(technicianController.index)   
      




module.exports = router

