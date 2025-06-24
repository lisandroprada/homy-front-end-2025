'use client';
import {toast} from 'react-toastify';

import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

interface FormData {
  email: string;
  phone: number;
  message: string;
}

const schema = yup
  .object({
    phone: yup
      .number()
      .transform((originalValue, originalObject) => {
        // Convert empty string to NaN
        return originalObject && originalObject.phone === '' ? NaN : originalValue;
      })
      .typeError('El número de teléfono es obligatorio')
      .required('El teléfono debe ser un número'),
    email: yup.string().required().email().label('Correo electrónico'),
    message: yup.string().required().label('Mensaje'),
  })
  .required();

const AgencyFormTwo = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>({resolver: yupResolver(schema)});
  const onSubmit = (data: FormData) => {
    const notify = () => toast('Reseña enviada correctamente', {position: 'top-center'});
    notify();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <button type='submit' className='btn-nine text-uppercase w-100 mb-20'>
        CONSULTAR
      </button>
    </form>
  );
};

export default AgencyFormTwo;
