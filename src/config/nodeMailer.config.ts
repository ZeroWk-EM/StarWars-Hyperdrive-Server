import nodeMailer from "nodemailer";

const host = String(process.env.SMPT_HOST);
const port = Number(process.env.SMPT_PORT);

const user = String(process.env.SMPT_USER);
const pass = String(process.env.SMPT_PASS);

const EmailConnection = async (
  email: string,
  subject: string,
  emailBody: string
) => {
  const transporter = nodeMailer.createTransport({
    host,
    port,
    secure: true,
    auth: {
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from: user,
    to: email,
    subject,
    html: emailBody,
  });
};

export default EmailConnection;
