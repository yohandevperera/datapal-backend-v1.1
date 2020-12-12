const nodemailer = require('nodemailer')
const {email,emailpass} = require("./config")

    

function sendEmail(data, callback){

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: email,
          pass: emailpass
        }
    });

    var mailOptions = {
        from: email,
        to: data.to,
        subject: data.subject,
        text: data.text
      };

      transporter.sendMail(mailOptions, function(error, info){

        if (error) {
          return callback(error)
        } else {
            return callback(info)   
        }
      });
}

module.exports =  {sendEmail}
