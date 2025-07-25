'use client';
import React, {useRef} from 'react';
import emailjs from '@emailjs/browser';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {toast} from 'react-toastify';

interface ScheduleFormData {
  user_name: string;
  user_email: string;
  user_phone: string;
  message: string;
}

interface ScheduleFormProps {
  propertyId: string;
  propertyAddress: string;
}

const schema = yup.object({
  user_name: yup.string().required('El nombre es obligatorio'),
  user_email: yup.string().required('El correo es obligatorio').email('Correo inválido'),
  user_phone: yup.string().required('El teléfono es obligatorio'),
  message: yup.string().required('El mensaje es obligatorio'),
});

const ScheduleForm = ({propertyId, propertyAddress}: ScheduleFormProps) => {
  const form = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<ScheduleFormData>({resolver: yupResolver(schema)});

  const sendEmail = (data: ScheduleFormData) => {
    // Agregar info de la propiedad al mensaje
    const fullMessage = `Consulta por propiedad\nID: ${propertyId}\nDirección: ${propertyAddress}\n\n${data.message}`;
    const dataWithProperty = {...data, message: fullMessage};

    if (form.current) {
      // Crear un FormData manualmente para enviar los datos modificados
      const formData = new FormData(form.current);
      formData.set('message', fullMessage);

      emailjs.send('lisandro.prada@gmail.com', 'template_q7oik61', Object.fromEntries(formData.entries()), 'p29ZbKTlYFkdF9mMW').then(
        (result) => {
          toast('Consulta enviada correctamente', {position: 'top-center'});
          reset();
        },
        (error) => {
          toast('Error al enviar la consulta', {position: 'top-center', type: 'error'});
        }
      );
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit(sendEmail)}>
      <div className='input-box-three mb-25'>
        <div className='label'>Tu Nombre*</div>
        <input type='text' placeholder='Tu nombre completo' className='type-input' {...register('user_name')} name='user_name' />
        <p className='form_error'>{errors.user_name?.message}</p>
      </div>
      <div className='input-box-three mb-25'>
        <div className='label'>Tu Correo*</div>
        <input type='email' placeholder='Ingresa tu correo electrónico' className='type-input' {...register('user_email')} name='user_email' />
        <p className='form_error'>{errors.user_email?.message}</p>
      </div>
      <div className='input-box-three mb-25'>
        <div className='label'>Tu Teléfono*</div>
        <input type='tel' placeholder='Tu número de teléfono' className='type-input' {...register('user_phone')} name='user_phone' />
        <p className='form_error'>{errors.user_phone?.message}</p>
      </div>
      <div className='input-box-three mb-15'>
        <div className='label'>Mensaje*</div>
        <textarea placeholder='Hola, estoy interesado/a en [California Apartments]' {...register('message')} name='message'></textarea>
        <p className='form_error'>{errors.message?.message}</p>
      </div>
      <button className='btn-nine text-uppercase rounded-3 w-100 mb-10'>CONSULTAR</button>
    </form>
  );
};

export default ScheduleForm;
