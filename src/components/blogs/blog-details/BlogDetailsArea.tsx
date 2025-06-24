'use client';
import Image from 'next/image';
import Link from 'next/link';
import BlogComment from '../common-blog/BlogComment';
import BlogForm from '@/components/forms/BlogForm';
import BlogSidebar from '../common-blog/BlogSidebar';

import blogDetailsIcon from '@/assets/images/icon/icon_67.svg';
import blogDetailsThumb_1 from '@/assets/images/blog/blog_img_16.jpg';

const content_data = {
  author: 'El Equipo de PROPIETAS Inmobiliaria',
  title_1: 'La búsqueda de un lugar al que llamar hogar',
  desc_1: (
    <>
      La búsqueda de un lugar al que llamar hogar, el terreno donde sembrar un futuro o el local donde un sueño toma forma, es una de las decisiones más importantes de nuestra vida. Es un camino lleno
      de emociones, expectativas y, a veces, de incertidumbre. En <strong>PROPIETAS Inmobiliaria</strong>, entendemos esto profundamente, porque antes que profesionales del sector, somos tus vecinos.
    </>
  ),
  desc_2: (
    <>
      Con este primer artículo, queremos abrirte las puertas de nuestra casa, nuestro espacio digital. Queremos contarte no solo lo que hacemos, sino quiénes somos, qué nos mueve y hacia dónde
      queremos caminar junto a vos.
    </>
  ),
  origen_title: 'Nuestro Origen: El Corazón en el Valle del Río Chubut',
  origen_1: (
    <>
      No aterrizamos aquí; nacimos aquí. Nuestra historia está anclada en Rawson, la capital que nos ve crecer cada día. Vivimos y respiramos el ritmo del valle, desde la tranquilidad del río Chubut
      hasta la energía del Atlántico que define a nuestra querida Playa Unión. Comprendemos el dinamismo de Trelew y el encanto único de Puerto Madryn porque son parte de nuestro propio paisaje
      cotidiano.
    </>
  ),
  origen_2: (
    <>
      Ser &quot;locales&quot; para nosotros no es una etiqueta de marketing; es nuestra identidad. Significa conocer el potencial real de cada barrio, entender el valor de la luz del sol en una tarde
      de invierno y saber que una transacción inmobiliaria es, en realidad, un proyecto de vida que se integra a nuestra comunidad. Por eso, cuando hablamos contigo, no vemos un cliente; vemos a un
      futuro vecino.
    </>
  ),
  mision_title: 'Nuestra Misión: Claridad, Confianza y Resultados',
  mision_list: [
    <>
      <strong>Simplificar lo Complejo:</strong> Nuestro principal objetivo es ser tus traductores y guías. Transformamos los procesos confusos en pasos claros y manejables. Te explicamos cada
      documento, cada gasto y cada etapa para que siempre tengas el control y tomes decisiones informadas y seguras.
    </>,
    <>
      <strong>Construir Relaciones de Confianza:</strong> Para nosotros, una venta o un alquiler no termina con la firma de un papel. Buscamos construir relaciones a largo plazo. Estamos aquí para la
      consulta previa, para el asesoramiento durante el proceso y para el café de después, cuando surgen nuevas dudas o, simplemente, para celebrar tu nuevo comienzo. Tu tranquilidad es nuestro mayor
      activo.
    </>,
    <>
      <strong>Maximizar tu Valor:</strong> Ya sea que vendas, compres o alquiles, nuestro compromiso es con tus intereses. Utilizamos un profundo conocimiento del mercado local, herramientas de
      análisis de datos y una estrategia de negociación profesional para asegurar que obtengas el mejor resultado posible. Tu éxito es, literalmente, nuestro éxito.
    </>,
  ],
  vision_title: 'Nuestra Visión: El Futuro Inmobiliario del Valle, Hoy',
  vision_1: (
    <>
      Miramos hacia adelante con entusiasmo. Nuestra visión es ser la agencia inmobiliaria de referencia en el valle, no solo por los resultados que logramos, sino por cómo los logramos. Creemos en un
      futuro donde la tecnología y el trato humano van de la mano.
    </>
  ),
  vision_2: (
    <>
      Estamos integrando herramientas innovadoras, como tours virtuales 360° que te permiten sentir una propiedad desde tu living o análisis de mercado con inteligencia artificial que revelan el
      verdadero potencial de una inversión. Pero somos firmes en nuestra creencia: la tecnología es una herramienta para potenciar la conexión humana, no para reemplazarla. Un algoritmo puede
      mostrarte una casa, pero solo un vecino puede contarte cómo es la vida en ese barrio.
    </>
  ),
  vision_3: <>Queremos liderar una transformación donde la experiencia inmobiliaria sea más ágil, más transparente y, sobre todo, más humana.</>,
  cierre_title: 'Un Café y el Próximo Capítulo',
  cierre_1: (
    <>
      Este artículo es solo el comienzo. En esta serie de publicaciones, profundizaremos en temas de interés, consejos prácticos, análisis de mercado y las historias que hacen de nuestro valle un
      lugar único para vivir e invertir.
    </>
  ),
  cierre_2: <>Te invitamos a seguirnos, a comentar y a participar. Y por supuesto, si estás pensando en tu próximo paso, las puertas de nuestra oficina en Rawson están siempre abiertas.</>,
  cierre_3: (
    <>
      Gracias por leernos. <strong>¡Empecemos a construir juntos!</strong>
    </>
  ),
  icon: ['fa-brands fa-whatsapp', 'fa-brands fa-x-twitter', 'fa-brands fa-instagram', 'fa-brands fa-viber'],
};

