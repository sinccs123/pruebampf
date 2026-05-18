'use client';

import {
  AdvancedMarkerAnchorPoint,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
  useMap,
} from '@vis.gl/react-google-maps';

import { Dictionary } from '@/lib/dictionary';
import {
  Barrio,
  MapTypeId,
  MPF_MAP_STYLES,
  USIG_MAPA_BASE_URL,
} from '@/lib/map';

import { CONFIG } from '@/lib/config';
import { useCallback, useEffect, useState } from 'react';
import DropdownBarrios from './form/dropdown-barrios';
import { AdvancedMarkerWithRef } from './map/advanced-marker-with-ref';

type DondeDenunciarProps = {
  dictionary: Dictionary;
  apiKey: string;
};

const MAP_SETTINGS = {
  center: { lat: -34.623124, lng: -58.368273 },
  zoom: 13,
  gesture: 'greedy',
  type: MapTypeId.ROADMAP,
  styles: MPF_MAP_STYLES,
  disableDefaultUI: true,
  latMargin: 0.009,
};

function DondeDenunciarMap({
  dictionary,
}: Omit<DondeDenunciarProps, 'apiKey'>) {
  const { menu } = dictionary;
  const [barrios, setBarrios] = useState<Barrio[]>([]);
  const map = useMap();

  const [hoverId, setHoverId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [selectedMarker, setSelectedMarker] = useState<Barrio | null>(null);
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const onMouseEnter = useCallback((id: number | null) => setHoverId(id), []);
  const onMouseLeave = useCallback(() => setHoverId(null), []);
  const onMarkerClick = (barrio: Barrio) => {
    if (map && barrio) {
      map.setCenter({
        lat: barrio.lat,
        lng: barrio.lon,
      });
      setSelectedId(barrio.id);
      setSelectedMarker(barrio);
      setInfoWindowShown(true);
    }
  };

  const onMapClick = useCallback(() => {
    setSelectedId(null);
    setSelectedMarker(null);
    setInfoWindowShown(false);
  }, []);

  const handleInfowindowCloseClick = useCallback(
    () => setInfoWindowShown(false),
    []
  );

  const handleSetFieldValue = (_: string, value: any, __?: boolean) => {
    const barrioMarker = barrios.filter((b) => b.value === value)[0];
    if (!map) return;
    map.setCenter({
      lat: barrioMarker.lat,
      lng: barrioMarker.lon,
    });
    setSelectedId(barrioMarker.id);
    setSelectedMarker(barrioMarker);
    setInfoWindowShown(true);
  };

  useEffect(() => {
    const fetchBarrios = async () => {
      const barriosResponse = await fetch(CONFIG.SITIOAPI_BARRIOS_ENDPOINT);
      const barriosData = await barriosResponse.json();
      setBarrios(
        barriosData.map((b: Barrio, idx: number) => ({
          ...b,
          label: `${b.nombre}\n${b.direccion} ${b.altura}`,
          value: b.id.toString(),
          zIndex: idx,
        }))
      );
    };
    fetchBarrios();
  }, []);

  return (
    <div className='p-8 md:p-16 2xl:p-32' id='whereReport'>
      <h2 className='relative mt-4 mb-8 text-xl text-center md:text-3xl sectionTitle md:mb-20'>
        {menu?.whereReport}
      </h2>
      <div className='lg:flex lg:flex-row lg:gap-10'>
        <div className='py-8 lg:p-0 fixed-width lg:w-80'>
          <DropdownBarrios
            options={barrios}
            name='Barrios'
            setFieldValue={handleSetFieldValue}
            defaultValue={selectedMarker?.value}
          />
        </div>
        <div className='lg:flex-grow'>
          <Map
            mapId={CONFIG.GOOGLE_MAP_ID}
            style={{ width: '100%', height: '500px' }}
            defaultCenter={MAP_SETTINGS.center}
            defaultZoom={MAP_SETTINGS.zoom}
            gestureHandling={MAP_SETTINGS.gesture}
            mapTypeId={MAP_SETTINGS.type}
            styles={MAP_SETTINGS.styles}
            disableDefaultUI={MAP_SETTINGS.disableDefaultUI}
            onClick={onMapClick}
          >
            {barrios.map((barrio: Barrio) => (
              <AdvancedMarkerWithRef
                onMarkerClick={(_: google.maps.marker.AdvancedMarkerElement) =>
                  onMarkerClick(barrio)
                }
                onMouseEnter={() => onMouseEnter(barrio.id)}
                onMouseLeave={onMouseLeave}
                key={barrio.id}
                zIndex={barrio.zIndex}
                style={{
                  transform: `scale(${
                    [hoverId, selectedId].includes(barrio.id) ? 1.3 : 1
                  })`,
                  transformOrigin:
                    AdvancedMarkerAnchorPoint['BOTTOM'].join(' '),
                }}
                position={{
                  lat: barrio.lat,
                  lng: barrio.lon,
                }}
              >
                <Pin
                  background={selectedId === barrio.id ? '#0BA7BE' : '#006272'}
                  borderColor={selectedId === barrio.id ? '#000' : '#FFF'}
                  glyphColor={selectedId === barrio.id ? '#000' : '#FFF'}
                />
              </AdvancedMarkerWithRef>
            ))}
            {infoWindowShown && selectedMarker && (
              <InfoWindow
                pixelOffset={[0, -2]}
                onCloseClick={handleInfowindowCloseClick}
                position={{
                  lat: selectedMarker.lat + MAP_SETTINGS.latMargin,
                  lng: selectedMarker.lon,
                }}
              >
                <h2 className='text-lg font-semibold'>
                  {selectedMarker.nombre}
                </h2>
                <p>
                  {selectedMarker.direccion} {selectedMarker.altura}
                  {selectedMarker.detalle_direccion && (
                    <>
                      <br />
                      <small>{selectedMarker.detalle_direccion}</small>
                    </>
                  )}
                </p>
                <p>{selectedMarker.horario}</p>
                <a
                  href={`${USIG_MAPA_BASE_URL}&lat=${selectedMarker.lat}&lng=${selectedMarker.lon}&hasta=${selectedMarker.lat},${selectedMarker.lon}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-secondary text-xl font-bold mt-2 inline-block'
                >
                  ¿Cómo llegar?
                </a>
              </InfoWindow>
            )}
          </Map>
        </div>
      </div>
    </div>
  );
}

export default function DondeDenunciar({
  dictionary,
  apiKey,
}: DondeDenunciarProps) {
  return (
    <APIProvider apiKey={apiKey}>
      <DondeDenunciarMap dictionary={dictionary} />
    </APIProvider>
  );
}
