'use client';
import inner_faq_data from '@/data/inner-data/FaqData';
import Link from 'next/link';

const FaqArea = () => {
  return (
    <div className='faq-section-two mt-130 xl-mt-100 mb-150 xl-mb-100'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 wow fadeInLeft'>
            <div className='faq-sidebar'>
              <div className='bg-wrapper'>
                <ul className='style-none'>
                  <li>
                    <Link href='#Venta'>
                      1. <span>Venta</span>
                    </Link>
                  </li>
                  <li>
                    <Link href='#Alquiler'>
                      2. <span>Alquiler</span>
                    </Link>
                  </li>
                  <li>
                    <Link href='#Compra'>
                      3. <span>Compra</span>
                    </Link>
                  </li>
                  <li>
                    <Link href='#Pagos'>
                      4. <span>Pagos</span>
                    </Link>
                  </li>
                  <li>
                    <Link href='#Terms'>
                      5. <span>Términos y condiciones</span>
                    </Link>
                  </li>
                  <li>
                    <Link href='#Account'>
                      6. <span>Cuenta</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='bg-wrapper text-center mt-35'>
                <h4 className='mb-35'>
                  No encontraste tu <br />
                  respuesta?
                </h4>
                <Link href='/contact' className='btn-five'>
                  Contactános
                </Link>
              </div>
            </div>
          </div>

          <div className='col-lg-8'>
            {inner_faq_data.map((item) => (
              <div key={item.id} className='accordion-style-two no-bg p0 ms-xl-5'>
                <div className={`accordion-title text-uppercase fw-500 ${item.md_pt ? 'md-pt-90' : 'pt-90'}`} id={item.id_name}>
                  {item.title}
                </div>
                <div className='accordion p0' id={`accordion${item.id}`}>
                  {item.faq.map((faq: any, index: any) => (
                    <div key={index} className={`accordion-item ${faq.showAnswer ? 'active' : ''}`}>
                      <h2 className='accordion-header'>
                        <button
                          className={`accordion-button ${faq.id === 3 ? '' : 'collapsed'}`}
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target={`#collapse${faq.id}`}
                          aria-expanded='true'
                          aria-controls={`collapse${faq.id}`}
                        >
                          {faq.question}
                        </button>
                      </h2>
                      <div id={`collapse${faq.id}`} className={`accordion-collapse collapse ${faq.id === 3 ? 'show' : ''}`} data-bs-parent={`#accordion${item.id}`}>
                        <div className='accordion-body'>
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqArea;
