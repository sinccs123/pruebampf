import { CONFIG } from '@/lib/config';

export async function POST(request: Request) {
  const data = await request.json();
  const recaptchaToken = data.recaptcha;

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
      const dataActa = await fetch(
        `${CONFIG.MPFAPI_URL}/api/kiwi/v1.15/denuncias_externas/descargar_acta/${data.derivacion_id}`
      );

      const pdfActa = await dataActa.arrayBuffer();

      return new Response(pdfActa, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename=acta_denuncia_${data.derivacion_id}.pdf`,
        },
      });
    } catch (error) {
      return Response.json(
        { status: 'ERROR', message: 'Error al consultar la denuncia' },
        { status: 500 }
      );
    }
  }
  return Response.json(
    {
      status: 'ERROR',
      message: 'Error en la validación del reCaptcha de seguridad de Google',
    },
    { status: 401 }
  );
}
