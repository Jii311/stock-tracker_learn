import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./templates";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
})

export const sendWelcomeEmail = async ({ email, name, intro}: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace("{{intro}}", intro);

    const mailOptions = {
        from: `"Signalist" <signalist@gmail.co>`,
        to: email,
        subject: `Welcome to Signalist - your stock market toolkit is ready!`,
        text: `Hi ${name},\n\n${intro}\n\nWelcome aboard!\n\nBest,\nThe Signalist Team`,
        html: htmlTemplate
    };

    await transporter.sendMail(mailOptions);
}