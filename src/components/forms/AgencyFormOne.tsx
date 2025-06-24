'use client';
import {toast} from 'react-toastify';

import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import NiceSelect from '@/ui/NiceSelect';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const schema = yup
  .object({
    name: yup.string().required().label('Nombre'),
    email: yup.string().required().email().label('Correo electrónico'),
    message: yup.string().required().label('Mensaje'),
  })
  .required();

const AgencyFormOne = ({style}: any) => {
  const selectHandler = (e: any) => {};

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
    <form onSubmit={handleSubmit(onSubmit)} className={` ${style ? '' : 'bg-white p-40'}`}>
      <div className='row'>
        <div className='col-12'>
          <div className='input-box-two mb-30'>
            <div className='label'>Título*</div>
            <input type='text' {...register('name')} placeholder='Ej: Rashed Kabir' className={`type-input ${style ? '' : 'rounded-0'}`} />
            <p className='form_error'>{errors.name?.message}</p>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='input-box-two mb-30'>
            <div className='label'>Correo electrónico*</div>
            <input type='email' {...register('email')} placeholder='ejemplo@email.com' className={`type-input ${style ? '' : 'rounded-0'}`} />
            <p className='form_error'>{errors.email?.message}</p>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='input-box-two mb-30'>
            <div className='label'>Valoración*</div>
            <NiceSelect
              className={`nice select ${style ? '' : 'rounded-0'}`}
              options={[
                {value: '01', text: 'Valoración'},
                {value: '02', text: 'Cinco estrellas'},
                {value: '02', text: 'Cuatro estrellas'},
                {value: '02', text: 'Tres estrellas'},
                {value: '02', text: 'Dos estrellas'},
                {value: '02', text: 'Una estrella'},
              ]}
              defaultCurrent={0}
              onChange={selectHandler}
              name=''
              placeholder=''
            />
          </div>
        </div>
        <div className='col-12'>
          <div className='input-box-two mb-30'>
            <textarea {...register('message')} placeholder='Escribe tu reseña aquí...' className={`${style ? '' : 'rounded-0'}`}></textarea>
            <p className='form_error'>{errors.message?.message}</p>
          </div>
        </div>
      </div>
      <button type='submit' className={`btn-five text-uppercase sm ${style ? '' : 'rounded-0'}`}>
        Publicar reseña
      </button>
    </form>
  );
};

export default AgencyFormOne;
