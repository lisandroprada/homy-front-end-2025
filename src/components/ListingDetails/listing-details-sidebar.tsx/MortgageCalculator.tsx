'use client';
const MortgageCalculator = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className='input-box-three mb-25'>
        <div className='label'>Precio de la propiedad*</div>
        <input type='tel' placeholder='1,32,789' className='type-input' />
      </div>
      <div className='input-box-three mb-25'>
        <div className='label'>Pago inicial*</div>
        <input type='tel' placeholder='$' className='type-input' />
      </div>
      <div className='input-box-three mb-25'>
        <div className='label'>Tasa de interés*</div>
        <input type='tel' placeholder='3.5%' className='type-input' />
      </div>
      <div className='input-box-three mb-25'>
        <div className='label'>Plazo del préstamo (Años)</div>
        <input type='tel' placeholder='24' className='type-input' />
      </div>
      <button className='btn-five text-uppercase sm rounded-3 w-100 mb-10'>CALCULAR</button>
    </form>
  );
};

export default MortgageCalculator;
