import axios from 'axios';
import { API_BASE_URL } from '@/utils/apiConfig';
import { CreateFormDto } from '@/types/forms';

export const submitContactForm = async (data: CreateFormDto) => {
  console.log('Attempting to submit contact form with data:', data);
  try {
    const response = await axios.post(API_BASE_URL + '/forms/contact', data);
    console.log('Contact form submission successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};
