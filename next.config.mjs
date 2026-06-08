/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // Server Action POST body limit (default 1MB). The denuncia form uploads files.
    serverActions: {
      bodySizeLimit: '100mb',
    },
    // The middleware intercepts /[lang]/denuncia/ahora (matcher only excludes `api`),
    // so the Server Action body also passes through middleware (default 10MB).
    middlewareClientMaxBodySize: '100mb',
  },
};

export default nextConfig;
