'use client';
const ScheduleForm = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className='input-box-three mb-25'>
        <div className='label'>Tu Nombre*</div>
        <input type='text' placeholder='Tu nombre completo' className='type-input' />
      </div>
      <div className='input-box-three mb-25'>
        <div className='label'>Tu Correo*</div>
        <input type='email' placeholder='Ingresa tu correo electrónico' className='type-input' />
      </div>
      <div className='input-box-three mb-25'>
        <div className='label'>Tu Teléfono*</div>
        <input type='tel' placeholder='Tu número de teléfono' className='type-input' />
      </div>
      <div className='input-box-three mb-15'>
        <div className='label'>Mensaje*</div>
        <textarea placeholder='Hola, estoy interesado/a en [California Apartments]'></textarea>
      </div>
      <button className='btn-nine text-uppercase rounded-3 w-100 mb-10'>CONSULTAR</button>
    </form>
  );
};

export default ScheduleForm;
