const express = require('express')
const router = express.Router()
const deafultController = require("../controllers/deafultController")


router.all('/*',(req,res,next)=>{

      req.app.locals.layout = 'default'
  
      next();
  })


router.route('/')
      .get(deafultController.index)


router.route('/login')
      .get(deafultController.login)
      .post(deafultController.loginPost)


router.route('/register')
      .get(deafultController.registerGet)
      .post(deafultController.registerPost)
      


module.exports = router