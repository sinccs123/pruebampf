import { Dictionary, getDictionary } from '@/lib/dictionary';
import { CONFIG } from './config';
import { i18n } from './i18n';

const nodemailer = require('nodemailer');

export const armarBodysEmail = async (denuncia: any) => {
  const dictionary = await getDictionary(i18n.defaultLocale);
  const { labels } = dictionary;
  const { email, placeholders } = labels;
  const { denunciaMotivo } = denuncia;
  const subject = email.subject.replace(
    '%tipo%',
    `${denunciaMotivo} #${denuncia.id}`
  );
  const title = email.title.replace(
    '%tipo%',
    `${denunciaMotivo} #${denuncia.id}`
  );

  let plainBody = ``;
  plainBody += `${subject}\n\n`;
  plainBody += `${title}\n`;
  plainBody += Object.keys(placeholders)
    .map(
      (key) =>
        `${placeholders[key as keyof typeof placeholders]}: ${denuncia[key]}`
    )
    .join('\n');

  let htmlBody = `<html>`;
  htmlBody += `<h1>${title}</h1><br><br>`;
  htmlBody += Object.keys(placeholders)
    .map(
      (key) =>
        `<p>${placeholders[key as keyof typeof placeholders]}: ${
          denuncia[key]
        }</p>`
    )
    .join('<br>');
  htmlBody += `</html>`;

  return { subject, plainBody, htmlBody };
};

export const enviarEmail = async (
  to: string,
  subject: string,
  plainBody: string,
  htmlBody: string,
  from = CONFIG.SMTP_FROM,
  attachments = []
) => {
  const transporter = nodemailer.createTransport({
    host: CONFIG.SMTP_HOST,
    port: CONFIG.SMTP_PORT,
    secure: CONFIG.SMTP_TLS,
    auth: {
      user: CONFIG.SMTP_USERNAME,
      pass: CONFIG.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const message = {
    from,
    to,
    subject,
    text: plainBody,
    html: htmlBody,
    attachments,
  };
  return await transporter.sendMail(message);
};
