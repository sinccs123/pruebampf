'use server';

import { CONFIG } from '@/lib/config';
import { armarBodysEmail, enviarEmail } from '@/lib/mail';
import { armarRequest, mpfapi } from '@/lib/mpfapi';
import { request } from 'http';

export interface EnviarDenunciaActionState {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export const enviarDenunciaAction = async (
  _: EnviarDenunciaActionState,
  formData: FormData
) => {
  const formValues = Object.fromEntries(formData.entries());
  const requestDenuncia = await armarRequest({
    ...formValues,
    uploadFiles: formData.getAll('uploadFiles') as File[],
    datosCelular: {
      ip: formData.get('ip') as string,
    },
  });
  const recaptchaToken = formData.get('recaptchaToken') as string;
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
      const resDenuncia = await mpfapi.ingresarDenuncia(requestDenuncia);
      if (
        resDenuncia.data &&
        resDenuncia.data.status &&
        resDenuncia.data.status === 'OK'
      ) {
        /*
        if (formData.get('denuncianteEmail')) {
          const { subject, plainBody, htmlBody } = await armarBodysEmail({
            ...formValues,
            id: resDenuncia.data.data[0]?.denuncia_id,
          });
          await enviarEmail(
            formData.get('denuncianteEmail') as string,
            subject,
            plainBody,
            htmlBody
          );
        }
        */
        return {
          success: true,
          message: 'Denuncia creada con éxito',
          data: resDenuncia.data,
        };
      }
      return {
        success: false,
        message: 'Error al crear la denuncia',
        data: resDenuncia.data,
      };
    } catch (error) {
      console.error('Error creando la denuncia', error);
      return {
        success: false,
        message: 'Error al crear la denuncia',
        error,
      };
    }
  }
  return {
    success: false,
    message: 'Error en la validación del reCaptcha de seguridad de Google',
  };
};
