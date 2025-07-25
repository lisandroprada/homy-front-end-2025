import Image from 'next/image';

interface FloorPlanProps {
  floorPlans: Array<{
    url: string;
    name?: string;
    uploadedAt?: string;
  }>;
}

const FloorPlan = ({floorPlans}: FloorPlanProps) => {
  return (
    <div className='accordion-item'>
      <h2 className='accordion-header'>
        <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseFiveA' aria-expanded='true' aria-controls='collapseFiveA'>
          Planos
        </button>
      </h2>
      <div id='collapseFiveA' className='accordion-collapse collapse'>
        <div className='accordion-body'>
          <div className='property-floor-plan'>
            <div className='wrapper'>
              <div id='floor-plan' className='carousel slide'>
                <div className='carousel-inner'>
                  {floorPlans.map((plan, idx) => (
                    <div className={`carousel-item${idx === 0 ? ' active' : ''}`} key={plan.url}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={plan.url} alt={plan.name || `Plano ${idx + 1}`} className='w-100' />
                    </div>
                  ))}
                </div>
                <div className='carousel-indicators position-static pt-25'>
                  {floorPlans.map((_, idx) => (
                    <button
                      key={idx}
                      type='button'
                      data-bs-target='#floor-plan'
                      data-bs-slide-to={idx}
                      className={idx === 0 ? 'active' : ''}
                      aria-current={idx === 0 ? 'true' : undefined}
                      aria-label={`Slide ${idx + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlan;
