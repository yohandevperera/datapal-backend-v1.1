module.exports = {
    index :  (req,res) => {
        res.render('default/index')
    } ,
    login : (req,res) =>{
        res.render('default/login')
    },
    loginPost : (req,res) =>{
        res.send('Welcome to the admin Panel')
    },

    registerGet : (req,res) =>{
        res.render('default/register')
    },
    registerPost : (req,res) =>{
        res.send('User Sucessfully added')
    }

}