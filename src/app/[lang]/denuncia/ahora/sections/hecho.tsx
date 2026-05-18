'use client';

import { useRef, useState } from 'react';
import { es } from 'date-fns/locale/es';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
registerLocale('es', es);

import { Dictionary } from '@/lib/dictionary';
import SectionTitle from '@/components/form/section-title';
import { CONFIG } from '@/lib/config';

interface HechoSectionProps {
  dictionary: Dictionary;
  IconCalendar: React.ReactNode;
  motivoSelected?: string;
}

const getHoursAndMinutes = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 15) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMin = min.toString().padStart(2, '0');
      const timeString = `${formattedHour}:${formattedMin}`;
      times.push({ value: timeString, label: timeString });
    }
  }
  return times;
};

export default function HechoSection({
  dictionary,
  IconCalendar,
  motivoSelected = '',
}: HechoSectionProps) {
  const recomendacionesRef = useRef<HTMLDivElement>(null);
  const [denunciaMotivo, setDenunciaMotivo] = useState('');
  const [denunciaDetalle, setDenunciaDetalle] = useState('');
  const [lugarIndeterminado, setLugarIndeterminado] = useState(false);
  const [fechaHoraDesconocida, setFechaHoraDesconocida] = useState(false);
  const [denunciaFecha, setDenunciaFecha] = useState<Date | null>(null);

  const HOURS_MINUTES = getHoursAndMinutes();
  const { queQueresDenunciar, queDenunciar, labels } = dictionary;
  const { placeholders, toast: toastLabels, sectionTitles } = labels;

  const denunciaMotivoOptions = queDenunciar?.map((item: any) => ({
    value: item.key,
    label: item.title,
  }));

  const handleDenunciaMotivoChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (recomendacionesRef.current) {
      recomendacionesRef.current.classList.toggle('hidden');
    }
    setDenunciaMotivo(e.target.value);
  };

  const handleChangeDenunciaDetalle = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDenunciaDetalle(e.target.value);
  };

  const handleDireccionDesconocidaChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLugarIndeterminado(e.target.checked);
  };

  const handleFechaDesconocidaChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFechaHoraDesconocida(e.target.checked);
  };

  return (
    <div className='max-w-screen-sm mx-auto'>
      <>
        <select
          id='denunciaMotivo'
          name='denunciaMotivo'
          className={`w-full lg:relative my-2 h-12 rounded-lg px-2 border border-gray-300 shadow-lg ${
            denunciaMotivo.length === 0
              ? 'required:border-2 required:border-red-500'
              : 'inputOk'
          }`}
          defaultValue={motivoSelected}
          value={denunciaMotivo}
          onChange={handleDenunciaMotivoChange}
          required
        >
          <option value=''>{placeholders.denunciaMotivo}</option>
          {denunciaMotivoOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className='uppercase'
            >
              {option.label.toUpperCase()}
            </option>
          ))}
        </select>
        {denunciaMotivo.length === 0 && (
          <span className='text-sm text-red-500'>{labels.fieldRequired}</span>
        )}
      </>
      <div
        ref={recomendacionesRef}
        className='hidden -mx-8 bg-blue-50 px-8 py-4 mb-8 md:rounded-lg'
      >
        <h6 className='text-primary text-lg mt-4 mb-5'>
          {queQueresDenunciar.recommendationBox.title}
        </h6>
        <p className='text-sm'>{queQueresDenunciar.recommendationBox.text}</p>
      </div>
      <div className='relative my-4 w-full'>
        <>
          <textarea
            id='denunciaDetalle'
            name='denunciaDetalle'
            placeholder={placeholders.denunciaDetalle}
            maxLength={CONFIG.APP_MAX_DETALLE_CHARACTERS}
            value={denunciaDetalle}
            onChange={handleChangeDenunciaDetalle}
            rows={6}
            className={`input ${
              denunciaDetalle.length === 0 ? 'inputRequired' : 'inputOk'
            }`}
            required
          ></textarea>
          {denunciaDetalle.length === 0 && (
            <span className='text-sm text-red-500'>{labels.fieldRequired}</span>
          )}
          <span
            className={`absolute  right-2 text-sm text-gray-500 z-[2] ${
              denunciaDetalle.length > 0 ? '-bottom-6' : 'bottom-0'
            }`}
          >
            {denunciaDetalle.length}/{CONFIG.APP_MAX_DETALLE_CHARACTERS}
          </span>
        </>
      </div>
      <SectionTitle text={sectionTitles.hecho} />
      <label
        className='text-sm flex items-center'
        htmlFor='denunciaDireccionDesconocida'
      >
        <input
          type='checkbox'
          className='checkbox'
          id='denunciaDireccionDesconocida'
          name='denunciaDireccionDesconocida'
          onChange={handleDireccionDesconocidaChange}
        />
        {placeholders.denunciaDireccionDesconocida}
      </label>
      <input
        type={`${lugarIndeterminado ? 'hidden' : 'text'}`}
        id='denunciaDireccion'
        name='denunciaDireccion'
        placeholder={placeholders.denunciaDireccion}
        className={'input my-4'}
      />
      <label
        className='text-sm flex items-center'
        htmlFor='denunciaFechaDesconocida'
      >
        <input
          type='checkbox'
          className='checkbox'
          id='denunciaFechaDesconocida'
          name='denunciaFechaDesconocida'
          onChange={handleFechaDesconocidaChange}
        />
        {placeholders.denunciaFechaDesconocida}
      </label>
      <div className={`my-5 w-full ${fechaHoraDesconocida ? 'hidden' : ''}`}>
        <DatePicker
          name='denunciaFecha'
          selected={denunciaFecha ? new Date(denunciaFecha) : null}
          disabled={fechaHoraDesconocida}
          onChange={(d) => setDenunciaFecha(d)}
          placeholderText={placeholders.denunciaFecha}
          className={`input  block p-3`}
          showIcon
          toggleCalendarOnIconClick
          locale='es'
          dateFormat='dd-MM-yyyy'
          maxDate={new Date()}
          icon={IconCalendar}
        />
      </div>
      <div
        className={`flex items-center justify-center gap-4 w-full ${
          fechaHoraDesconocida ? 'hidden' : ''
        }`}
      >
        <select
          id='denunciaHoraInicio'
          name='denunciaHoraInicio'
          className='w-full lg:relative mt-4 h-12 rounded-lg px-2 border border-gray-300 shadow-lg'
        >
          <option value=''>{placeholders.denunciaHoraInicio}</option>
          {HOURS_MINUTES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          id='denunciaHoraFin'
          name='denunciaHoraFin'
          className='w-full lg:relative mt-4 h-12 rounded-lg px-2 border border-gray-300 shadow-lg'
        >
          <option value=''>{placeholders.denunciaHoraFin}</option>
          {HOURS_MINUTES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
