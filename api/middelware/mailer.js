const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mycdldriver411@gmail.com',
        pass: '7mm>4=CL'
    }
});
/*const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'mycdldriver411@gmail.com',
        pass: '7mm>4=CL'
    }
});*/
module.exports = (para, asunto, titulo, mensaje)=>{

    var mailOptions = {
        from: 'mycdldriver411@gmail.com',
        to: para,
        subject: asunto,
        text: mensaje,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Demystifying Email Design</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>

        <body style="margin: 0; padding: 0; background-image: url('https://www.mycdldriver411.com/static/images/bg-routes.jpg');">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border:1px solid #f0f0f0;">
                <tr>
                    <td align="center" bgcolor="#001529" style="padding: 40px 0 30px 0;">
                        <img src="https://www.mycdldriver411.com/static/images/logo-white.png" width="300" style="display: block;" />
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;">
                                    <b>${titulo}</b>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 20px 0 30px 0;" style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                    ${mensaje}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#FF2A39" style="padding: 30px 30px 30px 30px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td align="center" style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;">
                                    <h2>Contact Us</h2><br/>
                                    <a style="color: #ffffff;" href="tel:+880 12345678">+880 12345678</a><br/>
                                    <a style="color: #ffffff;" href="mailto:youremail@gmail.com">youremail@gmail.com</a><br/>
                                    <a style="color: #ffffff;" href="tel:+880 12345678">+880 12345678</a><br/>
                                    &copy; Copyright & Design MyCDL Drivers<br/>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>`
    };
    //console.log('[ EMAIL RECIVED ]', para, asunto, titulo, mensaje);
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('[ ERROR MAILER ]', error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}
