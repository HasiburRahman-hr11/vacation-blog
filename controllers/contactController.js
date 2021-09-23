const transporter = require('../config/nodemailerConfig');
require('dotenv').config();

exports.contactController = (req, res) => {
    try {
        const mailOptions = {
            from: req.body.email, // sender address
            to: process.env.NM_GMAIL, // list of receivers
            subject: 'Vacation Email', // Subject line
            html: `
            <p>You have a new contact request.</p>
            <h3>Contact Details</h3>
            <h5>Name: ${req.body.name}</h5>
            <p>Email: ${req.body.email}</p>
            <p style="margin-top:15px;">Message: ${req.body.message}</p>
            `
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: 'Something went wrong. Try again later.'
                });
                console.log(err);
            } else {
                res.send({
                    success: true,
                    message: 'Thanks for contacting us. We will get back to you shortly.'
                });
            }
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Something went wrong. Try again later'
        });
        console.log(error);
    }
}