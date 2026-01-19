import Mailgen from "mailgen";
import nodemailer from "nodemailer"


// for making the email and sending the mail
const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagelink.com"
    }
  })

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  const emailHtml = mailGenerator.generate(options.mailgenContent);

  // to send the email
  const transpoter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASSWORD
    }
  })

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml
  }

  try {
    await transpoter.sendMail(mail)
  } catch (error) {
    console.error("Email service failed. Make sure to provide valid credentials")
    console.error("Error:", error)
  }
}

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App!",
      action:{
        instructions: "To verify your email please click on the following button",
        button:{
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl
        },
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help."
    }
  }
}

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of your account",
      action:{
        instructions: "To reset the password click on the following button/link",
        button:{
          color: "#fd0404",
          text: "Verify your email",
          link: passwordResetUrl
        },
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help."
    }
  }
}

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail
};