import axios from 'axios';
import { API_BASE_URL } from '@/utils/apiConfig';

export const subscribeNewsletter = async (data: {
  email: string;
  name?: string;
}): Promise<{ message: string }> => {
  const response = await axios.post(`${API_BASE_URL}/newsletter/subscribe`, data);
  return response.data;
};

export const unsubscribeNewsletter = async (
  token: string,
): Promise<{ message: string }> => {
  const response = await axios.get(`${API_BASE_URL}/newsletter/unsubscribe`, {
    params: { token },
  });
  return response.data;
};
