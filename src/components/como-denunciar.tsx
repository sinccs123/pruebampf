'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Dictionary } from '@/lib/dictionary';

type ComoDenunciarProps = {
  dictionary: Dictionary;
};

type ReportType = {
  image: string;
  title: string;
  text: string;
  action: () => void;
  kind?: 'default' | 'phone';
};

type StepType = {
  stepNumber: string;
  title: string;
  text: string;
};

const Step = ({ stepNumber, title, text }: StepType) => (
  <div>
    <p className='how-report-step-number text-lime-600 text-[17px] md:text-[22px] 2xl:text-[30px] text-left'>
      {stepNumber}
    </p>
    <p className='how-report-step-title text-[22px] md:text-[28px] mb-2.5 md:mt-2 text-primary 2xl:text-[38px] 2xl:my-5 text-left'>
      {title}
    </p>
    <p
      dangerouslySetInnerHTML={{ __html: text }}
      className='how-report-step-copy text-base md:text-xl md:mt-2 2xl:mt-6 2xl:text-[27px] 2xl:leading-[35px] text-left'
    ></p>
  </div>
);

const ReportTypeBox = ({ reportType }: { reportType: ReportType }) => (
  <div
    className={`how-report-type-box flex items-center gap-4 cursor-pointer ${
      reportType.kind === 'phone' ? 'how-report-type-box-phone' : ''
    }`}
    onClick={reportType.action}
  >
    <Image
      src={reportType.image}
      alt={reportType.text}
      width='65'
      height='65'
      className='how-report-type-icon shrink-0 w-[65px] h-[65px] 2xl:w-[85px] 2xl:h-[85px]'
    />
    <div
      className={`how-report-type-content min-w-0 ${
        reportType.kind === 'phone' ? 'how-report-type-content-phone' : ''
      }`}
    >
      <p
        className={`how-report-type-title text-lg md:text-[22px] xl:text-2xl text-primary ${
          reportType.kind === 'phone' ? 'how-report-type-title-phone' : ''
        }`}
      >
        {reportType.title}
      </p>
      <p className='how-report-type-caption text-sm md:text-[17px] xl:text-2xl text-cyan-600'>
        {reportType.text}
      </p>
    </div>
  </div>
);

export default function ComoDenunciar({ dictionary }: ComoDenunciarProps) {
  const router = useRouter();
  const { comoDenunciar, menu } = dictionary;

  const reportTypes: ReportType[] = [
    {
      image: 'images/web.svg',
      title: comoDenunciar?.reportOnlineTitle,
      text: comoDenunciar?.reportOnlineText,
      action: () => router.push('/denuncia/ahora'),
    },
    {
      image: 'images/mail.svg',
      title: comoDenunciar?.reportEmailTitle,
      text: comoDenunciar?.reportEmailText,
      action: () =>
        (window.location.href = `mailto:${comoDenunciar?.reportEmailText}`),
    },
    {
      image: 'images/telefono.svg',
      title: comoDenunciar?.reportPhoneTitle,
      text: comoDenunciar?.reportPhoneText,
      kind: 'phone',
      action: () =>
        (window.location.href = `tel:${comoDenunciar?.reportPhoneText}`),
    },
  ];

  const recommendations = [
    comoDenunciar?.recommendation1,
    comoDenunciar?.recommendation2,
    comoDenunciar?.recommendation3,
    comoDenunciar?.recommendation4,
  ];

  return (
    <div id='howReport'>
      <div className='how-report-main p-8 md:p-16 2xl:px-32 2xl:pt-32'>
        <h2 className='how-report-heading relative mt-4 2xl:mt-6 mb-8 text-xl text-center md:text-3xl sectionTitle md:mb-20 2xl:mb-16'>
          {menu?.howReport}
        </h2>
        <div className='text-xl'>
          <Step
            stepNumber={comoDenunciar?.step1}
            title={comoDenunciar?.step1Title}
            text={comoDenunciar?.step1Text}
          />
          <div className='how-report-types flex flex-col mt-8 space-y-4 md:items-center lg:flex-row lg:items-stretch lg:justify-center lg:gap-16 lg:space-y-0 lg:mt-20 2xl:gap-24'>
            {reportTypes.map((reportType) => (
              <ReportTypeBox reportType={reportType} key={reportType.title} />
            ))}
          </div>
        </div>
        <div className='pt-8 mt-8 text-xl border-t md:mt-16 2xl:mt-12 border-stone-200 md:border-0'>
          <Step
            stepNumber={comoDenunciar?.step2}
            title={comoDenunciar?.step2Title}
            text={comoDenunciar?.step2Text}
          />
        </div>
      </div>

      <div className='recommendations-block recomendaciones-bg px-8 pt-6 pb-8 bg-gray-100 md:bg-gray-300 md:p-16 2xl:pt-12] lg:pr-[380px]'>
        <p className='text-primary text-[22px] md:text-[28px] mb-2 2xl:text-[38px] text-left'>
          {comoDenunciar?.recommendationsTitle}
        </p>
        <ul className='recommendations-list text-base md:text-[19px] md:list-disc list-outside 2xl:w-9/12 2xl:mr-auto 2xl:mt-6'>
          {recommendations.map((recomendation) => (
            <li
              key={recomendation}
              className='recommendations-item my-4 md:my-2 2xl:text-[27px] 2xl:leading-[35px] ml-4'
            >
              {recomendation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
