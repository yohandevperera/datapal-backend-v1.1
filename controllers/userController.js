const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const emailMediator = require("../config/emailservice")

function generateForgotID(userid){
    
    let rand = Math.floor(Math.random()*1000 + 1)
    var d = new Date()
    let time = d.getTime()
    return userid + rand + time 
    
}

module.exports = {

    index : (req,res)=>{
        const obj = new userModel()
        obj.viewUsers(function(result){
         res.render('admin/users',{
             users:result 
           })
        })
    },

    addUserRender : (req,res)=>{
         const obj = new userModel()
         obj.getUserid(function(result){
             res.render('admin/users/usercreate',{userid:result}) 
         })
    },

    addUser:(req,res)=>{

         if(req.body.password !== req.body.confirmpassword){
            
            req.flash('error-message','Password and confirm password mismatch')
            res.redirect('back')

         } else {
 
             const obj = new userModel()
             obj.checkUser(req.body.email,function(result){
                let forgotID = generateForgotID(req.body.userid)
                 if(result[0].count>=1){
                   console.log('Email already exists try to login')
                   req.flash('error-message','Email already exists try to login')
                   res.redirect('back')
                 } else {
                     bcrypt.genSalt(10,(err,salt)=>{
                         bcrypt.hash(req.body.password,salt,(err,hash)=>{
                             let newPassword = hash
                             console.log(newPassword)
                             var state = req.body.userstate ? 1 : 0;
                             const data = {
                             UserID: req.body.userid,
                             Username:req.body.username,
                             Email:req.body.email,
                             Password:newPassword,
                             backupPassword:forgotID,
                             UserRole:req.body.userrole,
                             status: state
                         }
                         obj.addUser(data,function(result){
                            const emailData = 
                            {
                                to:req.body.email,
                                subject: 'Miscellany Electronics Notifcations',
                                text: 'This is your Backup Code :' + forgotID + 'Please write it down and use it in case if you forget your primary password' 
                            }
                            //&& response != null
                            if(result>=1 ){
                                 req.flash('success-message','User added sucessfully !! please check your email for the backup code ')
                                 res.redirect('/admin/users')
                            }
                            // emailMediator.sendEmail(
                            // emailData,function(response){
                            
                            //    })
                            })  
                         })
                     })
                 }
             })
         } 
    },

    editUserRender : (req,res)=>{
         const obj = new userModel()
         var id = req.params.id
         obj.getDatabyid(id,function(result){
             console.log(result)
             res.render('admin/users/useredit',{data:result[0]})
         })
    },

    editUser:(req,res)=>{
        const obj = new userModel()
        let id = req.body.userid
        if(req.body.password !== req.body.confirmpassword){
         req.flash('error-message','Password and confirm password mismatch')
         res.redirect('back')
        } else {
         bcrypt.genSalt(10,(err,salt)=>{
             bcrypt.hash(req.body.password,salt,(err,hash)=>{
                 let newPassword = hash
                 console.log(newPassword)
                 var state = req.body.userstate ? 1 : 0;   
                 const data = {
                     username: req.body.username,
                     email: req.body.email,
                     password: newPassword,
                     userRole: req.body.userrole,
                     status: state
             }
             obj.updateUser(id,data,function(result){
                 if(result>=1){
                     req.flash('success-message','User update sucessfully !!')
                     res.redirect('/admin/users')
                  }
                })  
             })
          })
        }    
    },
 
}