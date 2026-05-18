'use client';

import React, { useState } from 'react';

import { Dictionary } from '@/lib/dictionary';
import DatePicker from 'react-datepicker';
import SectionTitle from '@/components/form/section-title';

export default function DenunciadoSection({
  dictionary,
  nacionalidades,
  iconCalendar,
}: {
  dictionary: Dictionary;
  nacionalidades: { value: string; label: string }[];
  iconCalendar: React.ReactNode;
}) {
  const [denunciadoDesconocido, setDenunciadoDesconocido] = useState(false);
  const [denunciadoTipoPersona, setDenunciadoTipoPersona] = useState('');
  const [denunciadoFechaDeNacimiento, setDenunciadoFechaDeNacimiento] =
    useState<Date | null>(null);
  const { labels, generos, tiposPersonas, tiposDocumentos } = dictionary;
  const { placeholders, sectionTitles } = labels;

  const isPersonaFisica = denunciadoTipoPersona === 'FISICA';
  const isPersonaJuridica = denunciadoTipoPersona === 'JURIDICA';
  const isDenunciadoDesconocidoOTipoDesconocido =
    denunciadoDesconocido || denunciadoTipoPersona.length === 0;

  const handleDenunciadoDesconocidoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDenunciadoDesconocido(e.target.checked);
  };

  return (
    <div className='p-8 -mx-8 my-6'>
      <div className='max-w-screen-sm mr-auto ml-auto'>
        <h2 className='relative mt-4 mb-8 text-xl text-center md:text-3xl sectionTitle md:mb-20'>
          {sectionTitles.denunciado}
        </h2>
        <label
          className='text-sm flex items-center'
          htmlFor='denunciadoDesconocido'
        >
          <input
            type='checkbox'
            className='checkbox'
            id='denunciadoDesconocido'
            name='denunciadoDesconocido'
            onChange={handleDenunciadoDesconocidoChange}
          />
          {placeholders.denunciandoDesconocido}
        </label>
        <select
          id='denunciadoTipoDePersona'
          name='denunciadoTipoDePersona'
          className={`w-full lg:relative mt-4 h-12 rounded-lg px-2 border border-gray-300 shadow-lg ${
            denunciadoDesconocido
              ? 'hidden'
              : denunciadoTipoPersona.length === 0
              ? 'required:border-2 required:border-red-500'
              : ''
          }`}
          disabled={denunciadoDesconocido}
          required={!denunciadoDesconocido}
          value={denunciadoTipoPersona}
          onChange={(e) => setDenunciadoTipoPersona(e.target.value)}
        >
          <option value=''>{placeholders.denunciadoTipoDePersona}</option>
          {tiposPersonas.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {!denunciadoDesconocido && denunciadoTipoPersona.length === 0 && (
          <span className='text-sm text-red-500'>{labels.fieldRequired}</span>
        )}
        <input
          id='denunciadoNombre'
          name='denunciadoNombre'
          type={`${
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaJuridica
              ? 'hidden'
              : 'text'
          }`}
          placeholder={placeholders.denunciadoNombre}
          className={`input mt-4 ${
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaJuridica
              ? 'hidden'
              : ''
          }`}
          disabled={
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaJuridica
          }
        />
        <input
          id='denunciadoApellido'
          name='denunciadoApellido'
          type={`${
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaJuridica
              ? 'hidden'
              : 'text'
          }`}
          placeholder={placeholders.denunciadoApellido}
          className={`input mt-4 ${
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaJuridica
              ? 'hidden'
              : ''
          }`}
          disabled={
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaJuridica
          }
        />
        <input
          id='denunciadoApodo'
          name='denunciadoApodo'
          type={`${
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaJuridica
              ? 'hidden'
              : 'text'
          }`}
          placeholder={placeholders.denunciadoApodo}
          className={`input mt-4 ${
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaJuridica
              ? 'hidden'
              : ''
          }`}
          disabled={
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaJuridica
          }
        />
        <select
          id='denunciadoNacionalidad'
          name='denunciadoNacionalidad'
          className={`w-full lg:relative mt-4 h-12 rounded-lg px-2 border border-gray-300 shadow-lg ${
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaJuridica
              ? 'hidden'
              : ''
          }`}
          disabled={
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaJuridica
          }
        >
          <option value=''>{placeholders.denunciadoNacionalidad}</option>
          {nacionalidades.map((option) => (
            <option key={`denunciadoNacionalidad_${option.value ?? option.label}`} value={option.value ?? option.label}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          id='denunciadoRazonSocial'
          name='denunciadoRazonSocial'
          type={`${
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaFisica
              ? 'hidden'
              : 'text'
          }`}
          placeholder={placeholders.denunciadoRazonSocial}
          className={`input mt-4 ${
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaFisica
              ? 'hidden'
              : ''
          }`}
          disabled={isDenunciadoDesconocidoOTipoDesconocido || isPersonaFisica}
        />
        <input
          id='denunciadoNombreDeFantasia'
          name='denunciadoNombreDeFantasia'
          type={`${
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaFisica
              ? 'hidden'
              : 'text'
          }`}
          placeholder={placeholders.denunciadoNombreDeFantasia}
          className={`input mt-4 ${
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaFisica
              ? 'hidden'
              : ''
          }`}
          disabled={isDenunciadoDesconocidoOTipoDesconocido || isPersonaFisica}
        />
        <input
          id='denunciadoDireccion'
          name='denunciadoDireccion'
          type={`${
            isDenunciadoDesconocidoOTipoDesconocido ? 'hidden' : 'text'
          }`}
          placeholder={placeholders.denunciadoDireccion}
          className={`input mt-4 ${
            isDenunciadoDesconocidoOTipoDesconocido ? 'hidden' : ''
          }`}
          disabled={isDenunciadoDesconocidoOTipoDesconocido}
        />
        <input
          id='denunciadoEmail'
          name='denunciadoEmail'
          type={`${
            isDenunciadoDesconocidoOTipoDesconocido ? 'hidden' : 'email'
          }`}
          placeholder={placeholders.denunciadoEmail}
          className={`input mt-4 ${
            isDenunciadoDesconocidoOTipoDesconocido ? 'hidden' : ''
          }`}
          disabled={isDenunciadoDesconocidoOTipoDesconocido}
        />
        <input
          id='denunciadoRedSocial'
          name='denunciadoRedSocial'
          type={`${
            isDenunciadoDesconocidoOTipoDesconocido ? 'hidden' : 'text'
          }`}
          placeholder={placeholders.denunciadoRedSocial}
          className={`input mt-4 ${
            isDenunciadoDesconocidoOTipoDesconocido ? 'hidden' : ''
          }`}
          disabled={isDenunciadoDesconocidoOTipoDesconocido}
        />
        <input
          id='denunciadoTelefono'
          name='denunciadoTelefono'
          type={`${
            isDenunciadoDesconocidoOTipoDesconocido ? 'hidden' : 'text'
          }`}
          placeholder={placeholders.denunciadoTelefono}
          className={`input mt-4 ${
            isDenunciadoDesconocidoOTipoDesconocido ? 'hidden' : ''
          }`}
          disabled={isDenunciadoDesconocidoOTipoDesconocido}
        />
        <SectionTitle
          text={sectionTitles.adicionales}
          className={`${
            isDenunciadoDesconocidoOTipoDesconocido ? 'hidden' : ''
          }`}
        />
        <select
          id='denunciadoDocumentoTipo'
          name='denunciadoDocumentoTipo'
          className={`w-full lg:relative mt-4 h-12 rounded-lg px-2 border border-gray-300 shadow-lg ${
            isDenunciadoDesconocidoOTipoDesconocido ? 'hidden' : ''
          }`}
          disabled={isDenunciadoDesconocidoOTipoDesconocido}
        >
          <option value=''>{placeholders.denunciadoDocumentoTipo}</option>
          {tiposDocumentos.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          id='denunciadoDocumentoNumero'
          name='denunciadoDocumentoNumero'
          type={`${
            isDenunciadoDesconocidoOTipoDesconocido ? 'hidden' : 'text'
          }`}
          placeholder={placeholders.denunciadoDocumentoNumero}
          className={`input mt-4 ${
            isDenunciadoDesconocidoOTipoDesconocido ? 'hidden' : ''
          }`}
          disabled={isDenunciadoDesconocidoOTipoDesconocido}
          maxLength={15}
        />
        <select
          id='denunciadoGenero'
          name='denunciadoGenero'
          className={`w-full lg:relative mt-4 h-12 rounded-lg px-2 border border-gray-300 shadow-lg ${
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaJuridica
              ? 'hidden'
              : ''
          }`}
          disabled={
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaJuridica
          }
        >
          <option value=''>{placeholders.denunciadoGenero}</option>
          {generos.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div
          className={`mt-4 w-full ${
            isDenunciadoDesconocidoOTipoDesconocido || isPersonaJuridica
              ? 'hidden'
              : ''
          }`}
        >
          <DatePicker
            name='denunciadoFechaDeNacimiento'
            selected={
              denunciadoFechaDeNacimiento
                ? new Date(denunciadoFechaDeNacimiento)
                : null
            }
            disabled={
              isDenunciadoDesconocidoOTipoDesconocido || isPersonaJuridica
            }
            onChange={(d) => setDenunciadoFechaDeNacimiento(d)}
            placeholderText={placeholders.denunciadoFechaDeNacimiento}
            className={`input block p-3`}
            showIcon
            toggleCalendarOnIconClick
            locale='es'
            dateFormat='dd-MM-yyyy'
            maxDate={new Date()}
            icon={iconCalendar}
          />
        </div>
      </div>
    </div>
  );
}
