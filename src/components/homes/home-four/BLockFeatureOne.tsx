import FeatureOne from '@/components/common/FeatureOne';

const BlockFeatureOne = () => {
  return (
    <div className='block-feature-nine bg-pink-two image-bg position-relative z-1 mt-170 xl-mt-120 pt-85 pb-110 xl-pb-80'>
      <div className='container container-large'>
        <div className='position-relative'>
          <div className='row'>
            <div className='col-xxl-6 col-xl-7 col-lg-8'>
              <div className='title-one mb-30 lg-mb-20 wow fadeInUp'>
                <h3>Propiedades verificadas</h3>
                <p>Solo listamos propiedades verificadas para tu tranquilidad y seguridad.</p>
              </div>
            </div>
          </div>

          <div className='row gx-xxl-5'>
            <FeatureOne />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockFeatureOne;
