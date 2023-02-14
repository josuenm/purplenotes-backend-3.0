import "dotenv/config";
import createHttpError from "http-errors";
import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

async function sendEmail(mailOptions: MailOptions) {
  try {
    await transporter.sendMail(mailOptions);
  } catch (e) {
    throw createHttpError(500, "Something wrong, trying to send email");
  }
}

interface MailProps {
  from: string;
  to: string[];
  subject: string;
  text: string;
  attachments?: Array<{
    filename: string;
    path: string;
    cid: string;
  }>;
  html: string;
}

type SendMailProps = (props: MailProps) => Promise<void>;

export default sendEmail;
export { MailProps, SendMailProps };
