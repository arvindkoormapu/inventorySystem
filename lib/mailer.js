const nodemailer = require('nodemailer');

// Create the transporter with the required configuration for Gmail
const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
});

module.exports = function() {

    return {
        sendEmail: async function(email, subject, messBody) {
            return await transporter.sendMail({
                from: '"Inventory Management System" <vikas.kesh2@gmail.com>',
                to: email,
                subject: subject,
                html: messBody
            });
        }
    };
};
