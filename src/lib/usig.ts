import { CONFIG } from '@/lib/config';

export const geolocalizar = async (direccion: string) => {
  const uri = `${CONFIG.USIG_API_URL}/normalizar?direccion=${direccion}&geocodificar=TRUE`;
  const res = await fetch(uri);
  const data = await res.json();
  return data;
};
