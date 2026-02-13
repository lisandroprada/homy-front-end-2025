'use client';
import {useState} from 'react';
import {toast} from 'react-toastify';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
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

const ContactForm = () => {
  console.log('ContactForm renders');
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<Omit<CreateFormDto, 'origin' | 'propertyId' | 'lastName'>>({resolver: yupResolver(schema)});

  console.log('Form errors:', errors);

  const [serverError, setServerError] = useState('');

  const onSubmit = async (data: Omit<CreateFormDto, 'origin' | 'propertyId' | 'lastName'>) => {
    console.log('onSubmit called with data:', data);
    setServerError('');
    try {
      const formData: CreateFormDto = {...data, origin: 'contact-form'};
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
      <h3>Enviar mensaje</h3>
      <div className='messages'></div>
      <div className='row controls'>
        <div className='col-12'>
          <div className='input-group-meta form-group mb-30'>
            <label htmlFor='name'>Nombre*</label>
            <input type='text' {...register('name')} placeholder='Tu nombre*' />
            <p className='form_error'>{errors.name?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-group-meta form-group mb-40'>
            <label htmlFor='email'>Correo electrónico*</label>
            <input type='email' {...register('email')} placeholder='Correo electrónico*' />
            <p className='form_error'>{errors.email?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-group-meta form-group mb-40'>
            <label htmlFor='phone'>Teléfono*</label>
            <input type='tel' {...register('phone')} placeholder='Tu teléfono*' />
            <p className='form_error'>{errors.phone?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-group-meta form-group mb-35'>
            <textarea {...register('message')} placeholder='Tu mensaje*'></textarea>
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
          <button type='submit' disabled={isSubmitting} className='btn-nine text-uppercase rounded-3 fw-normal w-100'>
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
