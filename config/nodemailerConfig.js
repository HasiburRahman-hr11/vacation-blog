const nodemailer = require('nodemailer');
require('dotenv').config();
let transporter = nodemailer.createTransport({
    host: process.env.NM_HOST, //replace with your email provider
    port: 587,
    secure: false,
    auth: {
        user: process.env.NM_USER, // your email address to send email from
        pass: process.env.NM_PASS // your gmail account password
    }
});

module.exports = transporter;