const nodemailer = require("nodemailer")

const sendEmail = async function (email, subject, text) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "dagimasnake1@gmail.com",
            pass: "myxzhmzxcgtftjkg"
        }
    })

    await transporter.sendMail({
        from: "dagimasnake1@gmail.com",
        to: email,
        subject: subject,
        text: text
    })
    console.log("sent")
}

module.exports = sendEmail