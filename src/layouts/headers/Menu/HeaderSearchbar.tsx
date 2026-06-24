'use client';
import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import SafeImage from '@/components/common/SafeImage';
import {getPropertyPriceDisplay} from '@/utils/property-price';

interface Locality {
  _id: string;
  nombre: string;
  provincia: string;
}

interface Property {
  _id: string;
  title: string;
  address: string;
  imgCover?: {thumbWeb: string};
  valueForSale?: {amount: number; currency?: string};
  valueForRent?: {amount: number; currency?: string};
  publishForSale?: boolean;
  publishForRent?: boolean;
}

const QUICK_LINKS = [
  {label: 'Alquileres', icon: 'bi bi-house-door', href: '/listing_06'},
  {label: 'Ventas', icon: 'bi bi-building', href: '/listing_06'},
  {label: 'Ver en mapa', icon: 'bi bi-map', href: '/listing_14'},
  {label: 'Contacto', icon: 'bi bi-telephone', href: '/contact'},
];

const HeaderSearchbar = ({isSearch, setIsSearch}: any) => {
  const [query, setQuery] = useState('');
  const [localities, setLocalities] = useState<Locality[]>([]);
  const [filteredLocalities, setFilteredLocalities] = useState<Locality[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedLocality, setSelectedLocality] = useState<Locality | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isSearch) {
      if (localities.length === 0) {
        fetch('/api/v1/reference/locality/with-available-properties')
          .then((r) => r.json())
          .then((data) => setLocalities(Array.isArray(data) ? data : []))
          .catch(() => {});
      }
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
      setSelectedLocality(null);
      setProperties([]);
      setFilteredLocalities([]);
    }
  }, [isSearch]);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredLocalities([]);
      return;
    }
    const q = query.toLowerCase();
    setFilteredLocalities(
      localities
        .filter((l) => l.nombre.toLowerCase().includes(q) || l.provincia.toLowerCase().includes(q))
        .slice(0, 6),
    );
  }, [query, localities]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearch(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setIsSearch]);

  const handleSelectLocality = async (loc: Locality) => {
    setSelectedLocality(loc);
    setQuery(loc.nombre);
    setFilteredLocalities([]);
    setIsLoading(true);
    try {
      const res = await fetch(`/api/v1/property/public?locality=${loc._id}&pageSize=4`);
      const data = await res.json();
      setProperties(Array.isArray(data.items) ? data.items : []);
    } catch {
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearch(false);
    router.push('/listing_14');
  };

  return (
    <>
      <div className={`modal fade search-modal ${isSearch ? 'active' : ''}`} id='searchModal'>
        <div className='modal-dialog modal-fullscreen modal-dialog-centered'>
          <div
            className='modal-content d-flex justify-content-start align-items-center'
            style={{paddingTop: '10vh', paddingBottom: '5vh', overflowY: 'auto'}}
          >
            {/* Search input */}
            <div style={{position: 'relative', width: '100%', maxWidth: 680}}>
              <form onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedLocality(null);
                    setProperties([]);
                  }}
                  type='text'
                  placeholder='Buscar por ciudad o zona...'
                  autoComplete='off'
                />
                <button type='submit'>
                  <i className='fa-light fa-arrow-right-long'></i>
                </button>
              </form>

              {/* Locality autocomplete */}
              {filteredLocalities.length > 0 && (
                <ul
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: '#fff',
                    listStyle: 'none',
                    margin: 0,
                    padding: '4px 0',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                    borderRadius: '0 0 12px 12px',
                    zIndex: 20,
                  }}
                >
                  {filteredLocalities.map((loc) => (
                    <li key={loc._id}>
                      <button
                        type='button'
                        onClick={() => handleSelectLocality(loc)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '11px 20px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#f5f5f5')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'none')}
                      >
                        <i className='bi bi-geo-alt' style={{color: '#888', fontSize: 15}}></i>
                        <span style={{fontWeight: 600, color: '#222'}}>{loc.nombre}</span>
                        <span style={{color: '#999', fontSize: 13}}>{loc.provincia}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Quick action chips */}
            <div style={{display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28, justifyContent: 'center', maxWidth: 680}}>
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsSearch(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 18px',
                    borderRadius: 24,
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: 14,
                    border: '1px solid rgba(255,255,255,0.3)',
                    transition: 'background 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <i className={link.icon} style={{fontSize: 15}}></i>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Loading */}
            {isLoading && (
              <div style={{marginTop: 36, color: 'rgba(255,255,255,0.8)'}}>
                <div className='spinner-border' style={{width: 28, height: 28, borderColor: 'rgba(255,255,255,0.4)', borderTopColor: '#fff'}} role='status'>
                  <span className='visually-hidden'>Buscando...</span>
                </div>
              </div>
            )}

            {/* Property results */}
            {!isLoading && properties.length > 0 && selectedLocality && (
              <div style={{marginTop: 36, width: '100%', maxWidth: 720, padding: '0 16px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14}}>
                  <span style={{color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: 15}}>
                    Propiedades en {selectedLocality.nombre}
                  </span>
                  <Link
                    href='/listing_14'
                    onClick={() => setIsSearch(false)}
                    style={{color: 'rgba(255,255,255,0.6)', fontSize: 13, textDecoration: 'none'}}
                  >
                    Ver todas →
                  </Link>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                    gap: 12,
                  }}
                >
                  {properties.map((p) => (
                    <Link
                      key={p._id}
                      href={`/listing_details_05/${p._id}`}
                      onClick={() => setIsSearch(false)}
                      style={{
                        textDecoration: 'none',
                        borderRadius: 10,
                        overflow: 'hidden',
                        background: '#fff',
                        display: 'block',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                      }}
                    >
                      <div style={{height: 100, position: 'relative'}}>
                        <SafeImage
                          src={p.imgCover?.thumbWeb}
                          alt={p.title || ''}
                          fill
                          style={{objectFit: 'cover'}}
                          fallbackHeight={100}
                        />
                      </div>
                      <div style={{padding: '8px 10px'}}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: '#222',
                            lineHeight: 1.3,
                            marginBottom: 3,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {p.address || p.title}
                        </div>
                        <div style={{fontSize: 12, color: '#555'}}>
                          {p.publishForRent ? getPropertyPriceDisplay(p, 'rent') : getPropertyPriceDisplay(p, 'sale')}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state when a locality was selected but has no properties */}
            {!isLoading && selectedLocality && properties.length === 0 && (
              <p style={{marginTop: 32, color: 'rgba(255,255,255,0.6)', fontSize: 14}}>
                No hay propiedades disponibles en {selectedLocality.nombre}.
              </p>
            )}
          </div>
        </div>
      </div>
      <div
        onClick={() => setIsSearch(false)}
        className={`search-backdrop modal-backdrop fade ${isSearch ? 'show' : ''}`}
      ></div>
    </>
  );
};

export default HeaderSearchbar;
