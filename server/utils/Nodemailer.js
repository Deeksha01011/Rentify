const nodemailer = require("nodemailer");

exports.sendEmail = async (email, title, body) => {
  console.log("Preparing to send email to:", email);
  console.log("Email title:", title);
  console.log("Email body:", body);
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailsend = await transporter.sendMail({
      from: `Rentify || Dipanker Sharma <${process.env.EMAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });
    if (mailsend) {
      console.log("Email sent successfully", mailsend.messageId);
    }
    return mailsend;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
};
// module.exports = sendEmail;
