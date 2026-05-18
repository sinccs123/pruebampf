'use client';

import { useRouter } from 'next/navigation';
import { Form, Formik } from 'formik';

import * as Yup from 'yup';

import { Dictionary } from '@/lib/dictionary';

import Input from '@/components/form/input';
import Recaptcha from '@/components/recaptcha';
import { useState } from 'react';
import ResultadoConsulta from '@/components/resultado-consulta';

interface DenunciaConsultaPageClientProps {
  dictionary: Dictionary;
  id?: number;
}

export const DISABLED_FIELD =
  'disabled:bg-slate-200 disabled:cursor-not-allowed';

const formValidationSchema = (dictionary: Dictionary) => {
  return Yup.object().shape({
    id: Yup.number().required(dictionary.labels.fieldRequired),
  });
};

export default function DenunciaConsultaPageClient({
  dictionary,
  id,
}: DenunciaConsultaPageClientProps) {
  const router = useRouter();
  const { consultaDenuncia, labels } = dictionary;
  const [denunciaData, setDenunciaData] = useState<any>(null);

  const handleBack = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    router.back();
  };

  return (
    <Formik
      initialValues={{
        id: id ?? null,
        recaptchaToken: null,
      }}
      validationSchema={formValidationSchema(dictionary)}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        const resDenuncia = await fetch(`/api/denuncia-consulta`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        const res = await resDenuncia.json();
        if (res.data) {
          const data = res.data;
          setDenunciaData(data);
          actions.setFieldValue('id', null);
        } else {
          console.error(res.message);
        }
        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          <div className='max-w-screen-sm mr-auto ml-auto'>
            <Input
              type='number'
              name='id'
              placeholder={consultaDenuncia.inputPlaceholder}
            />
            <Input type='hidden' name='recaptchaToken' />

            {denunciaData && (
              <ResultadoConsulta
                dictionary={dictionary}
                resultado={denunciaData}
                recaptchaToken={values.recaptchaToken}
              />
            )}

            <div className='flex flex-col items-center justify-center mt-6'>
              {!values.recaptchaToken && (
                <p className='text-red-500 text-sm mb-2'>
                  Por favor, complete el reCAPTCHA para consultar la denuncia o descargar el acta de la misma.
                </p>
              )}
              <Recaptcha
                changeCallback={(captchaCode: string | null) => {
                  setFieldValue('recaptchaToken', captchaCode);
                }}
              />
            </div>

            <div className='flex items-center justify-center w-full border-t border-gray-200 mt-4 py-4'>
              <button
                type='button'
                className='text-primary p-4 w-full'
                onClick={handleBack}
              >
                {labels.back}
              </button>
              <button
                type='submit'
                disabled={isSubmitting || !values.recaptchaToken}
                className='text-white p-4 bg-primary rounded-lg w-full hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-primary/60'
              >
                {isSubmitting ? labels.checking : labels.check}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
