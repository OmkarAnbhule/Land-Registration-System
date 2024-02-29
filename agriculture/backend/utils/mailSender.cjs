const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.GOOGLE_EMAIL,
            pass: process.env.GOOGLE_API_KEY
        }
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = mailSender;