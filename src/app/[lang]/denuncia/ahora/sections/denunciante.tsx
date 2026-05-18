'use client';

import React, { useState } from 'react';

import { Dictionary } from '@/lib/dictionary';
import DatePicker from 'react-datepicker';

export default function DenuncianteSection({
  dictionary,
  nacionalidades,
  iconCalendar,
}: {
  dictionary: Dictionary;
  nacionalidades: { value: string; label: string }[];
  iconCalendar: React.ReactNode;
}) {
  const [denuncianteAnonimo, setDenuncianteAnonimo] = useState(false);
  const [denuncianteNombre, setDenuncianteNombre] = useState('');
  const [denuncianteApellido, setDenuncianteApellido] = useState('');
  const [denuncianteDocumentoTipo, setDenuncianteDocumentoTipo] = useState('');
  const [denuncianteDocumentoNumero, setDenuncianteDocumentoNumero] =
    useState('');
  const [denuncianteFechaDeNacimiento, setDenuncianteFechaDeNacimiento] =
    useState<Date | null>(null);

  const { queQueresDenunciar, labels, generos, tiposDocumentos } = dictionary;
  const { placeholders, sectionTitles } = labels;

  const handleDenuncianteAnonimoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDenuncianteAnonimo(e.target.checked);
  };

  return (
    <div className='bg-gray-100 p-8 -mx-8 mb-12 mt-6'>
      <div className='max-w-screen-sm mr-auto ml-auto'>
        <h2 className='relative mt-4 mb-8 text-xl text-center md:text-3xl sectionTitle md:mb-20'>
          {sectionTitles.denunciante}
        </h2>
        <label
          className='text-sm flex items-center'
          htmlFor='denuncianteAnonimo'
        >
          <input
            type='checkbox'
            className='checkbox'
            id='denuncianteAnonimo'
            name='denuncianteAnonimo'
            onChange={handleDenuncianteAnonimoChange}
          />
          {placeholders.denuncianteAnonimo}
        </label>
        <input
          id='denuncianteNombre'
          name='denuncianteNombre'
          type={`${denuncianteAnonimo ? 'hidden' : 'text'}`}
          placeholder={placeholders.denuncianteNombre}
          className={`input mt-4 ${
            denuncianteAnonimo
              ? 'hidden'
              : denuncianteNombre.length === 0
              ? 'inputRequired'
              : 'inputOk'
          }`}
          disabled={denuncianteAnonimo}
          required={!denuncianteAnonimo}
          value={denuncianteNombre}
          onChange={(e) => setDenuncianteNombre(e.target.value)}
        />
        {!denuncianteAnonimo && denuncianteNombre.length === 0 && (
          <span className='text-sm text-red-500'>{labels.fieldRequired}</span>
        )}
        <input
          id='denuncianteApellido'
          name='denuncianteApellido'
          type={`${denuncianteAnonimo ? 'hidden' : 'text'}`}
          placeholder={placeholders.denuncianteApellido}
          className={`input mt-4 ${
            denuncianteAnonimo
              ? 'hidden'
              : denuncianteApellido.length === 0
              ? 'inputRequired'
              : 'inputOk'
          }`}
          disabled={denuncianteAnonimo}
          required={!denuncianteAnonimo}
          value={denuncianteApellido}
          onChange={(e) => setDenuncianteApellido(e.target.value)}
        />
        {!denuncianteAnonimo && denuncianteApellido.length === 0 && (
          <span className='text-sm text-red-500'>{labels.fieldRequired}</span>
        )}
        <select
          id='denuncianteDocumentoTipo'
          name='denuncianteDocumentoTipo'
          className={`w-full lg:relative mt-4 h-12 rounded-lg px-2 border border-gray-300 shadow-lg ${
            denuncianteAnonimo
              ? 'hidden'
              : denuncianteDocumentoTipo.length === 0
              ? 'required:border-2 required:border-red-500'
              : 'inputOk'
          }`}
          disabled={denuncianteAnonimo}
          required={!denuncianteAnonimo}
          value={denuncianteDocumentoTipo}
          onChange={(e) => setDenuncianteDocumentoTipo(e.target.value)}
        >
          <option value=''>{placeholders.denuncianteDocumentoTipo}</option>
          {tiposDocumentos.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {!denuncianteAnonimo && denuncianteDocumentoTipo.length === 0 && (
          <span className='text-sm text-red-500'>{labels.fieldRequired}</span>
        )}
        <input
          id='denuncianteDocumentoNumero'
          name='denuncianteDocumentoNumero'
          type={`${denuncianteAnonimo ? 'hidden' : 'text'}`}
          placeholder={placeholders.denuncianteDocumentoNumero}
          className={`input mt-4 ${
            denuncianteAnonimo
              ? 'hidden'
              : denuncianteDocumentoNumero.length === 0
              ? 'inputRequired'
              : 'inputOk'
          }`}
          disabled={denuncianteAnonimo}
          required={!denuncianteAnonimo}
          maxLength={15}
          value={denuncianteDocumentoNumero}
          onChange={(e) => setDenuncianteDocumentoNumero(e.target.value)}
        />
        {!denuncianteAnonimo && denuncianteDocumentoNumero.length === 0 && (
          <span className='text-sm text-red-500'>{labels.fieldRequired}</span>
        )}
        <div className={`mt-4 w-full ${denuncianteAnonimo ? 'hidden' : ''}`}>
          <DatePicker
            name='denuncianteFechaDeNacimiento'
            selected={
              denuncianteFechaDeNacimiento
                ? new Date(denuncianteFechaDeNacimiento)
                : null
            }
            disabled={denuncianteAnonimo}
            onChange={(d) => setDenuncianteFechaDeNacimiento(d)}
            placeholderText={placeholders.denuncianteFechaDeNacimiento}
            className={`input block p-3`}
            showIcon
            toggleCalendarOnIconClick
            locale='es'
            dateFormat='dd-MM-yyyy'
            maxDate={new Date()}
            icon={iconCalendar}
          />
        </div>
        <select
          id='denuncianteNacionalidad'
          name='denuncianteNacionalidad'
          className={`w-full lg:relative mt-4 h-12 rounded-lg px-2 border border-gray-300 shadow-lg ${
            denuncianteAnonimo ? 'hidden' : ''
          }`}
          disabled={denuncianteAnonimo}
        >
          <option value=''>{placeholders.denuncianteNacionalidad}</option>
          {nacionalidades.map((option) => (
            <option key={`denuncianteNacionalidad_${option.value ?? option.label}`} value={option.value ?? option.label}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          id='denuncianteGenero'
          name='denuncianteGenero'
          className={`w-full lg:relative mt-4 h-12 rounded-lg px-2 border border-gray-300 shadow-lg ${
            denuncianteAnonimo ? 'hidden' : ''
          }`}
          disabled={denuncianteAnonimo}
        >
          <option value=''>{placeholders.denuncianteGenero}</option>
          {generos.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          id='denuncianteDireccion'
          name='denuncianteDireccion'
          type={`${denuncianteAnonimo ? 'hidden' : 'text'}`}
          placeholder={placeholders.denuncianteDireccion}
          className={`input my-4 ${denuncianteAnonimo ? 'hidden' : ''}`}
          disabled={denuncianteAnonimo}
        />
        <input
          id='denuncianteTelefono'
          name='denuncianteTelefono'
          type={`${denuncianteAnonimo ? 'hidden' : 'text'}`}
          placeholder={placeholders.denuncianteTelefono}
          className={`input mt-4 ${denuncianteAnonimo ? 'hidden' : ''}`}
          disabled={denuncianteAnonimo}
        />
        <div className={`${denuncianteAnonimo ? 'hidden' : ''}`}>
          <input
            id='denuncianteEmail'
            name='denuncianteEmail'
            type={`${denuncianteAnonimo ? 'hidden' : 'email'}`}
            placeholder={placeholders.denuncianteEmail}
            className={`input mt-4 ${denuncianteAnonimo ? 'hidden' : ''}`}
            disabled={denuncianteAnonimo}
          />
          {/*
          <div className='-mx-8 bg-blue-100 px-8 py-4 mb-2 md:rounded-lg mt-2'>
            <h6 className='text-secondary text-lg'>
              {queQueresDenunciar.recommendationEmailBox.title}
            </h6>
            <p className='text-sm'>
              {queQueresDenunciar.recommendationEmailBox.text}
            </p>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}
