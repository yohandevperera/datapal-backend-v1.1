module.exports = {

    dburl : {
        host: 'localhost',
        user:'root',
        password: '',
        database: 'data_pal_db'
        },
    port : process.env.PORT || 3000,
    email: 'miscellanyelectroniccenter@gmail.com',
    emailpass: 'Miscellany123',
    globalVariables : (req,res,next) =>{
        res.locals.success_message = req.flash('success-message')
        res.locals.error_message = req.flash('error-message')
        next()
    }
}
