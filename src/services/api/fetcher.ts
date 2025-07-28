import axios from 'axios';
import {API_BASE_URL} from '../../utils/apiConfig';

// Instancia de Axios con baseURL desde variable de entorno
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Servicio base para fetch con manejo de errores y tipado usando Axios
export async function fetcher<T>(url: string): Promise<T> {
  const res = await api.get(url);
  return res.data;
}
