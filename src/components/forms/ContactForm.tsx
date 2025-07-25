'use client';
import React, {useRef} from 'react';
import emailjs from '@emailjs/browser';
import {toast} from 'react-toastify';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

interface FormData {
  user_name: string;
  user_email: string;
  message: string;
}

const schema = yup
  .object({
    user_name: yup.string().required().label('Nombre'),
    user_email: yup.string().required().email().label('Correo electrónico'),
    message: yup.string().required().label('Mensaje'),
  })
  .required();

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>({resolver: yupResolver(schema)});

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (data: FormData) => {
    if (form.current) {
      emailjs.sendForm('lisandro.prada@gmail.com', 'template_q7oik61', form.current, 'p29ZbKTlYFkdF9mMW').then(
        (result) => {
          const notify = () => toast('Mensaje enviado correctamente', {position: 'top-center'});
          notify();
          reset();
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    } else {
      console.error('La referencia al formulario es nula');
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit(sendEmail)}>
      <h3>Enviar mensaje</h3>
      <div className='messages'></div>
      <div className='row controls'>
        <div className='col-12'>
          <div className='input-group-meta form-group mb-30'>
            <label htmlFor=''>Nombre*</label>
            <input type='text' {...register('user_name')} name='user_name' placeholder='Tu nombre*' />
            <p className='form_error'>{errors.user_name?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-group-meta form-group mb-40'>
            <label htmlFor=''>Correo electrónico*</label>
            <input type='email' {...register('user_email')} placeholder='Correo electrónico*' name='user_email' />
            <p className='form_error'>{errors.user_email?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-group-meta form-group mb-35'>
            <textarea {...register('message')} placeholder='Tu mensaje*'></textarea>
            <p className='form_error'>{errors.message?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <button type='submit' className='btn-nine text-uppercase rounded-3 fw-normal w-100'>
            Enviar mensaje
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
