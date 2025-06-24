import Image from 'next/image';
import Link from 'next/link';

import commentImg_1 from '@/assets/images/blog/avatar_01.jpg';
import commentImg_2 from '@/assets/images/blog/avatar_02.jpg';
import commentImg_3 from '@/assets/images/blog/avatar_03.jpg';

const BlogComment = () => {
  return (
    <div className='blog-comment-area'>
      <h3 className='blog-inner-title pb-35'>3 Comentarios</h3>
      <div className='comment position-relative d-flex'>
        <Image src={commentImg_1} alt='' className='lazy-img user-avatar rounded-circle' />
        <div className='comment-text'>
          <div className='name fw-500'>María González</div>
          <div className='date'>24 Jun, 2025, 10:15am</div>
          <p>Me encantó la manera en que describen el sentido de comunidad y pertenencia. Es fundamental sentirnos parte del lugar donde vivimos. ¡Felicitaciones por la iniciativa!</p>
          <Link href='#' className='reply-btn tran3s'>
            Responder
          </Link>
          <div className='comment position-relative reply-comment d-flex'>
            <Image src={commentImg_2} alt='' className='lazy-img user-avatar rounded-circle' />
            <div className='comment-text'>
              <div className='name fw-500'>Carlos Pérez</div>
              <div className='date'>24 Jun, 2025, 11:02am</div>
              <p>Coincido totalmente, María. La transparencia y el trato humano son claves en el rubro inmobiliario. ¡Espero leer más artículos como este!</p>
              <Link href='#' className='reply-btn tran3s'>
                Responder
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='comment position-relative d-flex'>
        <Image src={commentImg_3} alt='' className='lazy-img user-avatar rounded-circle' />
        <div className='comment-text'>
          <div className='name fw-500'>Lucía Fernández</div>
          <div className='date'>24 Jun, 2025, 12:40pm</div>
          <p>¡Qué importante es que una inmobiliaria valore la tecnología sin perder el contacto humano! Me sentí muy identificada con la visión que proponen.</p>
          <Link href='#' className='reply-btn tran3s'>
            Responder
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogComment;
