const express = require('express')
const router =  express.Router()
const adminController = require("../controllers/adminController")
const userController = require("../controllers/userController")
const {isUserAuthenticated} = require("../config/customfunctions")


router.all('/*',isUserAuthenticated,(req,res,next)=>{

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
      .get(userController.index)

router.route('/users/create')
      .get(userController.addUserRender)
      .post(userController.addUser)

router.route('/users/edit/:id')
      .get(userController.editUserRender)
      .post(userController.editUser)

router.route('/users/edit/')
      .post(userController.editUser)


router.route('/users/test')
      .get(adminController.test)



module.exports = router
