import { CONFIG } from '@/lib/config';
import { mpfapi } from '@/lib/mpfapi';

export async function POST(request: Request) {
  const denuncia = await request.json();
  const recaptchaToken = denuncia.recaptcha_token;

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
      const resDenuncia = await mpfapi.ingresarDenuncia(denuncia);
      return Response.json(resDenuncia, { status: 200 });
    } catch (error) {
      console.log('ERROR', error);
      return Response.json(
        { status: 'ERROR', message: 'Error al ingresar la denuncia' },
        { status: 500 }
      );
    }
  }
  console.log(
    'ERROR Error en la validación del reCaptcha de seguridad de Google'
  );
  return Response.json(
    {
      status: 'ERROR',
      message: 'Error en la validación del reCaptcha de seguridad de Google',
    },
    { status: 401 }
  );
}
