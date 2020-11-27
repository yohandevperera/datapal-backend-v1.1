module.exports = {
    index :  (req,res) => {
        res.render('default/index')
    } ,
    login : (req,res) =>{
        //res.render('default/login')
        res.send('Test')
    } 
}