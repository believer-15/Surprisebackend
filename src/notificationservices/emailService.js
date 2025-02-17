const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  pool: true,
  maxConnections: 5,  // Max simultaneous connections
  maxMessages: 100,
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "ujjwalsinha15@gmail.com",
    pass: "tdeu tldi uwxm ruii"
  },
});

// async..await is not allowed in global scope, must use a wrapper
const sendEmailNotification = async (to, subject, text, html) => {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
      html
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      return info.response;
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  module.exports = sendEmailNotification;

//   sendEmail("sinha02priti@gmail.com", "Test Email", "Hello, this is a test email using SMTP.", "<b>Hello world?</b>");