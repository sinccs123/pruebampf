import { CONFIG } from '@/lib/config';

const FIFTEEN_DAYS_IN_SECONDS = 1296000;

const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const procesarArchivos = async (archivos: File[]) => {
  const archivosProcesados = await Promise.all(
    Array.from(archivos).map(async (archivo) => {
      const buffer = Buffer.from(await archivo.arrayBuffer());
      return `data:${archivo.type};base64,${buffer.toString('base64')}`;
    })
  );
  return archivosProcesados;
};

export const armarRequest = async (values: any) => {
  const {
    denunciaMotivo,
    denunciaDetalle,
    denunciaDireccion,
    denunciaDireccionDesconocida,
    denunciaFechaDesconocida,
    denunciaFecha,
    denunciaHoraInicio,
    denunciaHoraFin,
  } = values;

  const {
    denuncianteAnonimo,
    denuncianteNombre,
    denuncianteApellido,
    denuncianteDocumentoTipo,
    denuncianteDocumentoNumero,
    denuncianteFechaDeNacimiento,
    denuncianteNacionalidad,
    denuncianteGenero,
    denuncianteDireccion,
    denuncianteTelefono,
    denuncianteEmail,
  } = values;

  const {
    denunciadoDesconocido,
    denunciadoTipoDePersona,
    denunciadoNombre,
    denunciadoApellido,
    denunciadoApodo,
    denunciadoRazonSocial,
    denunciadoNombreDeFantasia,
    denunciadoDireccion,
    denunciadoEmail,
    denunciadoDocumentoTipo,
    denunciadoDocumentoNumero,
    denunciadoFechaDeNacimiento,
    denunciadoNacionalidad,
    denunciadoGenero,
    denunciadoTelefono,
  } = values;

  const { uploadFiles } = values;

  const { datosCelular } = values;

  const personas = [];
  if (
    denuncianteAnonimo !== 'on' &&
    (denuncianteNombre.length > 0 || denuncianteApellido.length > 0)
  ) {
    let denuncianteDireccionCalle = '';
    let denuncianteDireccionAltura = '';
    if (denuncianteDireccion.length > 0) {
      const direccionArray = denuncianteDireccion
        ? denuncianteDireccion.split(' ')
        : [];
      denuncianteDireccionAltura = direccionArray.pop();
      denuncianteDireccionCalle = direccionArray.join(' ');
    }

    personas.push({
      tipo: 'FISICA',
      nombre: denuncianteNombre,
      apellido: denuncianteApellido,
      sexo: denuncianteGenero,
      nacionalidad: denuncianteNacionalidad,
      fec_nac: denuncianteFechaDeNacimiento,
      rol: 'DENUNCIANTE',
      documentos: [
        {
          tipo: denuncianteDocumentoTipo,
          numero: denuncianteDocumentoNumero,
          sexo: denuncianteGenero,
        },
      ],
      contactos: [
        { tipo: 'TELEFONO', valor: denuncianteTelefono },
        { tipo: 'EMAIL', valor: denuncianteEmail },
      ],
      domicilios: [
        {
          calle: denuncianteDireccionCalle,
          altura: denuncianteDireccionAltura,
        },
      ],
    });
  }
  const denunciadoDireccionArr = denunciadoDireccion
    ? denunciadoDireccion.split(' ')
    : [];
  const denunciadoDireccionAltura = denunciadoDireccionArr.pop();
  const denunciadoDireccionCalle = denunciadoDireccionArr.join(' ');
  personas.push({
    tipo: denunciadoTipoDePersona,
    nombre:
      denunciadoDesconocido && denunciadoDesconocido === 'on'
        ? 'NN'
        : denunciadoTipoDePersona === 'FISICA'
        ? denunciadoNombre
        : denunciadoRazonSocial,
    razon_social:
      denunciadoDesconocido && denunciadoDesconocido === 'on'
        ? ''
        : denunciadoRazonSocial,
    alias:
      denunciadoTipoDePersona === 'FISICA'
        ? denunciadoApodo
        : denunciadoNombreDeFantasia,
    apellido:
      denunciadoDesconocido && denunciadoDesconocido === 'on'
        ? 'NN'
        : denunciadoTipoDePersona === 'FISICA'
        ? denunciadoApellido
        : '',
    sexo: denunciadoGenero,
    nacionalidad:
      denunciadoTipoDePersona === 'FISICA' ? denunciadoNacionalidad : '',
    fec_nac:
      denunciadoTipoDePersona === 'FISICA' ? denunciadoFechaDeNacimiento : '',
    rol: 'DENUNCIADO',
    documentos: [
      {
        tipo: denunciadoDocumentoTipo,
        numero: denunciadoDocumentoNumero,
        sexo: denunciadoGenero,
      },
    ],
    contactos: [
      { tipo: 'TELEFONO', valor: denunciadoTelefono },
      { tipo: 'EMAIL', valor: denunciadoEmail },
    ],
    domicilios: [
      {
        calle: denunciadoDireccionCalle,
        altura: denunciadoDireccionAltura,
      },
    ],
    info_adicional: '',
  });
  const imagenes = await procesarArchivos(uploadFiles);
  const denunciaDireccionArr = denunciaDireccion
    ? denunciaDireccion.split(' ')
    : [];
  const denunciaDireccionAlturaS = denunciaDireccionArr.pop();
  const denunciaDireccionCalleS = denunciaDireccionArr.join(' ');
  const request: any = {
    recaptcha_token: '',
    origen: CONFIG.MPF_DENUNCIA_ORIGEN,
    origen_organismo: CONFIG.MPF_DENUNCIA_ORIGEN_ORGANISMO,
    coordx_google: '',
    coordy_google: '',
    telefono: denuncianteTelefono,
    email: denuncianteEmail,
    hecho: denunciaDetalle,
    fecha_inicio: denunciaFecha,
    hora_inicio: denunciaHoraInicio,
    fecha_fin: denunciaFecha,
    hora_fin: denunciaHoraFin,
    lugar_determinacion:
      denunciaDireccionDesconocida || denunciaDireccion.length === 0
        ? 'INDETERMINADO'
        : 'DETERMINADO',
    lugar_calle: denunciaDireccionCalleS || '',
    lugar_altura: denunciaDireccionAlturaS || '',
    coordx_usig: '',
    coordy_usig: '',
    vg: denunciaMotivo === 'vg' ? 'VG' : '',
    personas,
    imagenes: imagenes,
  };
  if (datosCelular) {
    request.datosCelular = datosCelular;
  }
  return request;
};

export const mpfapi = {
  nacionalidades: async () => {
    const nacionalidadesRes = await fetch(
      `${CONFIG.MPFAPI_URL}/api/kiwi/v1.3/lista_valor/nacionalidad`,
      {
        next: {
          revalidate: FIFTEEN_DAYS_IN_SECONDS,
        },
      }
    );
    const nacionalidades = await nacionalidadesRes.json();
    return [...nacionalidades.data];
  },
  ingresarDenuncia: async (denuncia: any) => {
    const denunciaIngresadaRes = await fetch(
      `${CONFIG.KIWIAPI_URL}/v1.0/denuncias_externas`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(denuncia),
      }
    );
    return await denunciaIngresadaRes.json();
  },
  consultarDenuncia: async (id: number) => {
    const consultaDenunciaRes = await fetch(
      `${CONFIG.KIWIAPI_URL}/v1.0/denuncias_externas/${id}/estado`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return await consultaDenunciaRes.json();
  },
};
