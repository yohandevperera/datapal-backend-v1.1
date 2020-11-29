const express = require('express')
const router =  express.Router()
const adminController = require("../controllers/adminController")

router.all('/*',(req,res,next)=>{

    req.app.locals.layout = 'admin'

    next();
})

router.route('/')
      .get(adminController.index)   
      

router.route('/records')
      .get(adminController.getRecords)
      
    
router.route('/records/create')
      .get(adminController.createRecords)
      .post(adminController.submitRecords)
     


module.exports = router
