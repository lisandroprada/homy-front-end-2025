import Link from 'next/link';

interface CommonBannerProps {
  style_3?: boolean;
  property: any;
}

const CommonBanner = ({style_3, property}: CommonBannerProps) => {
  // Título: usar detailedDescription.title o address
  const title = property?.detailedDescription?.title || property?.address || 'Propiedad';
  // Dirección
  const address = property?.address || '';
  // Tipo de operación
  let operation = '';
  if (property?.publishForSale && property?.publishForRent) operation = 'EN VENTA | EN ALQUILER';
  else if (property?.publishForSale) operation = 'EN VENTA';
  else if (property?.publishForRent) operation = 'EN ALQUILER';
  // Precio
  // Formateo de moneda
  function formatCurrency(amount: number, currency: string) {
    if (!amount || !currency || amount === 0) return null;
    let locale = 'es-AR';
    let currencyCode = currency === 'USD' ? 'USD' : 'ARS';
    return amount.toLocaleString(locale, {style: 'currency', currency: currencyCode, minimumFractionDigits: 0});
  }

  const showSale = property?.valueForSale?.pricePublic;
  const showRent = property?.valueForRent?.pricePublic;

  let priceBlock = null;
  const saleAmount = property?.valueForSale?.amount;
  const rentAmount = property?.valueForRent?.amount;
  const salePrice = showSale && saleAmount && saleAmount > 0 ? formatCurrency(saleAmount, property.valueForSale.currency) : null;
  const rentPrice = showRent && rentAmount && rentAmount > 0 ? formatCurrency(rentAmount, property.valueForRent.currency) : null;

  if (showSale || showRent) {
    priceBlock = (
      <div className='w-100 text-end'>
        {showSale && (
          <span className='d-inline-block align-middle me-3'>
            <span className='label-soft label-sale me-2'>Venta</span>
            <span className='fw-500'>{salePrice ? salePrice : <span className='text-warning'>Consultar</span>}</span>
          </span>
        )}
        {showRent && (
          <span className='d-inline-block align-middle'>
            <span className='label-soft label-rent me-2'>Alquiler</span>
            <span className='fw-500'>
              {rentPrice ? (
                <>
                  {rentPrice} <span className='text-muted fs-14'>(mensual)</span>
                </>
              ) : (
                <span className='text-warning'>Consultar</span>
              )}
            </span>
          </span>
        )}
      </div>
    );
  } else {
    priceBlock = <span className='fw-500 text-warning'>Consultar</span>;
  }

  // Estilos suaves para las etiquetas
  // Puedes mover esto a un archivo CSS/SCSS global si prefieres
  const style = (
    <style jsx>{`
      .label-soft {
        display: inline-block;
        padding: 2px 12px;
        border-radius: 12px;
        font-size: 0.95em;
        font-weight: 500;
        background: #f5f5f5;
        color: #444;
        letter-spacing: 0.5px;
        vertical-align: middle;
      }
      .label-sale {
        background: #e6f7ec;
        color: #1a7f37;
      }
      .label-rent {
        background: #e6f0fa;
        color: #2257bf;
      }
    `}</style>
  );

  return (
    <div className='row'>
      <div className='col-lg-6 d-flex flex-column justify-content-start'>
        <h3 className='property-titlee mb-0'>{title}</h3>
        <div className='d-flex flex-wrap mt-10'>
          <div
            className={`list-type text-uppercase mt-15 me-3 ${style_3 ? 'bg-white text-dark fw-500' : 'text-uppercase border-20'}${operation === 'EN VENTA | EN ALQUILER' ? ' px-4 py-2' : ''}`}
            style={operation === 'EN VENTA | EN ALQUILER' ? {minWidth: 210, display: 'inline-block', textAlign: 'center'} : {}}
          >
            {operation}
          </div>
          <div className='address mt-15 p-2'>
            <i className='bi bi-geo-alt'></i> {address}
          </div>
        </div>
      </div>
      <div className='col-lg-6 d-flex flex-column align-items-end justify-content-start'>
        <div className='w-100 d-flex justify-content-end'>
          <div className='price color-dark fw-500 text-end mb-2 right' style={{minWidth: 160, width: '100%'}}>
            {priceBlock}
            {style}
          </div>
        </div>
        <ul className='style-none d-flex align-items-center action-btns mb-0 justify-content-end' style={{width: '100%'}}>
          <li className='rigth pr-4 fw-500 color-dark'>
            <i className='fa-sharp fa-regular fa-share-nodes me-2'></i>
            Compartir
          </li>
          <li>
            <Link href='#' className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? '' : 'rounded-circle'}`}>
              <i className='fa-light fa-heart'></i>
            </Link>
          </li>
          <li>
            <Link href='#' className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? '' : 'rounded-circle'}`}>
              <i className='fa-light fa-bookmark'></i>
            </Link>
          </li>
          <li>
            <Link href='#' className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? '' : 'rounded-circle'}`}>
              <i className='fa-light fa-circle-plus'></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CommonBanner;
