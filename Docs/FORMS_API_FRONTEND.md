# Documentación API: Formularios Públicos y Autenticación de Clientes

**Fecha:** 2025-09-24
**Versión:** 1.0
**Autor:** Gemini Agent
**Ámbito:** Guía técnica para la integración de formularios de contacto públicos en el frontend y la futura autenticación de clientes (`Party`) en un portal dedicado.

---

## 1. Resumen y Flujo de Trabajo

Esta funcionalidad permite a los visitantes del sitio web enviar consultas a través de un formulario. El backend procesa estos envíos para:

1.  Capturar los datos del cliente.
2.  Crear o identificar al cliente en la colección `Party`.
3.  Crear una credencial de acceso para un futuro portal de clientes.
4.  Enviar un email de bienvenida con dichas credenciales.
5.  Almacenar el mensaje como una `Inquiry` para su gestión en el backoffice.

**Importante:** Este proceso crea una `Party` con capacidad de autenticación, **no** un `User` administrador.

---

## 2. Endpoint del Formulario de Contacto

Este es el único endpoint que el frontend necesita para enviar los datos del formulario.

- **Endpoint:** `POST /api/v1/forms/contact`
- **Autenticación:** No requerida (endpoint público).
- **Descripción:** Procesa el envío de un formulario de contacto.

### 2.1. Body de la Petición (DTO `CreateFormDto`)

El body debe ser un objeto JSON con la siguiente estructura.

**DTO (`create-form.dto.ts`):**
```typescript
import { IsString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber(null)
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsOptional()
  origin?: string; // ej: 'contact-form', 'schedule-visit-form'

  @IsString()
  @IsOptional()
  propertyId?: string; // ID de la propiedad, si aplica
}
```

**Ejemplo de Body JSON (Formulario de Contacto General):**
```json
{
  "name": "Carlos",
  "lastName": "Santana",
  "email": "carlos.santana@example.com",
  "phone": "+5491155558888",
  "message": "Hola, tengo una consulta general sobre sus servicios.",
  "origin": "contact-form"
}
```

**Ejemplo de Body JSON (Coordinar una Visita):**
```json
{
  "name": "Ana",
  "lastName": "García",
  "email": "ana.garcia@example.com",
  "phone": "+5491122223333",
  "message": "Quisiera coordinar una visita para ver esta propiedad el próximo sábado.",
  "origin": "schedule-visit-form",
  "propertyId": "66a1b2c3d4e5f6a7b8c9d0e0"
}
```

### 2.2. Respuestas del Endpoint

- **Respuesta Exitosa (200 OK):**
  Indica que el formulario fue procesado correctamente.
  ```json
  {
    "message": "Form submission processed successfully."
  }
  ```

- **Respuesta de Error (400 Bad Request):**
  Ocurre si algún campo no pasa la validación (ej: email inválido, campos vacíos).
  ```json
  {
    "message": [
      "email must be an email",
      "phone must be a valid phone number"
    ],
    "error": "Bad Request",
    "statusCode": 400
  }
  ```

---

## 3. Proceso Detallado del Backend

Comprender este flujo ayuda a prever el comportamiento del sistema:

1.  **Recepción:** El `FormsController` recibe la petición en `POST /forms/contact`.
2.  **Validación:** El DTO `CreateFormDto` valida automáticamente los datos.
3.  **Búsqueda de Cliente:** El `FormsService` busca en la colección `Party` si ya existe un cliente con ese `email`.
4.  **Caso 1: Cliente Nuevo**
    - Se genera una contraseña temporal segura.
    - Se llama a `partyService.create()` para crear una nueva `Party` con los datos del formulario y la contraseña generada. El `pre-save` hook en la entidad `Party` se encarga de hashear la contraseña antes de guardarla.
    - Se envía un email de bienvenida al cliente con su usuario (`email`) y la contraseña temporal.
5.  **Caso 2: Cliente Existente**
    - No se modifica la `Party` existente ni se envía ningún email.
6.  **Creación de Consulta:** En ambos casos, se crea un documento `Inquiry` con el `message`, el `origin` y el `propertyId` (si viene) del formulario, y se asocia a la `Party` (nueva o existente).

---

## 4. Autenticación de Clientes (Portal de Clientes)

El sistema ahora sienta las bases para un futuro portal donde los clientes (`Party`) puedan iniciar sesión.

### 4.1. Modelo de Autenticación para `Party`

- La entidad `Party` ahora tiene un campo `password` (privado y hasheado).
- Se debe crear un nuevo flujo de autenticación específico para `Party`, separado del de `User`.

### 4.2. Endpoint Propuesto para Login de Clientes

Para habilitar el login de clientes, se deberá crear el siguiente endpoint:

- **Endpoint Propuesto:** `POST /api/v1/party/login`
- **Descripción:** Autentica a una `Party` y devuelve un token JWT.
- **Body Esperado:**
  ```json
  {
    "email": "carlos.santana@example.com",
    "password": "la-contraseña-temporal-o-nueva"
  }
  ```
- **Lógica de Backend Requerida:**
  1.  Crear un método en `PartyService` o un nuevo `PartyAuthService`.
  2.  Buscar la `Party` por email.
  3.  Comparar la contraseña enviada con el hash guardado en la base de datos usando `bcrypt.compare()`.
  4.  Si es válida, generar un token JWT con el `_id` y `email` de la `Party`.
- **Respuesta Exitosa Propuesta (200 OK):**
  ```json
  {
    "access_token": "jwt-token-para-party",
    "client": {
      "_id": "66a2c3d4e5f6a7b8c9d0e1f1",
      "name": "Carlos Santana",
      "email": "carlos.santana@example.com"
    }
  }
  ```

---

## 5. Ejemplo de Implementación en Frontend (React)

Aquí un ejemplo de un formulario de contacto usando `react-hook-form` y `axios`.

```jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const API_URL = '/api/v1/forms/contact';

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (data) => {
    setServerError('');
    setSuccessMessage('');
    try {
      const response = await axios.post(API_URL, data);
      setSuccessMessage(response.data.message || '¡Gracias por tu consulta! Te contactaremos pronto.');
      reset();
    } catch (error) {
      const message = error.response?.data?.message || 'Ocurrió un error al enviar tu mensaje.';
      if (Array.isArray(message)) {
        setServerError(message.join(', '));
      } else {
        setServerError(message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Contacto</h2>

      <div>
        <label htmlFor="name">Nombre</label>
        <input id="name" {...register('name', { required: 'El nombre es obligatorio' })} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email', { required: 'El email es obligatorio' })} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone">Teléfono</label>
        <input id="phone" type="tel" {...register('phone', { required: 'El teléfono es obligatorio' })} />
        {errors.phone && <p style={{ color: 'red' }}>{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="message">Mensaje</label>
        <textarea id="message" {...register('message', { required: 'El mensaje es obligatorio' })} />
        {errors.message && <p style={{ color: 'red' }}>{errors.message.message}</p>}
      </div>

      {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar Consulta'}
      </button>
    </form>
  );
}

export default ContactForm;
```
