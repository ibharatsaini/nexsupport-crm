import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendInvitationEmail(data: {
  email: string;
  token: string;
  organizationId: string;
}) {
  const acceptUrl = `${process.env.FRONTEND_URL}/accept-invitation/${data.token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: data.email,
    subject: 'You have been invited to join NexSupport',
    html: `
      <h1>Welcome to NexSupport!</h1>
      <p>You have been invited to join an organization on NexSupport.</p>
      <p>Click the link below to accept the invitation and set up your account:</p>
      <p><a href="${acceptUrl}">${acceptUrl}</a></p>
      <p>This invitation will expire in 7 days.</p>
    `,
  });
}