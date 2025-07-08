import axios from 'axios';

// Instancia de Axios con baseURL desde variable de entorno
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3050/api/v1',
});

// Servicio base para fetch con manejo de errores y tipado usando Axios
export async function fetcher<T>(url: string): Promise<T> {
  const res = await api.get(url);
  return res.data;
}
