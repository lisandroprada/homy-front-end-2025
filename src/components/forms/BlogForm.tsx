'use client';
import LoginModal from '@/modals/LoginModal';
import {toast} from 'react-toastify';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useState} from 'react';

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

const BlogForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>({resolver: yupResolver(schema)});
  const onSubmit = (data: FormData) => {
    const notify = () => toast('Comentario enviado correctamente', {position: 'top-center'});
    notify();
    reset();
  };

  const [loginModal, setLoginModal] = useState<boolean>(false);

  return (
    <>
      <div className='blog-comment-form'>
        <h3 className='blog-inner-title'>Deja un comentario</h3>
        <p>
          <a onClick={() => setLoginModal(true)} style={{cursor: 'pointer'}} className='text-decoration-underline fw-500'>
            Ingresar
          </a>{' '}
          Inicia sesión para publicar tu comentario o regístrate si no tienes una cuenta.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-30'>
          <div className='input-wrapper mb-30'>
            <label>Nombre*</label>
            <input {...register('name')} type='text' placeholder='Ej: Juan Pérez' />
            <p className='form_error'>{errors.name?.message}</p>
          </div>
          <div className='input-wrapper mb-40'>
            <label>Correo electrónico*</label>
            <input {...register('email')} type='email' placeholder='ejemplo@email.com' />
            <p className='form_error'>{errors.email?.message}</p>
          </div>
          <div className='input-wrapper mb-30'>
            <textarea {...register('message')} placeholder='Tu comentario'></textarea>
            <p className='form_error'>{errors.message?.message}</p>
          </div>
          <button className='btn-five rounded-0'>Publicar comentario</button>
        </form>
      </div>
      <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
    </>
  );
};

export default BlogForm;
