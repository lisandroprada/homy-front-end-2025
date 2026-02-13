'use client';
import {toast} from 'react-toastify';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useState} from 'react';
import {submitContactForm} from '@/services/api/forms';
import {CreateFormDto} from '@/types/forms';

const schema = yup
  .object({
    name: yup.string().required('El nombre es obligatorio').label('Nombre'),
    email: yup.string().required('El correo es obligatorio').email('Correo inválido').label('Correo electrónico'),
    phone: yup.string().required('El teléfono es obligatorio').label('Teléfono'),
    message: yup.string().required('El mensaje es obligatorio').label('Mensaje'),
  })
  .required();

const AgencyFormTwo = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<Omit<CreateFormDto, 'origin' | 'propertyId' | 'lastName'>>({resolver: yupResolver(schema)});

  const [serverError, setServerError] = useState('');

  const onSubmit = async (data: Omit<CreateFormDto, 'origin' | 'propertyId' | 'lastName'>) => {
    setServerError('');
    try {
      const formData: CreateFormDto = {...data, origin: 'agency-contact-form'};
      await submitContactForm(formData);
      toast.success('¡Gracias por tu consulta! Te contactaremos pronto.', {position: 'top-center'});
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
      <div className='input-box-three mb-25'>
        <div className='label'>Tu nombre*</div>
        <input type='text' {...register('name')} placeholder='Ingresa tu nombre' className='type-input rounded-0' />
        <p className='form_error'>{errors.name?.message}</p>
      </div>
      <div className='input-box-three mb-25'>
        <div className='label'>Tu correo electrónico*</div>
        <input type='email' {...register('email')} placeholder='Ingresa tu correo electrónico' className='type-input rounded-0' />
        <p className='form_error'>{errors.email?.message}</p>
      </div>
      <div className='input-box-three mb-25'>
        <div className='label'>Tu teléfono*</div>
        <input type='tel' {...register('phone')} placeholder='Tu número de teléfono' className='type-input rounded-0' />
        <p className='form_error'>{errors.phone?.message}</p>
      </div>
      <div className='input-box-three mb-15'>
        <div className='label'>Mensaje*</div>
        <textarea {...register('message')} placeholder='Hola, estoy interesado/a en [California Apartments]' className='rounded-0'></textarea>
        <p className='form_error'>{errors.message?.message}</p>
      </div>
      {serverError && (
        <div className='col-12'>
          <p className='form_error' style={{color: 'red'}}>
            {serverError}
          </p>
        </div>
      )}
      <button type='submit' disabled={isSubmitting} className='btn-nine text-uppercase w-100 mb-20'>
        {isSubmitting ? 'Enviando...' : 'CONSULTAR'}
      </button>
    </form>
  );
};

export default AgencyFormTwo;
