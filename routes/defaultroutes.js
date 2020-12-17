const express = require('express')
const router = express.Router()
const deafultController = require("../controllers/deafultController")
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
const { connect } = require('./adminroute')
const {isUserAuthenticated} = require("../config/customfunctions")
const ConnectRoles = require('connect-roles')






router.all('/*',(req,res,next)=>{

      req.app.locals.layout = 'default'
  
      next();
  })


router.route('/')
      .get(deafultController.index)


// defining local statergy 

passport.use(new localStrategy({
      usernameField: 'email',
      passReqToCallback:true

},(req,email,password,done)=>{
      const model = new userModel()
      model.authenticateUser(email,function(result){
           if(!result){
                 return done (null,false,req.flash('error-message','User not found'))
           } 
            
           let getpassword = result[0].Password

                 bcrypt.compare(password,getpassword,(err,passwordMatched)=>{
                       if(err) {
                             console.log (err)
                       }

                       console.log('Password ' + getpassword)
                     //  console.log(passwordMatched)
                       
                       if(!passwordMatched){
                         
                        return done(null,false,req.flash('error-message','Invalid Username or Password'))
                        
                       }

                       console.log('Login Sucess')
                       console.log(result[0])
                       return done (null,result[0],req.flash('sucess-message','Login Sucessfuly'))
                        
            })
      })
}))

passport.serializeUser(function(result, done) {
      done(null, result.UserID);
});
    
passport.deserializeUser(function(id, done) {
       const model = new userModel()
       model.findUser(id,function(result){
           done(null,result[0])
      })
});

var user = new ConnectRoles({
      failureHandler: function (req, res, action) {
        // optional function to customise code that runs when
        // user fails authorisation
        var accept = req.headers.accept || '';
        res.status(403);
        if (~accept.indexOf('html')) {
          res.render('access-denied', {action: action});
        } else {
          res.send('Access Denied - You don\'t have permission to: ' + action);
        }
      }
    });

    

router.route('/login')
      .get(deafultController.login)
      .post(passport.authenticate('local',{
            successRedirect:'/admin',
            failureRedirect:'/login',
            failureFlash:true,
            successFlash:true,
            session:true,      
      }),deafultController.loginPost)

router.route('/register')
      .get(deafultController.registerGet)
      .post(deafultController.registerPost)
      


module.exports = router