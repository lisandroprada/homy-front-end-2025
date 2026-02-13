'use client';
import {useState} from 'react';
import {toast} from 'react-toastify';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {submitContactForm} from '@/services/api/forms';
import {CreateFormDto} from '@/types/forms';

interface SellFormData {
  name: string;
  email: string;
  phone: string;
  property_type: string;
  address: string;
  message: string;
}

const schema = yup.object({
  name: yup.string().required('Nombre requerido'),
  email: yup.string().required('Correo requerido').email('Correo inválido'),
  phone: yup.string().required('Teléfono requerido'),
  property_type: yup.string().required('Tipo requerido'),
  address: yup.string().required('Dirección requerida'),
  message: yup.string().required('Descripción requerida'),
});

const SellForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<SellFormData>({resolver: yupResolver(schema)});

  const [serverError, setServerError] = useState('');

  const onSubmit = async (data: SellFormData) => {
    setServerError('');
    try {
      const fullMessage = `Tipo de Inmueble: ${data.property_type}\nDirección: ${data.address}\n\nDescripción: ${data.message}`;
      const formData: CreateFormDto = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: fullMessage,
        origin: 'sell-form',
      };
      await submitContactForm(formData);
      toast.success('Solicitud para vender enviada correctamente', {position: 'top-center'});
      reset();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Ocurrió un error al enviar tu mensaje.';
      const errorMessage = Array.isArray(message) ? message.join(', ') : message;
      setServerError(errorMessage);
      toast.error(errorMessage, {position: 'top-center'});
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='messages'></div>
      <div className='row gx-0 align-items-center'>
        <div className='col-12'>
          <div className='input-box-one bottom-border mb-25'>
            <div className='label'>Nombre*</div>
            <input type='text' className='type-input' {...register('name')} placeholder='Tu nombre*' />
            <p className='form_error'>{errors.name?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-box-one bottom-border mb-25'>
            <div className='label'>Correo electrónico*</div>
            <input type='email' className='type-input' {...register('email')} placeholder='Correo electrónico*' />
            <p className='form_error'>{errors.email?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-box-one bottom-border mb-25'>
            <div className='label'>Teléfono*</div>
            <input type='tel' className='type-input' {...register('phone')} placeholder='Tu teléfono*' />
            <p className='form_error'>{errors.phone?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-box-one bottom-border mb-25'>
            <div className='label'>Tipo de inmueble*</div>
            <input type='text' className='type-input' {...register('property_type')} placeholder='Tipo de inmueble*' />
            <p className='form_error'>{errors.property_type?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-box-one bottom-border mb-25'>
            <div className='label'>Dirección*</div>
            <input type='text' className='type-input' {...register('address')} placeholder='Dirección, barrio o referencia*' />
            <p className='form_error'>{errors.address?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-box-one bottom-border mb-35'>
            <div className='label'>Descripción*</div>
            <textarea className='type-input' {...register('message')} placeholder='Describí la propiedad a vender*'></textarea>
            <p className='form_error'>{errors.message?.message}</p>
          </div>
        </div>
        {serverError && (
          <div className='col-12'>
            <p className='form_error' style={{color: 'red'}}>
              {serverError}
            </p>
          </div>
        )}
        <div className='col-12'>
          <div className='input-box-one'>
            <button type='submit' disabled={isSubmitting} className='btn-five text-uppercase rounded-0 w-100'>
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SellForm;
