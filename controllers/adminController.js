 const customerModel = require('../models/customerModel')

 
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

    
    test :(req,res)=>{
         res.send('test')
         console.log(req.user.Username)
    }

}