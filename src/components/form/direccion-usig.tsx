'use client';

import { useState } from 'react';

import { ArrowPathIcon } from '@heroicons/react/24/outline';

import { geolocalizar } from '@/lib/usig';

import Input from '@/components/form/input';
import { useField } from 'formik';

interface DireccionUsigProps {
  label: string;
  name: string;
  errorMessage?: string;
  setFieldValue: (field: string, value: string) => void;
  [x: string]: any;
}

export default function DireccionUsig({
  label,
  name,
  errorMessage = 'Error geolocalizando la dirección',
  setFieldValue,
  ...props
}: DireccionUsigProps) {
  const [error, setError] = useState(false);
  const [field, meta] = useField(name);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, e.target.value);
    setError(false);
  };

  const handleOnBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (e.target.value.trim() === '') {
      setLoading(false);
      setError(false);
      setFieldValue(name, '');
      setFieldValue(`${name}Calle`, '');
      setFieldValue(`${name}Altura`, '');
      setFieldValue(`${name}Coordx`, '');
      setFieldValue(`${name}Coordy`, '');
      return;
    }
    const geoData = await geolocalizar(e.target.value);
    setLoading(false);
    if (
      geoData.direccionesNormalizadas &&
      geoData.direccionesNormalizadas.length > 0
    ) {
      setError(false);
      setFieldValue(name, geoData.direccionesNormalizadas[0]?.direccion);
      setFieldValue(
        `${name}Calle`,
        geoData.direccionesNormalizadas[0].nombre_calle
      );
      setFieldValue(
        `${name}Altura`,
        geoData.direccionesNormalizadas[0]?.altura
      );
      setFieldValue(
        `${name}Coordx`,
        geoData.direccionesNormalizadas[0]?.coordenadas?.x
      );
      setFieldValue(
        `${name}Coordy`,
        geoData.direccionesNormalizadas[0]?.coordenadas?.y
      );
    } else {
      setError(true);
      setFieldValue(name, '');
      setFieldValue(`${name}Calle`, '');
      setFieldValue(`${name}Altura`, '');
      setFieldValue(`${name}Coordx`, '');
      setFieldValue(`${name}Coordy`, '');
    }
  };

  return (
    <div className='flex flex-col space-y-2 items-start'>
      <div className='flex flex-row items-center justify-between space-x-2 w-full'>
        <input
          type='hidden'
          className='hidden'
          name={`${name}Calle`}
          defaultValue=''
        />
        <input
          type='hidden'
          className='hidden'
          name={`${name}Altura`}
          defaultValue=''
        />
        <input
          type='hidden'
          className='hidden'
          name={`${name}Coordx`}
          defaultValue=''
        />
        <input
          type='hidden'
          className='hidden'
          name={`${name}Coordy`}
          defaultValue=''
        />
        <Input
          name={name}
          {...props}
          onChange={handleChange}
          onBlur={handleOnBlur}
          className={`input ${meta.error || error ? 'inputError' : ''}
          ${!meta.error && !error && field?.value?.length > 0 ? 'inputOk' : ''} 
          ${props.className}`}
        />
        {loading && (
          <ArrowPathIcon className='h-6 w-6 text-[#006272] animate-spin' />
        )}
      </div>
    </div>
  );
}
