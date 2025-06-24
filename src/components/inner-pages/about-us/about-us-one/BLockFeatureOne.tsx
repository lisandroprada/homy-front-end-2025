import Image from 'next/image';
import Link from 'next/link';

import titleShape from '@/assets/images/shape/title_shape_06.svg';
import Count from '@/components/common/Count';

interface ContentType {
  sub_title: string;
  desc_1: JSX.Element;
  title_1: string;
  title_2: string;
  desc_2: JSX.Element;
  desc_3: JSX.Element;
}

const feature_content: ContentType = {
  sub_title: 'About us',
  desc_1: (
    <>
      Somos una inmobiliaria nacida y arraigada en el corazón del Valle Inferior del Río Chubut. Instalados en Rawson, vivimos y respiramos el ritmo de la capital provincial. No solo trabajamos aquí,
      somos parte de la comunidad. Nuestro fuerte, y nuestra gran pasión, es conectar a las personas con las oportunidades únicas que ofrecen Rawson y el incomparable encanto costero de Playa Unión.
      Conocemos cada barrio, cada calle y el potencial de cada propiedad como si fuera nuestra. Es este conocimiento profundo el que nos permite asesorarte con una precisión inigualable. Nuestra
      experiencia se extiende con solidez a las dinámicas ciudades de Trelew y Puerto Madryn, comprendiendo las necesidades específicas de cada localidad del valle. Entendemos lo que significa buscar
      un primer hogar, la oportunidad de una inversión con vistas al mar, o el local ideal para tu emprendimiento. Combinamos este arraigo local con tecnología de punta, como tours virtuales 360° y
      análisis de mercado digital, para ofrecerte una experiencia clara, transparente y a tu medida. Más que agentes inmobiliarios, somos tus vecinos y socios estratégicos en el valle, comprometidos
      en ayudarte a construir tu próximo proyecto de vida aquí, en nuestro lugar en el mundo. .
    </>
  ),
  title_1: 'Who we are?',
  title_2: 'Our Mission',
  desc_2: <>Our founders Dustin Moskovitz & Justin Rosenstein met leading Engineering teams at Facebook. As operations scaled, they grew frustrated by how difficult coordinate</>,
  desc_3: <>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod incididunt ut labore et dolore aliqua.</>,
};

const {sub_title, desc_1, title_1, title_2, desc_2, desc_3} = feature_content;

const BLockFeatureOne = () => {
  return (
    <div className='block-feature-two mt-150 xl-mt-100'>
      <div className='container'>
        <div className='row gx-xl-5'>
          <div className='col-lg-6 wow fadeInLeft'>
            <div className='me-xxl-4'>
              <div className='title-one mb-60 lg-mb-40'>
                <div className='upper-title'>{sub_title}</div>
                <h3>
                  Secure your{' '}
                  <span>
                    family&apos;s
                    <Image src={titleShape} alt='' className='lazy-img' />
                  </span>{' '}
                  Dream home.
                </h3>
                <p className='fs-22'>{desc_1}</p>
              </div>
              <Link href='/contact' className='btn-two'>
                Contactános
              </Link>
              <div className='counter-wrapper border-top pt-40 md-pt-10 mt-65 md-mt-40'>
                <div className='row'>
                  <div className='col-xxl-6 col-sm-5'>
                    <div className='counter-block-one mt-20'>
                      <div className='main-count fw-500 color-dark'>
                        <span className='counter'>
                          <Count number={1.2} />
                        </span>
                        %
                      </div>
                      <span>Low interest rate</span>
                    </div>
                  </div>
                  <div className='col-xxl-6 col-sm-7'>
                    <div className='counter-block-one mt-20'>
                      <div className='main-count fw-500 color-dark'>
                        $
                        <span className='counter'>
                          <Count number={1.3} />
                        </span>
                        b+
                      </div>
                      <span>Cumulative trading volume</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-lg-6 wow fadeInRight'>
            <div className='block-two md-mt-40'>
              <div className='bg-wrapper'>
                <h5>{title_1}</h5>
                <p className='fs-22 lh-lg mt-20'>{desc_2}</p>
                <h5 className='top-line'>{title_2} </h5>
                <p className='fs-22 lh-lg mt-20'>{desc_3}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BLockFeatureOne;
