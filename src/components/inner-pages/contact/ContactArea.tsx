import Link from 'next/link';
import Image from 'next/image';

import circleImg from '@/assets/images/icon/icon_39.svg';
import ContactForm from '@/components/forms/ContactForm';

interface DataType {
  id: number;
  class_name?: string;
  title: string;
  address_1: string;
  address_2?: string;
}

const address_data: DataType[] = [
  {
    id: 1,
    title: 'Siempre estamos felices de ayudar.',
    address_1: 'info@ipropietas.com.ar',
  },
  {
    id: 2,
    class_name: 'skew-line',
    title: 'Nuestro números de teléfono',
    address_1: '+(54) 9 280-4503151,',
    address_2: '+(54) 280 436-5572',
  },
  {
    id: 3,
    title: 'Chat en vivo',
    address_1: 'www.homylivechat.com',
  },
];

const ContactArea = () => {
  return (
    <div className='contact-us border-top mt-130 xl-mt-100 pt-80 lg-pt-60'>
      <div className='container'>
        <div className='row'>
          <div className='col-xxl-9 col-xl-8 col-lg-10 m-auto'>
            <div className='title-one text-center wow fadeInUp'>
              <h3>¿Preguntas? No dudes en ponerte en contacto con nosotros.</h3>
            </div>
          </div>
        </div>
      </div>

      <div className='address-banner wow fadeInUp mt-60 lg-mt-40'>
        <div className='container'>
          <div className='d-flex flex-wrap justify-content-center justify-content-lg-between'>
            {address_data.map((item) => (
              <div key={item.id} className={`block position-relative ${item.class_name} z-1 mt-25`}>
                <div className='d-xl-flex align-items-center'>
                  <div className='icon rounded-circle d-flex align-items-center justify-content-center'>
                    <Image src={circleImg} alt='' className='lazy-img' />
                  </div>
                  <div className='text'>
                    <p className='fs-22'>{item.title}</p>
                    <Link href='#' className='tran3s'>
                      {item.address_1}
                    </Link>
                    {item.address_2 && (
                      <>
                        {' '}
                        <Link href='#' className='tran3s'>
                          {item.address_2}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='bg-light-blue mt-150 xl-mt-120 md-mt-80'>
        <div className='row'>
          <div className='col-xl-7 col-lg-6'>
            <div className='form-style-one wow fadeInUp'>
              <ContactForm />
            </div>
          </div>
          <div className='col-xl-5 col-lg-6 d-flex order-lg-first'>
            <div className='contact-map-banner w-100'>
              <div className='gmap_canvas h-100 w-100'>
                <iframe
                  className='gmap_iframe h-100 w-100'
                  src='https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Gregorio Mayo 106, Rawson, Chubut, Argentina&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactArea;
