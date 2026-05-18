import { CONFIG } from '@/lib/config';
import { armarBodysEmail, enviarEmail } from '@/lib/mail';

export async function POST(request: Request) {
  const { dictionary, denuncia } = await request.json();
  const recaptchaToken = denuncia.recaptchaToken;

  if (!recaptchaToken)
    return Response.json(
      { status: 'ERROR', message: 'No se recibió el token de recaptcha' },
      { status: 401 }
    );

  const responseCaptcha = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${CONFIG.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      method: 'POST',
    }
  );
  const captchaValidation = await responseCaptcha.json();
  if (captchaValidation.success) {
    try {
      if (denuncia.denuncianteEmail && denuncia.denuncianteEmail !== '') {
        const { subject, plainBody, htmlBody } = await armarBodysEmail(
          denuncia
        );
        await enviarEmail(
          denuncia.denuncianteEmail,
          subject,
          plainBody,
          htmlBody
        );
      }
    } catch (error) {
      console.error(
        `Error enviando correo electrónico a ${denuncia.denuncianteEmail}`,
        error
      );
    }
    return Response.json({ status: 'OK' }, { status: 200 });
  }
  return Response.json(
    {
      status: 'ERROR',
      message: 'Error en la validación del reCaptcha de seguridad de Google',
    },
    { status: 401 }
  );
}
