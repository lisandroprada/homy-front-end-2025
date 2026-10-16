export type CatalogAvailability = 'all' | 'available' | 'sold';

export default function CatalogAvailabilityFilter({value, onChange, rental = false}: {
  value: CatalogAvailability;
  onChange: (value: CatalogAvailability) => void;
  rental?: boolean;
}) {
  return (
    <fieldset className="mb-30">
      <legend className="fs-16 fw-500">Estado de las propiedades</legend>
      <div className="d-flex flex-wrap gap-3">
        {([
          ['all', 'Todas'], ['available', 'Disponibles'], ['sold', 'Vendidas'],
        ] as const).filter(([key]) => !rental || key === 'available').map(([key, label]) => (
          <label key={key} className="d-inline-flex align-items-center gap-2 fs-16">
            <input type="radio" name="catalog-availability" value={key} checked={value === key} onChange={() => onChange(key)} />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
