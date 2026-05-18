import { mpfapi } from '@/lib/mpfapi';

export async function POST(request: Request) {
  const data = await request.json();
  const recaptchaToken = data.recaptchaToken;

  if (!recaptchaToken)
    return Response.json(
      { status: 'ERROR', message: 'No se recibió el token de recaptcha' },
      { status: 401 },
    );

  try {
    const resDenuncia = await mpfapi.consultarDenuncia(data.id ? data.id : 0);
    return Response.json(resDenuncia, { status: 200 });
  } catch (error) {
    return Response.json(
      { status: 'ERROR', message: 'Error al consultar la denuncia' },
      { status: 500 },
    );
  }
}
