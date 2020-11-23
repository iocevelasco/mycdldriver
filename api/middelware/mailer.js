const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mycdldriver411@gmail.com',
        pass: '7mm>4=CL'
    }
});
module.exports = (para, asunto, mensaje)=>{

    var mailOptions = {
        from: 'mycdldriver411@gmail.com',
        to: para,
        subject: asunto,
        text: mensaje
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('[ ERROR MAILER ]', error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}
