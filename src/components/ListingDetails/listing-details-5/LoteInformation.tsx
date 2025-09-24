import React, {useState, useEffect} from 'react';
import Image from 'next/image';

// Tipos de datos según la documentación de la API
interface Point {
  x: number;
  y: number;
}

interface Lot {
  id: string;
  name: string;
  points: Point[];
  status: 'available' | 'sold' | 'reserved' | 'pending' | 'inactive';
  price?: number;
  surface?: number;
  description?: string;
}

interface SatelliteImage {
  name: string;
  url: string;
  width?: number; // Ancho original de la imagen en píxeles. INDISPENSABLE para escalar polígonos.
  height?: number; // Alto original de la imagen en píxeles. INDISPENSABLE para escalar polígonos.
}

interface Property {
  satelliteImage?: SatelliteImage;
  lots?: Lot[];
}

// --- Componente LoteCard --- //

interface CardProps {
  lote: Lot | null;
}

const LoteCard: React.FC<CardProps> = ({lote}) => {
  if (!lote) {
    return (
      <div className='bg-white rounded-3 shadow-sm p-4 d-flex flex-column align-items-center justify-content-center' style={{minHeight: 250}}>
        <i className='bi bi-geo-alt fs-1 text-primary mb-2' />
        <h3 className='fs-22 fw-600 mb-2'>Selecciona un lote</h3>
        <p className='text-muted text-center'>Haz clic en un lote del mapa para ver sus detalles.</p>
      </div>
    );
  }

  const getStatusBadge = () => {
    switch (lote.status) {
      case 'available':
        return <span className='badge bg-success px-2 py-1 ms-auto'>Disponible</span>;
      case 'sold':
        return <span className='badge bg-danger px-2 py-1 ms-auto'>Vendido</span>;
      case 'reserved':
        return <span className='badge bg-warning text-dark px-2 py-1 ms-auto'>Reservado</span>;
      default:
        return <span className='badge bg-secondary px-2 py-1 ms-auto'>{lote.status}</span>;
    }
  };

  return (
    <div className='bg-white rounded-3 shadow-sm p-4'>
      <div className='d-flex align-items-center mb-3 gap-2'>
        <i className='bi bi-map fs-2 text-primary' />
        <h3 className='fs-22 fw-600 mb-0'>{lote.name}</h3>
        {getStatusBadge()}
      </div>
      <ul className='list-unstyled mb-3'>
        {lote.surface && (
          <li className='mb-2 d-flex align-items-center gap-2'>
            <i className='bi bi-aspect-ratio text-muted' />
            <span className='fw-500'>Superficie:</span> <span className='ms-auto'>{lote.surface} m²</span>
          </li>
        )}
        {lote.price && (
          <li className='mb-2 d-flex align-items-center gap-2'>
            <i className='bi bi-currency-dollar text-muted' />
            <span className='fw-500'>Precio:</span> <span className='ms-auto text-success fw-bold'>${lote.price.toLocaleString()}</span>
          </li>
        )}
      </ul>
      {lote.description && (
        <div className='mb-2'>
          <span className='fw-500 text-muted'>Descripción:</span>
          <p className='mb-0 mt-1 lh-base'>{lote.description}</p>
        </div>
      )}
    </div>
  );
};

// --- Componente Principal LoteInformation --- //

interface LoteInformationProps {
  property: Property;
}

const LoteInformation: React.FC<LoteInformationProps> = ({property}) => {
  const {satelliteImage, lots} = property;
  const [selectedLote, setSelectedLote] = useState<Lot | null>(null);

  // New useEffect to set the initial selected lot
  useEffect(() => {
    if (lots && lots.length > 0) {
      setSelectedLote(lots[0]);
    }
  }, [lots]); // Dependency array includes 'lots' so it runs when lots data changes

  if (!satelliteImage?.url || !lots || !satelliteImage.width || !satelliteImage.height) {
    return (
      <div className='alert alert-warning text-center'>
        <i className='bi bi-exclamation-triangle fs-3 me-2'></i>
        No hay información de lotes, imagen satelital o sus dimensiones disponible para esta propiedad.
      </div>
    );
  }

  // Las dimensiones originales son cruciales para el escalado.
  const originalWidth = satelliteImage.width;
  const originalHeight = satelliteImage.height;
  const canRenderPolygons = originalWidth && originalHeight;

  return (
    <div className='container'>
      <div className='row justify-content-center align-items-start g-4'>
        <div className='col-lg-9 col-md-8 col-12'>
          <div className='position-relative w-100'>
                        <Image
              src={satelliteImage.url}
              alt='Mapa satelital'
              width={originalWidth as number}
              height={originalHeight as number}
              style={{width: '100%', height: 'auto'}}
              className='rounded-3'
            />
            {canRenderPolygons && (
              <svg
                style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                viewBox={`0 0 ${originalWidth} ${originalHeight}`}
                preserveAspectRatio='none'
              >
                {lots.map((lote) => {
                  const rawPoints = lote.points.map((point) => `${point.x},${point.y}`).join(' ');

                  // Calculate centroid for text positioning
                  let centerX = 0;
                  let centerY = 0;
                  lote.points.forEach(point => {
                    centerX += point.x;
                    centerY += point.y;
                  });
                  centerX /= lote.points.length;
                  centerY /= lote.points.length;

                  return (
                    <React.Fragment key={lote.id}>
                      <polygon
                        points={rawPoints}
                        onClick={() => setSelectedLote(lote)}
                        vectorEffect='non-scaling-stroke'
                        style={{
                          cursor: 'pointer',
                          fill: selectedLote?.id === lote.id ? 'rgba(25, 118, 210, 0.7)' : 'rgba(144, 202, 249, 0.7)',
                          stroke: '#1565c0',
                          strokeWidth: 2,
                          opacity: lote.status === 'sold' ? 0.4 : 0.9,
                          transition: 'fill 0.2s',
                        }}
                      />
                      <text
                        x={centerX}
                        y={centerY}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fill="black"
                        fontSize="40"
                        fontWeight="bold"
                        pointerEvents="none"
                      >
                        {lote.name}
                      </text>
                    </React.Fragment>
                  );
                })}
              </svg>
            )}
          </div>
        </div>
        <div className='col-lg-3 col-md-4 col-12'>
          <LoteCard lote={selectedLote} />
        </div>
      </div>
    </div>
  );
};

export default LoteInformation;
