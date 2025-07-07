import AgencyFormOne from '@/components/forms/AgencyFormOne';
import Link from 'next/link';
import React from 'react';

const ReviewFormArea = () => {
  return (
    <div className='accordion-item'>
      <h2 className='accordion-header'>
        <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseTwelveA' aria-expanded='true' aria-controls='collapseTwelveA'>
          Dejá tu reseña
        </button>
      </h2>
      <div id='collapseTwelveA' className='accordion-collapse collapse'>
        <div className='accordion-body'>
          <div className='review-form'>
            <p className='fs-20 lh-lg pb-15'>
              <Link href='#' data-bs-toggle='modal' data-bs-target='#loginModal' className='color-dark fw-500 text-decoration-underline'>
                Ingresá
              </Link>{' '}
              para dejar tu comentario o registrate si no tenés una cuenta.
            </p>
            <AgencyFormOne />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewFormArea;
