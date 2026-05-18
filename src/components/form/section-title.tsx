interface FormSectionTitleProps {
  text: string;
  className?: string;
}

export default function SectionTitle({ text, className }: FormSectionTitleProps) {
  return (
    <p className={`relative text-center before:block before:absolute before:content-[""] before:bg-gray-400 before:right-0 before:left-0 before:top-2/4 before:h-px py-4 ${className}`}>
      <span className='text-xs text-gray-400 uppercase bg-white px-3 relative'>
        {text}
      </span>
    </p>
  );
}
