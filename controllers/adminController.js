module.exports = {
    index :  (req,res) => {
        res.render('admin/index')
    },
    getRecords :  (req,res) => {
        res.send('All posts')
    },
    submitRecords :  (req,res) => {
        res.send('Records Submited')
    },
    createRecords :  (req,res) => {
        res.render('admin/records/create')
    },

    
}