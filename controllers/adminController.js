 const customerPost = require('../models/customerModel')

module.exports = {
    index :  (req,res) => {
        res.render('admin/index')
    },
    getRecords :  (req,res) => {
        res.render('admin/records/index')
    },
    submitRecords :  (req,res) => {
        const sendpost = new customerPost()
        console.log(req.body);
        const data = {
            CustomerID : req.body.customerid,
            CustomerName : req.body.customername,
            Telephone : req.body.customertel,
            Address : req.body.customeraddress,
            Email : req.body.customeremail
        }
        sendpost.addCustomer(data, function(response){
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

    
}