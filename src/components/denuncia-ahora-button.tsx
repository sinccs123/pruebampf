import Link from 'next/link';
import { usePathname } from 'next/navigation';

type DenunciaAhoraButtonProps = {
  isSticky: Boolean;
  buttonText: String;
};

export default function DenunciaAhoraButton({
  isSticky,
  buttonText,
}: DenunciaAhoraButtonProps) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  return (
    <Link
      href={`/${locale}/denuncia/ahora`}
      className={`
              inline-flex text-xl lg:text-xl 2xl:text-[2rem] text-primary
              py-3 lg:py-4 2xl:py-4
              px-10 lg:px-10 2xl:px-14

              border border-primary shadow-md rounded-lg font-bold m-auto
              transition-all duration-300 ease-in
              ${
                isSticky
                  ? 'sticky-report-button bg-primary text-white  md:border-0 md:rounded-tl-none md:rounded-tr-none sticky top-[85px] 2xl:top-[105px] left-8 md:left-16 2xl:left-32 z-[1]'
                  : 'md:bg-white md:text-primary'
              }`}
    >
      {buttonText}
    </Link>
  );
}
