export interface Barrio {
  id: number;
  value: string;
  nombre: string;
  label?: string;
  tipo_dependencia: string;
  direccion: string | null;
  detalle_direccion: string;
  altura: number | null;
  telefono: string | null;
  lat: number;
  lon: number;
  horario: string;
  activo: number;
  zIndex?: number;
}

export const MapTypeId = {
  HYBRID: 'hybrid',
  ROADMAP: 'roadmap',
  SATELLITE: 'satellite',
  TERRAIN: 'terrain',
};

export const MPF_MAP_STYLES = [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#004358' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#1f8a70' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#1f8a70' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#fd7400' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#1f8a70' }, { lightness: -20 }],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{ color: '#1f8a70' }, { lightness: -17 }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#ffffff' }, { visibility: 'on' }, { weight: 0.9 }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ visibility: 'on' }, { color: '#ffffff' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'simplified' }],
  },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#1f8a70' }, { lightness: -10 }],
  },
  {},
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#1f8a70' }, { weight: 0.7 }],
  },
] as google.maps.MapTypeStyle[];

export const USIG_MAPA_BASE_URL =
  'https://mapa.buenosaires.gob.ar/comollego/?zl=15&modo=transporte';
