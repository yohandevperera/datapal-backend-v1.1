const express = require('express')
const router = express.Router()
const deafultController = require("../controllers/deafultController")


router.route('/')
      .get(deafultController.index)


router.route('/login')
      .get(deafultController.login)
      


      



module.exports = router