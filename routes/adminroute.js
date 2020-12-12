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

router.route('/records/edit/:id')
      .get(adminController.editRecords)

// User Management Routes

router.route('/users')
      .get(adminController.getUsers)

router.route('/users/create')
      .get(adminController.addUsers)
      .post(adminController.postUser)

router.route('/users/edit/:id')
      .get(adminController.editUserRender)
      .post(adminController.editUser)

router.route('/users/edit/')
      .post(adminController.editUser)


router.route('/users/test')
      .get(adminController.test)



module.exports = router
