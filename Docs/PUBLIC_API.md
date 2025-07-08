# API Pública de Propiedades

Este endpoint permite a la web pública consultar propiedades con paginación y filtros, sin autenticación. Solo se exponen campos públicos y no se incluyen datos sensibles como propietarios o inquilinos.

---

## Endpoint

```
GET /api/v1/property/public
```

---

## Parámetros soportados (query params)

- `page`: número de página (empezando en 0, opcional, default: 0)
- `pageSize`: cantidad de resultados por página (opcional, default: 10)
- `sort`: campo de ordenamiento (ej: createdAt, opcional)
- Cualquier campo público de la entidad Property puede usarse como filtro (ej: `type`, `status`, `province`, `locality`, `address`, etc.)
- `populate`: por defecto `province,locality` (no se permite owners ni tenant)

---

## Ejemplo de Request

```
GET /api/v1/property/public?page=0&pageSize=6&type=departamento&status=disponible&province=507f1f77bcf86cd799439011
```

---

## Ejemplo de Response

```json
{
  "items": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "address": "Av. Corrientes 1234, Buenos Aires",
      "province": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Buenos Aires"
      },
      "locality": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "CABA"
      },
      "type": "departamento",
      "status": "disponible",
      "available": true,
      "img": [
        {
          "name": "foto1.webp",
          "thumb": "/uploads/properties/thumb/foto1.webp"
        }
      ],
      "imgCover": {
        "name": "foto1.webp",
        "thumbWeb": "/uploads/properties/thumbWeb/foto1.webp"
      },
      "createdAt": "2025-06-26T10:30:00.000Z",
      "active": true,
      "publishForSale": true,
      "publishForRent": false
    }
    // ...más propiedades
  ],
  "meta": {
    "totalItems": 12,
    "itemCount": 6,
    "itemsPerPage": 6,
    "totalPages": 2,
    "currentPage": 0
  }
}
```

---

## Notas

- Solo se devuelven propiedades con `publishForSale: true` o `publishForRent: true`.
- No se exponen datos de propietarios, inquilinos ni usuarios.
- Los filtros y paginación funcionan igual que en el endpoint privado, pero solo con campos públicos.
- El campo `populate` solo permite `province` y `locality`.
- Los resultados pueden usarse directamente para mostrar listados y fichas públicas en la web.

---

## Detalle de campos anidados

### detailedDescription (objeto)

- `availableServices` (string[]): Servicios disponibles (ej: ["agua corriente", "gas natural"])
- `sqFt` (number): Superficie total en m²
- `buildSqFt` (number): Superficie cubierta en m²
- `age` (number): Antigüedad de la propiedad (años)
- `petFriendly` (boolean): Si acepta mascotas
- `rooms` (number): Cantidad de ambientes
- `bathrooms` (number): Cantidad de baños
- `orientation` (string): Orientación (ej: "norte", "sur")
- `title` (string): Título breve de la propiedad
- `brief` (string): Descripción corta

### valueForSale y valueForRent (objeto, solo si pricePublic=true)

- `amount` (number): Valor de venta/alquiler
- `currency` (string): Moneda (ej: "ARS", "USD")
- `pricePublic` (boolean): Si el precio es público
- `paymentMethod` (string): Método de pago sugerido
- `description` (string): Observaciones sobre el precio
- `date` (Date): Fecha de actualización del valor

---

## Ejemplo de búsqueda por campos anidados

- Buscar por cantidad de ambientes:
  ```
  GET /api/v1/property/public?detailedDescription.rooms=3
  ```
- Buscar por valor de venta:
  ```
  GET /api/v1/property/public?valueForSale.amount=100000
  ```

> Puedes filtrar por cualquier subcampo anidado usando la notación de punto en el nombre del parámetro.

---

## Ejemplo de filtro por localidad y tipo

```
GET /api/v1/property/public?type=ph&locality=507f1f77bcf86cd799439012
```

---

## Ejemplo de filtro por texto en dirección

```
GET /api/v1/property/public?address=Corrientes
```

---

## Ejemplo de paginación y ordenamiento

```
GET /api/v1/property/public?page=1&pageSize=3&sort=createdAt
```

---

## Campos públicos devueltos

- \_id
- address
- province
- locality
- lat
- lng
- gmaps
- type
- purpose
- status
- available
- availableAt
- specs
- img
- imgCover
- detailedDescription
- createdAt
- active
- publishForSale
- publishForRent
- valueForSale (solo si pricePublic=true)
- valueForRent (solo si pricePublic=true)

---

Para cualquier duda, consulta al equipo backend.
