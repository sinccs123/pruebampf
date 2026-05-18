//import 'server-only';
import type { Locale } from '@/lib/i18n';

const dictionaries = {
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  br: () => import('@/dictionaries/br.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.es();

export interface Dictionary {
  labels: {
    welcome: string;
    fieldRequired: string;
    invalidPassport: string;
    invalidDocument: string;
    finishing: string;
    finish: string;
    check: string;
    checking: string;
    back: string;
    select: string;
    geolocalization: {
      error: string;
    };
    toast: {
      copySuccess: string;
      denuncia: {
        envioOk: string;
        envioError: string;
        envioOkDescripcion: string;
      };
    };
    sectionTitles: {
      hecho: string;
      denunciante: string;
      denunciado: string;
      adicionales: string;
      adjuntos: string;
    };
    placeholders: {
      denunciaMotivo: string;
      denunciaDetalle: string;
      denunciaDireccion: string;
      denunciaDireccionDesconocida: string;
      denunciaFechaDesconocida: string;
      denunciaFecha: string;
      denunciaHoraInicio: string;
      denunciaHoraFin: string;
      denuncianteAnonimo: string;
      denuncianteNombre: string;
      denuncianteApellido: string;
      denuncianteDocumentoTipo: string;
      denuncianteDocumentoNumero: string;
      denuncianteFechaDeNacimiento: string;
      denuncianteNacionalidad: string;
      denuncianteGenero: string;
      denuncianteDireccion: string;
      denuncianteTelefono: string;
      denuncianteEmail: string;
      denunciandoDesconocido: string;
      denunciadoTipoDePersona: string;
      denunciadoNombre: string;
      denunciadoApellido: string;
      denunciadoApodo: string;
      denunciadoDireccion: string;
      denunciadoEmail: string;
      denunciadoRedSocial: string;
      denunciadoTelefono: string;
      denunciadoDocumentoTipo: string;
      denunciadoDocumentoNumero: string;
      denunciadoFechaDeNacimiento: string;
      denunciadoNacionalidad: string;
      denunciadoGenero: string;
      denunciadoRazonSocial: string;
      denunciadoNombreDeFantasia: string;
    };
    email: {
      subject: string;
      title: string;
    };
    aibot: {
      title: string;
      onlineMessage: string;
      placeholder: string;
      placeholderSending: string;
    };
  };
  menu: {
    home: string;
    reportNow: string;
    howReport: string;
    whatReport: string;
    whereReport: string;
    checkStatus: string;
    orientation: string;
  };
  denunciaAhora: {
    text: string;
    subtext: string;
    buttonText: string;
  };
  comoDenunciar: {
    step1: string;
    step1Title: string;
    step1Text: string;
    reportOnlineTitle: string;
    reportOnlineText: string;
    reportEmailTitle: string;
    reportEmailText: string;
    reportPhoneTitle: string;
    reportPhoneText: string;
    step2: string;
    step2Title: string;
    step2Text: string;
    recommendationsTitle: string;
    recommendation1: string;
    recommendation2: string;
    recommendation3: string;
    recommendation4: string;
    recommendation5?: string;
  };
  queDenunciar: {
    key: string;
    title: string;
    description: string;
    arts: string;
  }[];
  consultaDenuncia: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    notFound: string;
    labels: {
      seguimiento: string;
      denuncia: string;
      legajo: string;
      radicacion: string;
      direccion: string;
      contacto: string;
    };
  };
  dondeDenunciar: {
    selectPlaceholder: string;
  };
  queQueresDenunciar: {
    title: string;
    recommendationBox: {
      title: string;
      text: string;
    };
    recommendationEmailBox: {
      title: string;
      text: string;
    };
  };
  generos: { value: string; label: string }[];
  tiposDocumentos: { value: string; label: string }[];
  tiposPersonas: { value: string; label: string }[];
}
