# Denuncias

Sitio web de Denuncias del Ministerio Público Fiscal de la C.A.B.A.

## Diseño

- [Mobile](https://xd.adobe.com/view/2373de4a-532f-43ba-bccb-828c3c2c625f-7620/)
- [Desktop](https://xd.adobe.com/view/48f98e25-eee8-4cad-8d39-3f25b561e513-1daa/)
- [Guía responsive](./GUIA_RESPONSIVE.md)

## Configuración del proyecto

### Variables de entorno

Se deben configurar las siguientes variables de entorno:

```
# USIG
NEXT_PUBLIC_USIG_API_URL=
# GOOGLE
NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=
NEXT_PUBLIC_GOOGLE_MAP_ID=
GOOGLE_RECAPTCHA_SECRET_KEY=
# MPF
NEXT_PUBLIC_MPF_DENUNCIA_ORIGEN=
NEXT_PUBLIC_MPF_DENUNCIA_ORIGEN_ORGANISMO=
MPFAPI_URL=
KIWIAPI_URL=
# SMTP
SMTP_FROM=
SMTP_HOST=
SMTP_TLS=
SMTP_USERNAME=
SMTP_PASSWORD=
# LANGFLOW
LANGFLOW_EMBEDDED_CHAT_BUNDLE=
LANGFLOW_EMBEDDED_CHAT_URL=
LANGFLOW_EMBEDDED_CHAT_FLOW_ID=
LANGFLOW_EMBEDDED_CHAT_TITLE=
LANGFLOW_EMBEDDED_CHAT_API_KEY=
```

### Ejecución

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el browser para ver el sitio.
