'use client';
import React, {useRef, useState} from 'react';
import emailjs from '@emailjs/browser';
import {toast} from 'react-toastify';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import NiceSelect from '@/ui/NiceSelect';

interface AppraiseFormData {
  user_name: string;
  user_email: string;
  user_phone: string;
  property_type: string;
  address: string;
  description: string;
}

const schema = yup.object({
  user_name: yup.string().required('Nombre requerido'),
  user_email: yup.string().required('Correo requerido').email('Correo inválido'),
  user_phone: yup.string().required('Teléfono requerido'),
  property_type: yup.string().required('Tipo requerido'),
  address: yup.string().required('Dirección requerida'),
  description: yup.string().required('Descripción requerida'),
});

const AppraiseForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm<AppraiseFormData>({resolver: yupResolver(schema)});

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (data: AppraiseFormData) => {
    // Mapear los datos a los campos del template
    const templateParams = {
      name: data.user_name,
      email: data.user_email,
      interest: data.property_type,
      phone: data.user_phone,
      time: new Date().toLocaleString('es-AR'),
      message: `Teléfono: ${data.user_phone}\nDirección: ${data.address}\n\nDescripción: ${data.description}`,
    };
    emailjs.send('lisandro.prada@gmail.com', 'template_q7oik61', templateParams, 'p29ZbKTlYFkdF9mMW').then(
      (result) => {
        toast('Mensaje enviado correctamente', {position: 'top-center'});
        reset();
      },
      (error: any) => {
        console.log(error);
        toast('Error al enviar el mensaje', {position: 'top-center'});
      }
    );
  };

  return (
    <form ref={form} onSubmit={handleSubmit(sendEmail)}>
      {/* <h3>Solicitar Tasación</h3> */}
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
            <NiceSelect
              className='nice-select fw-normal'
              options={[
                {value: 'Casa', text: 'Casa'},
                {value: 'Departamento', text: 'Departamento'},
                {value: 'PH', text: 'PH'},
                {value: 'Oficina', text: 'Oficina'},
                {value: 'Local Comercial', text: 'Local Comercial'},
                {value: 'Galpón', text: 'Galpón'},
                {value: 'Lote', text: 'Lote'},
                {value: 'Quinta', text: 'Quinta'},
                {value: 'Chacra', text: 'Chacra'},
                {value: 'Estudio', text: 'Estudio'},
                {value: 'Loft', text: 'Loft'},
                {value: 'Duplex', text: 'Duplex'},
                {value: 'Triplex', text: 'Triplex'},
              ]}
              defaultCurrent={0}
              onChange={(option: {value: string}) => {
                // setValue de react-hook-form para property_type
                if (option && option.value) {
                  setValue('property_type', option.value);
                }
              }}
              name='property_type'
              placeholder='Seleccioná el tipo de inmueble*'
            />
            <input type='hidden' {...register('property_type')} />
            <p className='form_error'>{errors.property_type?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-box-one bottom-border mb-25'>
            <div className='label'>Teléfono*</div>
            <input type='text' className='type-input' {...register('user_phone')} name='user_phone' placeholder='Tu teléfono*' />
            <p className='form_error'>{errors.user_phone?.message}</p>
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
            <textarea className='type-input' {...register('description')} placeholder='Describí la propiedad a tasar*' name='description'></textarea>
            <p className='form_error'>{errors.description?.message}</p>
          </div>
        </div>
        <div className='col-12'>
          <div className='input-box-one'>
            <button type='submit' className='btn-five text-uppercase rounded-0 w-100'>
              Solicitar Tasación
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default AppraiseForm;
