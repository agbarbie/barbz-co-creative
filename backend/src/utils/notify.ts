import nodemailer from 'nodemailer';

const { SMTP_USER, SMTP_PASS, NOTIFY_TO } = process.env;

const transporter =
  SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        service: 'gmail',
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    : null;

/**
 * Emails the studio owner about a new lead.
 * Never throws: a failed email must not break the customer's form submission.
 */
export async function notifyOwner(subject: string, lines: string[], replyTo?: string) {
  if (!transporter) {
    console.warn('[notify] SMTP_USER / SMTP_PASS not set - skipping email notification');
    return;
  }
  try {
    await transporter.sendMail({
      from: `"Barbz & Co. Website" <${SMTP_USER}>`,
      to: NOTIFY_TO || SMTP_USER,
      replyTo,
      subject,
      text: lines.join('\n'),
    });
  } catch (err) {
    console.error('[notify] Failed to send email:', err);
  }
}