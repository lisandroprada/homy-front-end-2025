'use client';
import React, {useRef} from 'react';
import emailjs from '@emailjs/browser';
import {toast} from 'react-toastify';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

interface SellFormData {
  user_name: string;
  user_email: string;
  property_type: string;
  address: string;
  description: string;
}

const schema = yup.object({
  user_name: yup.string().required('Nombre requerido'),
  user_email: yup.string().required('Correo requerido').email('Correo inválido'),
  property_type: yup.string().required('Tipo requerido'),
  address: yup.string().required('Dirección requerida'),
  description: yup.string().required('Descripción requerida'),
});

const SellForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<SellFormData>({resolver: yupResolver(schema)});

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (data: SellFormData) => {
    if (form.current) {
      emailjs.sendForm('lisandro.prada@gmail.com', 'template_q7oik61', form.current, 'p29ZbKTlYFkdF9mMW').then(
        (result) => {
          toast('Mensaje enviado correctamente', {position: 'top-center'});
          reset();
        },
        (error) => {
          toast('Error al enviar el mensaje', {position: 'top-center'});
        }
      );
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit(sendEmail)}>
      {/* <h3>Vender propiedad</h3> */}
      <div className='messages'></div>
      <div className='row gx-0 align-items-center'>
        <div className='col-12'>
          <div className='input-box-one bottom-border mb-25'>
            <div className='label'>Nombre*</div>
            <input type='text' className='type-input' {...register('user_name')} name='user_name' placeholder='Tu nombre*' />
            <p className='form_error'>{errors.user_name?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-box-one bottom-border mb-25'>
            <div className='label'>Correo electrónico*</div>
            <input type='email' className='type-input' {...register('user_email')} placeholder='Correo electrónico*' name='user_email' />
            <p className='form_error'>{errors.user_email?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-box-one bottom-border mb-25'>
            <div className='label'>Tipo de inmueble*</div>
            <input type='text' className='type-input' {...register('property_type')} placeholder='Tipo de inmueble*' name='property_type' />
            <p className='form_error'>{errors.property_type?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-box-one bottom-border mb-25'>
            <div className='label'>Dirección*</div>
            <input type='text' className='type-input' {...register('address')} placeholder='Dirección, barrio o referencia*' name='address' />
            <p className='form_error'>{errors.address?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-box-one bottom-border mb-35'>
            <div className='label'>Descripción*</div>
            <textarea className='type-input' {...register('description')} placeholder='Describí la propiedad a vender*' name='description'></textarea>
            <p className='form_error'>{errors.description?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-box-one'>
            <button type='submit' className='btn-five text-uppercase rounded-0 w-100'>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SellForm;
