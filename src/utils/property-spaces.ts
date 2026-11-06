export interface PropertySpace {
  type: string;
  quantity: number;
}

// Keep these names aligned with the backoffice PropertySpacesEditor.
const SPACE_LABELS: Record<string, [string, string]> = {
  ambiente: ['Ambiente sin especificar', 'Ambientes sin especificar'],
  living: ['Living', 'Livings'],
  living_comedor: ['Living comedor', 'Livings comedor'],
  cocina: ['Cocina', 'Cocinas'],
  cocina_comedor: ['Cocina comedor', 'Cocinas comedor'],
  dormitorio: ['Dormitorio', 'Dormitorios'],
  escritorio: ['Escritorio', 'Escritorios'],
  vestidor: ['Vestidor', 'Vestidores'],
  salon_comercial: ['Salón comercial', 'Salones comerciales'],
  vidriera: ['Vidriera', 'Vidrieras'],
  carteleria: ['Cartelería', 'Cartelerías'],
  mostrador: ['Mostrador de atención', 'Mostradores de atención'],
  probador: ['Probador', 'Probadores'],
  entrepiso: ['Entrepiso', 'Entrepisos'],
  bano: ['Baño', 'Baños'],
  bano_suite: ['Baño en suite', 'Baños en suite'],
  bano_accesible: ['Baño accesible', 'Baños accesibles'],
  toilette: ['Toilette', 'Toilettes'],
  lavadero: ['Lavadero', 'Lavaderos'],
  deposito: ['Depósito', 'Depósitos'],
  patio: ['Patio', 'Patios'],
  patio_fogon: ['Patio con fogón', 'Patios con fogón'],
  jardin: ['Jardín', 'Jardines'],
  jardin_parquizado: ['Jardín parquizado', 'Jardines parquizados'],
  quincho: ['Quincho', 'Quinchos'],
  balcon: ['Balcón', 'Balcones'],
  terraza: ['Terraza', 'Terrazas'],
  piscina: ['Piscina', 'Piscinas'],
  piscina_climatizada: ['Piscina climatizada', 'Piscinas climatizadas'],
  hall_entrada: ['Hall de entrada', 'Halls de entrada'],
  cochera: ['Cochera', 'Cocheras'],
  entrada_auto: ['Entrada de auto', 'Entradas de auto'],
  acceso_compartido: ['Acceso compartido', 'Accesos compartidos'],
  patio_compartido: ['Patio compartido', 'Patios compartidos'],
  persiana_metalica: ['Persiana metálica', 'Persianas metálicas'],
  acceso_carga_descarga: ['Acceso para carga y descarga', 'Accesos para carga y descarga'],
};

export function getPropertySpaceLabel({type, quantity}: PropertySpace): string {
  return SPACE_LABELS[type]?.[quantity === 1 ? 0 : 1] ?? type.replaceAll('_', ' ');
}

export function getPropertySpaceEntries(spaces: PropertySpace[], amenities: string[]) {
  const normalizeName = (name: string) =>
    name.trim().toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[_\s]+/g, ' ');
  const knownNames = new Set(spaces.map(({type}) => normalizeName(getPropertySpaceLabel({type, quantity: 1}))));
  const entries: Array<{key: string; label: string; quantity?: number}> = spaces.map((space) => ({
    key: space.type,
    label: getPropertySpaceLabel(space),
    quantity: space.quantity,
  }));

  for (const label of amenities) {
    const name = normalizeName(label);
    if (!name || knownNames.has(name)) continue;
    knownNames.add(name);
    entries.push({key: `amenity:${name}`, label});
  }

  return entries;
}

export function getPropertySpaces(value: unknown, specs?: {
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  garageCount?: number;
}): PropertySpace[] {
  // An explicit [] means no spaces. Only older records without an array use the counters.
  const source: unknown[] = Array.isArray(value) ? value : [
    {type: 'ambiente', quantity: specs?.rooms},
    {type: 'dormitorio', quantity: specs?.bedrooms},
    {type: 'bano', quantity: specs?.bathrooms},
    {type: 'cochera', quantity: specs?.garageCount},
  ];
  const quantities = new Map<string, number>();
  for (const item of source) {
    if (!item || typeof item !== 'object') continue;
    const {type, quantity} = item as {type?: unknown; quantity?: unknown};
    const count = Math.floor(Number(quantity));
    if (typeof type === 'string' && type.trim() && Number.isFinite(count) && count > 0) {
      quantities.set(type, (quantities.get(type) ?? 0) + count);
    }
  }
  return Array.from(quantities, ([type, quantity]) => ({type, quantity}));
}
