const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configure Gmail SMTP transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // your gmail address
      pass: process.env.EMAIL_PASS, // App password for Gmail
    },
  });
};

// POST /api/contact/send-email
router.post('/send-email', async (req, res) => {
  try {
    const { firstName, lastName, email, company, phone, subject, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !company || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    const transporter = createTransporter();

    // Email content
    const emailContent = `
      Contact Form Submission from Daniels Website
      
      Name: ${firstName} ${lastName}
      Email: ${email}
      Company: ${company}
      Phone: ${phone}
      Subject: ${subject}
      
      Message:
      ${message}
      
      ---
      This email was sent from the contact form on daniels-wv.com
    `;

    const mailOptions = {
      from: `"Daniels Website Contact" <${process.env.EMAIL_USER}>`,
      to: 'dwivedi.aman11@outlook.com',
      subject: `Contact Form: ${subject}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
            Contact Form Submission from Daniels Website
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
                <td style="padding: 8px 0;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #f97316;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td>
                <td style="padding: 8px 0;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #f97316;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
                <td style="padding: 8px 0;">${subject}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #555; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 8px; font-size: 12px; color: #666;">
            This email was sent from the contact form on <a href="https://daniels-wv.com" style="color: #f97316;">daniels-wv.com</a>
            <br>
            Sent on: ${new Date().toLocaleString()}
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    });
  }
});

module.exports = router;
