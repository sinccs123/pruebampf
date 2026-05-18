import Image from 'next/image';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

import logoMPF from '../../public/images/logo_mpf.svg';

import { mpfapi } from '@/lib/mpfapi';

interface ResultadoConsultaProps {
  dictionary: any;
  resultado: any;
  recaptchaToken: string | null;
}

export default function ResultadoConsulta({
  dictionary,
  resultado,
  recaptchaToken,
}: ResultadoConsultaProps) {
  const { consultaDenuncia } = dictionary;

  const iconoDescarga = (
    <ArrowDownTrayIcon className='w-6 h-6 mx-auto mr-2 text-white stroke-current' />
  );

  const buttonDescarga = (
    <button
      onClick={async () => {
        if(!recaptchaToken || recaptchaToken === null) {
          alert('Por favor, complete el reCAPTCHA para descargar el acta de denuncia.');
          return;
        }
        const position = resultado.doc_id.indexOf('DEX');
        const derivacionId = resultado.doc_id.substring(
          parseInt(position) + 3,
          parseInt(position) + 11,
        );

        const data = await fetch(`/api/denuncia-descarga`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            derivacion_id: derivacionId,
            recaptcha: recaptchaToken,
          }),
        });
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        const dataBlob = await data.blob();
        const url = window.URL.createObjectURL(dataBlob);
        a.href = url;
        a.download = `Derivacion_Externa_Acta_DEX${derivacionId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }}
      disabled={!recaptchaToken}
      className='flex flex-row p-2 font-semibold text-white uppercase bg-green-600 rounded-md shadow-md hover:bg-green-700 active:scale-95 disabled:cursor-not-allowed disabled:scale-100 mt-2 hover:cursor-pointer disabled:bg-green-400'
    >
      {iconoDescarga} Descargar acta de denuncia
    </button>
  );

  if (!resultado) return <div className='p-5'>Sin Resultados</div>;
  if (['2', '4', '501'].includes(resultado?.internal_code))
    return (
      <div
        className={`${
          resultado?.internal_code == '2' ? 'bg-[#eaf4f1]' : 'bg-red-100'
        } flex flex-col items-center justify-center p-5 pb-12 shadow-xl space-y-4 border border-gray-200 mt-4`}
      >
        {resultado?.mensaje}
        {resultado?.seguimiento_publico?.fecha &&
          resultado?.seguimiento_publico?.seguimiento && (
            <div className='w-full p-5 my-5 text-black bg-white border-2 border-gray-300 border-dashed'>
              <strong>Última actualización:</strong>{' '}
              {resultado.seguimiento_publico.fecha}
              {', '}
              {resultado.seguimiento_publico.seguimiento}
            </div>
          )}

        {resultado.doc_id &&
          resultado.doc_id.includes('DEX') &&
          resultado?.estado_derivacion_externa == 'DERIVADO' &&
          buttonDescarga}
      </div>
    );

  return (
    <div className='flex flex-col items-center justify-center p-5 space-y-4 bg-white border-2 border-gray-200 shadow-xl mt-4'>
      <Image src={logoMPF} alt='Logo MPF' className='aspect-auto max-w-md' />
      <div className='flex flex-col items-center justify-between bg-[#eaf4f1] opacity-80 w-full p-8'>
        <div className='flex flex-row items-center justify-between w-full p-4 space-x-4'>
          {resultado?.seguimiento && (
            <div className='flex flex-col w-full p-4 bg-white'>
              <h1 className='uppercase'>
                {consultaDenuncia.labels.seguimiento}
              </h1>
              <p className='font-bold'>{resultado?.seguimiento}</p>
            </div>
          )}
          {resultado?.legajo?.doc_id && (
            <div className='flex flex-col w-full p-4 bg-white'>
              <h1 className='uppercase'>{consultaDenuncia.labels.denuncia}</h1>
              <p className='font-bold'>{resultado?.legajo?.doc_id}</p>
            </div>
          )}
          {resultado?.legajo?.doc_padre && (
            <div className='flex flex-col w-full p-4 bg-white'>
              <h1 className='uppercase'>{consultaDenuncia.labels.legajo}</h1>
              <p className='font-bold'>{resultado?.legajo?.doc_padre}</p>
            </div>
          )}
        </div>
        <div className='flex flex-row items-center justify-between w-full p-4 space-x-4'>
          <h1 className='font-bold'>{`${resultado?.legajo?.per_nombre} ${resultado?.legajo?.per_apellido}`}</h1>
          <span className='italic font-bold'>{`${
            resultado?.legajo?.art_numero ? resultado?.legajo?.art_numero : ''
          } ${
            resultado?.legajo?.art_descripcion
              ? resultado?.legajo?.art_descripcion
              : ''
          }`}</span>
          <span className='font-bold text-green-900 uppercase'>{`${
            resultado?.legajo?.fe_nombre ? resultado?.legajo?.fe_nombre : ''
          } - ${
            resultado?.legajo?.fse_nombre ? resultado?.legajo?.fse_nombre : ''
          }`}</span>
        </div>
        <div className='flex flex-col items-center justify-center w-full p-4 space-y-2 bg-white'>
          <div className='flex flex-row items-center justify-start w-full space-x-2'>
            <h1>{consultaDenuncia.labels.radicacion}:</h1>
            <p className='font-bold'>{resultado?.dependencia?.aal_nombre}</p>
          </div>
          <div className='flex flex-row items-center justify-start w-full space-x-2'>
            <h1>{consultaDenuncia.labels.direccion}:</h1>
            <p className='font-bold'>{resultado?.dependencia?.aal_direccion}</p>
          </div>
          <div className='flex flex-row items-center justify-start w-full space-x-2'>
            <h1>{consultaDenuncia.labels.contacto}:</h1>
            <div className='flex flex-row items-center justify-around space-x-2 font-bold'>
              <a href={`tel:${resultado?.dependencia?.aal_telefono}`}>
                {resultado?.dependencia?.aal_telefono}
              </a>
              <span>-</span>
              <a href={`mailto:${resultado?.dependencia?.dep_email}`}>
                {resultado?.dependencia?.dep_email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
