const customerModel = require('../models/customerModel')
const bcrypt = require('bcryptjs')

function generateForgotID(userid){
    
    let rand = Math.floor(Math.random()*1000 + 1)
    var d = new Date()
    let time = d.getTime()
    return userid + rand + time 
    
}

module.exports = {

    index : (req,res)=>{
        const obj = new customerModel()
        obj.viewAllCustomers(function(result){
        
        Object.size = function(obj) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
        };

        let size = Object.size(result)
        
        for(i=0; i<size;++i){
        
        result[i].status ? result[i].statusName = 'Active' : result[i].statusName = 'Inactive';
        
        }
        res.render('customer/',{customers: result})
       })
    },

    addCustomerRender : (req,res)=>{
         const obj = new customerModel()
         obj.getCustomerid(function(result){
             res.render('customer/customercreate',{cusid:result}) 
         })
    },

    addCustomer:(req,res)=>{

            const obj = new customerModel()

            var state = req.body.customerstate ? 1 : 0;

            const data = {
            body: req.body,
            status: state
            }

            obj.addCustomer(data,function(result){
            if(result>=1 ){

            req.flash('success-message','Customer added sucessfully !!')
            res.redirect('/admin/customer')

            }
                          
        })  
                       
    },

    editCustomerRender : (req,res)=>{
         const obj = new customerModel()
         var id = req.params.id
         obj.getDatabyid(id,function(result){
             console.log(result)
             res.render('customer/customeredit',{data:result[0]})
         })
    },

    editCustomer:(req,res)=>{
        const obj = new customerModel()
        let id = req.body.customerid
        var state = req.body.userstate ? 1 : 0;   
        const data = {
            body: req.body,
            status: state
        }
        obj.updateCustomer(id,data,function(result){
            if(result>=1){
                     req.flash('success-message','Customer update sucessfully !!')
                     res.redirect('/admin/customer')
            }
        })       
    },
 
}