const {author, title_1, desc_1, desc_2, origen_title, origen_1, origen_2, mision_title, mision_list, vision_title, vision_1, vision_2, vision_3, cierre_title, cierre_1, cierre_2, cierre_3, icon} =
  content_data;

const BlogDetailsArea = () => {
  return (
    <div className='blog-details border-top mt-130 xl-mt-100 pt-100 xl-pt-80 mb-150 xl-mb-100'>
      <div className='container'>
        <div className='row gx-xl-5'>
          <div className='col-lg-8'>
            <div className='blog-post-meta mb-60 lg-mb-40'>
              <div className='post-info'>
                <span>
                  <strong>Autor: {author}</strong>
                </span>
              </div>
              <h3 className='blog-title'>{title_1}</h3>
            </div>
          </div>
        </div>
        <div className='row gx-xl-5'>
          <div className='col-lg-8'>
            <article className='blog-post-meta'>
              <figure className='post-img position-relative m0' style={{backgroundImage: `url(/assets/images/blog/blog_img_11.jpg)`}}>
                <div className='fw-500 date d-inline-block'>24 JUN 2025</div>
              </figure>
              <div className='post-data pt-50 md-pt-30'>
                <p>{desc_1}</p>
                <p>{desc_2}</p>
                <h4 className='mt-40 mb-15'>{origen_title}</h4>
                <p>{origen_1}</p>
                <p>{origen_2}</p>
                <h4 className='mt-40 mb-15'>{mision_title}</h4>
                <ul>
                  {mision_list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <h4 className='mt-40 mb-15'>{vision_title}</h4>
                <p>{vision_1}</p>
                <p>{vision_2}</p>
                <p>{vision_3}</p>
                <h4 className='mt-40 mb-15'>{cierre_title}</h4>
                <p>{cierre_1}</p>
                <p>{cierre_2}</p>
                <p>{cierre_3}</p>
              </div>
              <div className='bottom-widget d-sm-flex align-items-center justify-content-between'>
                <ul className='d-flex align-items-center tags style-none pt-20'>
                  <li>Tag:</li>
                  <li>
                    <Link href='#'>Inmobiliaria,</Link>
                  </li>
                  <li>
                    <Link href='#'>valle,</Link>
                  </li>
                  <li>
                    <Link href='#'>Rawson</Link>
                  </li>
                </ul>
                <ul className='d-flex share-icon align-items-center style-none pt-20'>
                  <li>Compartir:</li>
                  {icon.map((icon, index) => (
                    <li key={index}>
                      <Link href='#'>
                        <i className={icon}></i>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
            <BlogComment />
            <BlogForm />
          </div>
          <BlogSidebar style={true} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsArea;
