const nodemailer  = require('nodemailer')


const sendEmail = async (options) =>{
    if (!options?.email) {
        throw new Error("sendEmail requires an options object with an email property");
    }
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        auth:{
            user: process.env.SMPT_EMAIL,
            pass: process.env.SMPT_PASSWORD,
        }
    })

    const message= {
        from: `${process.env.FROM_MAIL} <${process.env.FROM_MAIL}>`,
        to: options.email,
        subject: options.subject,
        text:options.message,
    }
    console.log(message)

    const info = await transporter.sendMail(message)

    console.log("Message sent", info.messageId)
}

module.exports = {sendEmail};
