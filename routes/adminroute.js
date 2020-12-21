const express = require('express')
const router =  express.Router()
const adminController = require("../controllers/adminController")
const userController = require("../controllers/userController")
const customerController = require("../controllers/customerController")
const {isUserAuthenticated} = require("../config/customfunctions")

//isUserAuthenticated
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
      .get(userController.index)

router.route('/users/create')
      .get(userController.addUserRender)
      .post(userController.addUser)

router.route('/users/edit/:id')
      .get(userController.editUserRender)
      .post(userController.editUser)

router.route('/users/edit/')
      .post(userController.editUser)

// Customer Routes

router.route('/customer')
      .get(customerController.index)

router.route('/customer/create')
      .get(customerController.addCustomerRender)
      .post(customerController.addCustomer)

router.route('/customer/edit/')
      .post(customerController.editCustomer)


router.route('/customer/edit/:id')
      .get(customerController.editCustomerRender)
      // .post(customerController.editUser)



module.exports = router
