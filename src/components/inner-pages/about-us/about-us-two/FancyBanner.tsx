import Image from 'next/image';
import Link from 'next/link';

import fanchyBannerShape_1 from '@/assets/images/shape/shape_51.svg';
import fanchyBannerShape_2 from '@/assets/images/media/img_44.png';
import fanchyBannerShape_3 from '@/assets/images/shape/shape_50.svg';

const FancyBanner = () => {
  return (
    <div className='fancy-banner-eight wow fadeInUp mt-160 xl-mt-100 mb-120 xl-mb-100 lg-mb-80'>
      <div className='container container-large'>
        <div className='bg-wrapper border-30 bg-pink-two overflow-hidden position-relative z-1'>
          <div className='row align-items-end'>
            <div className='col-xl-6 col-lg-7 col-md-7'>
              <div className='pb-80 lg-pb-40'>
                <h3>
                  Comenzá tu camino con <span className='fw-normal fst-italic'>Nosotros.</span>
                </h3>
                <div className='d-inline-flex flex-wrap align-items-center position-relative mt-15'>
                  <Link href='/agent' className='btn-eight mt-10 me-4'>
                    <span>Empezamos ?</span>
                  </Link>
                  <Link href='/contact' className='btn-two rounded-0 border-0 mt-10'>
                    <span>Contactános</span>
                  </Link>
                  <Image src={fanchyBannerShape_1} alt='' className='lazy-img shapes shape_02 wow fadeInRight' />
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-5 col-md-5 text-center text-md-end'>
              <div className='media-wrapper position-relative z-1 d-inline-block'>
                <Image src={fanchyBannerShape_2} alt='' className='lazy-img' />
                <Image src={fanchyBannerShape_3} alt='' className='lazy-img shapes shape_01' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FancyBanner;
