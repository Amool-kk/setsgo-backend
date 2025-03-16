import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  console.log(process.env.HOST, process.env.PASS, process.env.MAIL_USER);
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 578,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email send sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

export { sendEmail };
