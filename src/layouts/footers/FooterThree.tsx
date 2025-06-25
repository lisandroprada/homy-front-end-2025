'use client';
import Image from 'next/image';
import Link from 'next/link';
import footer_data from '@/data/home-data/FooterData';

import footerLogo from '@/assets/images/logo/logo_06.svg';
import footerLogo_2 from '@/assets/images/logo/logo_propietas_01.svg';
import footerShape_1 from '@/assets/images/shape/shape_52.svg';

const FooterThree = () => {
  return (
    <div className='footer-three'>
      <div className='container container-large'>
        <div className='bg-wrapper position-relative z-1'>
          <div className='row'>
            <div className='col-xl-3 mb-40 lg-mb-60'>
              <div className='footer-intro pe-xxl-5 pe-xl-3'>
                <div className='logo mb-15'>
                  <Link href='/'>
                    <Image src={footerLogo_2} alt='' />
                  </Link>
                </div>
                <p className='mb-45 lg-mb-30'>Gregorio Mayo 106, Rawson, Chubut. Patagonia Argentina</p>
                <ul className='style-none d-flex align-items-center social-icon'>
                  <li>
                    <Link href='https://www.facebook.com/ipropietas'>
                      <i className='fa-brands fa-facebook-f'></i>
                    </Link>
                  </li>
                  <li>
                    <Link href='#'>
                      <i className='fa-brands fa-twitter'></i>
                    </Link>
                  </li>
                  <li>
                    <Link href='https://www.instagram.com/propietasinmobiliaria/'>
                      <i className='fa-brands fa-instagram'></i>
                    </Link>
                  </li>
                </ul>
                <Image src={footerShape_1} alt='' className='lazy-img ms-auto d-none d-xl-block' />
              </div>
            </div>

            {footer_data
              .filter((items) => items.page == 'home_4')
              .map((item) => (
                <div key={item.id} className='col-lg-2 col-md-6 mb-30'>
                  <div className='footer-nav'>
                    <h5 className='footer-title'>{item.widget_title}</h5>
                    <ul className='footer-nav-link style-none'>
                      {item.footer_link.map((li, i) => (
                        <li key={i}>
                          <Link href={li.link}>{li.link_title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

            <div className='col-xl-3 col-lg-4 col-md-6 mb-30'>
              <h5 className='footer-title'>Boletines</h5>
              <p className='pt-5'>Únete y recibe novedades importantes regularmente</p>
              <form onSubmit={(e) => e.preventDefault()} className='newsletter-form position-relative'>
                <input type='email' placeholder='Ingresa tu correo electrónico' />
                <button className='fw-500 fs-16 text-white tran3s'>Enviar</button>
              </form>
              <span className='fs-14 opacity-75'>Solo enviamos correos interesantes y relevantes.</span>
            </div>
          </div>
        </div>

        <div className='bottom-footer'>
          <div className='d-md-flex justify-content-center justify-content-md-between align-items-center'>
            <ul className='style-none bottom-nav d-flex justify-content-center'>
              <li>
                <Link href='/faq'>Privacidad y Términos</Link>
              </li>
              <li>
                <Link href='/contact'>Contáctanos</Link>
              </li>
            </ul>
            <p className='mb-15 text-center text-lg-start fs-16 order-md-first'>Derechos Reservados @2025 Propietas Inmobiliaria</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterThree;
