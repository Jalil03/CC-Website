// controllers/contactController.js
import nodemailer from 'nodemailer';

export const sendContactMessage = async (req, res) => {
  const { senderEmail, message } = req.body;

  if (!senderEmail || !message) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.ADMIN_EMAIL_PASSWORD,
        },
        debug: true,
      });
      

    await transporter.sendMail({
      from: senderEmail,
      to: process.env.ADMIN_EMAIL,
      subject: 'New message from Bootcamp Contact Form',
      text: message,
    });

    res.json({ msg: 'Message sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error sending email' });
  }
};
