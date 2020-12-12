 const customerModel = require('../models/customerModel')
 const userModel = require('../models/userModel')
 const bcrypt = require('bcryptjs')
 const emailMediator = require("../config/emailservice")

 
 

module.exports = {
    index :  (req,res) => {
        res.render('admin/index')
    },
    getRecords :  (req,res) => {
        const viewpost = new customerModel()
        viewpost.viewCustomer(function(records){

            res.render('admin/records/index',{records: records})
        })
    },
    submitRecords :  (req,res) => {
        const sendrecords = new customerModel()
        console.log(req.body);
        const data = {
            CustomerID : req.body.customerid,
            CustomerName : req.body.customername,
            Telephone : req.body.customertel,
            Address : req.body.customeraddress,
            Email : req.body.customeremail
        }
        sendrecords.addCustomer(data, function(response){
        console.log(response);
        if(response>=1){
            req.flash('success-message','Record entered sucessfully !!')
            res.redirect('/admin/records')
        }
       });
    },
    createRecords :  (req,res) => {
        res.render('admin/records/create')
    },
    editRecords :  (req,res) => {
        const obj = new customerModel()
        var id = req.params.id
        obj.getDatabyid(id,function(data){
         //   console.log(JSON.stringify(data));
          res.render('admin/records/edit',{data: data[0]})          
        })   
    },

    // User Management 

    getUsers : (req,res)=>{
       const obj = new userModel()
       obj.viewUsers(function(result){
        res.render('admin/users',{
            users:result 
          })
       })
    },
    addUsers : (req,res)=>{
        const obj = new userModel()
        obj.getUserid(function(result){
            res.render('admin/users/usercreate',{userid:result}) 
        })
    },
    postUser:(req,res)=>{
        
        if(req.body.password !== req.body.confirmpassword){
               res.render('admin/users/usercreate',{
                   errors: 'The confrim password does not match',
                   userId: req.body.userid,
                   username :req.body.username,
                   email: req.body.email,
                   password: req.body.password,
                   confirmpassword: req.body.confirmpassword,
                   userrole: req.body.userrole
               })

        } else {

            const obj = new userModel()
            obj.checkUser(req.body.email,function(result){
                if(result[0].count>=1){
                  console.log('Email already exists try to login')
                  req.flash('error-message','Email already exists try to login')
                  res.redirect('back')
                } else {
                    bcrypt.genSalt(10,(err,salt)=>{
                        bcrypt.hash(req.body.password,salt,(err,hash)=>{
                            let newPassword = hash
                            var state = req.body.userstate ? 1 : 0;
                            const data = {
                            UserID: req.body.userid,
                            Username:req.body.username,
                            Email:req.body.email,
                            Password:newPassword,
                            backupPassword:'123',
                            UserRole:req.body.userrole,
                            status: state
                        }
                        obj.addUser(data,function(result){
                            if(result>=1){
                                req.flash('success-message','User added sucessfully !! please check your email for the backup code ')
                                res.redirect('/admin/users')
                             }
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

    test :(req,res)=>{

        emailMediator.sendEmail({

            to: 'yohanperera27@gmail.com',
            subject: 'Test Email',
            text: 'Hello World'
         
        },function(result){
          
            console.log(result)
          
        })    
    }

}